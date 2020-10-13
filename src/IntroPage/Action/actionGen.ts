import { SaveEmail, SAVEEMAIL, SAVEUSERINFO, SaveUserInfo } from "./actionDef"

export default class IntroActionGenerator {
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