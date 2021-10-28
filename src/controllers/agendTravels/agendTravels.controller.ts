import { Request, Response } from "express";
import AgendTravels from "../../services/agendTravels/agendTravel.service";

export default class AgendTravelsController{
    async handle(request: Request, response: Response){
        const agendTravelService = new AgendTravels();
        const x = await agendTravelService.execute({placeReserve: 8, travelId: 44, })
        console.log(x);
        
        return response.json(x)
    }
}