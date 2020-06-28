import React, { Component } from 'react';
import { BeerState } from '../State/state';
import Card from './Card';
import NavBar from '../../NavBar/NavBar';
import { History } from 'history';

interface Props {
    favBeerList: BeerState[];
    saveOrRemoveFavorite: (beerInfo: BeerState, set: boolean) => void;
    history: History;
}

class FavBeer extends Component<Props> {
    render() {
        let { favBeerList, saveOrRemoveFavorite, history } = this.props;
        return (
            <>
                <div className="row">
                    <div className="col-md-12">
                        <NavBar history={history} setSearchTerm={() => {}} favPage={true} />
                    </div>
                </div>
                {favBeerList.length > 0 ? <div className="row">
                    {favBeerList.map((ind, i) =>
                        <Card indCard={ind} key={i} saveOrRemoveFavorite={saveOrRemoveFavorite} favBeerList={favBeerList} />
                    )}
                </div> :
                    <div className="row">
                        <div className="col-md-12 cursor-pointer">
                            No favorites saved. Go back to home and add favorites ...  <br /><br/>
                            <a style={{ color: 'blue' }} onClick={() => this.props.history.push('/')}>Go back to home</a>
                        </div>
                    </div>}
            </>
        );
    }
}

export default FavBeer;