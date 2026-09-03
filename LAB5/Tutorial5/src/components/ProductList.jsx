import Product from "./Product";

function ProductList({ addToCart }) {
  const products = [
    {
      id: 1,
      name: "Laptop",
      price: 50000
    },
    {
      id: 2,
      name: "Mobile Phone",
      price: 20000
    },
    {
      id: 3,
      name: "Headphones",
      price: 2000
    }
  ];

  return (
    <div>
      <h2>Products</h2>

      <div className="products">
        {products.map((product) => (
          <Product
            key={product.id}
            product={product}
            addToCart={addToCart}
          />
        ))}
      </div>
    </div>
  );
}

export default ProductList;