import React from "react";

const Wishlist = () => {
  return (
    <div>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm px-2">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarContent"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse mt-2 mt-lg-0" id="navbarContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" href="#">
                  Women
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link active" href="#">
                  Men
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link active" href="#">
                  Kids
                </a>
              </li>
            </ul>
            <form className="d-flex mb-2 mb-lg-0">
              <input className="form-control me-2" type="search" placeholder="Search..." />
            </form>
            <h5 className="fw-bold">
              <a className="navbar-brand fw-bold" href="#">
                TREN<span>DIFY</span>
              </a>
            </h5>
            <div className="d-flex">
              <a href="#" className="me-3">
                <i className="fas fa-qrcode"></i>
              </a>
              <a href="#" className="me-3">
                <i className="fas fa-shopping-cart"></i>
              </a>
              <a href="#" className="me-3">
                <i className="fas fa-user-circle"></i>
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Wishlist Section */}
      <div className="container my-5">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4">
          <h5>
            My Wishlist <small className="text-muted">2 item</small>
          </h5>
          <div className="category-btns mt-3 mt-md-0 d-flex flex-wrap gap-2">
            <button className="btn btn-primary btn-sm">All</button>
            <button className="btn btn-outline-secondary btn-sm">T-Shirt</button>
            <button className="btn btn-outline-secondary btn-sm">Shirt</button>
            <button className="btn btn-outline-secondary btn-sm">Pant</button>
            <button className="btn btn-outline-secondary btn-sm">Saree</button>
            <button className="btn btn-outline-secondary btn-sm">Shoes</button>
            <button className="btn btn-outline-secondary btn-sm">etc,</button>
          </div>
        </div>

        <div className="row g-4">
          {/* Product 1 */}
          <div className="col-12 col-sm-6 col-md-4 col-lg-3">
            <div className="product-card">
              <img src="https://i.imgur.com/CuXK6nY.jpg" alt="Saree" className="product-img" />
              <div className="mt-2">
                <span className="rating-badge">
                  <i className="fas fa-star"></i> 4.2
                </span>
                <h6 className="mt-2">Saree</h6>
                <small className="text-muted">Traditional Dress</small>
                <br />
                <strong>₹999</strong> <del className="text-muted">₹1800</del>{" "}
                <span className="text-success">46% off</span>
                <div className="d-flex justify-content-between mt-2">
                  <i className="fas fa-trash"></i>
                  <a href="#" className="btn btn-sm btn-outline-primary">
                    Add To Bag
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Product 2 */}
          <div className="col-12 col-sm-6 col-md-4 col-lg-3">
            <div className="product-card">
              <img src="https://i.imgur.com/fX5Fu7Y.jpg" alt="T-Shirt" className="product-img" />
              <div className="mt-2">
                <span className="rating-badge">
                  <i className="fas fa-star"></i> 4.6
                </span>
                <h6 className="mt-2">T-Shirt</h6>
                <small className="text-muted">Casual Outfit</small>
                <br />
                <strong>₹699</strong> <del className="text-muted">₹999</del>{" "}
                <span className="text-success">55% off</span>
                <div className="d-flex justify-content-between mt-2">
                  <i className="fas fa-trash"></i>
                  <a href="#" className="btn btn-sm btn-outline-primary">
                    Add To Bag
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="footer bg-light">
        <div className="container">
          <div className="row text-center text-md-start">
            <h5 className="fw-bold">
              <a className="navbar-brand fw-bold" href="#">
                TREN<span>DIFY</span>
              </a>
            </h5>
            <div className="col-md-4">
              <h6 className="fw-bold">CUSTOMER SERVICE</h6>
              <a href="#">Contact Us</a>
              <br />
              <a href="#">Track Order</a>
              <br />
              <a href="#">Return Order</a>
              <br />
              <a href="#">Cancel Order</a>
              <a href="/">
                <i className="fas fa-sync-alt"></i> 15 Days Return Policy*
              </a>
              <a href="/">
                <i className="fas fa-credit-card"></i> Cash On Delivery*
              </a>
            </div>
            <div className="col-md-4">
              <h6 className="fw-bold">COMPANY</h6>
              <a href="#">About Us</a>
              <br />
              <a href="#">Terms & Condition</a>
              <br />
              <a href="#">Policy & Privacy</a>
              <br />
              <a href="#">We are Hiring</a>
            </div>
            <div className="col-md-4">
              <h6 className="fw-bold">CONNECT WITH US</h6>
              <p>
                <a href="">
                  <i className="fab fa-facebook"></i> 4.7M people like this
                </a>
                <br />
                <a href="">
                  <i className="fab fa-instagram"></i> 5M people like this
                </a>
                <br />
                <a href="">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="">
                  <i className="fab fa-pinterest"></i>
                </a>
                <a href="">
                  <i className="fab fa-snapchat"></i>
                </a>
                <a href="">
                  <i className="fab fa-apple"></i>
                </a>
              </p>
            </div>
          </div>

          <div className="row mt-3 text-center text-md-start">
            <div className="col-md-4">
              <h6 className="fw-bold">DOWNLOAD THE APP</h6>
              <a href="">
                <img src="googlePlayButton.png" width="130" alt="Google Play" />
              </a>
              <a href="">
                <img src="AppleStoreButton.png" width="130" alt="Apple Store" />
              </a>
            </div>
            <div className="col-md-4">
              <h6 className="fw-bold">100% SECURE PAYMENT</h6>
              <a href="">
                <img src="googlePayButton.png" width="50" alt="Google Pay" />
              </a>
              <a href="">
                <img src="phonePayButton.png" width="50" alt="Phone Pay" />
              </a>
              <a href="">
                <img src="paytmPayButton.png" width="50" alt="Paytm" />
              </a>
            </div>
            <div className="col-md-4">
              <h6 className="fw-bold">KEEP UP TO DATE</h6>
              <form className="d-flex">
                <input
                  type="email"
                  className="form-control me-2"
                  placeholder="Enter Email Id"
                />
                <button className="btn btn-primary">SUBSCRIBE</button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Bootstrap JS */}
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
    </div>
  );
};

export default Wishlist;
