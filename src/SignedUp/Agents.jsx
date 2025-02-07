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

    // ✅ Get token from local storage (Ensure user is logged in)
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Impvb29vdEBnbWFpbC5jb20iLCJpYXQiOjE3Mzg4NzU4NDUsImV4cCI6MTczOTA0ODY0NX0.JNhL-jUbG-hn9FvyUvhdZXCZi5qBCboiYMUnZ_uMFjE";

    if (!token) {
      alert("Authorization token missing. Please log in.");
      setLoading(false);
      return;
    }

    const longitude = Number(formData.longitude);
    const latitude = Number(formData.latitude);

    // ✅ Validation: Ensure correct longitude & latitude
    if (isNaN(longitude) || isNaN(latitude) || longitude < -180 || longitude > 180 || latitude < -90 || latitude > 90) {
      alert("Invalid longitude or latitude.");
      setLoading(false);
      return;
    }

    // ✅ Send `coordinates` as an array, NOT a string or object
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

    // ✅ Send `coordinates` correctly as JSON array
    formDataToSend.append("coordinates", coordinates);
    console.log(coordinates)
    // ✅ Append images
    for (let i = 0; i < images.length; i++) {
      formDataToSend.append("photos", images[i]); // Must match Multer's "photos" field
    }

    try {
      const response = await fetch("https://property-gcvo.onrender.com/uploadProperty", {
        method: "POST",
        headers: {
          "Authorization": `${token}`, // ✅ Ensure token is included
        },
        body: formDataToSend, // ✅ Correctly formatted FormData
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
    <form onSubmit={handleSubmit} style={{ maxWidth: '500px', margin: 'auto', padding: '20px', background: 'white', boxShadow: '0 0 10px rgba(0,0,0,0.1)', borderRadius: '8px' }}>
      <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '15px' }}>Property Details</h2>

      <label>Title:</label>
      <input type="text" name="title" value={formData.title} onChange={handleChange} required />

      <label>Price:</label>
      <input type="number" name="price" value={formData.price} onChange={handleChange} required />

      <label>Longitude:</label>
      <input type="number" step="any" name="longitude" value={formData.longitude} onChange={handleChange}/>

      <label>Latitude:</label>
      <input type="number" step="any" name="latitude" value={formData.latitude} onChange={handleChange}/>

      <label>Category:</label>
      <input type="text" name="category" value={formData.category} onChange={handleChange} required />

      <label>Phone:</label>
      <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />

      <label>City:</label>
      <input type="text" name="city" value={formData.city} onChange={handleChange} required />

      <label>Length:</label>
      <input type="number" name="length" value={formData.length} onChange={handleChange} required />

      <label>Breadth:</label>
      <input type="number" name="breadth" value={formData.breadth} onChange={handleChange} required />

      <label>BHK:</label>
      <input type="number" name="bhk" value={formData.bhk} onChange={handleChange} required />

      <label>Description:</label>
      <textarea name="description" value={formData.description} onChange={handleChange} required></textarea>

      <label>Established Date:</label>
      <input type="date" name="established" value={formData.established} onChange={handleChange} required />

      <label>Upload Images:</label>
      <input type="file" multiple accept="image/*" onChange={handleImageChange} />

      <button type="submit" disabled={loading} style={{ width: '100%', padding: '10px', backgroundColor: 'blue', color: 'white', borderRadius: '4px', border: 'none' }}>
        {loading ? "Uploading..." : "Submit"}
      </button>
    </form>
  );
};

export default Agents;
