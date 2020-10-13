import React, { Component } from 'react';
import { API, QuizState } from '../IntroPage/State/state';
import axios from 'axios';
import User from './user';

interface Props {

}

interface State {
    isQuizSelected: boolean;
    selectedQuiz: QuizState;
    allQuizzes: QuizState[];
}

export default class QuizSelector extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            selectedQuiz: {
                quizName: '',
                startDate: '',
                endDate: '',
                totalQues: -1,
                question: []
            },
            allQuizzes: [],
            isQuizSelected: false
        }
    }

    componentWillMount() {
        axios.get(API + '/api/quiz').then(
            result => {
                let parsed = result.data as QuizState[];
                this.setState({ allQuizzes: parsed })
            }
        ).catch(error => {
            //do nothing
        });
    }

    render() {
        let { isQuizSelected, allQuizzes, selectedQuiz } = this.state;
        if (isQuizSelected) {
            return (
                <User selectedQuiz={selectedQuiz} />
            )
        } else {
            return (
                <>
                    <div className="row">
                        <div className="col-md-12 col-12 text-center alert alert-primary">
                            <h5>Select one of the following quizzes: </h5>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12 col-12">
                            {allQuizzes.map((quiz, i) =>
                                <div className="row" key={i}>
                                    <div className="col-md-12 col-12 my-2 quiz-selector-cont">
                                        <div className="card cursor-pointer">
                                            <div className="card-header">
                                                <h4>{quiz.quizName}</h4>
                                            </div>
                                            <div className="card-body">
                                                <blockquote className="blockquote mb-0">
                                                    {quiz.startDate.length > 0 && <p>Starts on: {quiz.startDate}</p>}
                                                    {quiz.endDate.length > 0 && <p>Ends on: {quiz.endDate}</p>}
                                                    <footer>
                                                        {this.startQuiz(quiz.startDate, quiz.endDate) ?
                                                            <button type="button" className="btn btn-success mt-5" onClick={() => this.selectQuiz(quiz.quizName)}>Take this quiz</button>
                                                            : <button type="button" className="btn btn-secondary" disabled>Cannot start</button>}
                                                    </footer>
                                                </blockquote>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </>
            );
        }
    }

    selectQuiz(name: string) {
        let { allQuizzes } = this.state;
        let ind = allQuizzes.findIndex((el: QuizState) => { return el.quizName === name });
        if (ind > -1) {
            let selQuiz = allQuizzes[ind];
            this.setState({ isQuizSelected: true, selectedQuiz: selQuiz });
        }
    }

    startQuiz(start: string, end: string) {
        let currDate = new Date(Date.now()).toISOString().split('T')[0];
        let currSplit = currDate.split('-');
        let startSplit = start.split('-');
        let endSplit = end.split('-');
        let currDay = currSplit[2];
        let currMonth = currSplit[1];
        let currYear = currSplit[0];
        let startDay = startSplit[2];
        let startMonth = startSplit[1];
        let startYear = startSplit[0];
        let endDay = endSplit[2];
        let endMonth = endSplit[1];
        let endYear = endSplit[0];
        if ((currDay <= endDay && currMonth <= endMonth && currYear <= endYear) && (currDay >= startDay && currMonth >= startMonth && currYear >= startYear)) {
            return true
        } else {
            return false
        }
    }
}