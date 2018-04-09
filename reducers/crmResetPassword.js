import {CHANGE_FORM,} from '../actions/crmResetPassword';

let initialState = {
	formState: {
		newPassword: '',
		confirmPassword: '',
	},
	errors: '',
	isLoading: false,
};

export default function reducer(state = initialState, action) {

	switch (action.type) {

		case CHANGE_FORM:
			return {...state, formState: action.newFormState, error: ''}
		default:
			return state

	}

}
