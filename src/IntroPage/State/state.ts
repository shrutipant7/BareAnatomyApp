export const API = 'https://us-central1-bare-anatomy.cloudfunctions.net/app';
// export const API = 'http://localhost:5001/bare-anatomy/us-central1/app';


export interface IntroState {
    questions: Question[];
    email: string;
    userAnswers: any[];
}

export interface Question {
    ques: string;
    quesType: string;
    options: Options[];
}
export interface Options {
    option: string;
    weight: number;
}

export default function defaultIntroState(): IntroState {
    return (
        {
            questions: [],
            email: '',
            userAnswers: []
        }
    );
}