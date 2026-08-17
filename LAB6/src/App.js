import { useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useParams,
  useNavigate,
} from "react-router-dom";

import "./App.css";

/* =========================
   PRODUCT DATA
========================= */

const products = [
  {
    id: 1,
    name: "Nova X5 Smartphone",
    price: 18999,
    oldPrice: 24999,
    category: "Smartphones",
    rating: 4.5,
    image:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9",
    description:
      "A modern smartphone with a vibrant display, powerful performance and a premium design for everyday use.",
  },
  {
    id: 2,
    name: "ProBook 14 Laptop",
    price: 54999,
    oldPrice: 69999,
    category: "Laptops",
    rating: 4.6,
    image:
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853",
    description:
      "A slim and powerful laptop designed for work, study, entertainment and everyday productivity.",
  },
  {
    id: 3,
    name: "AirBeat Wireless Earbuds",
    price: 2499,
    oldPrice: 4999,
    category: "Audio",
    rating: 4.4,
    image:
      "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1",
    description:
      "Compact wireless earbuds offering clear audio, comfortable fit and convenient wireless connectivity.",
  },
  {
    id: 4,
    name: "FitPro Smartwatch",
    price: 3499,
    oldPrice: 6999,
    category: "Wearables",
    rating: 4.3,
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
    description:
      "A stylish smartwatch with a modern display designed for everyday activity tracking and notifications.",
  },
  {
    id: 5,
    name: "Mecha Gaming Keyboard",
    price: 2999,
    oldPrice: 5499,
    category: "Gaming",
    rating: 4.7,
    image:
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3",
    description:
      "A responsive mechanical gaming keyboard built for comfortable typing and an enhanced gaming experience.",
  },
  {
    id: 6,
    name: "SoundBox Portable Speaker",
    price: 3999,
    oldPrice: 6999,
    category: "Audio",
    rating: 4.5,
    image:
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1",
    description:
      "A compact portable speaker with powerful sound, modern styling and convenient wireless connectivity.",
  },
];

/* =========================
   HEADER
========================= */

function Header({ cart, search, setSearch }) {
  const navigate = useNavigate();

  const cartCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const handleSearch = (e) => {
    e.preventDefault();

    if (search.trim()) {
      navigate("/products");
    }
  };

  return (
    <header className="header">

      <Link to="/" className="logo">
        Nexora
      </Link>

      <form
        className="search-box"
        onSubmit={handleSearch}
      >
        <input
          type="text"
          placeholder="Search products, brands and more"
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

        <button type="submit">
          Search
        </button>
      </form>

      <nav className="main-nav">

        <Link to="/products">
          Products
        </Link>

        <Link to="/about">
          About
        </Link>

        <Link to="/contact">
          Contact
        </Link>

        <Link to="/login">
          Login
        </Link>

        <Link
          to="/cart"
          className="cart-button"
        >
          Cart ({cartCount})
        </Link>

      </nav>

    </header>
  );
}

/* =========================
   CATEGORY BAR
========================= */

function Categories() {
  return (
    <div className="category-bar">

      <Link to="/products">
        All Products
      </Link>

      <Link to="/products">
        Smartphones
      </Link>

      <Link to="/products">
        Laptops
      </Link>

      <Link to="/products">
        Audio
      </Link>

      <Link to="/products">
        Wearables
      </Link>

      <Link to="/products">
        Gaming
      </Link>

    </div>
  );
}

/* =========================
   PRODUCT CARD
========================= */

function ProductCard({
  product,
  addToCart,
}) {
  const navigate = useNavigate();

  const discount = Math.round(
    ((product.oldPrice - product.price) /
      product.oldPrice) *
      100
  );

  return (
    <div className="product-card">

      <div
        className="product-image"
        onClick={() =>
          navigate(
            `/product/${product.id}`
          )
        }
      >
        <img
          src={product.image}
          alt={product.name}
        />
      </div>

      <div className="product-content">

        <p className="product-category">
          {product.category}
        </p>

        <h3
          onClick={() =>
            navigate(
              `/product/${product.id}`
            )
          }
        >
          {product.name}
        </h3>

        <div className="product-rating">
          {product.rating} / 5
        </div>

        <div className="product-price">

          <strong>
            ₹{product.price}
          </strong>

          <span>
            ₹{product.oldPrice}
          </span>

        </div>

        <p className="discount">
          {discount}% OFF
        </p>

        <div className="product-actions">

          <button
            className="add-button"
            onClick={() =>
              addToCart(product)
            }
          >
            Add to Cart
          </button>

          <button
            className="view-button"
            onClick={() =>
              navigate(
                `/product/${product.id}`
              )
            }
          >
            View
          </button>

        </div>

      </div>

    </div>
  );
}

