import React, { Component } from 'react';
import {
  TouchableOpacity,
  Text,
  Image,
  View,
  Dimensions,
  ActivityIndicator,
	ScrollView,
	Linking
} from 'react-native';
import StarRating from 'react-native-star-rating';

const { width, height } = Dimensions.get('window');
import styles from './styles'

class GeneralView extends Component {


  onGet(trackViewUrl) {
		Linking.openURL(trackViewUrl)
	}
	
  render() {
		let { 
			trackCensoredName, sellerName, artworkUrl512, averageUserRating,
			userRatingCount, contentAdvisoryRating, trackViewUrl, version
		} = this.props.appDetail
    return (
			<View style={styles.row}>
				<View style={{flexDirection: 'row'}}>
					<Image 
						style={{width: 100, height: 100, borderRadius: 20}} 
						source={{uri: artworkUrl512}}/>
					<View style={{marginLeft: 16, justifyContent: 'space-between', position: 'relative'}}>
						<View width={width/2} >
							<Text style={{fontSize: 20, marginBottom: 2}} >{trackCensoredName}</Text>
							<Text style={{fontSize: 12, color: '#888'}} >{sellerName}</Text>
						</View>
						<View>
							<TouchableOpacity
								style={{
									width: 50, backgroundColor: '#66f', padding: 4,
									borderRadius: 25, 
									justifyContent: 'center', alignItems: 'center'
								}}
								onPress={() => this.onGet(trackViewUrl)} >
								<Text style={{color: '#fff', fontWeight: 'bold'}} >GET</Text>
							</TouchableOpacity>
						</View>
					</View>
				</View>

				<View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 16}}>
					<View>
						<View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}} >
							{
								isNaN(averageUserRating)? null :
								<Text style={{color: 'grey', fontSize: 17}} >{Number(averageUserRating).toFixed(1)} </Text>
							}
							<StarRating 
								starSize={17}
								disabled={true}
								maxStars={5}
								rating={isNaN(averageUserRating)? 0 : averageUserRating} 
								fullStarColor={'grey'}/>
						</View>
						<Text style={{color: '#bbb', fontSize: 12}} >{isNaN(averageUserRating)? 'Not Enough Ratings' : `${userRatingCount} Ratings`}</Text>
					</View>
					<View >
						<Text style={{color: 'grey', fontSize: 17}} >{version} </Text>
						<Text style={{color: '#bbb', fontSize: 12}} >Version</Text>
					</View>
					<View >
						<Text style={{color: 'grey', fontSize: 17}} >{contentAdvisoryRating} </Text>
						<Text style={{color: '#bbb', fontSize: 12}} >Age</Text>
					</View>
				</View>
			</View>
    );
  }
}

export default GeneralView