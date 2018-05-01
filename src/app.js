import React, { Component } from 'react';
import {
 Platform,
 AppRegistry
} from 'react-native';
import {createStore, applyMiddleware, combineReducers} from "redux";
import {Provider} from "react-redux";
import { Navigation } from 'react-native-navigation';
import registerScreens from './screens';
import * as reducers from "./redux/reducers";

import thunk from "redux-thunk";

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const reducer = combineReducers(reducers);
const store = createStoreWithMiddleware(reducer);
registerScreens(store, Provider);

export default class  App extends Component {

  constructor(props) {
		super(props);
		
		Navigation.startSingleScreenApp({
			screen: {
				screen: 'AppList', // unique ID registered with Navigation.registerScreen
				navigatorStyle: {}, // override the navigator style for the screen, see "Styling the navigator" below (optional)
				navigatorButtons: {} // override the nav buttons for the screen, see "Adding buttons to the navigator" below (optional)
			},
		});
  }
 
}
