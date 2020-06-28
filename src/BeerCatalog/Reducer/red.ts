import defaultCatalogState, { CatalogState, BeerState } from "../State/state";
import { CatalogActions, GETALLITEMS, SAVEORREMOVEFAVORITE } from "../Action/actionDef";

export default function CatalogReducer(state: CatalogState = defaultCatalogState(), action: CatalogActions): CatalogState {
    console.log('FAV', state.favBeerList)
    switch (action.type) {
        case GETALLITEMS: {
            return { ...state, beerInfo: action.payload.beerInfo };
        }
        case SAVEORREMOVEFAVORITE: {
            return { ...state, favBeerInfo: setOrRemoveFavorite(action.payload.beerInfo, action.payload.set ? true : false).beerInfo }
        }
        default: return state;
    }

    function setOrRemoveFavorite(beerInfo: BeerState, set: boolean) {
        let favBeerList = state.favBeerList;
        let payload: {
            beerInfo: BeerState;
            favBeerList: BeerState[]
        } = {
            beerInfo: {
                id: -1,
                name: '',
                tagline: '',
                image_url: '',
                description: ''
            },
            favBeerList: []
        }
        if (set) {
            let index = favBeerList.findIndex((el) => { return el.id === beerInfo.id });
            if (index > -1) {
                //do nothing
            } else {
                favBeerList.push(beerInfo);
                payload = {
                    beerInfo: beerInfo,
                    favBeerList: favBeerList
                }
            }
        } else {
            if (favBeerList.length > 0) {
                for (var i = 0; i < favBeerList.length; i++) {
                    if (favBeerList[i].id === beerInfo.id) {
                        favBeerList.splice(i, 1);
                    }
                }
            } else {
                payload = {
                    beerInfo: beerInfo,
                    favBeerList: favBeerList
                }
            }
        }
        return payload;
    };
}