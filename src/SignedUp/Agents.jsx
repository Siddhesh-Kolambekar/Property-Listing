import { useState } from "react";

const Agents = () => {
  const [formData, setFormData] = useState({
    title: "",
    price: 0,
    longitude: 0,
    latitude: 0,
    category: "",
    phone: 0,
    city: "",
    length: 0,
    breadth: 0,
    bhk: 0,
    description: "",
    established: "",
  });

  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  // Create a style tag for responsive styles
  const responsiveStyles = `
    @media (max-width: 1024px) {
      .form-container {
        margin: 20px auto !important;
        width: 90% !important;
        padding: 25px !important;
      }
      .form-grid {
        grid-template-columns: 1fr 1fr !important;
        gap: 15px !important;
      }
      .form-heading {
        font-size: 24px !important;
      }
    }
    
    @media (max-width: 768px) {
      .form-container {
        margin: 15px auto !important;
        padding: 20px !important;
      }
      .form-grid {
        grid-template-columns: 1fr !important;
      }
      .form-heading {
        font-size: 22px !important;
      }
      .form-input, .form-textarea, .form-button {
        padding: 10px !important;
      }
    }
    
    @media (max-width: 480px) {
      .form-container {
        margin: 10px !important;
        padding: 15px !important;
        border-radius: 12px !important;
      }
      .form-heading {
        font-size: 20px !important;
        margin-bottom: 20px !important;
      }
      .form-group {
        margin-bottom: 15px !important;
      }
      .form-label {
        font-size: 13px !important;
      }
      .form-input, .form-textarea {
        font-size: 13px !important;
      }
    }

    /* Hover effects */
    .form-input:hover, .form-textarea:hover {
      border-color: #4361ee !important;
    }
    
    .form-input:focus, .form-textarea:focus {
      border-color: #4361ee !important;
      box-shadow: 0 0 0 2px rgba(67, 97, 238, 0.1) !important;
    }
    
    .form-button:hover:not(:disabled) {
      background-color: #3451db !important;
      transform: translateY(-1px) !important;
    }
    
    .form-button:active:not(:disabled) {
      transform: translateY(0) !important;
    }
  `;

  const containerStyle = {
    maxWidth: '800px',
    margin: '40px auto',
    padding: '30px',
    background: 'linear-gradient(to right bottom, #ffffff, #f8f9fa)',
    boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
    borderRadius: '16px',
    fontFamily: 'Arial, sans-serif'
  };

  const headingStyle = {
    fontSize: '28px',
    fontWeight: '700',
    marginBottom: '30px',
    color: '#2c3e50',
    textAlign: 'center',
    borderBottom: '2px solid #e9ecef',
    paddingBottom: '15px'
  };

  const formGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '20px',
    marginBottom: '20px'
  };

  const formGroupStyle = {
    marginBottom: '20px'
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '8px',
    color: '#495057',
    fontWeight: '600',
    fontSize: '14px'
  };

  const inputStyle = {
    width: '100%',
    padding: '12px',
    border: '1px solid #ced4da',
    borderRadius: '8px',
    fontSize: '14px',
    transition: 'all 0.3s ease',
    outline: 'none',
    backgroundColor: '#fff',
    boxSizing: 'border-box'
  };

  const textareaStyle = {
    ...inputStyle,
    minHeight: '120px',
    resize: 'vertical'
  };

  const buttonStyle = {
    width: '100%',
    padding: '15px',
    backgroundColor: '#4361ee',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    marginTop: '20px'
  };

  const fileInputStyle = {
    ...inputStyle,
    padding: '10px',
    backgroundColor: '#f8f9fa'
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    setImages(e.target.files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Impvb29vdEBnbWFpbC5jb20iLCJpYXQiOjE3Mzg4NzU4NDUsImV4cCI6MTczOTA0ODY0NX0.JNhL-jUbG-hn9FvyUvhdZXCZi5qBCboiYMUnZ_uMFjE";

    if (!token) {
      alert("Authorization token missing. Please log in.");
      setLoading(false);
      return;
    }

    const longitude = Number(formData.longitude);
    const latitude = Number(formData.latitude);

    if (isNaN(longitude) || isNaN(latitude) || longitude < -180 || longitude > 180 || latitude < -90 || latitude > 90) {
      alert("Invalid longitude or latitude.");
      setLoading(false);
      return;
    }

    const coordinates = [longitude, latitude];

    const formDataToSend = new FormData();
    formDataToSend.append("title", formData.title);
    formDataToSend.append("price", formData.price);
    formDataToSend.append("category", formData.category);
    formDataToSend.append("phone", formData.phone);
    formDataToSend.append("city", formData.city);
    formDataToSend.append("length", formData.length);
    formDataToSend.append("breadth", formData.breadth);
    formDataToSend.append("bhk", formData.bhk);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("established", formData.established);
    formDataToSend.append("coordinates", coordinates);

    for (let i = 0; i < images.length; i++) {
      formDataToSend.append("photos", images[i]);
    }

    try {
      const response = await fetch("https://property-gcvo.onrender.com/uploadProperty", {
        method: "POST",
        headers: {
          "Authorization": `${token}`,
        },
        body: formDataToSend,
      });

      const result = await response.json();

      if (response.ok) {
        console.log("Property uploaded successfully:", result);
        alert("Property uploaded successfully!");
      } else {
        console.error("Error uploading property:", result);
        alert(result.msg || "Failed to upload property.");
      }
    } catch (error) {
      console.error("Network error:", error);
      alert("Network error. Check your connection.");
    }

    setLoading(false);
  };

  return (
    <>
      <style>{responsiveStyles}</style>
      <div style={containerStyle} className="form-container">
        <h2 style={headingStyle} className="form-heading">List Your Property</h2>
        <form onSubmit={handleSubmit}>
          <div style={formGridStyle} className="form-grid">
            <div style={formGroupStyle} className="form-group">
              <label style={labelStyle} className="form-label">Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                style={inputStyle}
                className="form-input"
                placeholder="Enter property title"
              />
            </div>

            <div style={formGroupStyle} className="form-group">
              <label style={labelStyle} className="form-label">Price</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                style={inputStyle}
                className="form-input"
                placeholder="Enter price"
              />
            </div>

            <div style={formGroupStyle} className="form-group">
              <label style={labelStyle} className="form-label">Longitude</label>
              <input
                type="number"
                step="any"
                name="longitude"
                value={formData.longitude}
                onChange={handleChange}
                style={inputStyle}
                className="form-input"
                placeholder="Enter longitude"
              />
            </div>

            <div style={formGroupStyle} className="form-group">
              <label style={labelStyle} className="form-label">Latitude</label>
              <input
                type="number"
                step="any"
                name="latitude"
                value={formData.latitude}
                onChange={handleChange}
                style={inputStyle}
                className="form-input"
                placeholder="Enter latitude"
              />
            </div>

            <div style={formGroupStyle} className="form-group">
              <label style={labelStyle} className="form-label">Category</label>
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                style={inputStyle}
                className="form-input"
                placeholder="Enter category"
              />
            </div>

            <div style={formGroupStyle} className="form-group">
              <label style={labelStyle} className="form-label">Phone</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                style={inputStyle}
                className="form-input"
                placeholder="Enter phone number"
              />
            </div>

            <div style={formGroupStyle} className="form-group">
              <label style={labelStyle} className="form-label">City</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
                style={inputStyle}
                className="form-input"
                placeholder="Enter city"
              />
            </div>

            <div style={formGroupStyle} className="form-group">
              <label style={labelStyle} className="form-label">Length (ft)</label>
              <input
                type="number"
                name="length"
                value={formData.length}
                onChange={handleChange}
                required
                style={inputStyle}
                className="form-input"
                placeholder="Enter length"
              />
            </div>

            <div style={formGroupStyle} className="form-group">
              <label style={labelStyle} className="form-label">Breadth (ft)</label>
              <input
                type="number"
                name="breadth"
                value={formData.breadth}
                onChange={handleChange}
                required
                style={inputStyle}
                className="form-input"
                placeholder="Enter breadth"
              />
            </div>

            <div style={formGroupStyle} className="form-group">
              <label style={labelStyle} className="form-label">BHK</label>
              <input
                type="number"
                name="bhk"
                value={formData.bhk}
                onChange={handleChange}
                required
                style={inputStyle}
                className="form-input"
                placeholder="Enter BHK"
              />
            </div>
          </div>

          <div style={formGroupStyle} className="form-group">
            <label style={labelStyle} className="form-label">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              style={textareaStyle}
              className="form-textarea"
              placeholder="Enter property description"
            ></textarea>
          </div>

          <div style={formGroupStyle} className="form-group">
            <label style={labelStyle} className="form-label">Established Date</label>
            <input
              type="date"
              name="established"
              value={formData.established}
              onChange={handleChange}
              required
              style={inputStyle}
              className="form-input"
            />
          </div>

          <div style={formGroupStyle} className="form-group">
            <label style={labelStyle} className="form-label">Upload Images</label>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageChange}
              style={fileInputStyle}
              className="form-input"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              ...buttonStyle,
              backgroundColor: loading ? '#a0aec0' : '#4361ee',
              cursor: loading ? 'not-allowed' : 'pointer',
            }}
            className="form-button"
          >
            {loading ? "Uploading..." : "Submit Property"}
          </button>
        </form>
      </div>
    </>
  );
};

export default Agents;