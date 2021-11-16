import { getCustomRepository } from "typeorm";
import CountryRepository from "../../../repositories/country.repository";

export interface IUpdateCountry { id: number, name: string, region: string, code: string }
export default class UpdateCountryService {
    async execute({ id, name, region, code }: IUpdateCountry) {
        let today = new Date()
        try {
            const countryRepository = getCustomRepository(CountryRepository);
            const countryID = await countryRepository.findOne(id);
            if (countryID) {
                if (name && region && code) {
                    const countryUpdate = await countryRepository.createQueryBuilder()
                        .update()
                        .set({ countryName: name, region: region, codeCountry: code, updatedAt: today})
                        .where("id = :id", { id: id })
                        .execute();
                    return countryUpdate;
                } if (region) {
                    const countryUpdate = await countryRepository.createQueryBuilder()
                        .update()
                        .set({ region: region, updatedAt: today})
                        .where("id = :id", { id: id })
                        .execute();
                    return countryUpdate;
                } if (code) {
                    const countryUpdate = await countryRepository.createQueryBuilder()
                        .update()
                        .set({ codeCountry: code, updatedAt: today})
                        .where("id = :id", { id: id })
                        .execute();
                    return countryUpdate;
                } if (name) {
                    const countryUpdate = await countryRepository.createQueryBuilder()
                        .update()
                        .set({ countryName:  name, updatedAt: today })
                        .where("id = :id", { id: id })
                        .execute();
                    return countryUpdate;
                }
            }
        } catch (error) {
            return error;
        }
    }
}
