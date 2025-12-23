import type { Item } from "../App";
import numberFormatter from "../utils/numberFormatter";

type ItemProductProps = {
  item: Item;
  addToCart: (item: Item) => void;
};

export default function ItemProduct({ item, addToCart }: ItemProductProps) {
  return (
    <li className="item">
      <div className="item-image-add-to-cart">
        <img
          src={item.image.desktop}
          alt={`${item.category}`}
          srcSet={`${item.image.mobile} 375w, ${item.image.tablet} 768w, ${item.image.desktop} 1216w`}
          sizes="(max-width:768px) 768px, (max-width:375px) 375px,1216px"
        />

        <button
          className="btn btn-add-to-cart text-Preset-4-Bold"
          type="button"
          aria-label={`add ${item.name} to cart`}
          onClick={() => addToCart(item)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="21"
            height="20"
            fill="none"
            viewBox="0 0 21 20">
            <g fill="#C73B0F" clipPath="url(#a)">
              <path d="M6.583 18.75a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5ZM15.334 18.75a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5ZM3.446 1.752a.625.625 0 0 0-.613-.502h-2.5V2.5h1.988l2.4 11.998a.625.625 0 0 0 .612.502h11.25v-1.25H5.847l-.5-2.5h11.238a.625.625 0 0 0 .61-.49l1.417-6.385h-1.28L16.083 10H5.096l-1.65-8.248Z" />
              <path d="M11.584 3.75v-2.5h-1.25v2.5h-2.5V5h2.5v2.5h1.25V5h2.5V3.75h-2.5Z" />
            </g>
            <defs>
              <clipPath id="a">
                <path fill="#fff" d="M.333 0h20v20h-20z" />
              </clipPath>
            </defs>
          </svg>
          Add To Cart
        </button>
      </div>
      <div className="item-info text-Preset-3">
        <div className="name text-Preset-4">{item.category}</div>
        <div className="category">{item.name}</div>
        <div className="price ">{numberFormatter(item.price)}</div>
      </div>
    </li>
  );
}
