import React, { Component } from 'react'
import { Text, View,StyleSheet,Dimensions } from 'react-native'
import { Button } from "react-native-elements";
import { connect } from "react-redux";
import { Constants } from 'expo';
import { renderQuestionAction,incrementScoreAction,endQuizAction,resetAction } from "./store/actions/actions";
class Quiz extends Component {
  constructor(props){
    super(props)
    this.handleAnswer = this.handleAnswer.bind(this)
  }
 handleAnswer(index){
   if(this.props.Question.correctAnswer === this.props.Question.options[index]){
     console.log(true)
     this.props.incrementScore()
   }
   else
   console.log(false)
   if(this.props.index===this.props.QuizLength){
     this.props.endQuiz()
    console.log('Final Score: ',this.props.score+1)
   }
   else
   this.props.retrieveQues()
 }

  render() {
    return (
      <View style={styles.container}>
      {!this.props.quizEnd && <View>
      <Text style={styles.paragraph}> Question#{this.props.index} </Text>
      <View style={styles.questionTextContainer}>
        <Text style={styles.questionText}>
          {this.props.Question.text}
        </Text>
      <View style={styles.questionTextContainer}>
        {this.props.Question.options.map((option,index)=>{
         return  <Button
          title={option}
          key={index}
          onPress={()=>{
            this.handleAnswer(index)
          }}
          buttonStyle={{marginTop:20,backgroundColor:'rgb(102, 138, 216)',width:300,alignSelf:'center',borderRadius:10}}
          />
        })}
      </View>
        
      </View>
      </View>}
      {this.props.quizEnd && 
      <View style={styles.scoreTextContainer} onTouchEnd={()=>{
        this.props.reset()
        setTimeout(() => {
        this.props.history.push('/quizlist')
        }, 200);
      }}>
      <Text style={styles.quizEndText}> ** Quiz ENDED **</Text>
      <View style={styles.questionTextContainer}>
        <Text style={styles.questionText}>
          Your final score is {this.props.score} / {this.props.QuizLength}
        </Text>
      </View>
      </View>}
    </View>
    )
  }
}

function mapStateToProps(state){
    return({
      Question:state.rootReducer.Question,
      index:state.rootReducer.index,
      isLoggedIn:state.rootReducer.isLoggedIn,
      score:state.rootReducer.score,
      QuizLength:state.rootReducer.QuizLength,
      quizEnd:state.rootReducer.quizEnd      
    })
}

function mapActionToProps(dispatch) {
    return ({
        retrieveQues:()=>{
          dispatch(renderQuestionAction())
        },
        incrementScore:()=>{
          dispatch(incrementScoreAction())
        },
        endQuiz:()=>{
          dispatch(endQuizAction())
        },
        reset:()=>{
          dispatch(resetAction())
        }
    })
}

const styles=StyleSheet.create({
  container: {
    flex: 0,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop:Constants.statusBarHeight,
    backgroundColor: 'white',
  },
  questionTextContainer:{
    marginTop:30
  },
  scoreTextContainer:{
    marginTop:Dimensions.get('screen').height*0.3
  },
  questionText:{
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'black',
  },
  scoreText:{
    margin: 24,
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'black',
  },
  paragraph: {
    margin: 24,
    fontSize: 34,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'black',
  },
  quizEndText:{
    margin: 24,
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'black',
    fontStyle:'italic'
  }
})

export default connect(mapStateToProps,mapActionToProps)(Quiz)
