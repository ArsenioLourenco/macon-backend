import { getCustomRepository } from "typeorm";
import ProvincesRepository from "../../repositories/provinces.repository";
import SpotRepository from "../../repositories/spots.repository";
import TransportRepository from "../../repositories/Transport";
import TravelsRepository from "../../repositories/travels.repository";

export interface IcreateTravels {
    departureDate: Date,
    returnDate: Date,
    timeToGoTo: Date,
    timeToArrival: Date,
    observations: string,
    spotId: number,
    originProvince: number,
    destinyProvince: number,
    transportId: number,
    price: number
}

export default class CreateTravels {
    async execute({
        departureDate,
        returnDate,
        timeToGoTo,
        timeToArrival,
        observations,
        spotId,
        originProvince,
        destinyProvince,
        transportId,
        price


    }: IcreateTravels) {
        const travelsRepository = getCustomRepository(TravelsRepository)
        const spotRepository = getCustomRepository(SpotRepository)
        const transportRepository = getCustomRepository(TransportRepository)
        const provincesRepository = getCustomRepository(ProvincesRepository)
        try {
            const verifyIdSpots = await spotRepository.findOne({ where: { id: spotId } })
            const verifyIdTransport = await transportRepository.findOne({ where: { id: transportId } })
            const verifyIdProvinceOrigin  = await provincesRepository.findOne({ where: {id:  originProvince } })
            const verifyIdProvinceDestiny = await provincesRepository.findOne({ where: {id: destinyProvince } })

            const findTravelsDeparture = await travelsRepository.findOne({ where: { departureDate }, relations: ['transport', 'originProvince', 'destinyProvince'] })
            if (findTravelsDeparture) {
                const { id } = findTravelsDeparture.transport
                if (id === transportId) {
                    return 'this travel exist '
                }
            }

            console.log('Begin: '+verifyIdProvinceOrigin.id)
            console.log('Destiny: '+verifyIdProvinceDestiny.id)

            if (verifyIdProvinceOrigin.id === verifyIdProvinceDestiny.id) {
                return 'Está viagem não é válida, a origem não pode ser a mesma que o destino '
            }


            const createTravel = await travelsRepository
                .createQueryBuilder()
                .insert()
                .values([
                    {
                        departureDate,
                        returnDate,
                        timeToGoTo,
                        timeToArrival,
                        observations,
                        spot: verifyIdSpots,
                        originProvince: verifyIdProvinceOrigin,
                        destinyProvince: verifyIdProvinceDestiny,
                        transport: verifyIdTransport,
                        price
                    },

                ])
                .execute();
            return createTravel;

        }

        catch (err) {
            return err;
        }

    }
}