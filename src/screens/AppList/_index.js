import React, { Component } from 'react';
import {
  AppRegistry,
  TouchableOpacity,
  Text,
  Button,
	View,
	Dimensions,
	ScrollView,
	ListView
} from 'react-native';
import {Navigation} from 'react-native-navigation';
import {connect} from 'react-redux';
import {
    LazyloadScrollView,
    LazyloadView,
		LazyloadImage,
		LazyloadListView
} from 'react-native-lazyload';
import * as  appActions from '../../redux/actions';

import SingleRecommendedView from './SingleRecommendedView'
import SingleListItemView from './SingleListItemView'

import { getRecommendationList, getNormalList } from '../../lib/api'

export class AppList extends Component {
	static navigatorStyle = {
		navBarCustomView: 'AppList.SearchBar',
	};

	state = {
		recommendedList: [],
		normalList: [],
		normalListLength: 10
	}

	constructor(props) {
		super(props);
		//Recommended List fetch
		getRecommendationList()
			.then(recommendedApp => {
				this.setState({
					recommendedList: recommendedApp.feed.entry
				})
			})

		//Normal List fetch
		getNormalList()
			.then(normalListApp => {
				this.setState({
					normalList: normalListApp.feed.entry
				})
			})
	}

	renderHeader() {
		return (
			<View style={{padding: 16, borderBottomWidth: 1, borderColor: '#ddd'}}>
				<Text style={{paddingBottom: 8, fontSize: 20, fontWeight: 'bold'}}>推介</Text>
				<LazyloadScrollView
					horizontal={true}
					showsHorizontalScrollIndicator={false}
					name="lazyload-list" >
					{
						this.state.recommendedList.map((info) => (
							<SingleRecommendedView 
								navigator={this.props.navigator}
								key={info.id.attributes['im:id']} info={info}/>
						))
					}
				</LazyloadScrollView>
			</View>
		);
	}
	renderItem(item, sectionID, rowID, highlightRow) {
		return ( 
			<LazyloadView>
				<SingleListItemView 
					navigator={this.props.navigator}
					key={rowID} rank={Number(rowID) + 1} info={item}/>
			</LazyloadView>
		)
	}

  render() {
		let { normalList, recommendedList, normalListLength } = this.state;
		let keyIndex = 0;
		const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		const data = ds.cloneWithRows([
			...normalList
		])
    return (
			<LazyloadListView
				name="lazyload-list" 
				stickyHeaderIndices={[]}
				initialListSize={0}
				dataSource={data}
				pageSize={10}
				onEndReachedThreshold={-10}
				renderScrollComponent={() => <ScrollView />}
				scrollRenderAheadDistance={10}
				renderHeader={() => this.renderHeader()}
				renderRow={(item, sectionID, rowID, highlightRow) => this.renderItem(item, sectionID, rowID, highlightRow)}
				>
			</LazyloadListView>
        
    );
  }

}


export default connect()(AppList);