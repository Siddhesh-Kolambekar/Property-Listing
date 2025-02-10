import { useState, useEffect, useRef } from "react";

const Agents = () => {
  const [formData, setFormData] = useState({
    title: "",
    price: 0,
    longitude: "",
    latitude: "",
    category: "",
    phone: "",
    city: "",
    length: 0,
    breadth: 0,
    bhk: 0,
    description: "",
    established: "",
  });

  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const mapRef = useRef(null);

  const styles = {
    page: {
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      width: '100%',
      margin: 0,
      padding: '20px',
      boxSizing: 'border-box',
      fontFamily: 'Roboto, Arial, sans-serif',
      backgroundColor: '#f8f9fa',
      gap: '20px',
      '@media (min-width: 1024px)': {
        flexDirection: 'row',
      }
    },

    formContainer: {
      width: '100%',
      backgroundColor: '#fff',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
      padding: '20px',
      overflowY: 'auto',
      '@media (min-width: 1024px)': {
        flex: '0 0 400px',
        height: 'calc(100vh - 40px)',
      }
    },

    mapContainer: {
      width: '100%',
      height: '400px',
      backgroundColor: '#fff',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
      overflow: 'hidden',
      '@media (min-width: 1024px)': {
        flex: 1,
        height: 'calc(100vh - 40px)',
      }
    },

    form: {
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
    },

    inputGroup: {
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
    },

    label: {
      fontSize: '14px',
      color: '#5f6368',
      marginBottom: '4px',
      fontWeight: '500',
    },

    input: {
      padding: '8px 12px',
      border: '1px solid #dadce0',
      borderRadius: '4px',
      fontSize: '14px',
      color: '#3c4043',
      backgroundColor: '#fff',
      outline: 'none',
      width: '100%',
      boxSizing: 'border-box',
    },

    coordinates: {
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
      marginTop: '8px',
      '@media (min-width: 480px)': {
        flexDirection: 'row',
      }
    },

    coordinateInput: {
      flex: 1,
    },

    textarea: {
      padding: '8px 12px',
      border: '1px solid #dadce0',
      borderRadius: '4px',
      fontSize: '14px',
      color: '#3c4043',
      backgroundColor: '#fff',
      outline: 'none',
      width: '100%',
      height: '100px',
      resize: 'vertical',
      boxSizing: 'border-box',
    },

    button: {
      backgroundColor: '#1a73e8',
      color: '#fff',
      padding: '12px 24px',
      border: 'none',
      borderRadius: '4px',
      fontSize: '14px',
      fontWeight: '500',
      cursor: 'pointer',
      transition: 'background-color 0.2s',
      marginTop: '8px',
      width: '100%',
      '@media (min-width: 480px)': {
        width: 'auto',
      }
    },

    buttonDisabled: {
      backgroundColor: '#dadce0',
      cursor: 'not-allowed',
    },

    title: {
      color: '#202124',
      marginBottom: '24px',
      fontSize: '24px',
      '@media (max-width: 480px)': {
        fontSize: '20px',
        marginBottom: '16px',
      }
    }
  };

  // Handlers remain the same
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    setImages([...e.target.files]);
  };

  useEffect(() => {
    if (window.L && !mapRef.current) {
      mapRef.current = true;
      const map = window.L.map("map", { 
        center: [28.61, 77.23], 
        zoom: 5,
        zoomControl: true,
        scrollWheelZoom: true,
      });
      
      window.L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);
      const marker = window.L.marker([28.61, 77.23], { draggable: true }).addTo(map);

      const updateCoordinates = (lat, lng) => {
        setFormData((prev) => ({
          ...prev,
          latitude: lat.toFixed(6),
          longitude: lng.toFixed(6),
        }));
      };

      marker.on("dragend", (event) => {
        const { lat, lng } = event.target.getLatLng();
        updateCoordinates(lat, lng);
      });

      map.on("click", (event) => {
        const { lat, lng } = event.latlng;
        marker.setLatLng([lat, lng]);
        updateCoordinates(lat, lng);
      });

      const handleResize = () => {
        map.invalidateSize();
      };
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formDataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      formDataToSend.append(key, value);
    });

    images.forEach((image) => {
      formDataToSend.append("photos", image);
    });

    try {
      const response = await fetch("https://property-gcvo.onrender.com/uploadProperty", {
        method: "POST",
        headers: {
          "Authorization": localStorage.getItem("token"),
        },
        body: formDataToSend,
      });

      const result = await response.json();
      alert(response.ok ? "Property uploaded successfully!" : result.msg || "Failed to upload property.");
    } catch (error) {
      alert("Network error. Check your connection.");
    }
    setLoading(false);
  };

  return (
    <div style={styles.page}>
      <div style={styles.formContainer}>
        <h2 style={styles.title}>Add New Property</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Title</label>
            <input
              style={styles.input}
              type="text"
              name="title"
              placeholder="Enter property title"
              value={formData.title}
              onChange={handleChange}
              disabled={loading}
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Price</label>
            <input
              style={styles.input}
              type="number"
              name="price"
              placeholder="Enter price"
              value={formData.price}
              onChange={handleChange}
              disabled={loading}
            />
          </div>

          <div style={styles.coordinates}>
            <div style={{...styles.inputGroup, ...styles.coordinateInput}}>
              <label style={styles.label}>Latitude</label>
              <input
                style={styles.input}
                type="text"
                name="latitude"
                value={formData.latitude}
                placeholder="Latitude"
                readOnly
              />
            </div>
            <div style={{...styles.inputGroup, ...styles.coordinateInput}}>
              <label style={styles.label}>Longitude</label>
              <input
                style={styles.input}
                type="text"
                name="longitude"
                value={formData.longitude}
                placeholder="Longitude"
                readOnly
              />
            </div>
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Category</label>
            <input
              style={styles.input}
              type="text"
              name="category"
              placeholder="Enter category"
              value={formData.category}
              onChange={handleChange}
              disabled={loading}
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Phone Number</label>
            <input
              style={styles.input}
              type="tel"
              name="phone"
              placeholder="Enter phone number"
              value={formData.phone}
              onChange={handleChange}
              disabled={loading}
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>City</label>
            <input
              style={styles.input}
              type="text"
              name="city"
              placeholder="Enter city"
              value={formData.city}
              onChange={handleChange}
              disabled={loading}
            />
          </div>

          <div style={styles.coordinates}>
            <div style={{...styles.inputGroup, ...styles.coordinateInput}}>
              <label style={styles.label}>Length (ft)</label>
              <input
                style={styles.input}
                type="number"
                name="length"
                placeholder="Enter length"
                value={formData.length}
                onChange={handleChange}
                disabled={loading}
              />
            </div>
            <div style={{...styles.inputGroup, ...styles.coordinateInput}}>
              <label style={styles.label}>Breadth (ft)</label>
              <input
                style={styles.input}
                type="number"
                name="breadth"
                placeholder="Enter breadth"
                value={formData.breadth}
                onChange={handleChange}
                disabled={loading}
              />
            </div>
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>BHK</label>
            <input
              style={styles.input}
              type="number"
              name="bhk"
              placeholder="Enter BHK"
              value={formData.bhk}
              onChange={handleChange}
              disabled={loading}
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Description</label>
            <textarea
              style={styles.textarea}
              name="description"
              placeholder="Enter property description"
              value={formData.description}
              onChange={handleChange}
              disabled={loading}
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Established Year</label>
            <input
              style={styles.input}
              type="number"
              name="established"
              placeholder="Enter established year"
              value={formData.established}
              onChange={handleChange}
              disabled={loading}
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Images</label>
            <input
              style={styles.input}
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageChange}
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            style={{
              ...styles.button,
              ...(loading ? styles.buttonDisabled : {})
            }}
            disabled={loading}
          >
            {loading ? "Uploading..." : "Add Property"}
          </button>
        </form>
      </div>

      <div style={styles.mapContainer} id="map"></div>
    </div>
  );
};

export default Agents;