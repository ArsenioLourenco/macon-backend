import { getCustomRepository } from "typeorm";
import { string } from "yup/lib/locale";
import AgendTravelsRepository from "../../repositories/agendTravels.repository";
import TransportRepository from "../../repositories/Transport";
import TravelsRepository from "../../repositories/travels.repository";

export interface IAgendTravel{
    placesReserve: number,
    travelId: number,
}

export default class AgendTravels{
    async execute({ placesReserve, travelId } : IAgendTravel){
        const 
            travelRepository = getCustomRepository( TravelsRepository ),
            transportRepository = getCustomRepository( TransportRepository ),
            agendTravelRepository = getCustomRepository( AgendTravelsRepository )
        try{
            const verifyIfExistTravel = await travelRepository.query(
                `SELECT * FROM Travels WHERE id = '${travelId}'`
            );
            console.log(travelId)
            if(!verifyIfExistTravel){
                return 'Lamentamos, mas não temos viagens para esse trajscto, dirija-se a um terminal mais próximo de si!';
            }
            if(placesReserve == 0){
                return 'Passe Por favor uma quantidade de Lugares Justa!'
            }
            // geting transport id
            const 
                [{ id, transportId, price, departureDate, timeToGoTo, originProvince, destinyProvince }] = verifyIfExistTravel,
                verifyTransportIdDatas = await transportRepository.findOne( transportId ),
                totalPlacesInTransport = verifyTransportIdDatas.totalPlace;
            // geting totalPlace that was reserved on disponible travel transport
            const 
                findAllTravelAggend = await agendTravelRepository.query(
                    `SELECT SUM(placesReserve) as TOTAL FROM AgendTravels`
                ),
                [{ TOTAL }] = findAllTravelAggend;
            // Verify if have place in this travel
            const totalPlaceDisponible = (totalPlacesInTransport - TOTAL as number);
            
            if(placesReserve > totalPlaceDisponible){
                return `Lamentamos, mas para esse trajeto temos apenas disponível ${totalPlaceDisponible} lugares.`;
            }
            const calculateTheTotalCustOfTheTrip = (placesReserve * price) as number;
            // Reserving
            const lastMaxId  = await agendTravelRepository
                .createQueryBuilder("AgendTravels")
                .select("MAX(AgendTravels.id)", "max")
                .getRawOne(),
                newIdAgendTravels = parseInt(lastMaxId['max'] + 1).toString(),
                zerosLeft = '0000',
                remainingZeros = zerosLeft.substring(
                    0, (zerosLeft.toString().length - newIdAgendTravels.toString().length)
                ),
                personalCodeAgend = 'maconTransp'+remainingZeros+newIdAgendTravels+'-'+calculateTheTotalCustOfTheTrip,
                reserving = agendTravelRepository.create({
                    travel: id,
                    userAgendCode: newIdAgendTravels as string,
                    placesReserve,
                    personalCodeAgend,                    
                    notes: ''            
                });
            await agendTravelRepository.save(reserving);
            return `Reserva efectuada de ${placesReserve} luagares.
                Trajecto ${originProvince} - ${destinyProvince}. 
                Data De Partida: ${timeToGoTo}. 
                Custo: ${calculateTheTotalCustOfTheTrip}. 
                Código da reseva: ${personalCodeAgend}`;
        }catch(err){
            return err.message;
        }
    }
}