import Actions from "../actionTypes"
import api from "../../utils/api"


// asenkron thunk aksiyonu
// normalde redux asenktron işlemler yapabilen aksiyonları kabul etmez
// bundan dolayı thunk aksiyonu oluşturuyoruz

//thunk fonksiyonu tanımı, fonk içinde return içinde fonk ve parametre dispatch
const thunkFonksiyonu = () => {
    return (dispatch) => {
        // api isteklerini burada atarız dispatchı parametre oalrak 
        //aldığı için dispatch gerçekleştirebiliriz
    }
}

//1- restoran verilerini alıp storea aktaran aksiyon fonksiyonu (üssttekiyle aynı sadece daha temiz yazım)
export const getRestaurants = () => (dispatch) => {
    dispatch({type: Actions.REST_LOADING});
    api.get('/restaurants')
    .then((res) => dispatch({type:Actions.REST_SUCCESS, payload:res.data}))
    .catch((err) => dispatch({type:Actions.REST_ERROR, payload:err.message}))


}
