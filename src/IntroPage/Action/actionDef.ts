import { Question } from "../State/state";

export const SAVEEMAIL = 'SAVEEMAIL';
export type SAVEEMAIL = typeof SAVEEMAIL;

export const SAVEUSERINFO = 'SAVEUSERINFO';
export type SAVEUSERINFO = typeof SAVEUSERINFO;

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
    SaveEmail |
    SaveUserInfo ;