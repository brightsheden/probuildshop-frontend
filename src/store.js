import {createStore,combineReducers,applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from "redux-devtools-extension"; 
import { productListReducer ,productDetailsReducer} from "./reducers/ProductReducers";
import { cartReducers } from './reducers/cartReducers';
import { orderReducer,orderDetailsReducer, orderPayReducer,orderListMyReducer } from './reducers/orderReducers';
import { userLoginReducer, userRegisterReducer ,userDetailsReducer,userUpdateProfileReducer, userListReducer, userDeleteReducer} from './reducers/userReducers';
const reducer = combineReducers({
    productList: productListReducer,
    productDetails : productDetailsReducer,
    cart : cartReducers,
    userLogin : userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    usersList: userListReducer,
    userDelete: userDeleteReducer,
    orderCreate: orderReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
    orderListMy : orderListMyReducer,



})


const cartItemsFromStorage = localStorage.getItem("cartItems") ?
    JSON.parse(localStorage.getItem("cartItems")) : []



const userInfoFromStorage = localStorage.getItem("userInfo") ?
    JSON.parse(localStorage.getItem("userInfo")) : null

const shippingAddressfoFromStorage = localStorage.getItem("shippingAddress") ?
    JSON.parse(localStorage.getItem("shippingAddress")) : []


const initialState = {
    cart: {cartItems : cartItemsFromStorage,
           shippingAddress : shippingAddressfoFromStorage},
    userLogin: {userInfo: userInfoFromStorage}
}

const middleware = [thunk]

const store = createStore(reducer, initialState,
    composeWithDevTools(applyMiddleware(...middleware)))


export default store