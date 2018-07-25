import { 
    Login,
    Logout,
    renderQuestion,
    putQuiz,
    startQuiz,
    incrementScore
 } from "../actions/actionNames";
const initialState={
    isLoggedIn:true,
    Quizzes:[],
    Questions:[],
    Question:null,
    index:0,
    score:0
}

export default (state = initialState,action)=>{
    switch(action.type){
        case Login:
        return Object.assign({},state,{
            isLoggedIn:true
        })
        case renderQuestion:
        return Object.assign({},state,{
            Question:{...state.Questions[state.index]},
            index:state.index+1
        })
        case Logout:
        return Object.assign({},state,{
            isLoggedIn:false
        })
        case putQuiz:
        return Object.assign({},state,{
            Quizzes:[...state.Quizzes,action.payload]
        })
        case startQuiz:
        return Object.assign({},state,{
            Questions:state.Quizzes[action.payload].Questions
        })
        case incrementScore:
        return Object.assign({},state,{
            score:state.score+1
        })
        default:
        return state
    }
}