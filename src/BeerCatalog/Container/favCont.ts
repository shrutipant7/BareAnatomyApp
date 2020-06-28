import { connect } from "react-redux";
import { StoreTree } from "../../MainReducer/mainReducer";
import { BeerState } from "../State/state";
import CatalogActionGenerator from "../Action/actionGen";
import FavBeer from "../Component/FavBeer";

export function mapStateToProps(appState: StoreTree, ownProps: any) {
    return {
        favBeerList: appState.catalog.favBeerList
    }
}
export function mapDispatchToProps(dispatch: any, ownProps: any) {
    return {
        saveOrRemoveFavorite: (beerInfo: BeerState, set: boolean) => dispatch(CatalogActionGenerator.saveOrRemoveFavorite(beerInfo, set))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(FavBeer);