export const API = 'https://us-central1-bare-anatomy.cloudfunctions.net/app';
// export const API = 'http://localhost:5001/bare-anatomy/us-central1/app';

export interface IntroState {
    userAnswers: any[];
}

export interface Question {
    ques: string;
    quesType: string;
    options: string[];
}

export interface QuizState {
    quizName: string;
    startDate: string;
    endDate: string
    totalQues: number;
    question: Question[];
}

export interface QuizResponse {
    quizName: string;
    response: UserResponse[];
}

export interface UserResponse {
    ques: string;
    answer: string;
}

export default function defaultIntroState(): IntroState {
    return (
        {
            userAnswers: []
        }
    );
}