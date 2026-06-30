import React from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import { useState, useEffect } from "react";
import axios from "axios";

function Countdown({ expiryDate }) {
  const calculate = () => {
    const diff = expiryDate - Date.now()
    if (diff <= 0) return null

    return {
      hours:   Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    }
  }

  const [timeLeft, setTimeLeft] = useState(calculate())

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(calculate())
    }, 1000)

    return () => clearInterval(interval)
  }, [expiryDate])

  if (!timeLeft) return null;

  return (
    <span>
      {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
    </span>
  )
}



const NewItems = () => {

const [items, setItems] = useState([])
const [isLoading, setIsLoading] = useState(true);

useEffect(() => {
axios.get("https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems")
.then((response) => {
  setTimeout(() => {
        setItems(response.data);
        setIsLoading(false);
      }, 4000)
    })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      });
}, [])




  return (
    <section id="section-items" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          {isLoading
  ? new Array(8).fill(0).map((_, index) => (
  <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={index}>
  <div className="nft__item">
    <div className="author_list_pp">
      <Link to="#">
        <div style={{
          width: "50px",
          height: "50px",
          borderRadius: "50%",
          background: "linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)",
          backgroundSize: "200% 100%",
          animation: "shimmer 1.5s infinite"
        }}></div>
      </Link>
    </div>
    <div className="nft__item_wrap">
     
  <div className="skeleton-img"></div>
        <div style={{
          width: "100%",
          height: "350px",
          background: "linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)",
          backgroundSize: "200% 100%",
          animation: "shimmer 1.5s infinite",
          borderRadius: "8px",
          display: "block"
        }}></div>
      
    </div>
    <div className="nft__item_info">
      <div className="skeleton-line"></div>
      <div className="skeleton-line short"></div>
    </div>
  </div>
</div>
    )) :
          items.map((item, index) => (
            <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={index}>
              <div className="nft__item">
                <div className="author_list_pp">
                  <Link
                    to="/author"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title="Creator: Monica Lucas"
                  >
                    <img className="lazy" src={item.authorImage} alt="" />
                    <i className="fa fa-check"></i>
                  </Link>
                </div>
                {item.expiryDate && (
                <div className="de_countdown">
                <Countdown expiryDate={item.expiryDate} />
                </div>
                )}
                <div className="nft__item_wrap">
                  <div className="nft__item_extra">
                    <div className="nft__item_buttons">
                      <button>Buy Now</button>
                      <div className="nft__item_share">
                        <h4>Share</h4>
                        <a href="" target="_blank" rel="noreferrer">
                          <i className="fa fa-facebook fa-lg"></i>
                        </a>
                        <a href="" target="_blank" rel="noreferrer">
                          <i className="fa fa-twitter fa-lg"></i>
                        </a>
                        <a href="">
                          <i className="fa fa-envelope fa-lg"></i>
                        </a>
                      </div>
                    </div>
                  </div>

                 <Link to={`/item-details/${item.id}`}>
                    <img
                      src={item.nftImage}
                      className="lazy nft__item_preview"
                      alt=""
                    />
                  </Link>
                </div>
                <div className="nft__item_info">
                  <Link to={`/item-details/${item.id}`}>
                    <h4>{item.title}</h4>
                  </Link>
                  <div className="nft__item_price">{item.price} ETH</div>
                  <div className="nft__item_like">
                    <i className="fa fa-heart"></i>
                    <span>{item.likes}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewItems;
