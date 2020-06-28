import React, { Component } from 'react';
import { BeerState } from '../State/state';
import { isNullOrUndefined } from 'util';

interface Props {
    indCard: BeerState;
    saveOrRemoveFavorite: (beerInfo: BeerState, set: boolean) => void;
    favBeerList: BeerState[];
}

interface State {
    favorite: boolean;
    clicked: boolean;
}

class Card extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            favorite: false,
            clicked: false
        }
    }
    componentDidMount() {
        let { favBeerList, indCard } = this.props;
        if (!isNullOrUndefined(favBeerList)) {
            let index = favBeerList.findIndex((el) => { return el.id === indCard.id });
            if (index > -1) {
                this.setState({ favorite: true })
            }
        }
    }
    render() {
        let { indCard } = this.props;
        let { favorite } = this.state;
        return (
            <div className="col-md-3 col-11 card-container">
                <div className="row">
                    <div className="col-md-12 front">
                        <div className="row">
                            <div className="col-md-4">
                                <img className="card-img-top" src={indCard.image_url} alt="card-img" style={{ width: '4vw', height: 'auto' }} />
                            </div>
                            <div className="card-body col-md-7">
                                <h5 className="card-title">{indCard.name}</h5>
                                <h6 className="card-text" style={{fontStyle: 'italic'}}>{indCard.tagline}</h6> <br />
                                <p className="card-text">{ indCard.description.length > 400 ? indCard.description.slice(0, 400) + '. . .' : indCard.description}</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-12 back">
                        <button type="button" className={favorite ? 'btn btn-danger' : 'btn btn-outline-danger'} onClick={() => { this.setorRemoveFavorite(); this.setState({clicked: !this.state.clicked}) }}>{favorite || this.state.clicked ? 'Remove from favorites' : 'Add to favorite'}</button>
                    </div>
                </div>
            </div>
        );
    }

    setorRemoveFavorite() {
        let { saveOrRemoveFavorite, indCard } = this.props;
        let { favorite } = this.state;
        if (favorite) {
            saveOrRemoveFavorite(indCard, false);
        } else {
            saveOrRemoveFavorite(indCard, true);
        }
    }
}

export default Card;