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
        const travelsRepository   = getCustomRepository(TravelsRepository)
        const spotRepository      = getCustomRepository(SpotRepository)
        const transportRepository = getCustomRepository(TransportRepository)
        const provincesRepository = getCustomRepository(ProvincesRepository)
        let today = new Date()
        try {
            const verifyIdSpots     = await spotRepository.findOne({ where: { id: spotId } })
            const verifyIdTransport = await transportRepository.findOne({ where: { id: transportId } })
            const verifyIdProvinceOrigin  = await provincesRepository.findOne({ where: { id: originProvince } })
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
                return await travelsRepository
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
                        price,
                        updatedAt: today
                    })
                    .where("id = :id", { id: id })
                    .execute();
            }
            if (departureDate) {
                return await travelsRepository
                    .createQueryBuilder()
                    .update()
                    .set({ departureDate, updatedAt: today})
                    .where("id = :id", { id: id })
                    .execute();            }
            if (returnDate) {
                return await travelsRepository
                    .createQueryBuilder()
                    .update()
                    .set({ returnDate, updatedAt: today })
                    .where("id = :id", { id: id })
                    .execute();            }
            if (timeToGoTo) {
                return await travelsRepository
                    .createQueryBuilder()
                    .update()
                    .set({ timeToGoTo, updatedAt: today })
                    .where("id = :id", { id: id })
                    .execute();            }
            if (timeToArrival) {
                return await travelsRepository
                    .createQueryBuilder()
                    .update()
                    .set({ timeToArrival, updatedAt: today })
                    .where("id = :id", { id: id })
                    .execute();
            }
            if (observations) {
                return await travelsRepository
                    .createQueryBuilder()
                    .update()
                    .set({ observations, updatedAt: today })
                    .where("id = :id", { id: id })
                    .execute();
            }
            if (spotId) {
                return await travelsRepository
                    .createQueryBuilder()
                    .update()
                    .set({ spot: verifyIdSpots, updatedAt: today })
                    .where("id = :id", { id: id })
                    .execute();
            }
            if (originProvince) {
                return await travelsRepository
                    .createQueryBuilder()
                    .update()
                    .set({ originProvince: verifyIdProvinceOrigin, updatedAt: today })
                    .where("id = :id", { id: id })
                    .execute();
            }
            if (destinyProvince) {
                return await travelsRepository
                    .createQueryBuilder()
                    .update()
                    .set({ destinyProvince: verifyIdProvinceDestiny, updatedAt: today})
                    .where("id = :id", { id: id })
                    .execute();
            }
            if (transportId) {
                return await travelsRepository
                    .createQueryBuilder()
                    .update()
                    .set({ transport: verifyIdTransport, updatedAt: today })
                    .where("id = :id", { id: id })
                    .execute();
            }
            if (price) {
                return await travelsRepository
                    .createQueryBuilder()
                    .update()
                    .set({ price, updatedAt: today })
                    .where("id = :id", { id: id })
                    .execute();
            }
        } catch (err) {
            return err.message;
        }

    }
}
