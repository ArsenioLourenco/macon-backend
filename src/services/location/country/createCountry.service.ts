


export interface ICreateCountry{
    country: string;
    region: string;
    code: string;

}

export class CreateCountry{
    async execute({
        country,
        region,
        code
    }: ICreateCountry){
        const countryRepository = getCustomRepository(
            CountryRepository
        )
    }
}