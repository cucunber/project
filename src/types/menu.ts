export interface IMenuElement {
    name: string,
    route: string,
    subRoutes?: IMenuElement[],
}