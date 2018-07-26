import React, { Component } from 'react'
import { View,StyleSheet,Dimensions,FlatList,ActivityIndicator } from 'react-native'
import { 
    putQuizAction,
    LogoutAction
 } from "./store/actions/actions";
import NavigationBar from 'react-native-navbar'
import { connect } from "react-redux";
import firebase from 'firebase'
import Card from './Cards'
class QuizList extends Component {
    constructor(props){
        super(props)
        console.ignoredYellowBox=['Setting a timer']
        this.handleLogout = this.handleLogout.bind(this)
        this.startQuizLoading = this.startQuizLoading.bind(this)
        this.state={
            quizzes:[],
            isLoading:true,
            loadingQuiz:false
        }
    }
    componentWillMount(){
        if(!firebase.apps.length){
            var config = {
                apiKey: "AIzaSyDevJziMzAlMpErfarI9Q1DcBGU6JF-EF8",
                authDomain: "explorefirebase-80b58.firebaseapp.com",
                databaseURL: "https://explorefirebase-80b58.firebaseio.com",
                projectId: "explorefirebase-80b58",
                storageBucket: "explorefirebase-80b58.appspot.com",
                messagingSenderId: "994024778201"
            };
            firebase.initializeApp(config);
        }
        if(!this.props.Quizzes.length){
        let firebaseRef = firebase.database().ref('quizzes')
        firebaseRef.once('value',(snap)=>{
            snap.forEach((Key)=>{
            let dataRef = firebaseRef.child(Key.ref.key).key
            let data = snap.child(dataRef).val()
            
                this.props.putQuiz(data)
            })
        }).then(()=>{
            this.setState({
                isLoading:false
            })

        }).catch(err=>console.log(err))
        }
        else
        this.setState({
            isLoading:false
        })
    }
    handleLogout(){
        firebase.auth().signOut().then(()=>{
            this.props.Logout()
            this.props.history.replace('/')
        }).catch(err=>console.log(err))
    }
    startQuizLoading(){
        if(this.props.index===0){
            this.setState({
                loadingQuiz:true
            })
        }
    }
  render() {
    return (
        this.props.isLoggedIn && 
        <View style={styles.container}>
              {!this.state.loadingQuiz&&
            <View>
                <NavigationBar
              title={{title:'Quizzes',tintColor:'white'}}
              tintColor={'darkblue'}
              rightButton={{title: 'Logout',
              tintColor:'red',
              handler: () => this.handleLogout()
            }}
              />
             {this.state.isLoading&&<ActivityIndicator 
             style={{marginTop:Dimensions.get('screen').height*0.4}} 
             size="large" color="#0000ff" />}
             {!this.state.isLoading&& <FlatList
              data={this.props.Quizzes}
              renderItem={({item,index})=>{
                return (<Card
                    history={this.props.history}
                    key={index.toString()} 
                    name={item.name} 
                    quizLength={item.Questions.length} 
                    startQuizLoading = {this.startQuizLoading}
                    quizIndex={index} />)
              }}
              style={{marginBottom:45}}
              keyExtractor={()=>Math.round(Math.random*1000).toString()}
              >
              
              </FlatList>}
             
            </View>
            }
             {this.state.loadingQuiz&&<ActivityIndicator 
             style={{marginTop:Dimensions.get('screen').height*0.4}} 
             size="large" color="#0000ff" />}
        </View>
        
    )
  }
}

function mapStateToProps(state){
    return({
      isLoggedIn:state.rootReducer.isLoggedIn,
      Quizzes:state.rootReducer.Quizzes,
      index:state.rootReducer.index
    })
}

function mapActionToProps(dispatch) {
    return ({
        // closeModal: () => {
        //     dispatch(closeModal())
        // }
        putQuiz:(Quiz)=>{
            dispatch(putQuizAction(Quiz))
        },
        Logout:()=>{
            dispatch(LogoutAction())
        }
    })
}

const styles = StyleSheet.create({
  container: {
    flex: 0,
    backgroundColor: 'white',
    paddingTop:20,
    height:Dimensions.get('screen').height
  }
});

export default connect(mapStateToProps,mapActionToProps)(QuizList)