import { GetAllQuestions, GETALLQUESTIONS, SaveEmail, SAVEEMAIL, SAVEUSERINFO, SaveUserInfo } from "./actionDef"
import { Question } from "../State/state"

export default class IntroActionGenerator {
    public static getAllQuestions(questions: Question[]): GetAllQuestions {
        return {
            type: GETALLQUESTIONS,
            payload: {
                questions: questions
            }
        }
    }
    public static saveEmail(email: string): SaveEmail {
        return {
            type: SAVEEMAIL,
            payload: {
                email: email
            }
        }
    }
    public static saveUserAnswers(userAnswers: any[]): SaveUserInfo {
        return {
            type: SAVEUSERINFO,
            payload: {
                userAnswers: userAnswers
            }
        }
    }
}