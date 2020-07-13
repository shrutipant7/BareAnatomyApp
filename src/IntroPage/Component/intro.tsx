import React, { Component } from 'react';
import axios from 'axios';
import { Question, API } from '../State/state';
import SlickSlider from './slider';

interface Props {
    getAllQues: (question: Question[]) => void;
    questions: Question[];
}

interface State {
    email: string;
    clicked: boolean;
    isEmailError: boolean;
}

class Intro extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            email: "",
            clicked: false,
            isEmailError: true
        }
    }
    componentDidMount() {
        axios.get(API + '/api/questions').then(
            result => {
                let parsed = result.data as Question[];
                this.props.getAllQues(parsed);
            }
        ).catch(error => {
            this.props.getAllQues([]);
        });
    }
    saveUserInfo(userInfo: any[]) {
        axios.post(API + '/api/userinfo', { email: this.state.email, userInfo: userInfo });
    }
    changeEmail(email: string) {
        if (email.length > 0 && this.validateEmail(email)) {
            this.setState({ email: email, isEmailError: false });
        } else {
            this.setState({ isEmailError: true, email: '' });
        }
    }
    render() {
        let { questions } = this.props;
        if (!this.state.clicked) {
            return (
                <div className="row">
                    <span className="restart" onClick={() => { window.location.reload() }}>Restart Quiz</span>
                    <div className="col-md-8 offset-md-2">
                        <div className="row">
                            <div className="col-md-12 mt-5">
                                <h6>What is your email ID?</h6>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12 my-5">
                                <input id={this.state.isEmailError ? 'login-input-danger' : 'login-input-neutral'} type="text" placeholder="xyz@example.com" onChange={(e) => this.changeEmail(e.currentTarget.value)} /><br />
                                {this.state.isEmailError && <span>Please enter a valid email ID</span>}
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <button type="button" className="btn btn-info" disabled={this.state.isEmailError} onClick={() => { this.setState({ clicked: true }) }}>Start Quiz</button>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
        else {
            return (
                <div className="row">
                    <span className="restart" onClick={() => { window.location.reload() }}>Restart Quiz</span>
                    <div className="col-md-12">
                        <div className="row">
                            <SlickSlider questions={questions} saveUserAnswers={(userInfo: any[]) => { this.saveUserInfo(userInfo) }} />
                        </div>
                    </div>
                </div>
            );
        }
    }
    validateEmail(mail: string) {
        var reg = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/;
        return reg.test(mail)
    }
}

export default Intro;