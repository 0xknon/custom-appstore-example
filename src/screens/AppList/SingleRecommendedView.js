import React, { Component } from 'react';
import {
	View,
	Image,
	Text,
	Dimensions,
	StyleSheet,
	TouchableOpacity
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


	navigateToAppDetail(appId) {
		this.props.navigator.push({
			screen: 'AppDetail', 
			passProps: {
				appId
			},
		})
	}
  render() {
		let { info } = this.props;
		let imageURL = info['im:image'][info['im:image'].length-1].label;
		let appTitle = info['im:name'].label;
		let appCategory = info.category.attributes.label;
		let appId = info.id.attributes['im:id'];
    return (
			<TouchableOpacity 
				style={{width: 80, height: height/5, marginRight: 16}}
				onPress={() => this.navigateToAppDetail(appId)}>
				<LazyloadImage
					host="lazyload-list"
					style={styles.roundImage}
					source={{uri: imageURL}} />
				<Text numberOfLines={2} style={{fontSize: 11}} >{appTitle}</Text>
				<Text style={{fontSize: 11, marginTop: 4, color: '#777'}} >{appCategory}</Text>
			</TouchableOpacity>
    );
  }
}


export default connect()(SingleRecommendedView);

const styles = StyleSheet.create({
	roundImage: {
		width: 80, height: 80, borderRadius: 20, marginBottom: 8
	}
});