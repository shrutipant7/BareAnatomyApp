import Admin from "../../Admin/admin";
import Intro from "../../IntroPage/Container/cont";
import QuizSelector from "../../User/quizSelector";

export interface RouteInterface {
    path: string;
    component: any;
}

export const ROUTES: RouteInterface[] = [
    {
        path: '/',
        component: Intro
    },
    {
        path: '/admin',
        component: Admin
    },
    {
        path: '/user',
        component: QuizSelector
    }
];
