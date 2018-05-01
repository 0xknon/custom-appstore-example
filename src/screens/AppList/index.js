import React, { Component } from 'react';
import {
  AppRegistry,
  TouchableOpacity,
  Text,
  Button,
	View,
	Dimensions,
	ScrollView,
	FlatList,
	ListView
} from 'react-native';
import {Navigation} from 'react-native-navigation';
import {connect} from 'react-redux';
import * as Rx from "rxjs";
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';
import {
    LazyloadScrollView,
		LazyloadView,
		LazyloadListView
} from 'react-native-lazyload';

import SingleRecommendedView from './SingleRecommendedView'
import SingleListItemView from './SingleListItemView'
import SearchedListView from './SearchedListView'
import Loading from "../../components/Loading";

import { getRecommendationList, getNormalList } from '../../lib/api'
import appListActions from '../../redux/appList/actions';
const { updateNormalList, updateRecommendationList } = appListActions;

const { width, height } = Dimensions.get('window')

export class AppList extends Component {
	static navigatorStyle = {
		navBarCustomView: 'AppList.SearchBar',
	};

	state = {
		normalListLength: 10,
		debounced: '',
		normalListLoading: true,
		recommendationListLoading: true,
	}

	constructor(props) {
		super(props);
    this.onEndReached$ = new Rx.Subject();
    this.onEndReached = this.onEndReached.bind(this);
	}

	componentDidMount() {
		//Recommended List fetch
		getRecommendationList()
			.then(recommendedApp => {
				this.props.updateRecommendationList(recommendedApp.feed.entry);
				this.setState({recommendationListLoading: false});
			})

		//Normal List fetch
		getNormalList()
			.then(normalListApp => {
				this.props.updateNormalList(normalListApp.feed.entry);
				this.setState({normalListLoading: false});
			})

		this.subscription = this.onEndReached$
			.debounceTime(900)
			.subscribe(distanceFromEnd => {
				let { normalListLength } = this.state;
				this.setState({normalListLength: normalListLength + 10})
			});
	}

  componentWillUnmount() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
	}
	
	onEndReached(distanceFromEnd) {
    this.onEndReached$.next(distanceFromEnd);
	}

	renderHeader() {
		let { recommendationList } = this.props;
		return (
			<View style={{padding: 16, borderBottomWidth: 1, borderColor: '#ddd'}}>
				<Text style={{paddingBottom: 8, fontSize: 20, fontWeight: 'bold'}}>推介</Text>
				<LazyloadScrollView
					horizontal={true}
					showsHorizontalScrollIndicator={false}
					name="lazyload-list" >
					{
						recommendationList.map((info, index) => (
							<SingleRecommendedView 
								navigator={this.props.navigator}
								key={index} info={info}/>
						))
					}
				</LazyloadScrollView>
			</View>
		);
	}
	renderItem(item, sectionID, rowID, highlightRow) {
		return ( 
			<SingleListItemView 
				key={Number(rowID)}
				navigator={this.props.navigator}rank={Number(rowID) + 1} info={item}/>
		)
	}

  render() {
		let { normalListLength, recommendationListLoading, normalListLoading } = this.state;
		let { normalList, searchedList } = this.props;
		const paginatedList = normalList.slice(0, normalListLength);
		const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		let dataSource = ds.cloneWithRows(paginatedList)
		
		if (recommendationListLoading || normalListLoading) {
			return (
				<Loading />
			)
		}

		if (searchedList.length != 0) {
			return (
				<SearchedListView />
			)
		}
    return (
			<LazyloadListView
				name="lazyload-listview"
				dataSource={dataSource}
				stickyHeaderIndices={[]}
				initialListSize={10}
				pageSize={10}
				enableEmptySections={true}
				scrollRenderAheadDistance={10}
				renderScrollComponent={() => <ScrollView />}
				renderHeader={() => this.renderHeader()}
				renderRow={(item, sectionID, rowID, highlightRow) => this.renderItem(item, sectionID, rowID, highlightRow)}
				onEndReachedThreshold={0}
				onEndReached={this.onEndReached}
			/>
    );
  }

}


const mapStateToProps = (state) => {
	const { normalList, recommendationList, searchedList} = state.appList.toJS();
	return {
		normalList,
		recommendationList,
		searchedList
	}
} 

export default connect(mapStateToProps, {
	updateNormalList, updateRecommendationList
})(AppList);