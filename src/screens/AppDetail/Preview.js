import React, { Component } from 'react';
import {
  TouchableOpacity,
  Text,
  Image,
  View,
  Dimensions,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import {Navigation} from 'react-native-navigation';
import StarRating from 'react-native-star-rating';
import Carousel, { Pagination } from 'react-native-snap-carousel';
const { width, height } = Dimensions.get('window');
import styles from './styles'

import { scrollInterpolators, animatedStyles } from './animations';

function wp (percentage) {
	const value = (percentage * width) / 100;
	return Math.round(value);
}

const slideWidth = wp(82);
const itemHorizontalMargin = wp(2);
const itemWidth = slideWidth + itemHorizontalMargin * 2;

class Preview extends Component {

	constructor(props) {
		super(props)
		
		this.renderItem = this.renderItem.bind(this);
	}
	

	renderItem({item, index}, parallaxProps) {
		return (
			<Image style={{ width: 320, height: 228*320/406, borderRadius: 5}} key={index} source={{uri: item}}/>
		);
	}

  render() {
		let { 
			screenshotUrls
		} = this.props.appDetail
    return (
			<View style={[styles.row, {marginHorizontal: 0, borderBottomWidth: 0}]}>
				<Text style={[styles.titleFont, { marginHorizontal: 16 }]} >Preview</Text>
				<Carousel
					ref={c => this._slider1Ref = c}
					data={screenshotUrls}
					renderItem={this.renderItem}
					sliderWidth={width}
					itemWidth={itemWidth}
					hasParallaxImages={true}
					firstItem={0}
					inactiveSlideScale={0.94}
					inactiveSlideOpacity={0.7}
					containerCustomStyle={styles.slider}
					contentContainerCustomStyle={styles.sliderContentContainer}
					loop={false}
					autoplay={false}
					autoplayDelay={500}
					autoplayInterval={3000}
					// onSnapToItem={(index) => this.setState({ slider1ActiveSlide: index }) }
				/>
			</View>
    );
  }
}

export default Preview

// <ScrollView 
// 	horizontal={true} pagingEnabled={true} >
// 	{
// 		screenshotUrls.map((url, index) => (
// 			<Image style={{margin: 8, width: 406 - 16, height: 228}} key={index} source={{uri: url}}/>
// 		))
// 	}
// </ScrollView>