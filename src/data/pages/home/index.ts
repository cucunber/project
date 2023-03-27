import { IArticle } from "@/sections/article/article.type";

export interface IPagesHomeServiceItem {
    name: string;
    route: string;
}

export interface IPagesHomeServicesResponse {
    services: IPagesHomeServiceItem[],
}

export interface IPagesHomeMainServicesResponse {
    mainServices: IArticle[],
}

export const pagesHomeRoutes = {
    services: '/data/pages/home/services.json',
    mainServices: '/data/pages/home/main-services.json',
}