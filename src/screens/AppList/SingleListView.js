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
import { SearchBar } from 'react-native-elements'

const { width, height } = Dimensions.get('window');

export class SingleRecommendedView extends Component {
  render() {
		let { info, rank } = this.props;
		let imageURL = info['im:image'][info['im:image'].length-1].label;
		let appTitle = info['im:name'].label;
		let appCategory = info.category.attributes.label;
    return (
			<TouchableOpacity style={styles.singleListViewContainer}>
				<View style={{flex: 1, justifyContent: 'center', alignContent: 'center'}}>
					<Text style={{fontSize: 20, color: '#aaa'}}>{rank}</Text>
				</View>
				<View style={{flex: 2, justifyContent: 'center', alignContent: 'center'}}>
					<Image
						host="lazyload-list"
						style={(rank % 2 == 1)? styles.roundImage : styles.circularImage}
						source={{uri: imageURL}} />
				</View>
				<View style={{justifyContent: 'space-between', flex: 6, marginVertical: 4}} >
					<Text numberOfLines={2} style={{fontSize: 11}} >{appTitle}</Text>
					<Text style={{fontSize: 11, marginTop: 4, color: '#777'}} >{appCategory}</Text>
					<Text style={{fontSize: 11, marginTop: 4, color: '#777'}} >{appCategory}</Text>
				</View>
			</TouchableOpacity>
    );
  }
}


export default connect()(SingleRecommendedView);

const styles = StyleSheet.create({
	singleListViewContainer: {
		paddingHorizontal: 16, 
		paddingVertical: 8, 
		flexDirection: 'row',
		//justifyContent: 'center',
		// alignItems: 'center'
	},
	roundImage: {
		width: 60, height: 60, borderRadius: 15
	},
	circularImage: {
		width: 60, height: 60, borderRadius: 30
	},
	

    
});