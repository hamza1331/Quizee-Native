import React, { Component } from 'react'
import { Text, View,StyleSheet } from 'react-native'
import { Button } from "react-native-elements";
import { connect } from "react-redux";
import { Constants } from 'expo';
import { renderQuestionAction,incrementScoreAction } from "./store/actions/actions";
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
   if(this.props.index===10){
    console.log('Final Score: ',this.props.score+1)
   }
   else
   this.props.retrieveQues()
 }

  render() {
    return (
      <View style={styles.container}>
       <View>
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
      </View>
    </View>
    )
  }
}

function mapStateToProps(state){
    return({
      Question:state.rootReducer.Question,
      index:state.rootReducer.index,
      isLoggedIn:state.rootReducer.isLoggedIn,
      score:state.rootReducer.score
    })
}

function mapActionToProps(dispatch) {
    return ({
        retrieveQues:()=>{
          dispatch(renderQuestionAction())
        },
        incrementScore:()=>{
          dispatch(incrementScoreAction())
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
  questionText:{
    margin: 24,
    fontSize: 18,
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
})

export default connect(mapStateToProps,mapActionToProps)(Quiz)
