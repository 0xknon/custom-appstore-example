import React, { Component } from 'react';
import {
  TouchableOpacity,
  Text,
  Image,
  View,
  Dimensions,
  ScrollView
} from 'react-native';
import {Navigation} from 'react-native-navigation';
import {connect} from 'react-redux';

import GeneralView from "./GeneralView";
import Preview from "./Preview";
import Loading from "../../components/Loading";

import * as  appActions from '../../redux/actions';
import { getAppDetailById } from '../../lib/api'

const { width, height } = Dimensions.get('window');
import styles from './styles'

export class AppDetail extends Component {


  state = {
    isLoading: true,
    appDetail: {},
    readMore: false
  }

  constructor(props) {
    super(props);
    getAppDetailById(props.appId) 
			.then(result => {
				this.setState({
          isLoading: false,
          appDetail: result.results[0]
        })
			})
  }

  render() {
    let { isLoading, appDetail, readMore } = this.state;
    const { 
      description
    } = appDetail;
    if (isLoading) {
      return (
        <Loading />
      )
    }
    return (
      <ScrollView >
        <GeneralView appDetail={appDetail} />
        <View style={styles.row}>
          <Text style={styles.titleFont}>Description</Text>
          <Text style={styles.contentFont} numberOfLines={readMore? null : 4}>{description}</Text>
          <TouchableOpacity 
            style={{width: 30}}
            onPress={() => this.setState({readMore: !readMore})} >
            <Text style={styles.moreFont}>{readMore? 'less' : 'more'}</Text>
          </TouchableOpacity>
        </View>
        <Preview appDetail={appDetail} />
      </ScrollView>
        
    );
  }

}


export default connect()(AppDetail);
