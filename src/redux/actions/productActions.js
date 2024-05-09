import api from "../../utils/api";
import Actions from "../actionTypes";

//idden yola çıakrak hem restoranın hem de ürünlerin
//verilerini apiden alıp reducera aktaracak
//asenkron thunk aksiyonu

export const getDataByRestId = (id) => async (dispatch) => {
  //reducera yüklenmenin başladığını bildir
  dispatch({ type: Actions.PROD_LOADING });

  // api istekleri
  //restoran bilgileri
  const req1 = api.get(`/restaurants/${id}`);

  //restoran ürünlerinin bilgileri
  const req2 = api.get(`/products?restaurantId=${id}`);

  try {
    // iki farklı api isteğini aynı anda atarsak veriyi daha hızlı ynsıtabiliriz
    const responses = await Promise.all([req1, req2]);

    //apiden veriler başarıyla gelirse çalışacak aksyion
    dispatch({ type: Actions.PROD_SUCCESS, payload: responses });
  } catch (err) {
    //apiden veriler gelmezse hata mesajını reducera aktar
    dispatch({ type: Actions.PROD_ERROR, payload: err.messasge });
  }
};
