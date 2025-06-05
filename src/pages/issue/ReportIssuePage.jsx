// ReportIssuePage.jsx
import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";



// Fix leaflet marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
    iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
    shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

const categories = [
    "Pothole",
    "Garbage",
    "Water Leakage",
    "Street Light",
    "Other",
];

function LocationPicker({ position, setPosition }) {
    useMapEvents({
        click(e) {
            setPosition([e.latlng.lat, e.latlng.lng]);
        },
    });
    return position ? <Marker position={position} /> : null;
}
const key = "AIzaSyAVBoKPLFUiOsrP7tgS29FdOT5B82nc_oI"
export default function ReportIssuePage() {
    const [photos, setPhotos] = useState([]);
    const [photoURLs, setPhotoURLs] = useState([]);
    const [position, setPosition] = useState(null);
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const [anonymous, setAnonymous] = useState(false);

    // Get user location on mount
    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (pos) => setPosition([pos.coords.latitude, pos.coords.longitude]),
                () => setPosition([40.7128, -74.006]) // fallback: NYC
            );
        } else {
            setPosition([40.7128, -74.006]);
        }
    }, []);

    // Generate preview URLs for images
    useEffect(() => {
        photoURLs.forEach(url => URL.revokeObjectURL(url));
        setPhotoURLs(photos.map(file => URL.createObjectURL(file)));
        return () => photoURLs.forEach(url => URL.revokeObjectURL(url));
        // eslint-disable-next-line
    }, [photos]);

    const handlePhotoChange = (e) => {
        const files = Array.from(e.target.files).slice(0, 5);
        setPhotos(files);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!category || !description || !position) {
            alert("Please fill all required fields and select a location.");
            return;
        }
        // Prepare form data for backend
        const formData = new FormData();
        photos.forEach((photo) => formData.append("photos", photo));
        formData.append("category", category);
        formData.append("description", description);
        formData.append("anonymous", anonymous);
        formData.append("lat", position[0]);
        formData.append("lng", position[1]);
        // TODO: send formData to backend with fetch/axios
        alert("Issue submitted! (Demo)");
    };

    return (
        <div
            style={{
                minHeight: "100vh",
                width: "100vw",
                background: "#f8fafc",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "0",
            }}
        >
            <form
                onSubmit={handleSubmit}
                style={{
                    background: "#fff",
                    color: "#222",
                    padding: "38px 38px 28px 38px",
                    borderRadius: "28px",
                    width: "100%",
                    maxWidth: 540,
                    border: "3px solid #2563eb",
                    boxShadow: "0 2px 32px #2563eb15",
                    fontFamily: "'Chalkboard', 'Comic Sans MS', 'monospace', sans-serif",
                    margin: "48px 0",
                    position: "relative",
                }}
            >
                <h2 style={{ marginBottom: 18, fontWeight: 700, color: "#2563eb", letterSpacing: 1, fontSize: 28 }}>
                    <span role="img" aria-label="report">📝</span> Report New Issue
                </h2>
                {/* Photo Upload */}
                <label
                    style={{
                        display: "block",
                        border: "2.5px dashed #2563eb",
                        borderRadius: "16px",
                        padding: "26px 0",
                        marginBottom: "12px",
                        background: "#e0e7ff",
                        textAlign: "center",
                        cursor: "pointer",
                        fontSize: "1.12em",
                        color: "#2563eb",
                        fontWeight: 500,
                    }}
                >
                    <input
                        type="file"
                        accept="image/*"
                        multiple
                        style={{ display: "none" }}
                        onChange={handlePhotoChange}
                        max={5}
                    />
                    Add/Upload Photos
                    <div style={{ fontSize: "13px", color: "#2563eb", marginTop: 4 }}>
                        (upload up to 3–5 photos)
                    </div>
                </label>
                {/* Show all image previews */}
                {photoURLs.length > 0 && (
                    <div
                        style={{
                            display: "flex",
                            gap: "10px",
                            marginBottom: 16,
                            overflowX: "auto",
                            paddingBottom: 4,
                        }}
                    >
                        {photoURLs.map((url, idx) => (
                            <img
                                key={idx}
                                src={url}
                                alt={`preview-${idx}`}
                                width={70}
                                height={70}
                                style={{
                                    objectFit: "cover",
                                    borderRadius: "10px",
                                    border: "2px solid #2563eb",
                                    background: "#fff",
                                }}
                            />
                        ))}
                    </div>
                )}
                {/* Map */}
                <div style={{ marginBottom: 18 }}>
                    <div
                        style={{
                            height: 120,
                            borderRadius: "9px",
                            overflow: "hidden",
                            border: "2px solid #2563eb",
                            marginBottom: 2,
                            background: "#fff",
                        }}
                    >
                        {position && (
                            <MapContainer
                                center={position}
                                zoom={16}
                                style={{ height: "120px", width: "100%" }}
                            >
                                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                                <LocationPicker position={position} setPosition={setPosition} />
                            </MapContainer>
                        )}
                    </div>
                    <div style={{ fontSize: "13px", color: "#2563eb", marginLeft: 2 }}>
                        Auto-detected via GPS or manual pin-drop.
                    </div>
                </div>
                {/* Category */}
                <div style={{ marginBottom: 18 }}>
                    <label style={{ fontWeight: 600, color: "#2563eb" }}>
                        Category
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            style={{
                                width: "100%",
                                padding: "12px",
                                borderRadius: "6px",
                                marginTop: "4px",
                                background: "#e0e7ff",
                                color: "#222",
                                border: "2px solid #2563eb",
                                fontSize: "1em",
                                fontFamily: "inherit",
                                fontWeight: 500,
                            }}
                            required
                        >
                            <option value="">Select category</option>
                            {categories.map((cat) => (
                                <option key={cat}>{cat}</option>
                            ))}
                        </select>
                    </label>
                </div>
                {/* Description */}
                <div style={{ marginBottom: 18 }}>
                    <label style={{ fontWeight: 600, color: "#2563eb" }}>
                        Description
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows={3}
                            style={{
                                width: "100%",
                                padding: "12px",
                                borderRadius: "6px",
                                marginTop: "4px",
                                background: "#e0e7ff",
                                color: "#222",
                                border: "2px solid #2563eb",
                                fontSize: "1em",
                                fontFamily: "inherit",
                                fontWeight: 500,
                                resize: "vertical",
                                minHeight: 54,
                            }}
                            required
                        />
                    </label>
                </div>
                {/* Anonymous */}
                <div style={{ marginBottom: 28 }}>
                    <label style={{ display: "flex", alignItems: "center", color: "#2563eb", fontWeight: 600 }}>
                        <input
                            type="checkbox"
                            checked={anonymous}
                            onChange={(e) => setAnonymous(e.target.checked)}
                            style={{ marginRight: "10px", accentColor: "#2563eb" }}
                        />
                        Report Anonymous
                    </label>
                </div>
                {/* Submit */}
                <button
                    type="submit"
                    style={{
                        background: "#2563eb",
                        color: "#fff",
                        padding: "16px 0",
                        border: "none",
                        borderRadius: "12px",
                        fontWeight: "bold",
                        fontSize: "22px",
                        cursor: "pointer",
                        width: "100%",
                        boxShadow: "0 2px 8px #2563eb44",
                        transition: "background 0.2s",
                    }}
                >
                    Submit Issue
                </button>
            </form>
        </div>
    );
}
