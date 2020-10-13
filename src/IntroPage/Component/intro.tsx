import React, { Component } from 'react';
import { History } from 'history';
import Admin from '../../Admin/admin';
import User from '../../User/user';
import QuizSelector from '../../User/quizSelector';

interface Props {
    history: History;
}

interface State {
    clicked: boolean;
    isAdminOrUser: string;
}

class Intro extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            clicked: false,
            isAdminOrUser: ''
        }
    }

    switchPages(page: string) {
        let { history } = this.props;
        this.setState({ isAdminOrUser: page });
        history.push('/' + page);
    }

    render() {
        let { isAdminOrUser } = this.state;
        if (isAdminOrUser === 'admin') {
            return (
                <Admin />
            )
        }
        else if (isAdminOrUser === 'user') {
            return (
                <QuizSelector />
            )
        }
        else {
            return (
                <div className="row">
                    <div className="col-md-12">
                        <div className="row">
                            <div className="col-md-12 my-5 intro-container alert alert-primary">
                                <h3>Welcome! Please select one of the below options:</h3>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12 col-12 intro-container">
                                <div className="row">
                                    <div className="col-md-6 col-6">
                                        <button type="button" className="btn btn-outline-primary" onClick={() => this.switchPages('admin')}>Admin</button>
                                    </div>
                                    <div className="col-md-6 col-6">
                                        <button type="button" className="btn btn-outline-success" onClick={() => this.switchPages('user')}>User</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    }
}

export default Intro;