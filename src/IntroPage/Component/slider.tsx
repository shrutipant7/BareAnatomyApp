import React from "react";
import Slider from "react-slick";
import { isNullOrUndefined } from "util";
import { Question } from "../State/state";

interface Props {
    questions: Question[];
    saveUserAnswers: (userAnswers: any[]) => void;
}

interface State {
    userInfo: any[];
    clicked: boolean;
    color: string;
}

export default class SlickSlider extends React.Component<Props, State> {
    private slider: any;
    constructor(props: Props) {
        super(props);
        this.slider = React.createRef();
        this.state = {
            userInfo: [],
            clicked: false,
            color: ''
        }
    }
    next = () => {
        this.slider.slickNext();
    }
    previous = () => {
        this.slider.slickPrev();
    }
    goTo = (index: number) => {
        this.slider.slickGoTo(index);
    }
    handleKeyBoard = (e: React.KeyboardEvent, type: string, index: number) => {
        if (e.keyCode === 13) {
            let { color } = this.state;
            if (isNullOrUndefined(color)) {
                return false;
            } else {
                this.saveData(color, type, index);
            }
        }
    }
    setColor(color: string) {
        if (color.length > 0) {
            this.setState({ color: color });
        } else {
            this.setState({ color: '' });
        }
    }
    render() {
        let a: any;
        let { questions } = this.props;
        let settings = {
            dots: false,
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: true,
            infinite: false
        };
        if (!this.state.clicked) {
            return (
                <>
                    <div className="col-md-8 offset-md-2 mt-5">
                        <Slider ref={c => { this.slider = !isNullOrUndefined(c) ? c : a; }} {...settings}>
                            {questions.map((s, i) =>
                                <div key={i}>
                                    <div className="row">
                                        <div className="col-md-12 my-5">
                                            <h4>{s.ques}</h4>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-12">
                                            {s.options.map((opt: any, k: number) =>
                                                <div className="row form-check" key={k} >
                                                    <label className="form-check-label">
                                                        <input type="radio" className="form-check-input" name="radio-btn" onClick={() => { opt.option !== 'Other' && this.saveData(opt.option, s.quesType, i) }} />{opt.option}</label>
                                                    {opt.option === 'Other' && <input placeholder="Fill and press enter" onKeyDown={(e) => this.handleKeyBoard(e, s.quesType, i)} type="text" style={{ outline: 'none' }} name="radio-btn" onChange={(e) => this.setColor('Other-' + e.currentTarget.value)} />}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    {questions.length - 1 === i && <button type="button" className="btn btn-success mt-5" onClick={() => { this.setState({ clicked: true }); this.props.saveUserAnswers(this.state.userInfo) }}>Save Answers & Generate Score</button>}
                                </div>
                            )}
                        </Slider>
                    </div>
                </>
            );
        } else {
            return (
                <div className="col-md-12">
                    <div className="jumbotron">
                        <div className="row">
                            <div className="col-md-6">
                                <h4>Your answers:</h4>
                                {this.state.userInfo.map((ans: any, i: number) =>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <span>{this.getQuestions(ans.type)}</span>:&nbsp;<span>{ans.option}</span>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className="col-md-6">
                                <h4>Your score:&nbsp;</h4>
                                <span>{this.calculateScore()}</span>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    }
    calculateScore() {
        let { userInfo } = this.state;
        let { questions } = this.props;
        let scoreCounter: number = 0;
        for (let i = 0; i < userInfo.length; i++) {
            for (let j = 0; j < questions.length; j++) {
                if (userInfo[i].type === questions[j].quesType) {
                    let opt = JSON.parse(JSON.stringify(userInfo[i].option.split('-')[0]));
                    let index = questions[j].options.findIndex((el) => { return el.option === opt });
                    if (index > -1) {
                        scoreCounter = scoreCounter + questions[j].options[index].weight;
                    }
                }
            }
        }
        return Math.round((scoreCounter + Number.EPSILON) * 100) / 100;
    }
    saveData(opt: string, type: string, index: number) {
        if (type === 'colored' && opt === 'No') {
            this.goTo(index + 2)
        }
        let { userInfo } = this.state;
        let info = userInfo;
        if (info.length > 0) {
            let index = info.findIndex((el) => { return el.type === type });
            if (index > -1) {
                info[index].option = opt;
            }
            else {
                info.push({
                    option: opt,
                    type: type
                });
            }
        } else {
            info.push({
                option: opt,
                type: type
            });
        }
        this.setState({ userInfo: info });
        this.next();
    }
    getQuestions(type: string) {
        let { questions } = this.props;
        let index = questions.findIndex((el) => { return el.quesType === type });
        if (index > -1) {
            return questions[index].ques;
        } else {
            return 'Invalid Question';
        }
    }
}
