export type NavigationItem = {
    name: string,
    route: string,
}

export interface INavigation {
    elements: NavigationItem[],
}