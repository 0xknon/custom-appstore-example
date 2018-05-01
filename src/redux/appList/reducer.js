
import { Map } from 'immutable';
import actions from './actions';

const initState = new Map({
	normalList: [],
	recommendationList: [],
	searchedList: [],
	isSearching: ''
});

const appList = (state = initState, action) => {
	let chatList = state.chatList;
	switch (action.type) {
		case actions.UPDATE_APP_NORMAL_LIST:
			return state.set('normalList', action.normalList);
		case actions.UPDATE_APP_RECOM_LIST:
			return state.set('recommendationList', action.recommendationList);
		case actions.UPDATE_SEARCHED_APP_LIST:
			return state.set('searchedList', action.searchedList);
		case actions.SET_IS_SEARCHING:
			return state.set('isSearching', action.isSearching);
		default:
			return state
	}
    
}

export default appList;