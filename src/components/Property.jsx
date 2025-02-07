import React, { useState, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";

const styles = {
  container: {
    maxWidth: "100%",
    margin: "0 auto",
    padding: "24px",
    backgroundColor: "#f7fafc",
  },
  filters: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "24px",
    marginBottom: "32px",
  },
  filterGroup: {
    background: "white",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  },
  input: {
    width: "100%",
    padding: "8px 12px",
    border: "1px solid #e2e8f0",
    borderRadius: "6px",
    fontSize: "1rem",
    display:"grid",
    alignSelf:"center",
    justifySelf:"center"
  },
  propertiesGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
    gap: "24px",
  },
  propertyCard: {
    border: "1px solid #e2e8f0",
    borderRadius: "12px",
    overflow: "hidden",
    backgroundColor: "white",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    transition: "transform 0.2s",
    display: "flex",
    flexDirection: "column",
  },
  imageContainer: {
    position: "relative",
    height: "200px",
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  priceTag: {
    position: "absolute",
    bottom: "12px",
    left: "12px",
    background: "rgba(0, 0, 0, 0.7)",
    color: "white",
    padding: "6px 12px",
    borderRadius: "20px",
    fontWeight: "bold",
  },
  content: {
    padding: "16px",
  },
  title: {
    fontSize: "1.25rem",
    fontWeight: "bold",
    marginBottom: "8px",
    color: "#2d3748",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    overflow: "hidden",
  },
  location: {
    color: "#4a5568",
    marginBottom: "12px",
    fontSize: "0.9rem",
  },
  details: {
    display: "flex",
    gap: "16px",
    marginBottom: "12px",
    color: "#718096",
    fontSize: "0.9rem",
  },
  rating: {
    marginBottom: "16px",
    fontSize: "1.1rem",
  },
  viewButton: {
    width: "100%",
    backgroundColor: "#4299e1",
    color: "white",
    padding: "8px 16px",
    borderRadius: "6px",
    border: "none",
    cursor: "pointer",
  },
  suggestionContainer: {
    position: "relative",
  },
  suggestions: {
    position: "absolute",
    top: "100%",
    left: 0,
    right: 0,
    background: "white",
    border: "1px solid #e2e8f0",
    borderRadius: "6px",
    marginTop: "4px",
    padding: 0,
    listStyle: "none",
    maxHeight: "200px",
    overflowY: "auto",
    zIndex: 10,
  },
  suggestionItem: {
    padding: "8px 12px",
    cursor: "pointer",
  },
  label: {
    display: "block",
    fontSize: "1rem",
    fontWeight: "600",
    marginBottom: "8px",
    color: "#2d3748",
  },
};

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
    <div style={styles.propertyCard}>
      <div style={styles.imageContainer}>
        <img src={property.image} alt={property.title} style={styles.image} />
        <div style={styles.priceTag}>${property.price.toLocaleString()}</div>
      </div>
      <div style={styles.content}>
        <h3 style={styles.title}>{property.title}</h3>
        <p style={styles.location}>{property.location}</p>
        <div style={styles.details}>
          <span>{property.bedrooms} Beds</span>
          <span>|</span>
          <span>{property.bathrooms} Baths</span>
          <span>|</span>
          <span>{property.area} sq ft</span>
        </div>
        <div style={styles.rating}>
          {renderStars} <span>({rating})</span>
        </div>
        <button 
          onClick={() => navigate(`/property/${property.id}`, { state: { property } })} 
          style={styles.viewButton}
        >
          View Details
        </button>
      </div>
    </div>
  );
});

