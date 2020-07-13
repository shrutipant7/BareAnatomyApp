import { Question } from "../State/state";

export const GETALLQUESTIONS = 'GETALLQUESTIONS';
export type GETALLQUESTIONS = typeof GETALLQUESTIONS;

export const SAVEEMAIL = 'SAVEEMAIL';
export type SAVEEMAIL = typeof SAVEEMAIL;

export const SAVEUSERINFO = 'SAVEUSERINFO';
export type SAVEUSERINFO = typeof SAVEUSERINFO;


export interface GetAllQuestions {
    type: GETALLQUESTIONS;
    payload: {
        questions: Question[];
    }
}

export interface SaveEmail {
    type: SAVEEMAIL;
    payload: {
        email: string;
    }
}

export interface SaveUserInfo {
    type: SAVEUSERINFO;
    payload: {
        userAnswers: any[];
    }
}

export type IntroActions = 
    GetAllQuestions |
    SaveEmail |
    SaveUserInfo ;