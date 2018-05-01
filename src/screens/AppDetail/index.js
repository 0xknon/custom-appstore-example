import React, { Component } from 'react';
import {
  AppRegistry,
  TouchableOpacity,
  Text,
  Image,
  View,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import {Navigation} from 'react-native-navigation';
import {connect} from 'react-redux';
import * as  appActions from '../../redux/actions';

import { getAppDetailById } from '../../lib/api'

export class Login extends Component {


  state = {
    isLoading: true,
    appDetail: {}
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

  onGet() {

  }

  render() {
    let { isLoading, appDetail } = this.state;
    if (isLoading) {
      return (
        <ActivityIndicator />
      )
    }
    return (
      <ScrollView>
        <View style={{flexDirection: 'row'}}>
          <Image 
            style={{width: 100, height: 100}} 
            source={{uri: appDetail.artworkUrl512}}/>
          <View style={{justifyContent: 'space-between'}}>
            <View>
              <Text>{appDetail.trackCensoredName}</Text>
              <Text>{appDetail.sellerName}</Text>
            </View>
            <View>
              <TouchableOpacity
                style={{
                  width: 50, backgroundColor: '#66f', padding: 4,
                  borderRadius: 25, 
                  justifyContent: 'center', alignItems: 'center'
                }}
                onPress={this.onGet} >
                <Text style={{color: '#fff', fontWeight: 'bold'}} >GET</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
        
    );
  }

}


export default connect()(Login);