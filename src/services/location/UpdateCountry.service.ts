import { getCustomRepository } from 'typeorm';
import CountryRepository from '../../repositories/country.repository';

export interface IUpdateCountry{
    id: number,
    name: string,
    region: string,
    code: string,
}

export default class UpdateCountry{
    async execute({
        id, 
        name, 
        region, 
        code
    }: IUpdateCountry){
        const countryRepository = getCustomRepository(CountryRepository);

        try {
            const countryID = await countryRepository.findOne(id);
            if(countryID){
                if(name && region && code){

                    const countryUpdate = await countryRepository.createQueryBuilder()
                    .update()
                    .set({countryName: name, region: region, codeCountry: code})
                    .where({id})
                    .execute();

                    return countryUpdate;
                } else if(region){
                    const countryUpdate = await countryRepository.createQueryBuilder()
                    .update()
                    .set({region: region})
                    .where({id})
                    .execute();

                    return countryUpdate;
                }else if(code){
                    const countryUpdate = await countryRepository.createQueryBuilder()
                    .update()
                    .set({codeCountry: code})
                    .where({id})
                    .execute();

                    return countryUpdate;
                } else if(name){
                    const countryUpdate = await countryRepository.createQueryBuilder()
                    .update()
                    .set({countryName: name})
                    .where({id})
                    .execute();

                    return countryUpdate;
                }
            }
        } catch (error) {
            
        }
    }
}