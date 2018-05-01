import React, { Component } from 'react';
import {
  View
} from 'react-native';
import {Navigation} from 'react-native-navigation';
import {connect} from 'react-redux';
import SearchBar from 'react-native-search-bar'

import { searchApp } from "../../lib/api";
import appListActions from "../../redux/appList/actions";
const { updateSearchedList, setIsSearching} = appListActions;

const parseSearchText = (text) => { 
	return text.replace(" ", "+");
}

export class SearchBarView extends Component {

	onChangeText(text) {
		let {
			normalList,
			recommendationList
		} = this.props;
		let searchedList = []
		

		const search = app => {
			if (app['im:name'].label.toLowerCase().includes(text.toLowerCase())) {
				searchedList.push(app)
			}
		}

		normalList.map(search)
		recommendationList.map(search)
		this.props.updateSearchedList(searchedList)
		this.props.setIsSearching(true)
	}

  render() {
    return (
			<SearchBar
				hideBackground={true}
				barTintColor={'#fff'}
				ref='searchBar'
				placeholder='Search'
				onChangeText={(text) => this.onChangeText(text)}
				onCancelButtonPress={() => this.props.setIsSearching(false)}
			/>
        
    );
  }
}


const mapStateToProps = (state) => {
	const { normalList, recommendationList} = state.appList.toJS();
	return {
		normalList,
		recommendationList
	}
} 

export default connect(mapStateToProps, {
	updateSearchedList, setIsSearching
})(SearchBarView);