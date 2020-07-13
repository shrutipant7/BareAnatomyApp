import { combineReducers } from "redux";
import { IntroState } from "../IntroPage/State/state";
import IntroReducer from "../IntroPage/Reducer/red";

export interface StoreTree {
    intro: IntroState;
}

export const mainReducer = combineReducers({
    intro: IntroReducer
})