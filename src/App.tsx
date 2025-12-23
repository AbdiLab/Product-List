import { useEffect, useMemo, useState } from "react";
import Data from "./data.json";
import EmptyCart from "./components/EmptyCart";
import AddedCart from "./components/AddedCart";
import ItemProduct from "./components/ItemProduct";
import Modal from "./components/Modal";
import ItemProductCart from "./components/ItemProductCart";

export type Item = (typeof Data)[0];

export type Cart = {
  quantity: number;
} & Item;

export default function App() {
  const [cart, setCart] = useState<Cart[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const orderTotal = useMemo(() => {
    return cart.reduce((sum, item) => {
      return sum + item.price * item.quantity;
    }, 0);
  }, [cart]);

  function addToCart(item: Item) {
    setCart((preCart) => [...preCart, { ...item, quantity: 1 }]);
  }

  function increaseQuantity(itemName: Item["name"]) {
    setCart((preCart) =>
      preCart.map((itemCart) =>
        itemCart.name === itemName ? { ...itemCart, quantity: itemCart.quantity + 1 } : itemCart
      )
    );
  }

  function decreaseQuantity(itemName: Item["name"]) {
    const existingItem = cart.find((itemCart) => itemCart.name === itemName);
    if (existingItem) {
      existingItem.quantity === 1
        ? setCart((preCart) => preCart.filter((itemCart) => itemCart.name !== itemName))
        : setCart((preCart) =>
            preCart.map((itemCart) =>
              itemCart.name === itemName
                ? { ...itemCart, quantity: itemCart.quantity - 1 }
                : itemCart
            )
          );
    }
  }

  function removeCart(itemName: Item["name"]) {
    setCart((preCart) => preCart.filter((itemCart) => itemCart.name !== itemName));
  }

  useEffect(() => {
    if (!isModalOpen) {
      setCart([]);
    }
  }, [isModalOpen]);

  useEffect(() => {
    if (!isModalOpen) {
      setCart([]);
    }
  }, [isModalOpen]);

  return (
    <div className="container">
      <main>
        <section className="product-list">
          <h1 className="text-Preset-1">Desserts</h1>
          <ul className="list">
            {Data.map((item) => {
              const inCart = cart.find((cartItem) => cartItem.name === item.name);

              return inCart ? (
                <ItemProductCart
                  key={inCart.name}
                  increaseQuantity={increaseQuantity}
                  decreaseQuantity={decreaseQuantity}
                  item={inCart}
                />
              ) : (
                <ItemProduct addToCart={addToCart} key={item.name} item={item} />
              );
            })}
          </ul>
        </section>
        <section className="cart">
          <h2 className="text-Preset-2">Your Cart ({cart.length})</h2>

          {cart.length ? (
            <AddedCart
              orderTotal={orderTotal}
              cart={cart}
              removeCart={removeCart}
              setIsModalOpen={() => setIsModalOpen(true)}
            />
          ) : (
            <EmptyCart />
          )}
        </section>
      </main>

      {isModalOpen && (
        <Modal cart={cart} orderTotal={orderTotal} onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  );
}
