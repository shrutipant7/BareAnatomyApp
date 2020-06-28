import { GetAllItems, GETALLITEMS, FetchFavorite, FETCHFAVORITE, SaveOrRemoveFavorite, SAVEORREMOVEFAVORITE } from "./actionDef";
import { BeerState } from "../State/state";

export default class CatalogActionGenerator {
    public static getAllItems(beerInfo: BeerState[]): GetAllItems {
        return {
            type: GETALLITEMS,
            payload: {
                beerInfo: beerInfo
            }
        }
    }
    public static saveOrRemoveFavorite(beerInfo: BeerState, set: boolean): SaveOrRemoveFavorite {
        return {
            type: SAVEORREMOVEFAVORITE,
            payload: {
                beerInfo: beerInfo,
                set: set
            }
        }
    }
    public static fetchFavorite(favBeerList: BeerState[]): FetchFavorite {
        return {
            type: FETCHFAVORITE,
            payload: {
                favBeerList: favBeerList
            }
        }
    }
}