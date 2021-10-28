import { getCustomRepository } from "typeorm";
import AgendTravelsRepository from "../../repositories/agendTravels.repository";
import TransportRepository from "../../repositories/transports.repository";
import TravelsRepository from "../../repositories/travels.repository";

export interface IAgendTravel{
    placeReserve: number,
    travelId: number,
    notes?: Text
}

export default class AgendTravels{
    async execute({ placeReserve, travelId, notes } : IAgendTravel){
        const agendTravelRepository = getCustomRepository(
            AgendTravelsRepository
        );
        const travelRepository = getCustomRepository(
            TravelsRepository
        );
        const transportRepository = getCustomRepository(
            TransportRepository
        );
        try{
            const verifyIfExistTravel = await travelRepository.findOne({
                    where: {
                        id: travelId
                    }
                });
            console.log(travelId)
            // if(!verifyIfExistTravel){
            //     return 'We dont have Travels for this traject please Goto a Spot for agend your travel Traject.';
            // }
            // // geting transport id
            // const travelsTransportId = verifyIfExistTravel.typeTransportId;
            // const verifyTransportIdDatas = await transportRepository.findOne(
            //     travelsTransportId
            // );
            // const totalPlacesInTransport = verifyTransportIdDatas.totalPlace;
            // // geting totalPlace that was reserved on disponible travel transport
            // const findAllTravelAggend = await agendTravelRepository.find();
            
            return verifyIfExistTravel;
        }catch(err){
            return err.message;
        }
    }
}