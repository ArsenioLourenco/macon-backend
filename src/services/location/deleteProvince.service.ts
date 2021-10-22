import ProvinceRepository from '../../repositories/province.repositoy';
import { getCustomRepository } from 'typeorm';


export interface IDeleteProvince {
    id: number,
}

export default class DeleteProvince {
    async execute({
        id
    }: IDeleteProvince) {
        const provinceRepository = getCustomRepository(ProvinceRepository);
        
        try {

            const provinceID = provinceRepository.findOne(id);
             
            console.log('mauro');
            console.log((await provinceID).provinceName);
            if ((await provinceID).id) {
                const deleteProvince = await provinceRepository
                    .createQueryBuilder()
                    .delete()
                    .where("id = :id", { id: id })
                    .execute();

                return deleteProvince;
            }else{
                return 'Esse Provincia nao Existe';
            }

        } catch (error) {
            return error;
        }
    }
}