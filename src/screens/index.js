import { Navigation } from 'react-native-navigation';

import AppDetail from './AppDetail';
import AppList from './AppList';
import SearchBar from './AppList/SearchBar';


export default (store, Provider) =>  {

	Navigation.registerComponent('AppDetail', () => AppDetail, store, Provider);
	Navigation.registerComponent('AppList', () => AppList, store, Provider);
	Navigation.registerComponent('AppList.SearchBar', () => SearchBar, store, Provider);
	
}