import { applyMiddleware, createStore, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import { deviceReducer, serviceReducer } from './reducer/serviceReducer'
import { staffReducer, userReducer } from './reducer/userReducer'
import { productReducer } from './reducer/productReducer'
import { vendorReducer } from './reducer/vendorReducer'
import { reportReducer } from './reducer/reportReducer'

const rootReducer = combineReducers({
    service: serviceReducer,
    user: userReducer,
    product: productReducer,
    vendor: vendorReducer,
    staff: staffReducer,
    report: reportReducer,
    device: deviceReducer
})

const store = createStore(rootReducer, {}, composeWithDevTools(applyMiddleware(thunk)))

export default store