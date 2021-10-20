import { Request, Response } from "express";
import CreateTravels from "../../services/travels/createTravels.service";




export default class CreateTravelsController{
    async handle(request: Request, response: Response){

        const {spotId, origin, destiny, departureDate, returnDate, timeToGoTo, timeToArrival, transportId, observations}= request.body;

        const createTravels= new CreateTravels()
        try{
 const travel= createTravels.execute({ spotId, 
    origin, 
    destiny, 
    departureDate, 
    returnDate, 
    timeToGoTo, 
    timeToArrival, 
    transportId, 
    observations})
    
            return response
            .status(200)
            .json({
                success: true,
                data: travel
            })
        }
        catch(err){
            return err
        }
        

    }
}