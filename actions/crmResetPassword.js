export const RESET_PASSWORD_REQUEST = 'RESET_PASSWORD_REQUEST';
export const CHANGE_FORM = 'CHANGE_FORM';
export const SENDING_PASSWORD_REQUEST = 'SENDING_PASSWORD_REQUEST';
export const SET_PASSWORD_AUTH = 'SET_PASSWORD_AUTH';


export function changeForm(newFormState) {
	return {
		type: CHANGE_FORM,
		newFormState
	}
}

export function resetRequest(data, token) {
	return {
		type: RESET_PASSWORD_REQUEST,
		data,
		token
	}
}

export function sendingRequest(sending) {
	return {
		type: SENDING_PASSWORD_REQUEST,
		sending
	}
}

export function setAuthState(newAuthState) {
	return {
		type: SET_PASSWORD_AUTH,
		newAuthState
	}
}

