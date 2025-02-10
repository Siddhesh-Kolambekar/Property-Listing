import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import "../../src/App.css";

const PropertyCard = React.memo(({ property }) => {
  const navigate = useNavigate();
  const { rating } = property;

  const renderStars = useMemo(() => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <span key={i} style={{ color: i < rating ? "#FFD700" : "#E2E8F0" }}>
          {i < Math.floor(rating) ? "★" : "☆"}
        </span>
      );
    }
    return stars;
  }, [rating]);

  return (
    <div className="propertyCard">
      <div className="imageContainer">
        <img src={property.imageUrls[0] || "https://via.placeholder.com/300"} alt={property.title} className="image" />
        <div className="priceTag">${property.price.toLocaleString()}</div>
      </div>
      <div className="content">
        <h3 className="title">{property.title}</h3>
        <p className="location">{property.city}</p>
        <div className="details">
          <span>{property.bhk} BHK</span>
          <span>|</span>
          <span>{property.length * property.breadth} sq ft</span>
        </div>
        <div className="rating">
          {renderStars} <span>({rating})</span>
        </div>
        <button
          onClick={() => navigate(`/dashboard/property/${property._id}`, { state: { property } })}
          className="viewButton"
        >
          View Details
        </button>
      </div>
    </div>
  );
});

const Property = () => {
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
    <div className="container">
      <div className="propertiesGrid">
        {loading ? (
          <p>Loading properties...</p>
        ) : (
          properties.map((property) => (
            <PropertyCard key={property._id} property={property} />
          ))
        )}
      </div>
    </div>
  );
};

export default Property;
