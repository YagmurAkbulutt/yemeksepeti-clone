import { createStore, combineReducers,  applyMiddleware} from "redux";
import productReducer from "./reducers/productReducer";
import restaurantReducer from "./reducers/restaurantReducer";
import { thunk } from "redux-thunk";
import cartReducer from "./reducers/cartReducer";



const rootReducer = combineReducers({
    product: productReducer,
    restaurant: restaurantReducer,
    cart: cartReducer
})

//applymiddlewera herhangi  bir arayzlımı reduxa dahil etmeye yarar
// thunkın asenkron aksiyonları yazılabilir
export default createStore(rootReducer, applyMiddleware(thunk));