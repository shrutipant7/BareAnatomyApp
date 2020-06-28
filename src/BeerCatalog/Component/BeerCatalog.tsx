import React, { Component } from 'react';
import { BeerState } from '../State/state';
import axios from 'axios';
import { BEERAPI } from '../../Configuration/global';
import Card from './Card';
import NavBar from '../../NavBar/NavBar';
import { History } from 'history';
import BottomScrollListener from 'react-bottom-scroll-listener';
import BarLoader from '../../Loader/barLoader';
import { isNullOrUndefined } from 'util';

interface Props {
    searchTerm: string;
    saveOrRemoveFavorite: (beerInfo: BeerState, set: boolean) => void;
    favBeerList: BeerState[];
    history: History;
    match: any;
}

interface State {
    beerInfo: BeerState[];
    favBeerInfo: BeerState[];
    page: number;
    loading: boolean;
}

var timer: any;

class BeerCatalog extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            beerInfo: [],
            favBeerInfo: [],
            page: 6,
            loading: true
        };
    }

    componentDidMount() {
        let { match } = this.props;
        if (!isNullOrUndefined(match.params.searchterm)) {
            this.searchItems(match.params.searchterm);
        } else {
            this.getAllItems();
        }
    }

    componentWillReceiveProps(nextProps: Props) {
        let { match } = nextProps;
        if (!isNullOrUndefined(match.params.searchterm)) {
            this.searchItems(match.params.searchterm);
        } else {
            this.getAllItems();
        }
    }

    scrollCalBack = () => {
        let { page, loading } = this.state;
        let { match } = this.props;
        timer = setTimeout(() => {
            clearTimeout(timer);
            this.setState({ page: page + 6 });
            if (!loading) {
                if (!isNullOrUndefined(match.params.searchterm)) {
                    this.searchMoreItems(match.params.searchterm, page + 6)
                } else {
                    this.getMoreItems(page + 6);
                }
            }
        }, 600);
    }

    render() {
        let { beerInfo, loading } = this.state;
        let { saveOrRemoveFavorite, favBeerList, history } = this.props;
        return (
            <>
                <div className="row">
                    <div className="col-md-12">
                        <NavBar history={history} setSearchTerm={(term: string) => this.searchItems(term)} favPage={false} />
                    </div>
                </div>
                <div className="row">
                    <BottomScrollListener debounce={300} onBottom={this.scrollCalBack}>
                        <>
                            {beerInfo.map((ind, i) =>
                                <Card indCard={ind} key={i} saveOrRemoveFavorite={saveOrRemoveFavorite} favBeerList={favBeerList} />
                            )}
                        </>
                    </BottomScrollListener>
                </div>
                {loading && <div className="row">
                    <BarLoader />
                </div>}
            </>
        );
    }

    getAllItems() {
        this.setState({ loading: true });
        return axios.get(BEERAPI + '?per_page=9').then(
            result => {
                this.setState({ beerInfo: result.data as BeerState[], loading: false });
            }
        ).catch(
            error => {
                this.setState({ beerInfo: [] });
            }
        );
    }

    getMoreItems(page: number) {
        this.setState({ loading: true });
        return axios.get(BEERAPI + '?per_page=' + page).then(
            result => {
                this.setState({ beerInfo: result.data as BeerState[], loading: false });
            }
        ).catch(
            error => {
                this.setState({ beerInfo: [] });
            }
        );
    }

    searchItems(searchTerm: string) {
        this.setState({ loading: true });
        return axios.get(BEERAPI + '?beer_name=' + searchTerm + '&per_page=9').then(
            result => {
                this.setState({ beerInfo: result.data as BeerState[], loading: false });
            }
        ).catch(
            error => {
                this.setState({ beerInfo: [] });
            }
        );
    }

    searchMoreItems(searchTerm: string, page: number) {
        this.setState({ loading: true });
        return axios.get(BEERAPI + '?beer_name=' + searchTerm + '&per_page=' + page).then(
            result => {
                this.setState({ beerInfo: result.data as BeerState[], loading: false });
            }
        ).catch(
            error => {
                this.setState({ beerInfo: [] });
            }
        );
    }
}

export default BeerCatalog;