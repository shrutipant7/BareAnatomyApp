import { connect } from "react-redux";
import { StoreTree } from "../../MainReducer/mainReducer";
import Intro from "../Component/intro";
import { Question } from "../State/state";
import IntroActionGenerator from "../Action/actionGen";

export function mapStateToProps(appState: StoreTree, ownProps: any) {
    return {
        questions: appState.intro.questions
    }
}
export function mapDispatchToProps(dispatch: any, ownProps: any) {
    return {
        getAllQues: (question: Question[]) => dispatch(IntroActionGenerator.getAllQuestions(question)),
        saveUserInfo: (userInfo: any[]) => dispatch(IntroActionGenerator.saveUserAnswers(userInfo))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Intro);