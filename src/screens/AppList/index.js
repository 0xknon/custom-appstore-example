import React, { Component } from 'react';
import {
  AppRegistry,
  TouchableOpacity,
  Text,
  Button,
	View,
	Dimensions,
	ScrollView
} from 'react-native';
import {Navigation} from 'react-native-navigation';
import {connect} from 'react-redux';
import {
    LazyloadScrollView,
    LazyloadView,
    LazyloadImage
} from 'react-native-lazyload';
import * as  appActions from '../../redux/actions';

import SingleRecommendedView from './SingleRecommendedView'
import SingleListView from './SingleListView'

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
		fetch('https://itunes.apple.com/hk/rss/topgrossingapplications/limit=10/json')
			.then(res => res.json())
			.then(recommendedApp => {
				this.setState({
					recommendedList: recommendedApp.feed.entry
				})
			})

		//Normal List fetch
		fetch('https://itunes.apple.com/hk/rss/topfreeapplications/limit=100/json')
			.then(res => res.json())
			.then(normalListApp => {
				this.setState({
					normalList: normalListApp.feed.entry
				})
			})
	}


  render() {
		let { normalList, recommendedList, normalListLength } = this.state;
		let keyIndex = 0;
    return (
			<LazyloadScrollView
				name="lazyload-list" 
				onScroll={(e)=>{
					var windowHeight = Dimensions.get('window').height,
							height = e.nativeEvent.contentSize.height,
							offset = e.nativeEvent.contentOffset.y;
					if( windowHeight + offset >= height ){
						this.setState({normalListLength: normalListLength + 10})
					}
				}} >
				<View style={{padding: 16, borderBottomWidth: 1, borderColor: '#ddd'}}>
					<Text style={{paddingBottom: 8, fontSize: 20, fontWeight: 'bold'}}>推介</Text>
					<LazyloadScrollView
						// style={styles.container}
						// contentContainerStyle={styles.content}
						horizontal={true}
						showsHorizontalScrollIndicator={false}
						name="lazyload-list" >
						{
							recommendedList.map((info) => (
								<SingleRecommendedView key={info.id.attributes['im:id']} info={info}/>
							))
						}
					</LazyloadScrollView>
				</View>
				{
					normalList.slice(0, normalListLength).map((info, index) => {
						return (
							<SingleListView key={index} rank={index + 1} info={info}/>
						)
					})
				}
			</LazyloadScrollView>
        
    );
  }

}


export default connect()(AppList);