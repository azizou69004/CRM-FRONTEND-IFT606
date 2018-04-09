import {
	CHANGE_VIEW_UM, UPDATE_USERS, UPDATE_USER_TO_DISPLAY
} from '../actions/crmUserManagement';
import {UPDATE_OPERATIONS} from "../actions/crmCreateUser";

//pour le register e mail
let initialState = {
	view: '',
	formState: {
		users: [],
		userToDisplay: {userPerms:[]},
		operations:[]
	},
	errors: '',
};

export default function reducer(state = initialState, action) {

	switch (action.type) {
		case CHANGE_VIEW_UM:
			return {...state, view: action.newView, errors: ''};
		case UPDATE_USERS:
			return {...state, formState:{...state.formState, users:action.newList}, errors: ''};
		case UPDATE_USER_TO_DISPLAY:
			return {...state, formState:{...state.formState, userToDisplay:action.user}, errors: ''};
		case UPDATE_OPERATIONS:
			return {...state, formState:{...state.formState, operations:action.operations}, errors: ''};
		default:
			return state
	}

}