const Property = () => {
  const [filters, setFilters] = useState({
    minPrice: 0,
    maxPrice: 5000000,
    bedrooms: "",
    location: "",
    title: "",
    minRating: 0,
  });

  const [suggestions, setSuggestions] = useState({
    location: [],
    title: [],
  });

  const properties = useMemo(() => [
    {
      id: 1,
      title: "Modern Downtown Apartment",
      location: "Downtown, New York",
      bedrooms: 2,
      bathrooms: 2,
      area: 1200,
      price: 750000,
      image: "https://images.pexels.com/photos/259950/pexels-photo-259950.jpeg",
      rating: 4.5,
      favorite: false,
    },
    {
      id: 2,
      title: "Luxury Beach House",
      location: "Malibu, California",
      bedrooms: 4,
      bathrooms: 3,
      area: 2800,
      price: 2500000,
      image: "https://images.pexels.com/photos/210617/pexels-photo-210617.jpeg",
      rating: 4.7,
      favorite: true,
    },
    {
      id: 3,
      title: "Cozy Suburban Home",
      location: "Austin, Texas",
      bedrooms: 3,
      bathrooms: 2,
      area: 1800,
      price: 450000,
      image: "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg",
      rating: 4.0,
      favorite: false,
    },
    {
      id: 4,
      title: "Mountain View Villa",
      location: "Denver, Colorado",
      bedrooms: 5,
      bathrooms: 4,
      area: 3500,
      price: 1200000,
      image:
        "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg",
      rating: 4.6,
      favorite: true,
    },
    {
      id: 5,
      title: "Penthouse Suite",
      location: "Chicago, Illinois",
      bedrooms: 3,
      bathrooms: 3,
      area: 2500,
      price: 1800000,
      image: "https://images.pexels.com/photos/374870/pexels-photo-374870.jpeg",
      rating: 4.8,
      favorite: false,
    },
    {
      id: 6,
      title: "Historic Townhouse",
      location: "Boston, Massachusetts",
      bedrooms: 4,
      bathrooms: 3,
      area: 2200,
      price: 950000,
      image: "https://images.pexels.com/photos/259685/pexels-photo-259685.jpeg",
      rating: 4.3,
      favorite: true,
    },
    {
      id: 7,
      title: "Lakefront Cottage",
      location: "Lake Tahoe, Nevada",
      bedrooms: 3,
      bathrooms: 2,
      area: 1600,
      price: 850000,
      image: "https://images.pexels.com/photos/462024/pexels-photo-462024.jpeg",
      rating: 4.2,
      favorite: false,
    },
    {
      id: 8,
      title: "Urban Loft",
      location: "Seattle, Washington",
      bedrooms: 2,
      bathrooms: 2,
      area: 1400,
      price: 700000,
      image: "https://images.pexels.com/photos/373893/pexels-photo-373893.jpeg",
      rating: 4.1,
      favorite: true,
    },
    {
      id: 9,
      title: "Ranch Estate",
      location: "Dallas, Texas",
      bedrooms: 5,
      bathrooms: 4,
      area: 4000,
      price: 1500000,
      image: "https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg",
      rating: 4.4,
      favorite: false,
    },
    {
      id: 10,
      title: "Ski Chalet",
      location: "Aspen, Colorado",
      bedrooms: 4,
      bathrooms: 3,
      area: 3000,
      price: 2000000,
      image: "https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg",
      rating: 4.9,
      favorite: true,
    },
    {
      id: 11,
      title: "Desert Oasis",
      location: "Scottsdale, Arizona",
      bedrooms: 3,
      bathrooms: 3,
      area: 2800,
      price: 1200000,
      image: "https://images.pexels.com/photos/210617/pexels-photo-210617.jpeg",
      rating: 4.3,
      favorite: false,
    },
    {
      id: 12,
      title: "Countryside Farmhouse",
      location: "Nashville, Tennessee",
      bedrooms: 4,
      bathrooms: 3,
      area: 3200,
      price: 950000,
      image: "https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg",
      rating: 4.0,
      favorite: true,
    },
    {
      id: 13,
      title: "High-Rise Condo",
      location: "Miami, Florida",
      bedrooms: 2,
      bathrooms: 2,
      area: 1500,
      price: 850000,
      image: "https://images.pexels.com/photos/323705/pexels-photo-323705.jpeg",
      rating: 3.8,
      favorite: false,
    },
    {
      id: 14,
      title: "Victorian Mansion",
      location: "San Francisco, California",
      bedrooms: 6,
      bathrooms: 5,
      area: 5000,
      price: 3500000,
      image: "https://images.pexels.com/photos/259685/pexels-photo-259685.jpeg",
      rating: 5.0,
      favorite: true,
    },
    {
      id: 15,
      title: "Colonial Home",
      location: "Philadelphia, Pennsylvania",
      bedrooms: 4,
      bathrooms: 3,
      area: 2800,
      price: 900000,
      image: "https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg",
      rating: 4.3,
      favorite: false,
    },
    {
      id: 16,
      title: "Mediterranean Villa",
      location: "Los Angeles, California",
      bedrooms: 5,
      bathrooms: 4,
      area: 4500,
      price: 2700000,
      image: "https://images.pexels.com/photos/210617/pexels-photo-210617.jpeg",
      rating: 4.6,
      favorite: true,
    },
    {
      id: 17,
      title: "Tropical Bungalow",
      location: "Honolulu, Hawaii",
      bedrooms: 3,
      bathrooms: 2,
      area: 2000,
      price: 1800000,
      image: "https://images.pexels.com/photos/462024/pexels-photo-462024.jpeg",
      rating: 4.5,
      favorite: false,
    },
  ], []);

  const generateSuggestions = useCallback((key, value) => {
    if (!value) return [];
    const lowercaseValue = value.toLowerCase();
    return [...new Set(
      properties
        .map(property => property[key])
        .filter(item => 
          item.toLowerCase().includes(lowercaseValue) && 
          item.toLowerCase() !== lowercaseValue
        )
    )].slice(0, 5);
  }, [properties]);

  const handleFilterChange = useCallback((key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    if (key === "location" || key === "title") {
      setSuggestions(prev => ({ 
        ...prev, 
        [key]: generateSuggestions(key, value)
      }));
    }
  }, [generateSuggestions]);

  const filteredProperties = useMemo(() => 
    properties.filter(property => 
      property.price >= filters.minPrice &&
      property.price <= filters.maxPrice &&
      property.rating >= filters.minRating &&
      (!filters.bedrooms || property.bedrooms === Number(filters.bedrooms)) &&
      (!filters.location || property.location.toLowerCase().includes(filters.location.toLowerCase())) &&
      (!filters.title || property.title.toLowerCase().includes(filters.title.toLowerCase()))
    ), [properties, filters]);

  return (
    <div style={styles.container}>
      <div style={styles.filters}>
        {["title", "location"].map(filterType => (
          <div key={filterType} style={styles.filterGroup}>
            <label style={styles.label}>
              Search by {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
            </label>
            <div style={styles.suggestionContainer}>
              <input
                type="text"
                placeholder={`Enter ${filterType}...`}
                value={filters[filterType]}
                onChange={e => handleFilterChange(filterType, e.target.value)}
                style={styles.input}
              />
              {suggestions[filterType].length > 0 && (
                <ul style={styles.suggestions}>
                  {suggestions[filterType].map((suggestion, index) => (
                    <li
                      key={index}
                      style={styles.suggestionItem}
                      onClick={() => {
                        setFilters(prev => ({ ...prev, [filterType]: suggestion }));
                        setSuggestions(prev => ({ ...prev, [filterType]: [] }));
                      }}
                    >
                      {suggestion}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        ))}

        <div style={styles.filterGroup}>
          <label style={styles.label}>Bedrooms</label>
          <select 
            value={filters.bedrooms} 
            onChange={e => handleFilterChange("bedrooms", e.target.value)}
            style={styles.input}
          >
            <option value="">Any</option>
            {[1, 2, 3, 4, 5].map(num => (
              <option key={num} value={num}>
                {num} {num === 1 ? "Bedroom" : "Bedrooms"}
              </option>
            ))}
          </select>
        </div>

        <div style={styles.filterGroup}>
          <label style={styles.label}>Price Range</label>
          <input 
            type="range" 
            min="0" 
            max="5000000" 
            value={filters.minPrice} 
            onChange={e => handleFilterChange("minPrice", Number(e.target.value))}
            style={styles.input} 
          />
          <span>${filters.minPrice.toLocaleString()} - ${filters.maxPrice.toLocaleString()}</span>
        </div>

        <div style={styles.filterGroup}>
          <label style={styles.label}>Minimum Rating</label>
          <input 
            type="range" 
            min="0" 
            max="5" 
            step="0.1" 
            value={filters.minRating} 
            onChange={e => handleFilterChange("minRating", Number(e.target.value))}
            style={styles.input} 
          />
          <span>{filters.minRating} Stars</span>
        </div>
      </div>

      <div style={styles.propertiesGrid}>
        {filteredProperties.map(property => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
    </div>
  );
};

export default Property;