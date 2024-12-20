import homeImage from "../assets/resources/home.png"
import heroImage from "../assets/resources/design.png"
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { FiUsers } from "react-icons/fi";
import { GrDeliver } from "react-icons/gr";
import { MdCreditScore } from "react-icons/md";

export const Home = () => {
  return (
    <>
      <main>
        <section className="section-hero">
          <div className="container grid grid-two-cols">
            <div className="hero-content">
              <p>Your Ultimate Shopping Destination</p>
              <h1>Welcome to ShopVista</h1>
              <p>
                Discover a world of endless possibilities with our curated collection
                of premium products. From trending fashion to cutting-edge electronics,
                we bring you the finest selection at unbeatable prices. Shop smart,
                live better with ShopVista.
              </p>
              <div className="btn btn-group">
                <a href="/service">
                  <button className="btn">shop now</button>
                </a>
                <a href="/contact">
                  <button className="btn secondary-btn">explore deals</button>
                </a>
              </div>
            </div>

            {/* hero images  */}
            <div className="hero-image">
              <img
                src={homeImage}
                alt="coding together"
                width="400"
                height="500"
              />
            </div>
          </div>
        </section>
      </main>

      {/* 2nd section  */}
      {/* <Analytics /> */}
      <div className="section-analytics">
        <div className="container grid grid-four-cols">
          <div className="div1">
            <h2><RiMoneyDollarCircleLine /></h2>
            <p>Value-for-money</p>
          </div>
          <div className="div1">
            <h2><FiUsers /></h2>
            <p>Shoppers Worldwide</p>
          </div>
          <div className="div1">
            <h2><GrDeliver /></h2>
            <p>Fast Delivery</p>
          </div>
          <div className="div1">
            <h2><MdCreditScore /></h2>
            <p>Safe Payments</p>
          </div>
        </div>
      </div>

      {/* 3rd section  */}
      <section className="section-hero">
        <div className="container grid grid-two-cols">
          {/* hero images  */}
          <div className="hero-image">
            <img
              src={heroImage}
              alt="coding together"
              width="400"
              height="500"
            />
          </div>

          <div className="hero-content">
            <p>Elevate Your Shopping Experience</p>
            <h1>Why Choose ShopVista?</h1>
            <p>
              Join millions of satisfied customers who trust us for their shopping needs.
              Experience lightning-fast delivery, secure payments, and exceptional
              customer service. With our vast selection and competitive prices,
              finding your perfect match has never been easier.
            </p>
            <div className="btn btn-group">
              <a href="/service">
                <button className="btn">start shopping</button>
              </a>
              <a href="/contact">
                <button className="btn secondary-btn">Contact Us</button>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};