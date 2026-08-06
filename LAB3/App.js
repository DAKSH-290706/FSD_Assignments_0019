import "./App.css";

function App() {
  return (
    <div className="App">

      {/* Header */}
      <header className="header">

        <div className="logo">
          <h2>amazon</h2>
        </div>

        <div className="location">
          <p>Hello</p>
          <h4>Select your address</h4>
        </div>

        <div className="search-bar">
          <input type="text" placeholder="Search Amazon" />
          <button></button>
        </div>

        <div className="nav">
          <div>
            <p>Hello, Sign in</p>
            <h4>Account & Lists</h4>
          </div>

          <div>
            <p>Returns</p>
            <h4>& Orders</h4>
          </div>

          <div className="cart">
             Cart
          </div>
        </div>

      </header>

      {/* Content */}
      <main className="content">
        <h1>Amazon Clone</h1>
        <p>
          This is a replica of Amazon's Header and Footer using HTML and CSS.
        </p>
      </main>

      {/* Footer */}
      <footer className="footer">

        <button className="top-btn">Back to Top</button>

        <div className="footer-links">

          <div>
            <h3>Get to Know Us</h3>
            <a href="/">About Us</a>
            <a href="/">Careers</a>
            <a href="/">Press Releases</a>
          </div>

          <div>
            <h3>Connect with Us</h3>
            <a href="/">Facebook</a>
            <a href="/">Instagram</a>
            <a href="/">Twitter</a>
          </div>

          <div>
            <h3>Let Us Help You</h3>
            <a href="/">Your Account</a>
            <a href="/">Returns Centre</a>
            <a href="/">Help</a>
          </div>

        </div>

        <p className="copyright">
           2026 Amazon Clone | Educational Purpose Only
        </p>

      </footer>

    </div>
  );
}

export default App;