export const CHANGE_VIEW_DASH = 'CHANGE_VIEW_DASH';
export const CHANGE_LOADING = 'CHANGE_LOADING';
export const CHANGE_LOADING_VALIDATION = 'CHANGE_LOADING_VALIDATION';
export const CHANGE_LOADING_LOGIN = 'CHANGE_LOADING_LOGIN';

export function changeViewDashboard (newView){
    return {type: CHANGE_VIEW_DASH, newView}
}

export function changeLoading(newLoading) {
	return {type: CHANGE_LOADING, newLoading}
}

export function changeLoadingValidation(newLoading) {
	return {type: CHANGE_LOADING_VALIDATION, newLoading}
}

export function changeLoadingLogin(newLoading) {
	return {type: CHANGE_LOADING_LOGIN, newLoading}
}
