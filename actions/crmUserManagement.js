export const CHANGE_VIEW_UM = 'CHANGE_VIEW_UM';
export const GET_LIST_USERS = 'GET_LIST_USERS';
export const UPDATE_USERS = 'UPDATE_USERS';
export const REQUEST_USER_BY_ID = 'REQUEST_USER_BY_ID';
export const UPDATE_USER_TO_DISPLAY = 'UPDATE_USER_TO_DISPLAY';
export const DELETE_USER = 'DELETE_USER';


export function changeViewUserManagement (newView){
    return {type: CHANGE_VIEW_UM, newView}
}

export function getListUser() {
	return {type: GET_LIST_USERS}
}

export function updateUsers(newList) {
	return {type: UPDATE_USERS, newList}
}

export function requestUserById(id){
	return {type: REQUEST_USER_BY_ID, id}
}

export function updateUserToDisplay(user){
	return {type: UPDATE_USER_TO_DISPLAY, user}
}

export function deleteUser(id){
	return {type: DELETE_USER, id}
}
