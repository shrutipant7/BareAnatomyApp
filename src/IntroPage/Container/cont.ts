import { connect } from "react-redux";
import { StoreTree } from "../../MainReducer/mainReducer";
import Intro from "../Component/intro";
import { Question } from "../State/state";
import IntroActionGenerator from "../Action/actionGen";

export function mapStateToProps(appState: StoreTree, ownProps: any) {
    return {
        history: ownProps.history
    }
}
export function mapDispatchToProps(dispatch: any, ownProps: any) {
    return {
        // saveUserInfo: (userInfo: any[]) => dispatch(IntroActionGenerator.saveUserAnswers(userInfo))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Intro);