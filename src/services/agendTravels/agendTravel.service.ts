import { getCustomRepository } from "typeorm";
import AgendTravelsRepository from "../../repositories/agendTravels.repository";
import ProvincesRepository from "../../repositories/provinces.repository";
import TransportRepository from "../../repositories/Transport";
import TravelsRepository from "../../repositories/travels.repository";
import SendEMAIL from "../email/sendEMAIL.service";
import SendSMSAPI from "../sendSMS/sendSMSAPI.service";
export interface IAgendTravel {
  placesReserve: number;
  travelId: number;
  phoneNumber: string;
  email: string;
}
export default class AgendTravels {
  async execute({ placesReserve, travelId, phoneNumber, email }: IAgendTravel) {
    const travelRepository = getCustomRepository(TravelsRepository),
      transportRepository = getCustomRepository(TransportRepository),
      agendTravelRepository = getCustomRepository(AgendTravelsRepository),
      provinceRepository = getCustomRepository(ProvincesRepository),
      sendEmail = new SendEMAIL(),
      sendSMSAPI = new SendSMSAPI();
    try {
      const verifyIfExistTravel = await travelRepository.query(
        `SELECT * FROM Travels WHERE id = '${travelId}'`
      );
      // geting transport id
      const [
        {
          id,
          transportId,
          price,
          timeToGoTo,
          originProvince,
          destinyProvince,
        },
      ] = verifyIfExistTravel,
        origin = await provinceRepository.findOne(originProvince),
        destiny = await provinceRepository.findOne(destinyProvince),
        verifyTransportIdDatas = await transportRepository.findOne(transportId),
        totalPlacesInTransport = verifyTransportIdDatas.totalPlace;
      // geting totalPlace that was reserved on disponible travel transport
      const findAllTravelAggend = await agendTravelRepository.query(
          `SELECT SUM(placesReserve) as TOTAL FROM AgendTravels WHERE travelId = '${travelId}'`
        ),
        [{ TOTAL }] = findAllTravelAggend;
      // Verify if have place in this travel
      const totalPlaceDisponible = (totalPlacesInTransport -
        parseInt(TOTAL)) as number;

      console.log(
        "This is the error ===> " +
          parseInt(TOTAL) +
          " Transport ===> " +
          totalPlacesInTransport +
          " Places Disponiveis ===> " +
          totalPlaceDisponible
      );

      if (placesReserve > totalPlaceDisponible) {
        throw new Error(
          `Lamentamos, mas para esse trajeto temos apenas disponível ${totalPlaceDisponible} lugares.`
        );
      }
      const calculateTheTotalCustOfTheTrip = (placesReserve * price) as number;
      // Reserving
      const lastMaxId = await agendTravelRepository
        .createQueryBuilder("AgendTravels")
        .select("MAX(AgendTravels.id)", "max")
        .getRawOne(),
        newIdAgendTravels = parseInt(lastMaxId["max"] + 1).toString(),
        zerosLeft = "0000",
        remainingZeros = zerosLeft.substring(
          0,
          zerosLeft.toString().length - newIdAgendTravels.toString().length
        ),
        personalCodeAgend =
          "maconTransp" +
          remainingZeros +
          newIdAgendTravels +
          "-" +
          calculateTheTotalCustOfTheTrip,
        reserving = agendTravelRepository.create({
          travel: id,
          userAgendCode: newIdAgendTravels as string,
          placesReserve,
          personalCodeAgend,
          notes: "",
          phoneNumber,
          status: "Reserva Ativa!",
        });
      await agendTravelRepository.save(reserving);
      // sending email
      await sendEmail.execute({
        destiny: email,
        message: `Reserva efectuada de ${placesReserve} luagares. Trajecto ${origin.provinceName} - ${destiny.provinceName}. Data De Partida: ${timeToGoTo}. Custo: ${calculateTheTotalCustOfTheTrip}. Código da reseva: ${personalCodeAgend}`,
      });
      // await sendSMSAPI.execute({
      //   text:
      //     "Reserva efectuada de " +
      //     placesReserve +
      //     " luagares. Trajecto " +
      //     origin.provinceName +
      //     " - " +
      //     destiny.provinceName +
      //     ". Data De Partida: " +
      //     timeToGoTo +
      //     ". Custo: " +
      //     calculateTheTotalCustOfTheTrip +
      //     ". Codigo da reseva: " +
      //     personalCodeAgend +
      //     ".",
      // });
      return `Reserva efectuada de ${placesReserve} luagares. Trajecto ${origin.provinceName} - ${destiny.provinceName}. Data De Partida: ${timeToGoTo}. Custo: ${calculateTheTotalCustOfTheTrip}. Código da reseva: ${personalCodeAgend}`;
    } catch (err) {
      return err.message;
    }
  }
}
