function Cart({
  cart,
  increaseQuantity,
  decreaseQuantity,
  removeItem
}) {
  return (
    <div className="cart">
      <h2>Shopping Cart</h2>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        cart.map((item) => (
          <div className="cart-item" key={item.id}>
            <h3>{item.name}</h3>

            <p>Price: ₹{item.price}</p>

            <p>Quantity: {item.quantity}</p>

            <button onClick={() => increaseQuantity(item.id)}>
              +
            </button>

            <button onClick={() => decreaseQuantity(item.id)}>
              -
            </button>

            <button onClick={() => removeItem(item.id)}>
              Remove
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default Cart;