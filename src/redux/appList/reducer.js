
import { Map } from 'immutable';
import actions from './actions';

const initState = new Map({
	normalList: [],
	recommendationList: [],
	searchedList: []
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
		default:
			return state
	}
    
}

export default appList;