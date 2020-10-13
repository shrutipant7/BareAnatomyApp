import React, { Component } from 'react';
import { API, Question } from '../IntroPage/State/state';
import axios from 'axios';

interface Props {
    submitted: (submitSuccess: boolean) => void;
}

interface State {
    question: string;
    indOption: string;
    options: string[];
    quizName: string;
    startDate: string;
    endDate: string;
    totalQuestions: number;
    questionList: Question;
    questionListArray: Question[];
    questionCount: number;
}

var optionsArray: string[] = [];
var questionArray: Question[] = [];

export default class AdminForm extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            question: '',
            indOption: '',
            options: [],
            quizName: '',
            startDate: '',
            endDate: '',
            totalQuestions: -1,
            questionList: {
                ques: '',
                quesType: '',
                options: []
            },
            questionListArray: [],
            questionCount: 0
        };
    }

    render() {
        let { options, indOption, questionListArray } = this.state;
        return (
            <div className="border border-primary rounded p-5">
                <form>
                    <div className="form-row">
                        <div className="form-group col-md-12">
                            <label htmlFor="quizName">Name of the quiz<span style={{ color: 'red' }}>*</span></label>
                            <input type="text" className="form-control" id="quizName" placeholder="Name" onChange={(e) => this.setState({ quizName: e.currentTarget.value })} />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label htmlFor="startDate">Start Date<span style={{ color: 'red' }}>*</span></label>
                            <input type="date" className="form-control" id="startDate" placeholder="Start Date" onChange={(e) => this.setState({ startDate: e.currentTarget.value })} />
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="endDate">End Date<span style={{ color: 'red' }}>*</span></label>
                            <input type="date" className="form-control" id="endDate" placeholder="End Date" onChange={(e) => this.setState({ endDate: e.currentTarget.value })} />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-12">
                            <label htmlFor="totalQuestions">Total Questions<span style={{ color: 'red' }}>*</span></label>
                            <input type="number" className="form-control" id="totalQuestions" onChange={(e) => this.setState({ totalQuestions: parseInt(e.currentTarget.value, 10) })} />
                        </div>
                    </div>
                    <div className="border border-dark rounded p-2" id="questions-container">
                        <div className="form-row">
                            <div className="form-group col-md-12">
                                <input style={{ border: '1.5px dashed blue' }} placeholder="Enter the question" className="form-control" type="text" onChange={(e) => this.setState({ question: e.currentTarget.value })} />
                            </div>
                            <div className="form-group col-md-6">
                                <input style={{ border: '1.5px dashed orange' }} placeholder="Enter options" className="form-control" type="text" value={indOption} onChange={(e) => this.setState({ indOption: e.currentTarget.value })} />
                            </div>
                            <div className="form-group col-md-1 mt-2 cursor-pointer">
                                <i className="fa fa-plus-circle" aria-hidden="true" onClick={() => this.addOptions()} />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="col-md-12">
                                {options.map((opt: string, i: number) =>
                                    <div className="row" key={i}>
                                        <div className="col-md-12">
                                            <div className="form-group">
                                                <div className="form-control" id="form-options">{opt} </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    {questionListArray.length > 0 && <div className="row">
                        <div className="col-md-12 mt-5">
                            <table className="table table-striped" style={{ tableLayout: 'fixed', wordWrap: 'break-word' }}>
                                <thead className="thead-light">
                                    <tr>
                                        <th>Question</th>
                                        <th>Options</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {questionListArray.map((ques, i) =>
                                        <tr key={i}>
                                            <td>{ques.ques}</td>
                                            <td>{ques.options.join(' : ')}</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>}
                    {this.showButton()}
                </form>
            </div>
        );
    }
    showButton() {
        let { totalQuestions, questionCount, quizName, question } = this.state;
        if (questionCount === totalQuestions) {
            if (quizName === '') {
                return (
                    <button type="button" disabled className="btn btn-success mt-2">Please fill mandatory fields</button>
                )
            } else {
                return (
                    <button type="button" className="btn btn-success mt-2" onClick={() => this.saveQuiz()}>Create Quiz</button>
                )
            }
        }
        else if (totalQuestions > 0 && question !== '') {
            return (
                <button type="button" className="btn btn-primary mt-2" onClick={() => this.addQuestion()}>Add Questions</button>
            )
        } else {
            return (
                <div />
            )
        }
    }

    addOptions() {
        let { indOption } = this.state;
        optionsArray.push(indOption);
        this.setState({ options: optionsArray });
    }

    addQuestion() {
        let { question, questionCount } = this.state;
        let quesArray: Question = {
            ques: '',
            quesType: '',
            options: []
        };
        quesArray = {
            ques: question,
            quesType: '',
            options: optionsArray
        };
        questionArray.push(quesArray);
        this.setState({ questionList: quesArray, questionCount: questionCount + 1, questionListArray: questionArray });
        optionsArray = [];
    }

    saveQuiz() {
        let { question, quizName, startDate, endDate, totalQuestions, questionListArray } = this.state;
        if (question.length > 0) {
            let payload = {
                quizName: quizName,
                startDate: startDate,
                endDate: endDate,
                totalQues: totalQuestions,
                question: questionListArray
            }
            axios.post(API + '/api/quiz', payload);
            setTimeout(() => { this.props.submitted(true); }, 3000);
        }
    }
}