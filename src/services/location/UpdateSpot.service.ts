import { getCustomRepository } from 'typeorm';
import SpotRepository from '../../repositories/spot.repository';


export interface IUpdateSpot{
    id: number,
    name: string,
    description: string,
    location: string,
    contacts: string,
    provinceID: number,
}

export default class UpdateSpot{
    async execute({
        id, 
        name, 
        description,
        location,
        contacts,
        provinceID,
    }: IUpdateSpot){
        const spotRepository = getCustomRepository(SpotRepository);
        try {
            const spotExist = await spotRepository.findOne(id);
            if(spotExist){
                if(name && description && location && contacts){
                    const spotUpdate = await spotRepository.createQueryBuilder()
                    .update()
                    .set({ spotName: name, description, location, contacts})
                    .where({id})
                    .execute();

                    return spotUpdate;
                } 
                // else if(region){
                //     const spotUpdate = await provinceRepository.createQueryBuilder()
                //     .update()
                //     .set({region: region})
                //     .where({id})
                //     .execute();

                //     return spotUpdate;
                // }else if(code){
                //     const spotUpdate = await provinceRepository.createQueryBuilder()
                //     .update()
                //     .set({codeProvince: code})
                //     .where({id})
                //     .execute();

                //     return spotUpdate;
                // } else if(name){
                //     const spotUpdate = await provinceRepository.createQueryBuilder()
                //     .update()
                //     .set({provinceName: name})
                //     .where({id})
                //     .execute();

                //     return spotUpdate;
                // }
            }
        } catch (error) {
            
        }
    }
}