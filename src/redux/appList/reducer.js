
import { Map } from 'immutable';
import actions from './actions';
const initState = new Map({
	list: []
});

const appList = (state = initState, action) => {
	let chatList = state.chatList;
	switch (action.type) {
    case actions.UPDATE_APP_LIST:
      return state.set('list', action.list);
		default:
			return state
	}
    
}

export default appList;