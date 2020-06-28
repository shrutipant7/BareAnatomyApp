import React, { Component } from 'react';
import SearchBar from '../SearchBar/SearchBar';
import { History } from 'history';

interface Props {
    history: History;
    setSearchTerm: (searchTerm: string) => void;
    favPage: boolean;
}

interface State {
    // searchFlag: boolean;
    searchTerm: string;
}

export default class NavBar extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            searchTerm: ''
        }
    }
    render() {
        let { favPage, history } = this.props;
        return (
            <nav className="row navbar navbar-expand-sm bg-light">
                <ul className="navbar-nav col-md-9 col-3">
                    {!favPage && <li className="cursor-pointer">
                        <button type="button" className="btn btn-outline-info" onClick={() => this.props.history.push('/favorite/page')}>Favorites</button>
                    </li>} &nbsp;&nbsp;
                    <li className="cursor-pointer">
                        <button type="button" className="btn btn-outline-primary" onClick={() => this.props.history.push('/')}>Go to home</button>
                    </li>
                </ul>
                {!favPage && <div className="col-md-3 col-9 cursor-pointer">
                    <SearchBar history={history} setSearchTerm={this.props.setSearchTerm} />
                </div>}
            </nav>
        );
    }
}