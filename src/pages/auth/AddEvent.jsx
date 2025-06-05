import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix for Leaflet markers
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
    iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
    shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

const categories = [
    "Sports Matches",
    "Workshop",
    "Seminar",
    "Concert",
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

export default function AddEventPage() {
    const [photos, setPhotos] = useState([]);
    const [photoURLs, setPhotoURLs] = useState([]);
    const [position, setPosition] = useState(null);
    const [category, setCategory] = useState("");
    const [eventName, setEventName] = useState("");
    const [description, setDescription] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [ticketType, setTicketType] = useState("free");
    const [regStart, setRegStart] = useState("");
    const [regEnd, setRegEnd] = useState("");
    const [maxRegistration, setMaxRegistration] = useState("");
    const [ticketTiers, setTicketTiers] = useState([
        { name: "Gold", maxRegistration: "", price: "" },
        { name: "Platinum", maxRegistration: "", price: "" },
    ]);
    const [errors, setErrors] = useState({});

    // Get user location on mount
    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (pos) => setPosition([pos.coords.latitude, pos.coords.longitude]),
                () => setPosition([40.7128, -74.006])
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
    }, [photos]);

    const handlePhotoChange = (e) => {
        const files = Array.from(e.target.files).slice(0, 5);
        setPhotos(files);
    };

    // Ticket tier logic
    const handleTicketTierChange = (idx, field, value) => {
        setTicketTiers((prev) =>
            prev.map((tier, i) =>
                i === idx ? { ...tier, [field]: value } : tier
            )
        );
    };

    const addTicketTier = () => {
        setTicketTiers([...ticketTiers, { name: "", maxRegistration: "", price: "" }]);
    };

    const removeTicketTier = (idx) => {
        setTicketTiers(ticketTiers.filter((_, i) => i !== idx));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Event submitted! (Demo)");
    };

    // Responsive styles
    const inputStyle = {
        width: "100%",
        padding: "10px",
        borderRadius: "6px",
        margin: "6px 0 16px 0",
        background: "#e0e7ff",
        color: "#222",
        border: "2px solid #2563eb",
        fontSize: "1em",
        fontFamily: "inherit",
        fontWeight: 500,
        boxSizing: "border-box",
    };

    const labelStyle = {
        display: "block",
        fontWeight: 600,
        color: "#2563eb",
        marginBottom: 2,
    };

    const thStyle = {
        padding: "8px 4px",
        fontWeight: 600,
        color: "#2563eb",
        background: "#e0e7ff",
    };

    const removeButtonStyle = {
        background: "#ef4444",
        color: "#fff",
        border: "none",
        borderRadius: 6,
        padding: "4px 10px",
        cursor: "pointer",
        fontSize: 18,
    };

    const addTierButtonStyle = {
        background: "#2563eb",
        color: "white",
        border: "none",
        borderRadius: 6,
        padding: "7px 18px",
        cursor: "pointer",
        fontSize: 15,
        marginTop: 10,
    };

    const photoPreviewStyle = {
        display: "flex",
        gap: "10px",
        marginBottom: 16,
        overflowX: "auto",
        paddingBottom: 4,
    };

    return (
        <div
            style={{
                minHeight: "100vh",
                width: "100vw",
                background: "#fff",
                color: "#222",
                fontFamily: "system-ui, sans-serif",
                padding: 0,
                margin: 0,
            }}
        >
            <form
                onSubmit={handleSubmit}
                style={{
                    width: "100%",
                    maxWidth: "none",
                    margin: 0,
                    padding: 0,
                    boxSizing: "border-box",
                }}
            >
                <h2 style={{
                    color: "#2563eb",
                    fontWeight: 700,
                    fontSize: "clamp(1.6rem, 5vw, 2.2rem)",
                    margin: "32px 0 24px 5vw",
                    letterSpacing: 1,
                }}>
                    🏟️ Add New Event
                </h2>
                <div
                    style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "16px",
                        width: "calc(100% - 10vw)",
                        alignItems: "flex-start",
                        justifyContent: "space-between",
                        margin: "0 5vw",
                    }}
                >
                    {/* Left: Main Fields */}
                    <div style={{
                        flex: "1 1 280px",
                        minWidth: "280px",
                        maxWidth: "600px",
                    }}>
                        <label style={labelStyle}>Event Name
                            <input
                                value={eventName}
                                onChange={e => setEventName(e.target.value)}
                                style={inputStyle}
                                required
                            />
                        </label>
                        <label style={labelStyle}>Category
                            <select
                                value={category}
                                onChange={e => setCategory(e.target.value)}
                                style={inputStyle}
                                required
                            >
                                <option value="">Select category</option>
                                {categories.map((cat) => (
                                    <option key={cat}>{cat}</option>
                                ))}
                            </select>
                        </label>
                        <label style={labelStyle}>Description
                            <textarea
                                value={description}
                                onChange={e => setDescription(e.target.value)}
                                style={{ ...inputStyle, minHeight: "54px", resize: "vertical" }}
                                required
                            />
                        </label>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
                            <label style={{ ...labelStyle, flex: "1 1 200px", minWidth: "120px" }}>
                                Start Date
                                <input
                                    type="datetime-local"
                                    value={startDate}
                                    onChange={e => setStartDate(e.target.value)}
                                    style={inputStyle}
                                    required
                                />
                            </label>
                            <label style={{ ...labelStyle, flex: "1 1 200px", minWidth: "120px" }}>
                                End Date
                                <input
                                    type="datetime-local"
                                    value={endDate}
                                    onChange={e => setEndDate(e.target.value)}
                                    style={inputStyle}
                                    required
                                />
                            </label>
                        </div>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
                            <label style={{ ...labelStyle, flex: "1 1 200px", minWidth: "120px" }}>
                                Registration Start
                                <input
                                    type="datetime-local"
                                    value={regStart}
                                    onChange={e => setRegStart(e.target.value)}
                                    style={inputStyle}
                                    required
                                />
                            </label>
                            <label style={{ ...labelStyle, flex: "1 1 200px", minWidth: "120px" }}>
                                Registration End
                                <input
                                    type="datetime-local"
                                    value={regEnd}
                                    onChange={e => setRegEnd(e.target.value)}
                                    style={inputStyle}
                                    required
                                />
                            </label>
                        </div>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
                            <div style={{ ...labelStyle, flex: "1 1 200px", minWidth: "120px" }}>
                                Ticket Type<br />
                                <label style={{ marginRight: "16px" }}>
                                    <input type="radio" checked={ticketType === "free"}
                                           onChange={() => setTicketType("free")} />
                                    Free
                                </label>
                                <label>
                                    <input type="radio" checked={ticketType === "paid"}
                                           onChange={() => setTicketType("paid")} />
                                    Paid
                                </label>
                            </div>
                            <label style={{ ...labelStyle, flex: "1 1 200px", minWidth: "120px" }}>
                                Max Registration
                                <input
                                    type="number"
                                    value={maxRegistration}
                                    onChange={e => setMaxRegistration(e.target.value)}
                                    style={inputStyle}
                                    required
                                />
                            </label>
                        </div>
                        {/* Ticket Tiers */}
                        {ticketType === "paid" && (
                            <div style={{ margin: "20px 0" }}>
                                <div style={{ fontWeight: 500, color: "#2563eb", marginBottom: 6 }}>Ticket Tiers</div>
                                <table style={{ width: "100%", background: "#e0e7ff", color: "#222", borderRadius: 8 }}>
                                    <thead>
                                    <tr>
                                        <th style={thStyle}>Name</th>
                                        <th style={thStyle}>Max Registration</th>
                                        <th style={thStyle}>Price</th>
                                        <th style={thStyle}></th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {ticketTiers.map((tier, idx) =>
                                        <tr key={idx}>
                                            <td>
                                                <input
                                                    value={tier.name}
                                                    onChange={e => handleTicketTierChange(idx, "name", e.target.value)}
                                                    style={inputStyle}
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    type="number"
                                                    value={tier.maxRegistration}
                                                    onChange={e => handleTicketTierChange(idx, "maxRegistration", e.target.value)}
                                                    style={inputStyle}
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    type="number"
                                                    value={tier.price}
                                                    onChange={e => handleTicketTierChange(idx, "price", e.target.value)}
                                                    style={inputStyle}
                                                />
                                            </td>
                                            <td>
                                                {ticketTiers.length > 1 &&
                                                    <button type="button" onClick={() => removeTicketTier(idx)} style={removeButtonStyle}>➖</button>
                                                }
                                            </td>
                                        </tr>
                                    )}
                                    </tbody>
                                </table>
                                <button type="button" onClick={addTicketTier} style={addTierButtonStyle}>+ Add more ticket tiers</button>
                            </div>
                        )}
                        <button
                            type="submit"
                            style={{
                                background: "#2563eb",
                                color: "#fff",
                                padding: "16px 0",
                                border: "none",
                                borderRadius: "12px",
                                fontWeight: "bold",
                                fontSize: "clamp(1rem, 2.5vw, 1.3rem)",
                                cursor: "pointer",
                                width: "100%",
                                marginTop: 22,
                                marginBottom: 32,
                            }}
                        >
                            Submit Event
                        </button>
                    </div>
                    {/* Right: Map and Photos */}
                    <div style={{
                        flex: "1 1 280px",
                        minWidth: "280px",
                        maxWidth: "600px",
                    }}>
                        <div style={{ marginBottom: 18 }}>
                            <div
                                style={{
                                    height: "clamp(240px, 40vw, 320px)",
                                    width: "100%",
                                    borderRadius: "12px",
                                    overflow: "hidden",
                                    border: "2px solid #2563eb",
                                    background: "#fff",
                                    marginBottom: 8,
                                }}
                            >
                                {position && (
                                    <MapContainer
                                        center={position}
                                        zoom={15}
                                        style={{ height: "100%", width: "100%" }}
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
                        <label
                            style={{
                                display: "block",
                                border: "2.5px dashed #2563eb",
                                borderRadius: "12px",
                                padding: "22px 0",
                                marginBottom: "12px",
                                background: "#e0e7ff",
                                textAlign: "center",
                                cursor: "pointer",
                                fontSize: "clamp(1rem, 2.5vw, 1.1em)",
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
                            />
                            Add/Upload Photos
                            <div style={{ fontSize: "13px", color: "#2563eb", marginTop: 4 }}>
                                (upload up to 3–5 photos)
                            </div>
                        </label>
                        {photoURLs.length > 0 && (
                            <div style={photoPreviewStyle}>
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
                    </div>
                </div>
            </form>
        </div>
    );
}
