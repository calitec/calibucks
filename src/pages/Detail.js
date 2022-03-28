/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import { searchState } from "../store/commonState";
import { orderState } from "../store/orderState";
import { toast } from "react-toastify";
import Button from "../components/Button";
import data from "../data.json";

export default function Detail() {
  const { id } = useParams();
  const [detail, setDetail] = useState(null);
  const [order, setOrder] = useRecoilState(orderState);
  const [_, setSearch] = useRecoilState(searchState);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const thisItem = data.filter((item) => item.id == id)[0];
    setDetail(thisItem);
    setSearch({ keyword: "", toggle: false });
    console.log(id, "detail refresh!");
  }, []);

  const onDecrease = () =>
    quantity > 1 && setQuantity((quantity) => quantity - 1);

  const onIncrease = () =>
    quantity < 10 && setQuantity((quantity) => quantity + 1);

  const onChange = (e) => setQuantity(e.target.value);

  const onStoreItem = () => {
    const filtered = (item) => item.id == detail.id;
    if (order.findIndex(filtered) !== -1) {
      return toast.error("이미 장바구니에 존재합니다.");
    }
    const { id, name, price, image } = detail;
    const product = {
      id,
      name,
      price,
      image,
      quantity,
    };
    setOrder((order) => order.concat(product));
    toast.info("장바구니에 저장 되었습니다.");
  };

  return detail != null ? (
    <section css={wrapper}>
      <img src={`/images/${detail.image}`} alt={detail.image} />
      <h3>{detail.name}</h3>
      <div className="detail-count">
        <span
          className={quantity == 1 ? "inactivated" : ""}
          onClick={onDecrease}
        >
          -
        </span>
        <input type="text" value={quantity} onChange={onChange} />
        <span onClick={onIncrease}>+</span>
        <div className="detail-quantity-notice">
          {quantity == 10 && "최대 수량입니다."}
        </div>
      </div>
      <Button onClick={onStoreItem}>장바구니</Button>
      <span>{`${Number(detail.price).toLocaleString()} 원`}</span>
      <div>{detail.nutrition}</div>
      <div>{detail.description}</div>
    </section>
  ) : (
    ""
  );
}

const wrapper = css`
  width: 100%;
  font-size: 0.8em;
  padding-bottom: 5em;
  img {
    width: 100%;
    padding: 0.8em;
  }
  h3,
  > div {
    line-height: 18px;
  }
  > div {
    padding: 0.5em 1em;
  }
  h3 {
    font-weight: 700;
    padding: 1em;
  }
  > span {
    display: inline-block;
    font-weight: 500;
    padding: 1.5em 1em 0.5em;
  }
  .detail-count {
    input {
      width: 8vw;
      text-align: center;
    }
    span {
      display: inline-block;
      position: relative;
      top: -1px;
      margin: 0 1em;
      width: 19px;
      height: 19px;
      border: 1px solid #363636;
      border-radius: 50%;
      text-align: center;
      vertical-align: middle;
      &.inactivated {
        opacity: 0.25;
      }
    }
  }
  > button {
    margin-top: 1em;
  }
  .detail-quantity-notice {
    display: inline-block;
    color: red;
  }
`;