/* =========================
   HOME PAGE
========================= */

function Home({ addToCart }) {
  return (
    <>
      <Categories />

      <section className="hero">

        <div className="hero-content">

          <p className="hero-label">
            NEXORA ELECTRONICS
          </p>

          <h1>
            Technology
            <br />
            Made Simple.
          </h1>

          <p>
            Discover the latest electronics,
            smart devices and accessories
            at great prices.
          </p>

          <Link
            to="/products"
            className="hero-button"
          >
            Explore Products
          </Link>

        </div>

        <div className="hero-box">

          <div className="hero-card">
            <p>
              Today's Offers
            </p>

            <strong>
              Up to 40% OFF
            </strong>
          </div>

          <div className="hero-card">
            <p>
              Delivery
            </p>

            <strong>
              Fast & Reliable
            </strong>
          </div>

        </div>

      </section>

      <section className="home-section">

        <div className="section-heading">

          <div>

            <h2>
              Featured Products
            </h2>

            <p>
              Popular technology products
              selected for you.
            </p>

          </div>

          <Link to="/products">
            View All
          </Link>

        </div>

        <div className="products-grid">

          {products
            .slice(0, 4)
            .map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                addToCart={addToCart}
              />
            ))}

        </div>

      </section>
    </>
  );
}

/* =========================
   PRODUCTS PAGE
========================= */

function Products({
  addToCart,
  search,
}) {

  const filteredProducts =
    products.filter((product) =>
      product.name
        .toLowerCase()
        .includes(
          search.toLowerCase()
        ) ||
      product.category
        .toLowerCase()
        .includes(
          search.toLowerCase()
        )
    );

  return (
    <>
      <Categories />

      <section className="home-section">

        <div className="page-heading">

          <h1>
            All Products
          </h1>

          <p>
            Explore our electronics
            collection.
          </p>

        </div>

        <div className="products-grid">

          {filteredProducts.map(
            (product) => (
              <ProductCard
                key={product.id}
                product={product}
                addToCart={addToCart}
              />
            )
          )}

        </div>

        {filteredProducts.length === 0 && (
          <div className="no-products">

            <h2>
              No products found
            </h2>

            <p>
              Try searching for another
              product.
            </p>

          </div>
        )}

      </section>
    </>
  );
}

/* =========================
   PRODUCT DETAILS
========================= */

function ProductDetails({
  addToCart,
}) {

  const { id } = useParams();
  const navigate = useNavigate();

  const product = products.find(
    (item) =>
      item.id === Number(id)
  );

  if (!product) {
    return (
      <div className="not-found">

        <h1>
          Product Not Found
        </h1>

        <button
          onClick={() =>
            navigate("/products")
          }
        >
          Back to Products
        </button>

      </div>
    );
  }

  const discount = Math.round(
    ((product.oldPrice -
      product.price) /
      product.oldPrice) *
      100
  );

  return (
    <section className="details-page">

      <div className="details-image">

        <img
          src={product.image}
          alt={product.name}
        />

      </div>

      <div className="details-content">

        <p className="product-category">
          {product.category}
        </p>

        <h1>
          {product.name}
        </h1>

        <div className="product-rating">
          {product.rating} / 5
        </div>

        <div className="details-price">

          ₹{product.price}

          <span>
            ₹{product.oldPrice}
          </span>

        </div>

        <p className="discount">
          {discount}% OFF
        </p>

        <div className="details-line"></div>

        <h3>
          Product Description
        </h3>

        <p className="details-description">
          {product.description}
        </p>

        <div className="delivery-box">

          <p>
            Free standard delivery
          </p>

          <p>
            Estimated delivery:
            3-5 days
          </p>

          <p>
            Secure payment available
          </p>

        </div>

        <div className="details-actions">

          <button
            className="add-button"
            onClick={() =>
              addToCart(product)
            }
          >
            Add to Cart
          </button>

          <button
            className="buy-button"
            onClick={() =>
              alert(
                "Order placed successfully!"
              )
            }
          >
            Buy Now
          </button>

        </div>

        <button
          className="back-button"
          onClick={() =>
            navigate("/products")
          }
        >
          Back to Products
        </button>

      </div>

    </section>
  );
}

