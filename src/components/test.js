


import React, { useState } from 'react';

function Test() {
  const [products, setProducts] = useState([
    { id: 1, name: 'Producto 1', price: 10 },
    { id: 2, name: 'Producto 2', price: 20 },
    { id: 3, name: 'Producto 3', price: 30 },
  ]);

  const [cart, setCart] = useState([]);

  const addToCart = (product, quantity) => {
    const updatedCart = [...cart];
    const existingItem = updatedCart.find(item => item.product.id === product.id);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      updatedCart.push({ product, quantity });
    }

    setCart(updatedCart);
  };

  return (
    <div>
      <h1>Lista de Productos</h1>
      <ul>
        {products.map(product => (
          <li key={product.id}>
            {product.name} - ${product.price}
            <button onClick={() => addToCart(product, 1)}>Agregar al Carrito</button>
          </li>
        ))}
      </ul>
      <h2>Carrito de Compras</h2>
      <ul>
        {cart.map(item => (
          <li key={item.product.id}>
            {item.product.name} x{item.quantity} - Total: ${item.product.price * item.quantity}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Test;

