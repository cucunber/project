import { IMenuElement } from "@/types/menu"

export const dataRoutes = {
    menu: '/data/menu/menu.json',
    
}

export interface IMenuResponse {
    options: IMenuElement[];
}