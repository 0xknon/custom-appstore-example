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
import * as  appActions from '../../redux/actions';

export class AppList extends Component {
	static navigatorStyle = {
		navBarCustomView: 'AppList.SearchBar',
	};

  render() {
    return (
			<View>
				<Button large onPress={ () => this.onLoginPress()} title="Continue">
					<Text> Continue</Text>
				</Button>
			</View>
        
    );
  }

}


export default connect()(AppList);