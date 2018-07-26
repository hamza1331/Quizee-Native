import { 
    Login,
    Logout,
    renderQuestion,
    putQuiz,
    startQuiz,
    incrementScore,
    endQuiz,
    reset
 } from "./actionNames";

export function resetAction(){
 return dispatch=>{
     dispatch({
         type:reset
     })
 }
}

export function startQuizAction(index){
    return dispatch=>{
        dispatch({
            type:startQuiz,
            payload:index
        })
    }
}

export function endQuizAction(){
    return dispatch=>[
        dispatch({
            type:endQuiz
        })
    ]
}

export function incrementScoreAction(){
    return dispatch=>{
        dispatch({
            type:incrementScore
        })
    }
}

export function LoginAction() {
    return dispatch => {
        dispatch({
            type: Login
        })
    }
}
export function renderQuestionAction(){
    return dispatch=>{
        dispatch({
            type:renderQuestion
        })
    }
}
export function putQuizAction(Quiz){
    return dispatch=>{
        dispatch({
            type:putQuiz,
            payload:Quiz
        })
    }
}
export function LogoutAction(){
    return dispatch=>{
        dispatch({
            type:Logout
        })
    }
}