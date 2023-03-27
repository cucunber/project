type PriceElement = {
    amount: number,
    from?: boolean,
}

type ServiceElement = {
    id: number,
    name: string,
    price: PriceElement,
}

type GroupElement = {
    id: string,
    name: string,
}

export interface IPrice {
    group: GroupElement,
    services: ServiceElement[],
}

export interface IPriceResponse {
    prices: IPrice[],
}

export const priceRoutes = {
    price: "/data/pages/price/price.json"
}