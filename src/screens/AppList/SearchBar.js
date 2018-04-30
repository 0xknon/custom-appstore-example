import React, { Component } from 'react';
import {
  View
} from 'react-native';
import {Navigation} from 'react-native-navigation';
import {connect} from 'react-redux';
import { SearchBar } from 'react-native-elements'
import * as  appActions from '../../redux/actions';

export class SearchBarView extends Component {

	state = {
		searchText: ''
	}

  render() {
		let { searchText } = this.state;
    return (
			<SearchBar
				containerStyle={{backgroundColor: '#fff', borderTopWidth: 0}}
				inputStyle={{backgroundColor: '#ddd'}}
				onChangeText={(e) => console.log(e)}
				onClear={() => this.setState({searchText: ''})}
				placeholder='Type Here...' />
        
    );
  }
}


export default connect()(SearchBarView);