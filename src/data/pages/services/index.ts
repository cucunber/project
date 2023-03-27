import { IArticle } from "@/sections/article/article.type";

export const dataServicesRoutes = {
    subRoute: (route: string) => `/data/pages/services/${route}.json`,
}

export interface PagesServicesResponse {
    content: IArticle[],
}