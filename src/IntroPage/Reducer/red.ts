import { IntroActions } from "../Action/actionDef";
import defaultIntroState, { IntroState } from "../State/state";

export default function IntroReducer(state: IntroState = defaultIntroState(), action: IntroActions): IntroState {
    switch (action.type) {
        default: return state;
    }
}