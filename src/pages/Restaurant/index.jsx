import { useEffect } from "react";
import Container from "../../components/Container";
import { useParams } from "react-router-dom";
import { useDispatch} from "react-redux";
import { getDataByRestId } from "../../redux/actions/productActions";
import ProdDetail from "./ProdDetail";
import RestDetail from "./RestDetail";

const Restaurant = () => {
  //urldeki restoranın idsini gösteren aprametreye erişme
  const { id } = useParams();

  //usedispatch kurulum
  const dispatch = useDispatch();

  //bileşen ekrana basıldığında idden yola çıkarak
  //restoran ve ürün bilgilerini apiden al reducera aktar
  useEffect(() => {
    dispatch(getDataByRestId(id));
  }, []);

  return (
    <div>
      <div className="shadow">
        <Container>
          <RestDetail />
        </Container>
      </div>

      <Container>
        <ProdDetail />
      </Container>
    </div>
  );
};

export default Restaurant;
