import React, { Component } from 'react';
import axios from 'axios';
import { API, QuizResponse } from '../IntroPage/State/state';

interface Props {
    userInfo: QuizResponse;
    submitted: (submitSuccess: boolean) => void;
}

interface State {
    name: string;
    contact: string;
}

class UserDetailsForm extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            name: '',
            contact: ''
        }
    }

    render() {
        let { name, contact } = this.state;
        return (
            <div className="col-md-12">
                <div className="modal fade" id="userDetailsModal" role="dialog" aria-labelledby="userDetailsModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="userDetailsModalLabel">You're almost done! <br />Please fill out details below</h5>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="form-group">
                                        <label htmlFor="userName">Name</label>
                                        <input type="text" className="form-control" id="userName" aria-describedby="emailHelp" placeholder="Enter your name" onChange={(e) => this.setState({ name: e.currentTarget.value })} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="userContact">Contact</label>
                                        <input type="text" className="form-control" id="userContact" placeholder="Enter contact details" onChange={(e) => this.setState({ contact: e.currentTarget.value })} />
                                    </div>
                                    {(name.length > 0 && contact.length > 0) && <button type="submit" className="btn btn-primary" data-dismiss="modal" onClick={() => this.saveUserInfo()}>Submit</button>}
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    saveUserInfo() {
        axios.post(API + '/api/userinfo', { name: this.state.name, contact: this.state.contact, userInfo: this.props.userInfo });
        this.props.submitted(true);
    }
}

export default UserDetailsForm;