import React, { Component } from 'react';
import AdminForm from './adminForm';

interface Props {

}

interface State {
    submitSuccess: boolean;
}

class Admin extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            submitSuccess: false
        }
    }

    render() {
        let { submitSuccess } = this.state;
        if (submitSuccess) {
            return (
                <>
                    <div className="row">
                        <div className="col-md-12 col-12 my-5 intro-container">
                            <h3>Quiz created successfully!</h3>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6 col-6 my-5 intro-container">
                            <button type="button" className="btn btn-outline-info" onClick={() => window.location.reload()}>Create More</button>
                        </div>
                        <div className="col-md-6 col-6 my-5 intro-container">
                            <button type="button" className="btn btn-outline-success" onClick={() => window.location.href = '/user'}>Take Quiz</button>
                        </div>
                    </div>
                </>
            )
        } else {
            return (
                <div className="row">
                    <div className="col-md-12 col-12 my-5">
                        <div className="row">
                            <div className="col-md-12 col-12 text-center alert alert-primary">
                                <h5>Please fill out the following details: </h5>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12 mt-2 col-12 intro-container">
                                <AdminForm submitted={(submitSuccess: boolean) => { this.setState({ submitSuccess: submitSuccess }) }} />
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    }
}

export default Admin;