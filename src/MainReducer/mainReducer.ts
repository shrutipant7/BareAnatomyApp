import { combineReducers } from "redux";
import { CatalogState } from "../BeerCatalog/State/state";
import CatalogReducer from "../BeerCatalog/Reducer/red";

export interface StoreTree {
    catalog: CatalogState;
}

export const mainReducer = combineReducers({
    catalog: CatalogReducer
})