import { NavLink } from "react-router-dom";

export default function Item({ id, index, image, name, price, onSelectItem }) {
  return (
    <NavLink to={`/detail/${id}`}>
      <li onClick={onSelectItem}>
        <img src={`/images/${image}`} alt={image} />
        <div>
          <h3>{name}</h3>
          <div>{Number(price).toLocaleString()} 원</div>
        </div>
      </li>
    </NavLink>
  );
}
