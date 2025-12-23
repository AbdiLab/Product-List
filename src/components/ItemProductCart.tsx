import type { Cart, Item } from "../App";
import numberFormatter from "../utils/numberFormatter";

type ItemProductCart = {
  item: Cart;
  increaseQuantity: (itemName: Item["name"]) => void;
  decreaseQuantity: (itemName: Item["name"]) => void;
};
export default function ItemProductCart({
  item,
  increaseQuantity,
  decreaseQuantity,
}: ItemProductCart) {
  return (
    <li className="item">
      <div className="item-image-add-to-cart">
        <img
          className="active-img"
          src={item.image.desktop}
          alt={`${item.category}`}
          srcSet={`${item.image.mobile} 375w, ${item.image.tablet} 768w, ${item.image.desktop} 1216w`}
          sizes="(max-width:768px) 768px, (max-width:375px) 375px,1216px"
        />
        <div className="btn btn-add-to-cart-active">
          <button className="btn" type="button" onClick={() => decreaseQuantity(item.name)}>
            <svg
              className="icon add-to-cart-icon"
              xmlns="http://www.w3.org/2000/svg"
              width="10"
              height="2"
              fill="none"
              viewBox="0 0 10 2">
              <path fill="#fff" d="M0 .375h10v1.25H0V.375Z" />
            </svg>
          </button>
          {item.quantity}
          <button className="btn" type="button" onClick={() => increaseQuantity(item.name)}>
            <svg
              className="icon add-to-cart-icon"
              xmlns="http://www.w3.org/2000/svg"
              width="10"
              height="10"
              fill="none"
              viewBox="0 0 10 10">
              <path
                fill="#fff"
                d="M10 4.375H5.625V0h-1.25v4.375H0v1.25h4.375V10h1.25V5.625H10v-1.25Z"
              />
            </svg>
          </button>
        </div>
      </div>
      <div className="item-info text-Preset-3">
        <div className="name text-Preset-4">{item.category}</div>
        <div className="category">{item.name}</div>
        <div className="price ">{numberFormatter(item.price)}</div>
      </div>
    </li>
  );
}
