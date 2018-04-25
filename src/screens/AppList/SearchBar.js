import React, { Component } from 'react';
import {
  AppRegistry,
  TouchableOpacity,
  Text,
  Button,
  View
} from 'react-native';
import {Navigation} from 'react-native-navigation';
import {connect} from 'react-redux';
import { SearchBar } from 'react-native-elements'
import * as  appActions from '../../redux/actions';

export class Login extends Component {

	state = {
		searchText: ''
	}

  render() {
		let { searchText } = this.state;
    return (
			<View>
				<SearchBar
					round
					onChangeText={(e) => console.log(e)}
					onClear={() => this.setState({searchText: ''})}
					placeholder='Type Here...' />
			</View>
        
    );
  }

  /*
  onLoginPress:
    Changes the root value of the app to be 'after-login', changing it to tab view
  */
  onLoginPress() {

    this.props.dispatch(appActions.login());
   
  }
}


export default connect()(Login);