import { getCustomRepository } from 'typeorm';
import CountryRepository from '../../repositories/country.repository';
import ProvinceRepository from '../../repositories/province.repositoy';

export interface IUpdateProvince{
    id: number,
    name: string,
    region: string,
    code: string,
    countryID: number
}

export default class UpdateProvince{
    async execute({
        id, 
        name, 
        region, 
        code,
        countryID
    }: IUpdateProvince){
        const provinceRepository = getCustomRepository(ProvinceRepository);
        const countryRepository = getCustomRepository(CountryRepository);
        try {
            const provinceID = await provinceRepository.findOne(id);
            const countryExist = await countryRepository.findOne(countryID);
            if(provinceID){
                if(name && region && code){

                    const provinceUpdate = await provinceRepository.createQueryBuilder()
                    .update()
                    .set({provinceName: name, region, codeProvince: code})
                    .where({id})
                    .execute();

                    return provinceUpdate;
                } 
                else if(region){
                    const provinceUpdate = await provinceRepository.createQueryBuilder()
                    .update()
                    .set({region: region})
                    .where({id})
                    .execute();

                    return provinceUpdate;
                }else if(code){
                    const provinceUpdate = await provinceRepository.createQueryBuilder()
                    .update()
                    .set({codeProvince: code})
                    .where({id})
                    .execute();

                    return provinceUpdate;
                } else if(name){
                    const provinceUpdate = await provinceRepository.createQueryBuilder()
                    .update()
                    .set({provinceName: name})
                    .where({id})
                    .execute();

                    return provinceUpdate;
                }
            }
        } catch (error) {
            
        }
    }
}