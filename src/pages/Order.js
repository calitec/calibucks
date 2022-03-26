/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import Button from "../components/Button";
import { orderSelector, orderState } from "../store/orderState";
import { NavLink } from "react-router-dom";

export default function Order() {
  const [order, setOrder] = useRecoilState(orderState);
  const [checks, setChecks] = useState([]);
  const navigate = useNavigate();
  useRecoilValue(orderSelector);

  const onClearStore = () => {
    setOrder([]);
    localStorage.clear();
  };

  const onCheckAll = (checked) => {
    if (checked) {
      const idResult = order.map((item) => {
        return item;
      });
      setChecks(idResult);
    } else {
      setChecks([]);
    }
  };

  const onCheck = (checked, item) => {
    if (checked) {
      setChecks([...checks, item]);
    } else {
      const newItems = checks.filter((v) => {
        return item !== v;
      });
      setChecks(newItems);
    }
  };

  const fullPrice = () => {
    return (
      checks.length &&
      checks
        .map((item) => {
          const { price, quantity } = item;
          return +price * +quantity;
        })
        .reduce((prev, current, index) => prev + current)
    );
  };

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
                  checked={checks.includes(item) ? true : false}
                  onChange={(e) => onCheck(e.target.checked, item)}
                />
                <div>
                  <h3>{name}</h3>
                  <span>{Number(price).toLocaleString()} 원</span>
                  <div className="order-count">
                    <span
                      onClick={() => {
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
                        setChecks([]);
                      }}
                    >
                      -
                    </span>
                    {quantity}
                    <span
                      onClick={() => {
                        const increase = order.map((v, i) => {
                          if (item !== v) {
                            return v;
                          }
                          return {
                            ...v,
                            quantity: quantity < 10 ? quantity + 1 : 10,
                          };
                        });
                        console.log(increase, "incerease");
                        setOrder(increase);
                        setChecks([]);
                      }}
                    >
                      +
                    </span>
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
        <div>총 주문 가격: {fullPrice().toLocaleString()} 원</div>
      </ul>
      <Button onClick={onSubmit} activate={checks.length >= 1}>
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
      div {
        display: inline-block;
        vertical-align: middle;
        width: 70%;
        .order-count {
          span {
            padding: 1em;
          }
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
