export const GET_CLIENT_REQ = 'GET_CLIENT_REQ';
export const BIND_CLIENT_DATA = 'BIND_CLIENT_DATA';

export function getClientRequest(idClient) {
	return {type: GET_CLIENT_REQ, idClient}
}

export function bindClientData( clientOptionnalRows) {
	return {type: BIND_CLIENT_DATA, clientOptionnalRows}
}
