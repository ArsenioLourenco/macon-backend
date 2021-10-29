import { getCustomRepository } from "typeorm"
import ProvincesRepository from "../../repositories/provinces.repository"
import SpotRepository from "../../repositories/spots.repository"
import TransportRepository from "../../repositories/Transport"
import TravelsRepository from "../../repositories/travels.repository"

export interface IUpdateTravels {
    id: number,
    departureDate: Date,
    returnDate: Date,
    timeToGoTo: Date,
    timeToArrival: Date,
    observations?: string,
    spotId: number,
    originProvince: number,
    destinyProvince: number,
    transportId: number,
    price: number
}

export default class UpdateTravel {
    async execute({
        id,
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
    }: IUpdateTravels) {
        const travelsRepository = getCustomRepository(TravelsRepository)
        const spotRepository = getCustomRepository(SpotRepository)
        const transportRepository = getCustomRepository(TransportRepository)
        const provincesRepository = getCustomRepository(ProvincesRepository)
        try {
            const verifyIdSpots = await spotRepository.findOne({ where: { id: spotId } })
            const verifyIdTransport = await transportRepository.findOne({ where: { id: transportId } })
            const verifyIdProvinceOrigin = await provincesRepository.findOne({ where: { id: originProvince } })
            const verifyIdProvinceDestiny = await provincesRepository.findOne({ where: { id: destinyProvince } })

            const findTravelsDeparture = await travelsRepository.findOne({ where: { departureDate }, relations: ['transport', 'originProvince', 'destinyProvince'] })
            if (findTravelsDeparture) {
                const { id } = findTravelsDeparture.transport
                if (id === transportId) {
                    return 'Esse Autocarro Já esta Escalado Para esse Dia!'
                }
            }
            if (verifyIdProvinceOrigin.id === verifyIdProvinceDestiny.id) {
                return 'Erro: Verifique Se esta mandando os Dados correctamente'
            }


            if (departureDate || returnDate || timeToGoTo || timeToArrival || observations || spotId || originProvince || destinyProvince || transportId || price) {

                const updateTravel = await travelsRepository
                    .createQueryBuilder()
                    .update()
                    .set({
                        departureDate,
                        returnDate,
                        timeToGoTo,
                        timeToArrival,
                        observations,
                        spot: verifyIdSpots,
                        destinyProvince: verifyIdProvinceDestiny,
                        originProvince: verifyIdProvinceOrigin,
                        transport: verifyIdTransport,
                        price
                    })
                    .where("id = :id", { id: id })
                    .execute();
                return updateTravel;
            }
            if (departureDate) {
                const updateDDate = travelsRepository
                    .createQueryBuilder()
                    .update()
                    .set({ departureDate })
                    .where("id = :id", { id: id })
                    .execute();
                return updateDDate;
            }
            if (returnDate) {
                const updateRDate = travelsRepository
                    .createQueryBuilder()
                    .update()
                    .set({ returnDate })
                    .where("id = :id", { id: id })
                    .execute();
                return updateRDate;
            }
            if (timeToGoTo) {
                const updateGoto = travelsRepository
                    .createQueryBuilder()
                    .update()
                    .set({ timeToGoTo })
                    .where("id = :id", { id: id })
                    .execute();
                return updateGoto;
            }
            if (timeToArrival) {
                const updateArrivel = travelsRepository
                    .createQueryBuilder()
                    .update()
                    .set({ timeToArrival })
                    .where("id = :id", { id: id })
                    .execute();
                return updateArrivel;
            }
            if (observations) {
                const updateObservation = travelsRepository
                    .createQueryBuilder()
                    .update()
                    .set({ observations })
                    .where("id = :id", { id: id })
                    .execute();
                return updateObservation;
            }
            if (spotId) {
                const updateSpot = await travelsRepository
                    .createQueryBuilder()
                    .update()
                    .set({ spot: verifyIdSpots })
                    .where("id = :id", { id: id })
                    .execute();
                return updateSpot;
            }
            if (originProvince) {
                const updateOrigin = await travelsRepository
                    .createQueryBuilder()
                    .update()
                    .set({ originProvince: verifyIdProvinceOrigin })
                    .where("id = :id", { id: id })
                    .execute();
                return updateOrigin;
            }
            if (destinyProvince) {
                const updateDestiny = await travelsRepository
                    .createQueryBuilder()
                    .update()
                    .set({ destinyProvince: verifyIdProvinceDestiny })
                    .where("id = :id", { id: id })
                    .execute();
                return updateDestiny;
            }
            if (transportId) {
                const updateTransport = await travelsRepository
                    .createQueryBuilder()
                    .update()
                    .set({ transport: verifyIdTransport })
                    .where("id = :id", { id: id })
                    .execute();
                return updateTransport;
            }
            if (price) {
                const updatePrice = travelsRepository
                    .createQueryBuilder()
                    .update()
                    .set({ price })
                    .where("id = :id", { id: id })
                    .execute();
                return updatePrice;
            }
        } catch (err) {
            return err
        }

    }
}
