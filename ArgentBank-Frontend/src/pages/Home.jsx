import Header from "../components/Header";
import Banner from "../components/Banner";
import Footer from '../components/Footer';
import imgchat from '../img/icon-chat.webp';
import imgmoney from '../img/icon-money.webp';
import imgsecu from '../img/icon-security.webp';



function Home () {

    return (
      <div className="home">
          <Header />
          <Banner />
          <section className="features">
        <h2 className="sr-only">Features</h2>
        <div className="feature-item">
          <img src={imgchat} alt="Chat Icon" className="feature-icon" />
          <h3 className="feature-item-title">You are our #1 priority</h3>
          <p>
            Need to talk to a representative? You can get in touch through our
            24/7 chat or through a phone call in less than 5 minutes.
          </p>
        </div>
        <div className="feature-item">
          <img
            src={imgmoney}
            alt="Chat Icon"
            className="feature-icon"
          />
          <h3 className="feature-item-title">More savings means higher rates</h3>
          <p>
            The more you save with us, the higher your interest rate will be!
          </p>
        </div>
        <div className="feature-item">
          <img
            src={imgsecu}
            alt="Chat Icon"
            className="feature-icon"
          />
          <h3 className="feature-item-title">Security you can trust</h3>
          <p>
            We use top of the line encryption to make sure your data and money
            is always safe.
          </p>
        </div>
      </section>
      <Footer />
      </div>
    )
}

export default Home;