import { getCustomRepository } from 'typeorm';
import SpotRepository from '../../repositories/spot.repository';


export interface IDeleteSpot {
    id: number,
}

export default class DeleteSpot {
    async execute({
        id
    }: IDeleteSpot) {
        const spotRepository = getCustomRepository(SpotRepository);
        
        try {

            const spotID = spotRepository.findOne(id);
             
            console.log('mauro');
            console.log((await spotID).spotName);
            if (spotID) {
                const deleteCountry = await spotRepository
                    .createQueryBuilder()
                    .delete()
                    .where("id = :id", { id: id })
                    .execute();

                return deleteCountry;
            }else{
                return 'Esse Ponto nao Existe';
            }

        } catch (error) {
            return error;
        }
    }
}