/* =========================
   CART
========================= */

function Cart({
  cart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
}) {

  const total = cart.reduce(
    (sum, item) =>
      sum +
      item.price *
        item.quantity,
    0
  );

  const itemCount = cart.reduce(
    (sum, item) =>
      sum + item.quantity,
    0
  );

  if (cart.length === 0) {
    return (
      <div className="empty-cart">

        <h1>
          Your Cart is Empty
        </h1>

        <p>
          Add products to your cart
          to continue shopping.
        </p>

        <Link to="/products">
          Continue Shopping
        </Link>

      </div>
    );
  }

  return (
    <section className="cart-page">

      <h1>
        Shopping Cart
      </h1>

      <div className="cart-layout">

        <div className="cart-items">

          {cart.map((item) => (

            <div
              className="cart-item"
              key={item.id}
            >

              <img
                src={item.image}
                alt={item.name}
              />

              <div className="cart-item-content">

                <p className="product-category">
                  {item.category}
                </p>

                <h3>
                  {item.name}
                </h3>

                <h2>
                  ₹{item.price}
                </h2>

                <div className="quantity">

                  <button
                    onClick={() =>
                      decreaseQuantity(
                        item.id
                      )
                    }
                  >
                    -
                  </button>

                  <span>
                    {item.quantity}
                  </span>

                  <button
                    onClick={() =>
                      increaseQuantity(
                        item.id
                      )
                    }
                  >
                    +
                  </button>

                </div>

                <button
                  className="remove-button"
                  onClick={() =>
                    removeFromCart(
                      item.id
                    )
                  }
                >
                  Remove
                </button>

              </div>

            </div>

          ))}

        </div>

        <div className="cart-summary">

          <h2>
            Order Summary
          </h2>

          <div className="summary-row">

            <span>
              Items
            </span>

            <span>
              {itemCount}
            </span>

          </div>

          <div className="summary-row">

            <span>
              Delivery
            </span>

            <span className="free">
              Free
            </span>

          </div>

          <div className="summary-line"></div>

          <div className="summary-total">

            <strong>
              Total
            </strong>

            <strong>
              ₹{total}
            </strong>

          </div>

          <button
            onClick={() =>
              alert(
                "Checkout feature coming soon!"
              )
            }
          >
            Proceed to Checkout
          </button>

        </div>

      </div>

    </section>
  );
}

/* =========================
   ABOUT
========================= */

function About() {

  return (
    <section className="simple-page">

      <p className="page-label">
        ABOUT NEXORA
      </p>

      <h1>
        Technology Made Accessible
      </h1>

      <p>
        Nexora is a modern online
        electronics shopping application
        built using React.
      </p>

      <p>
        Customers can browse products,
        search for items, view product
        details and manage their shopping
        cart.
      </p>

      <p>
        The application focuses on a
        simple, clean and convenient
        shopping experience.
      </p>

    </section>
  );
}

/* =========================
   CONTACT
========================= */

function Contact() {

  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [message, setMessage] =
    useState("");

  const handleSubmit = (e) => {

    e.preventDefault();

    if (
      !name ||
      !email ||
      !message
    ) {
      alert(
        "Please fill all fields."
      );

      return;
    }

    alert(
      "Your message has been sent successfully."
    );

    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <section className="contact-page">

      <div className="page-heading">

        <h1>
          Contact Us
        </h1>

        <p>
          Have a question?
          Send us a message.
        </p>

      </div>

      <form
        onSubmit={handleSubmit}
        className="contact-form"
      >

        <label>
          Name
        </label>

        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
        />

        <label>
          Email
        </label>

        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <label>
          Message
        </label>

        <textarea
          placeholder="Enter your message"
          value={message}
          onChange={(e) =>
            setMessage(e.target.value)
          }
        />

        <button type="submit">
          Send Message
        </button>

      </form>

    </section>
  );
}

