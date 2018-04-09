
export const CHANGE_FORM_FOUR = 'CHANGE_FORM_FOUR';
export const SENDING_REQUEST_FOUR = 'SENDING_REQUEST_FOUR';
export const GET_REQUEST_FOUR = 'GET_REQUEST_FOUR';
export const SEARCH_FOUR = 'SEARCH_FOUR';


export function changeFormFour (newFormState){
    return {type: CHANGE_FORM_FOUR, newFormState}
}

export function sendingRequestFour (){
    return {type: SENDING_REQUEST_FOUR}
}

export function getRequestFour(newDossiersState) {
    return {type: GET_REQUEST_FOUR, newDossiersState}
}

export function searchFour(newSearchList){
    return {type: SEARCH_FOUR, newSearchList}
}