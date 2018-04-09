import {
	BIND_CLIENT_DATA
} from "../actions/crmClientList";

let initialState = {
	client: {
		facultatif: []
	},
	errors: '',
};

export default function reducer(state = initialState, action) {

	switch (action.type) {

		case BIND_CLIENT_DATA:
			return {
				...state,
				client: action.clientOptionnalRows,
				errors: ''
			};
		default:
			return state

	}

}
