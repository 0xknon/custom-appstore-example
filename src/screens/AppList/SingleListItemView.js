import React, { Component } from 'react';
import {
	View,
	Image,
	Text,
	Dimensions,
	TouchableOpacity,
	StyleSheet
} from 'react-native';
import {
    LazyloadView,
    LazyloadImage
} from 'react-native-lazyload';
import {Navigation} from 'react-native-navigation';
import {connect} from 'react-redux';
import StarRating from 'react-native-star-rating';


import { getAppDetailById } from '../../lib/api'
const { width, height } = Dimensions.get('window');

export class SingleListItemView extends Component {

	unmounted = false

	state = {
		averageUserRating: null
	}

	constructor(props) {
		super(props);
		let appId = props.info.id.attributes['im:id'];
		getAppDetailById(appId)
			.then(result => {
				if (!this.unmounted) {
					this.setState({
						averageUserRating: result.results[0].averageUserRating
					})
				}
			})
			.catch(err => console.log(err))
	}

	componentWillUnmount () {
		this.unmounted = true
	}

	navigateToAppDetail(appId) {
		this.props.navigator.push({
			screen: 'AppDetail', 
			passProps: {
				appId
			},
		})
	}

  render() {
		let { averageUserRating } = this.state;
		let { info, rank } = this.props;
		let imageURL = info['im:image'][info['im:image'].length-1].label;
		let appTitle = info['im:name'].label;
		let appCategory = info.category.attributes.label;
		let appId = info.id.attributes['im:id'];
    return (
			<TouchableOpacity 
				style={styles.singleListViewContainer}
				onPress={() => this.navigateToAppDetail(appId)}>
				<View style={{flex: 1, justifyContent: 'center', alignContent: 'center'}}>
					<Text style={{fontSize: 20, color: '#aaa'}}>{rank}</Text>
				</View>
				<View style={{flex: 2, justifyContent: 'center', alignContent: 'center'}}>
					<LazyloadImage
						host="lazyload-listview"
						style={(rank % 2 == 1)? styles.roundImage : styles.circularImage}
						source={{uri: imageURL}} />
				</View>
				<View style={{justifyContent: 'space-between', flex: 6, marginVertical: 4}} >
					<View>
						<Text numberOfLines={2} style={{fontSize: 11}} >{appTitle}</Text>
						<Text style={{fontSize: 11, marginTop: 4, color: '#777'}} >{appCategory}</Text>
					</View>
					<View style={{width: 50}} >
						{
							isNaN(averageUserRating)? null : 
							<StarRating 
								starSize={12}
								disabled={true}
								maxStars={5}
								rating={averageUserRating} 
								fullStarColor={'yellow'}/>
						}
					</View>
				</View>
			</TouchableOpacity>
    );
  }
}


export default connect()(SingleListItemView);

const styles = StyleSheet.create({
	singleListViewContainer: {
		paddingHorizontal: 16, 
		paddingVertical: 8, 
		flexDirection: 'row',
	},
	roundImage: {
		width: 60, height: 60, borderRadius: 15
	},
	circularImage: {
		width: 60, height: 60, borderRadius: 30
	},
	

    
});