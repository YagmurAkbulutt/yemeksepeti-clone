import { v4 } from 'uuid';
import api from '../../utils/api';
import Actions from '../actionTypes';
import { toast } from 'react-toastify';

// 1- apiden sepetteki verileri alıp reducera aktaran thunk aksiyonu
export const getCart = () => (dispatch) => {
  dispatch({ type: Actions.CART_LOADING });

  api
    .get('/cart')
    .then((res) => dispatch({ type: Actions.CART_SUCCESS, payload: res.data }))
    .catch((err) =>
      dispatch({ type: Actions.CART_ERROR, payload: err.message })
    );
};

// 2- api ve reducerda tutlan state'e yeni ürün ekleme
export const addToBasket = (product, restName) => (dispatch) => {
  // a- sepete eklenecek olan ürünün bilgilerini belirle
  const newItem = {
    id: v4(),
    productId: product.id,
    title: product.title,
    price: product.price,
    photo: product.photo,
    restaurantName: restName,
    amount: 1,
  };

  // b- elemanı apia kaydet
  api.post('/cart', newItem)
    // c- apidan olumlu cevap gelirse reducera haber ver ve bildirim gönder
    .then(() => {dispatch({ type: Actions.ADD_ITEM, payload: newItem });

      toast.success(`${newItem.title} sepete eklendi`);
    })
    // d- apidan hata gelirse
    .catch(() => toast.error('Üzgünüz, bir sorun oluştu.'));
};

// 3- sepetteki elemanı güncelle (Miktar Arttırma-Azaltma)
export const updateItem = (id, newAmount) => (dispatch) => {
  // a- apidaki veriyi güncelle
  api.patch(`/cart/${id}`, { amount: newAmount })
    // b- istek başarılı olursa reducera haber ver
    .then((res) => {dispatch({
        type: Actions.UPDATE_ITEM,
        payload: res.data,
      });
    toast.info(`Sepetiniz güncellendi. (${newAmount})`);
    })
    // c- istek başarısız olursa 
    .catch(() => toast.error('Üzgünüz bir sorun oluştu.'));
};

// 4- ürünü sepetten kaldır
export const deleteItem = (id) => (dispatch) => {
  api
    .delete(`/cart/${id}`)
    .then(() => {
      dispatch({ type: Actions.DELETE_ITEM, payload: id });
      toast.warning('Ürün sepetten kaldırıldı');
    })
    .catch(() => toast.error('Üzgünüz bir sorun oluştu'));
};