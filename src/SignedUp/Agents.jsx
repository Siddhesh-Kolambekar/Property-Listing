import { useState, useEffect, useRef } from "react";

const Agents = () => {
  const [formData, setFormData] = useState({
    title: "Spacious 2BHK Apartment",
    price: 1500000,
    longitude: "",
    latitude: "",
    category: "Residential",
    phone: "+1234567890",
    city: "San Francisco",
    length: 30,
    breadth: 40,
    bhk: 2,
    description: "A beautiful and spacious 2BHK apartment located in the heart of the city.",
    established: "2015",
  });

  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const mapRef = useRef(null); // Track map initialization

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
      mapRef.current = true; // Prevent duplicate initialization

      const map = window.L.map("map", { center: [28.61, 77.23], zoom: 5 });
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
          "Authorization": localStorage.getItem(token),
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
    <form onSubmit={handleSubmit}>
      <input type="text" name="title" value={formData.title} onChange={handleChange} disabled={loading} />
      <input type="number" name="price" value={formData.price} onChange={handleChange} disabled={loading} />
      <input type="text" name="longitude" value={formData.longitude} readOnly />
      <input type="text" name="latitude" value={formData.latitude} readOnly />
      <div id="map" style={{ width: "100%", height: "300px" }}></div>
      <input type="text" name="category" value={formData.category} onChange={handleChange} disabled={loading} />
      <input type="tel" name="phone" value={formData.phone} onChange={handleChange} disabled={loading} />
      <input type="text" name="city" value={formData.city} onChange={handleChange} disabled={loading} />
      <input type="number" name="length" value={formData.length} onChange={handleChange} disabled={loading} />
      <input type="number" name="breadth" value={formData.breadth} onChange={handleChange} disabled={loading} />
      <input type="number" name="bhk" value={formData.bhk} onChange={handleChange} disabled={loading} />
      <textarea name="description" value={formData.description} onChange={handleChange} disabled={loading}></textarea>
      <input type="number" name="established" value={formData.established} onChange={handleChange} disabled={loading} />
      <input type="file" multiple accept="image/*" onChange={handleImageChange} disabled={loading} />
      <button type="submit" disabled={loading}>{loading ? "Uploading..." : "Submit"}</button>
    </form>
  );
};

export default Agents;
