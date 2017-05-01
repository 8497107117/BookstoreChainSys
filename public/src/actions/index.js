import {
	PRISTINE_LOGIN_FORM,
	LOGIN_ONCHANGE,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	LOGOUT,
	GET_INVENTORY,
	CLOSE_SIDEBAR,
	OPEN_SIDEBAR
} from './actionType';
import {
	pristineLoginForm,
	loginOnChange,
	login,
	verifyAuth,
	logout
} from './authActions';
import requestInventory from './inventoryActions';
import switchSidebar from './uiActions';

export {
	PRISTINE_LOGIN_FORM,
	LOGIN_ONCHANGE,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	LOGOUT,
	GET_INVENTORY,
	CLOSE_SIDEBAR,
	OPEN_SIDEBAR,
	pristineLoginForm,
	loginOnChange,
	login,
	logout,
	verifyAuth,
	requestInventory,
	switchSidebar
};
