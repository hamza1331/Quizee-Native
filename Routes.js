import React from 'react';
import { View } from 'react-native';
import { NativeRouter, Route } from 'react-router-native'
import { connect } from "react-redux";
import Login from './components/Login'
import QuizList from './components/QuizList'
import Quiz from './components/Quiz'
class Routes extends React.Component {
  render() {
    return (
      <NativeRouter >
        <View>
            <Route exact path='/' component={Login}/>
            <Route  path='/quizlist' component={QuizList}/>
            <Route  path='/quiz' component={Quiz}/>
        </View>
      </NativeRouter>
    );
  }
}
export default connect(()=>({}),()=>({}))(Routes)