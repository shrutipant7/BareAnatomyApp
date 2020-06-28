import { BeerState } from "../State/state";

export const GETALLITEMS = 'GETALLITEMS';
export type GETALLITEMS = typeof GETALLITEMS;

export const SAVEORREMOVEFAVORITE = 'SAVEORREMOVEFAVORITE';
export type SAVEORREMOVEFAVORITE = typeof SAVEORREMOVEFAVORITE;

export const FETCHFAVORITE = 'FETCHFAVORITE';
export type FETCHFAVORITE = typeof FETCHFAVORITE;


export interface GetAllItems {
    type: GETALLITEMS;
    payload: {
        beerInfo: BeerState[];
    }
}

export interface SaveOrRemoveFavorite {
    type: SAVEORREMOVEFAVORITE;
    payload: {
        beerInfo: BeerState;
        set: boolean;
    }
}

export interface FetchFavorite {
    type: FETCHFAVORITE;
    payload: {
        favBeerList: BeerState[];
    }
}

export type CatalogActions = 
    GetAllItems |
    SaveOrRemoveFavorite |
    FetchFavorite;