/* =========================
   LOGIN
========================= */

function Login() {

  return (
    <section className="login-page">

      <div className="login-card">

        <p className="page-label">
          WELCOME TO NEXORA
        </p>

        <h1>
          Sign In
        </h1>

        <p>
          Login to your account.
        </p>

        <input
          type="email"
          placeholder="Email address"
        />

        <input
          type="password"
          placeholder="Password"
        />

        <button
          onClick={() =>
            alert(
              "Login feature coming soon!"
            )
          }
        >
          Sign In
        </button>

        <small>
          Account registration can be
          added later.
        </small>

      </div>

    </section>
  );
}

/* =========================
   FOOTER
========================= */

function Footer() {

  return (
    <footer className="footer">

      <div className="footer-brand">

        <h2>
          Nexora
        </h2>

        <p>
          Modern electronics for
          modern lifestyles.
        </p>

      </div>

      <div>

        <h3>
          SHOP
        </h3>

        <Link to="/products">
          Products
        </Link>

        <Link to="/cart">
          Shopping Cart
        </Link>

      </div>

      <div>

        <h3>
          COMPANY
        </h3>

        <Link to="/about">
          About Us
        </Link>

        <Link to="/contact">
          Contact
        </Link>

      </div>

      <div>

        <h3>
          SUPPORT
        </h3>

        <Link to="/contact">
          Help Center
        </Link>

        <Link to="/about">
          Privacy Policy
        </Link>

      </div>

      <div className="copyright">
        © 2026 Nexora. All rights reserved.
      </div>

    </footer>
  );
}

/* =========================
   APP
========================= */

function App() {

  const [cart, setCart] =
    useState([]);

  const [search, setSearch] =
    useState("");

  const addToCart = (product) => {

    setCart((currentCart) => {

      const existing =
        currentCart.find(
          (item) =>
            item.id === product.id
        );

      if (existing) {

        return currentCart.map(
          (item) =>
            item.id === product.id
              ? {
                  ...item,
                  quantity:
                    item.quantity + 1,
                }
              : item
        );
      }

      return [
        ...currentCart,
        {
          ...product,
          quantity: 1,
        },
      ];
    });
  };

  const removeFromCart = (id) => {

    setCart((currentCart) =>
      currentCart.filter(
        (item) =>
          item.id !== id
      )
    );
  };

  const increaseQuantity = (id) => {

    setCart((currentCart) =>
      currentCart.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity:
                item.quantity + 1,
            }
          : item
      )
    );
  };

  const decreaseQuantity = (id) => {

    setCart((currentCart) =>
      currentCart
        .map((item) =>
          item.id === id
            ? {
                ...item,
                quantity:
                  item.quantity - 1,
              }
            : item
        )
        .filter(
          (item) =>
            item.quantity > 0
        )
    );
  };

  return (
    <BrowserRouter>

      <Header
        cart={cart}
        search={search}
        setSearch={setSearch}
      />

      <main>

        <Routes>

          <Route
            path="/"
            element={
              <Home
                addToCart={addToCart}
              />
            }
          />

          <Route
            path="/products"
            element={
              <Products
                addToCart={addToCart}
                search={search}
              />
            }
          />

          <Route
            path="/product/:id"
            element={
              <ProductDetails
                addToCart={addToCart}
              />
            }
          />

          <Route
            path="/cart"
            element={
              <Cart
                cart={cart}
                removeFromCart={
                  removeFromCart
                }
                increaseQuantity={
                  increaseQuantity
                }
                decreaseQuantity={
                  decreaseQuantity
                }
              />
            }
          />

          <Route
            path="/about"
            element={
              <About />
            }
          />

          <Route
            path="/contact"
            element={
              <Contact />
            }
          />

          <Route
            path="/login"
            element={
              <Login />
            }
          />

        </Routes>

      </main>

      <Footer />

    </BrowserRouter>
  );
}

export default App;