import React, { Component } from 'react';
import {History} from 'history';

interface Props {
    // setSearchFlag: (searchflag: boolean) => void;
    setSearchTerm: (searchTerm: string) => void;
    // searchFlag: boolean;
    history: History;
}

interface State {
    searchTerm: string;
    searchFlag: boolean;
}
class SearchBar extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            searchTerm: '',
            searchFlag: false
        }
    }

    render() {
        let { searchTerm, searchFlag } = this.state;
        // let { searchFlag } = this.props;
        console.log('FLAG', searchFlag)
        return (
            <div className="search-container py-2" onClick={() => searchFlag ? this.setState({ searchFlag: false }) : this.reset()} >
                <input type="text" placeholder="Search..." value={searchTerm} onChange={(e) => this.textChange(e.currentTarget.value)} onKeyDown={(e) => this.handleKeyBoard(e)} />
                <div className="search">
                    {!searchFlag ? <i className="fa fa-search" aria-hidden="true" /> :
                        <i className="fa fa-times" aria-hidden="true" />
                    }
                </div>
            </div>
        );
    }

    textChange(e: string) {
        this.setState({ searchTerm: e, searchFlag: true});
    }

    reset = () => {
        this.setState({ searchTerm: '', searchFlag: true });
    }

    handleKeyBoard = (e: React.KeyboardEvent) => {
        let { searchTerm } = this.state;
        let { setSearchTerm,history } = this.props;
        if (e.keyCode === 13 && searchTerm !== '') {
            // setSearchFlag(false);
            setSearchTerm(searchTerm);
            history.push('/' + searchTerm.replace(' ', '_'));
        }
    }
}

export default SearchBar;