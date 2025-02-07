import { useState } from "react";

const Agents = () => {
  const [formData, setFormData] = useState({
    title: "Spacious 2BHK Apartment",
    price: 1500000,
    longitude: -122.4194,
    latitude: 37.7749,
    category: "Residential",
    phone: "+1234567890",
    city: "San Francisco",
    length: 30,
    breadth: 40,
    bhk: 2,
    description: "A beautiful and spacious 2BHK apartment located in the heart of the city.",
    established: "2015-01-01", 
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

    const formDataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      formDataToSend.append(key, value);
    });

    for (let i = 0; i < images.length; i++) {
      formDataToSend.append("photos", images[i]);
    }

    try {
      const response = await fetch("https://property-gcvo.onrender.com/uploadProperty", {
        method: "POST",
        headers: {
          "Authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Impvb29vdEBnbWFpbC5jb20iLCJpYXQiOjE3Mzg4NzU4NDUsImV4cCI6MTczOTA0ODY0NX0.JNhL-jUbG-hn9FvyUvhdZXCZi5qBCboiYMUnZ_uMFjE",
        },
        body: formDataToSend,
      });

      const result = await response.json();
      if (response.ok) {
        alert("Property uploaded successfully!");
      } else {
        alert(result.msg || "Failed to upload property.");
      }
    } catch (error) {
      alert("Network error. Check your connection.");
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="title" value={formData.title} onChange={handleChange} />
      <input type="number" name="price" value={formData.price} onChange={handleChange} />
      <input type="text" name="longitude" value={formData.longitude} onChange={handleChange} />
      <input type="text" name="latitude" value={formData.latitude} onChange={handleChange} />
      <input type="text" name="category" value={formData.category} onChange={handleChange} />
      <input type="tel" name="phone" value={formData.phone} onChange={handleChange} />
      <input type="text" name="city" value={formData.city} onChange={handleChange} />
      <input type="number" name="length" value={formData.length} onChange={handleChange} />
      <input type="number" name="breadth" value={formData.breadth} onChange={handleChange} />
      <input type="number" name="bhk" value={formData.bhk} onChange={handleChange} />
      <textarea name="description" value={formData.description} onChange={handleChange}></textarea>
      <input type="number" name="established" value={formData.established} onChange={handleChange} />
      <input type="file" multiple accept="image/*" onChange={handleImageChange} />
      <button type="submit" disabled={loading}>{loading ? "Uploading..." : "Submit"}</button>
    </form>
  );
};

export default Agents;
