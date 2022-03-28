/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  checkState,
  getFullPriceSelector,
  orderState,
} from "../store/orderState";
import { NavLink } from "react-router-dom";
import Button from "../components/Button";

export default function Order() {
  const [order, setOrder] = useRecoilState(orderState);
  const [checks, setChecks] = useState([]);
  const [checkAtom, setCheckAtom] = useRecoilState(checkState);
  const navigate = useNavigate();
  const fullPrice = useRecoilValue(getFullPriceSelector);

  const onCheckAll = (checked) => {
    if (checked) {
      const idResult = order.map((item) => {
        return item;
      });
      setChecks(idResult);
      setCheckAtom(idResult);
    } else {
      setChecks([]);
    }
  };

  const onCheck = (checked, item) => {
    if (checked) {
      setChecks([...checks, item]);
      setCheckAtom([...checkAtom, item]);
    } else {
      const newItems = checks.filter((v) => {
        return item !== v;
      });
      setChecks(newItems);
      setCheckAtom(newItems);
    }
  };

  const onIncrease = (item, quantity) => {
    const increase = order.map((v, i) => {
      if (item !== v) {
        return v;
      }
      return {
        ...v,
        quantity: quantity < 10 ? quantity + 1 : 10,
      };
    });
    setOrder(increase);
  };

  const onDecrease = (item, quantity) => {
    const decrease = order.map((v, i) => {
      if (item !== v) {
        return v;
      }
      return {
        ...v,
        quantity: quantity > 1 ? quantity - 1 : 1,
      };
    });
    setOrder(decrease);
  };

  const onClearStore = () => setOrder([]);

  const onSubmit = () => {
    if (checks.length < 1) return;
    navigate("/complete");
    setOrder([]);
    localStorage.clear();
  };

  return (
    <section css={wrapper}>
      <ul>
        <input
          type="checkbox"
          name="checkAll"
          className="checkAll"
          checked={checks.length == order.length ? true : false}
          onChange={(e) => onCheckAll(e.target.checked)}
        />
        <label htmlFor="checkAll"> 전체 선택</label>
        {order.length ? (
          order.map((item, index) => {
            const { id, image, name, price, quantity } = item;
            return (
              <li key={id}>
                <input
                  type="checkbox"
                  className="check"
                  checked={
                    checks.map((v) => v.id).includes(item.id) ? true : false
                  }
                  onChange={(e) => onCheck(e.target.checked, item)}
                />
                <div className="order-item-body">
                  <h3>{name}</h3>
                  <span>{Number(price).toLocaleString()} 원</span>
                  <div className="order-count">
                    <span
                      className={quantity == 1 ? "inactivated" : ""}
                      onClick={() => onDecrease(item, quantity)}
                    >
                      -
                    </span>
                    {quantity}
                    <span onClick={() => onIncrease(item, quantity)}>+</span>
                  </div>
                  <div className="detail-quantity-notice">
                    {quantity == 10 && "최대 수량입니다."}
                  </div>
                </div>
                <NavLink to={`/detail/${id}`}>
                  <img src={`/images/${image}`} alt={image} />
                </NavLink>
              </li>
            );
          })
        ) : (
          <div className="default">주문 할 상품이 없습니다</div>
        )}
        <div>총 주문 가격: {fullPrice} 원</div>
      </ul>
      <Button onClick={onSubmit} activated={checks.length >= 1}>
        결제하기
      </Button>
      <br />
      <Button onClick={onClearStore}>장바구니 비우기</Button>
    </section>
  );
}

const wrapper = css`
  ul {
    padding: 1em;
    li {
      margin: 0.5em 0;
      input {
        width: 10%;
      }
      .order-item-body {
        display: inline-block;
        vertical-align: middle;
        width: 70%;
        h3 {
          margin-bottom: 0.3em;
        }
        .order-count {
          display: inline-block;
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
        .detail-quantity-notice {
          position: absolute;
          color: red;
          font-size: 0.8em;
        }
      }
      a {
        display: inline-block;
        width: 20%;
        vertical-align: middle;
        img {
          width: 100%;
        }
      }
    }
    .default {
      width: 100%;
      height: 50vh;
      margin-top: 1em;
    }
  }
  button {
  }
`;
