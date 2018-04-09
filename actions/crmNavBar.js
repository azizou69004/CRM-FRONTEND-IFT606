export const ADD_SUBUSER_NAV = 'ADD_SUBUSER_NAV';
export const DISPLAY_SUBUSER_NAV = 'DISPLAY_SUBUSER_NAV';
export const ADD_SUBCUSTOMER_NAV = 'ADD_SUBCUSTOMER_NAV';
export const DISPLAY_SUBCUSTOMER_NAV = 'DISPLAY_SUBCUSTOMER_NAV';
export const ADD_SUBSUPPLIER_NAV = 'ADD_SUBSUPPLIER_NAV';
export const DISPLAY_SUBSUPPLIER_NAV = 'DISPLAY_SUBSUPPLIER_NAV';
export const ADD_SUBCONTRACT_NAV = 'ADD_SUBCONTRACT_NAV';
export const DISPLAY_SUBCONTRACT_NAV = 'DISPLAY_SUBCONTRACT_NAV';

export function addSubUserNav (newSubUser){
	return {type: ADD_SUBUSER_NAV, newSubUser}
}

export function displaySubUserNav (display){
	return {type: DISPLAY_SUBUSER_NAV, display}
}

export function addSubCustomerNav (newSubCustomer){
	return {type: ADD_SUBCUSTOMER_NAV, newSubCustomer}
}

export function displaySubCustomerNav (display){
	return {type: DISPLAY_SUBCUSTOMER_NAV, display}
}

export function addSubSupplierNav (newSubSupplier){
	return {type: ADD_SUBSUPPLIER_NAV, newSubSupplier}
}

export function displaySubSupplierNav (display){
	return {type: DISPLAY_SUBSUPPLIER_NAV, display}
}

export function addSubContractNav (newSubContract){
	return {type: ADD_SUBCONTRACT_NAV, newSubContract}
}

export function displaySubContractNav (display){
	return {type: DISPLAY_SUBCONTRACT_NAV, display}
}
