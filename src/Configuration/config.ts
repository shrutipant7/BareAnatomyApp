import BeerCatalog from "../BeerCatalog/Container/cont";
import FavBeer from "../BeerCatalog/Container/favCont";

export interface RouteInterface {
    path: string;
    component: any;
    exact: boolean;
}

export const ROUTES: RouteInterface[] = [
    {
        path: '/:searchterm?',
        component: BeerCatalog,
        exact: true
    },
    {
        path: '/favorite/page',
        component: FavBeer,
        exact: true
    }
];