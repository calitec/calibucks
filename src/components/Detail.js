/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { homeState, detailState } from "../store/homeState";
import { orderSelector, orderState } from "../store/orderState";
import { toast } from "react-toastify";
import Button from "./Button";

export default function Detail() {
  const { id } = useParams();
  const [data, setData] = useRecoilState(homeState);
  const [detail, setDetail] = useRecoilState(detailState);
  const [order, setOrder] = useRecoilState(orderState);
  const [quantity, setQuantity] = useState(1);
  useRecoilValue(orderSelector);

  useEffect(() => {
    if (detail !== null) return;
    const thisItem = data.filter((item) => item.id == id)[0];
    setDetail(thisItem);
    console.log(id, "detail refresh!");
  }, []);

  const onDecrease = () =>
    quantity > 1 && setQuantity((quantity) => quantity - 1);

  const onIncrease = () =>
    quantity < 10 && setQuantity((quantity) => quantity + 1);

  const onStoreItem = () => {
    const filtered = (item) => item.id == detail.id;
    if (order.findIndex(filtered) !== -1) return;
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
        <span onClick={onDecrease}>-</span>
        <input type="text" value={quantity} />
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
  .detail-quantity-notice {
    color: red;
  }
  .detail-count {
    input {
      width: 8vw;
      text-align: center;
    }
    span {
      display: inline-block;
      padding: 0.5em 0.8em;
    }
  }
`;
