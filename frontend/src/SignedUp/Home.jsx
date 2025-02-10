import React, { useState, useEffect } from "react";
import home from "../../public/home.webp";
import "../../src/App.css";

const PropertyCard = React.memo(({ property }) => {
  const { title, city, bhk, price, imageUrls, rating } = property;

  const renderStars = () => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <span key={i} style={{ color: i < rating ? "#FFD700" : "#E2E8F0" }}>
          {i < Math.floor(rating) ? "★" : "☆"}
        </span>
      );
    }
    return stars;
  };

  return (
    <div className="property-card">
      <div className="image-container">
        <img src={imageUrls?.[0] || "https://via.placeholder.com/300"} alt={title} />
        <div className="price-tag">${price.toLocaleString()}</div>
      </div>
      <div className="content">
        <h3 className="title">{title}</h3>
        <p className="location">{city}</p>
        <div className="details">
          <span>{bhk} BHK</span>
        </div>
        <div className="rating">
          {renderStars()} <span>({rating})</span>
        </div>
      </div>
    </div>
  );
});

const Home = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://property-gcvo.onrender.com/propertyget")
      .then((response) => response.json())
      .then((data) => {
        setProperties(Array.isArray(data) ? data : [data]);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching properties:", error);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <header className="home-header" style={{ backgroundImage: `url(${home})` }}>
        <h1>Find Your Dream Home</h1>
        <p>Discover the perfect property that matches your lifestyle</p>
        <button className="button">Logout</button>
      </header>
      <div className="home-container">
        {loading ? (
          <p>Loading properties...</p>
        ) : (
          <div className="properties-grid">
            {properties.map((property) => (
              <PropertyCard key={property._id} property={property} />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
