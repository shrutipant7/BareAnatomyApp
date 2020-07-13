import { IntroState } from "../State/state";
import { IntroActions, GETALLQUESTIONS, SAVEEMAIL, SAVEUSERINFO } from "../Action/actionDef";
import defaultIntroState from "../State/state";

export default function IntroReducer(state: IntroState = defaultIntroState(), action: IntroActions): IntroState {
    switch (action.type) {
        case GETALLQUESTIONS: {
            return { ...state, questions: action.payload.questions }
        }
        case SAVEEMAIL: {
            return { ...state, email: action.payload.email }
        }
        case SAVEUSERINFO: {
            return { ...state, userAnswers: action.payload.userAnswers }
        }
        default: return state;
    }
}