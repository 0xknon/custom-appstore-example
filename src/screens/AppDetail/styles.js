import {
  StyleSheet
} from 'react-native';

const styles = StyleSheet.create({
	titleFont: { 
		marginBottom: 8,
		fontSize: 20, 
		fontWeight: 'bold'
	},
	contentFont: {
		fontSize: 12, 
	},
	moreFont: {
		fontSize: 12,
		color: 'blue' 
	},
	row: {
		paddingVertical: 12, 
		marginHorizontal: 16,
		borderBottomWidth: 1, 
		borderBottomColor: '#dddd',
		justifyContent: 'flex-start'
	},
	slider: {
			overflow: 'visible' // for custom animations
	},
	sliderContentContainer: {
			paddingVertical: 8 // for custom animation
	},
})

export default styles;