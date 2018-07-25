import React, { Component } from 'react'
import { StyleSheet, Text, View,TextInput,TouchableOpacity,Dimensions,Alert } from 'react-native';
import { connect } from "react-redux";
import firebase from 'firebase'
import { LoginAction } from "./store/actions/actions";
class Login extends Component {
    constructor(props)
    {
        super(props)
        this.state={
            email:'',
            pw:''
        }
        this.handleSubmission = this.handleSubmission.bind(this)
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
    }
    handleSubmission(){
        if(this.state.email&&this.state.pw){
            firebase.auth().signInWithEmailAndPassword(this.state.email,this.state.pw).then(()=>{
                this.props.Login()
                this.props.history.push('/quizlist')
            }).catch(err=>{
                alert(err)
            })
        }
        else{
            alert('EMAIL/PASSWORD can not be empty...')
        }
    }
  render() {
      return(
            <View style={styles.container}>
                    <View style={styles.layoutStyles}>
    
                    </View>
                    <Text style={styles.headingStyle}>QUIZEE</Text>
                    <TextInput style = {styles.input} 
                        autoCapitalize="none"                
                        autoCorrect={false}
                        autoFocus={true}
                        
                        onChangeText={text=>{
                            this.setState({
                                email:text
                            })
                        }} 
                        keyboardType='email-address' 
                        returnKeyType="next" 
                        placeholder='Email' 
                        placeholderTextColor='rgba(225,225,225,0.85)'/>
    
                     <TextInput style = {styles.input}   
                        returnKeyType="go" 
                        ref={(input)=> this.passwordInput = input} 
                        placeholder='Password' 
                        placeholderTextColor='rgba(225,225,225,0.7)' 
                        onChangeText={text=>{
                            this.setState({
                                pw:text
                            })
                        }}
                        secureTextEntry/>
    
                     <TouchableOpacity style={styles.buttonContainer} 
                            onPress={this.handleSubmission}>
                        <Text  style={styles.buttonText}>LOGIN</Text>
                    </TouchableOpacity>
          </View>
        )
    
  }
}

const styles = StyleSheet.create({
    container: {
      padding: 20,
     },
     input:{
         height: 50,
         backgroundColor: 'rgba(225,225,225,0.3)',
         marginBottom: 10,
         padding: 10,
         color: 'black',
         fontSize:22,
         fontWeight:'bold',
         fontStyle:'italic'
     },
     buttonContainer:{
         backgroundColor: '#2980b6',
         paddingVertical: 15
     },
     buttonText:{
         color: '#fff',
         textAlign: 'center',
         fontWeight: '700',
         fontSize:22,
         fontStyle:'italic'
     },
     layoutStyles:{
        marginBottom:Dimensions.get('screen').height *0.25
     },
     headingStyle:{
         fontSize:54,
         marginBottom:20,
         color:'black',
         textAlign:'center',
         fontWeight:'bold',
         textDecorationLine: 'underline',
         fontStyle:'italic'
     }
  });
  function mapStateToProps(state){
    return({
    })
}

function mapActionToProps(dispatch) {
    return ({
        Login:()=>{
            dispatch(LoginAction())
        }
    })
}

export default connect(mapStateToProps,mapActionToProps)(Login)