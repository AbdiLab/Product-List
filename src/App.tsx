import { useEffect, useMemo, useState } from "react";
import Data from "./data.json";
import EmptyCart from "./components/EmptyCart";
import AddedCart from "./components/AddedCart";
import ItemProduct from "./components/ItemProduct";
import Modal from "./components/Modal";

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
    const existingItem = cart.find((itemCart) => itemCart.name === item.name);

    if (existingItem) {
      setCart((preCart) => {
        return preCart.map((itemCart) =>
          itemCart.name === existingItem.name
            ? { ...existingItem, quantity: existingItem.quantity + 1 }
            : itemCart
        );
      });
    } else {
      setCart((preCart) => [...preCart, { ...item, quantity: 1 }]);
    }
  }

  function removePerQuantityFromCart(itemName: Item["name"]) {
    const existingItem = cart.find((itemCart) => itemCart.name === itemName);

    if (existingItem) {
      existingItem.quantity === 1
        ? setCart((preCart) => {
            return preCart.filter((itemCart) => itemCart.name !== itemName);
          })
        : setCart((preCart) => {
            return preCart.map((itemCart) =>
              itemCart.name === existingItem.name
                ? { ...itemCart, quantity: existingItem.quantity - 1 }
                : itemCart
            );
          });
    }
  }

  function removeCart(itemName: Item["name"]) {
    setCart((preCart) => preCart.filter((itemCart) => itemCart.name !== itemName));
  }

  function hasQuantity(itemName: Item["name"]) {
    const quantity = cart.find((itemCart) => itemCart.name === itemName)?.quantity;

    return quantity;
  }

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
              return (
                <ItemProduct
                  key={item.name}
                  addToCart={addToCart}
                  item={item}
                  removePerQuantityFromCart={removePerQuantityFromCart}
                  hasQuantity={hasQuantity}
                />
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
