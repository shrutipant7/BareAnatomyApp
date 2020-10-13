import React, { Component } from 'react';
import { Question, QuizResponse, QuizState, UserResponse } from '../IntroPage/State/state';
import UserDetailsForm from './userDetailsForm';
import { isNullOrUndefined } from 'util';

interface Props {
    selectedQuiz: QuizState;
}

interface State {
    userResponse: QuizResponse;
    answersSelected: UserResponse[];
    clicked: boolean;
    questionIndex: number;
    isAnswerSelected: boolean;
    submitSuccess: boolean;
}

export default class User extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            userResponse: {
                quizName: '',
                response: []
            },
            answersSelected: [],
            clicked: false,
            questionIndex: 0,
            isAnswerSelected: false,
            submitSuccess: false
        }
    }

    render() {
        let { questionIndex, isAnswerSelected, userResponse, submitSuccess } = this.state;
        let { selectedQuiz } = this.props;
        if (submitSuccess) {
            return (
                <>
                    <div className="row">
                        <div className="col-md-12 col-12 my-5 intro-container">
                            <h3>Done!</h3>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12 col-12 my-5 intro-container">
                            <button type="button" className="btn btn-outline-info" onClick={() => window.location.reload()}>Take another quiz</button>
                        </div>
                    </div>
                </>
            )
        } else {
            return (
                <>
                    <div className="row">
                        <div className="col-md-12 col-12 text-center alert alert-primary">
                            <h5>{selectedQuiz.quizName}</h5>
                        </div>
                    </div>
                    <div className="row">
                        {selectedQuiz.question.map((s, i) =>
                            <div className="col-md-6 col-6 card-container" key={i}>
                                {questionIndex === i && <div className="card">
                                    <div className="card-header">
                                        <h4>Q.{i + 1}/{selectedQuiz.question.length} - {s.ques}</h4>
                                    </div>
                                    <div className="card-body">
                                        <blockquote className="blockquote mb-0">
                                            {s.options.map((opt: any, k: number) =>
                                                <div className="row form-check" key={k} >
                                                    <label className="form-check-label">
                                                        <input type="radio" className="form-check-input" name="radio-btn" onClick={() => { this.saveData(s.ques, opt); this.setState({ isAnswerSelected: true }) }} />
                                                        <span className="ml-4">{opt}</span>
                                                    </label>
                                                </div>
                                            )}
                                            {isAnswerSelected && <footer>
                                                {selectedQuiz.question.length - 1 === i ?
                                                    <button type="button" className="btn btn-success mt-5" onClick={() => this.displayModal()}>Submit Answers</button>
                                                    : <button type="button" className="btn btn-success" onClick={() => this.setState({ questionIndex: i + 1, isAnswerSelected: false })}>Next</button>}
                                            </footer>}
                                        </blockquote>
                                    </div>
                                </div>}
                            </div>
                        )}
                        <UserDetailsForm userInfo={userResponse} submitted={(submitSuccess: boolean) => { this.setState({ submitSuccess: submitSuccess }) }} />
                        <button style={{ display: 'none' }} type="button" data-toggle="modal" data-target="#userDetailsModal" id="userDetailsModalButton"></button>
                    </div>
                </>
            );
        }
    }

    displayModal = () => {
        let { selectedQuiz } = this.props;
        this.setState({ clicked: true });
        let link = document.getElementById('userDetailsModalButton');
        !isNullOrUndefined(link) && link.click();
        let responseInterface: QuizResponse = {
            quizName: selectedQuiz.quizName,
            response: this.state.answersSelected
        }
        this.setState({ userResponse: responseInterface })
    }

    saveData(ques: string, opt: string) {
        let { answersSelected } = this.state;
        let userSelections = answersSelected;
        if (userSelections.length > 0) {
            let index = userSelections.findIndex((el) => { return el.ques === ques });
            if (index > -1) {
                userSelections[index].answer = opt;
            }
            else {
                userSelections.push({
                    ques: ques,
                    answer: opt
                });
            }
        } else {
            userSelections.push({
                ques: ques,
                answer: opt
            });
        }
        this.setState({ answersSelected: userSelections });
    }
}