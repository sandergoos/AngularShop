export interface IFilter {
    name?: string,
    priceFrom?: number,
    priceTill?: number,
    orderBy: string,
    desc: boolean,
    page: number,
    amount: number,
}