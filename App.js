import React,{Component} from 'react';
import { Provider } from "react-redux";
import store from './components/store/index'
import Routes from './Routes'
export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
       <Routes/>
        </Provider>
    )
  }
}


