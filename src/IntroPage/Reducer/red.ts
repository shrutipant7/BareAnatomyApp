import defaultIntroState, { IntroState } from "../State/state";

export default function IntroReducer(state: IntroState = defaultIntroState(), action: any): IntroState {
    switch (action.type) {
        default: return state;
    }
}