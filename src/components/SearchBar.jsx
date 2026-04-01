export default function SearchBar({ value, onChange }) {
    return (
      <div style={{ display: "flex", justifyContent: "center", padding: "32px 20px 16px" }}>
        <input
          type="text"
          placeholder="搜尋電影..."
          value={value}
          onChange={e => onChange(e.target.value)}
          style={{
            width: "100%",
            maxWidth: "600px",
            padding: "14px 20px",
            borderRadius: "30px",
            border: "2px solid #444",
            background: "#1a1a1a",
            color: "white",
            fontSize: "1rem",
            outline: "none",
          }}
        />
      </div>
    );
  }