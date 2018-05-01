import React, { Component } from 'react';
import {
  TouchableOpacity,
  Text,
  Button,
	View,
	Dimensions,
	ScrollView,
	FlatList,
	ListView
} from 'react-native';
import {connect} from 'react-redux';
import * as Rx from "rxjs";
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';
import {
    LazyloadScrollView,
		LazyloadView,
		LazyloadListView
} from 'react-native-lazyload';

import SingleListItemView from './SingleListItemView'

const { width, height } = Dimensions.get('window')

export class AppList extends Component {
	static navigatorStyle = {
		navBarCustomView: 'AppList.SearchBar',
	};

	state = {
		searchedListLength: 10,
		debounced: ''
	}

	constructor(props) {
		super(props);
    this.onEndReached$ = new Rx.Subject();
    this.onEndReached = this.onEndReached.bind(this);
	}

	componentDidMount() {
		this.subscription = this.onEndReached$
			.debounceTime(900)
			.subscribe(distanceFromEnd => {
				let { searchedListLength } = this.state;
				this.setState({searchedListLength: searchedListLength + 10})
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

	renderItem(item, sectionID, rowID, highlightRow) {
		console.log(item);
		return ( 
			<SingleListItemView 
				key={Number(rowID)}
				navigator={this.props.navigator}rank={Number(rowID) + 1} info={item} />
		)
	}

  render() {
		let { searchedListLength } = this.state;
		let { searchedList } = this.props;
		const paginatedList = searchedList.slice(0, searchedListLength);
		const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		let dataSource = ds.cloneWithRows(paginatedList)
		console.log(dataSource);
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
				// renderHeader={() => this.renderHeader()}
				renderRow={(item, sectionID, rowID, highlightRow) => this.renderItem(item, sectionID, rowID, highlightRow)}
				onEndReachedThreshold={0}
				onEndReached={this.onEndReached}
			/>
    );
  }

}


const mapStateToProps = (state) => {
	const { searchedList } = state.appList.toJS();
	return {
		searchedList
	}
} 

export default connect(mapStateToProps)(AppList);