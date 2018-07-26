import React,{Component} from 'react'
import { startQuizAction,renderQuestionAction } from "./store/actions/actions";
import { View,StyleSheet,Text,Button } from 'react-native'
import { connect } from "react-redux";
class Cards extends Component {
    constructor(props){
        super(props)
    }
  render() {
    return (
    <View>
        <View style={styles.card}>
            <Text style={styles.titleStyle}>{this.props.name}</Text>
            <Text style={styles.textStyle}>Total Question: {this.props.quizLength}</Text>
            <Button
            title='Start Quiz'
            onPress={()=>{
                this.props.startQuizLoading()
                this.props.startQuiz(this.props.quizIndex)
                setTimeout(()=>{
                    this.props.retrieveQues()
                    setTimeout(()=>{
                    this.props.history.push('/quiz')
                    },200)
                },1000)
            }}
            />
        </View>
    </View>
    )
  }
}

const styles = StyleSheet.create({
    card:{
          flex: 1 ,
          marginLeft:50,
          marginRight:50,
          marginTop:10,
          marginBottom:10,
          width:300,
          borderWidth: 1,
          borderRadius: 10,
          flexGrow:1,
          borderColor: '#ddd',
          borderBottomWidth: 0,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.8,
          shadowRadius: 2,
          elevation: 5
      },
      textStyle:{
       padding: 20
      },
      titleStyle:{
          padding:20,
          fontSize:22,
          fontWeight:'bold'
      }
  });

  function mapStateToProps(state){
    return({
        Questions:state.rootReducer.Questions,
        Question:state.rootReducer.Question,
        index:state.rootReducer.index
    })
}

function mapActionToProps(dispatch) {
    return ({
        startQuiz:(index)=>{
            dispatch(startQuizAction(index))
        },
        retrieveQues:()=>{
            dispatch(renderQuestionAction())
        }
    })
}
  export default connect(mapStateToProps,mapActionToProps)(Cards)