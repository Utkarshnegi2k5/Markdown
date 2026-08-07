export default function Hero() {
  return (
    <div
      style={{
        padding: "60px",
        borderRadius: "20px",
        background: "linear-gradient(135deg, #0066ff, #000000)",
        color: "white",
        textAlign: "center",
        marginBottom: "40px",
      }}
    >
      <h1
        style={{
          fontSize: "48px",
          marginBottom: "15px",
        }}
      >
        Mono Cloud
      </h1>

      <p
        style={{
          fontSize: "20px",
          opacity: 0.9,
        }}
      >
        Build, deploy, and manage your cloud applications easily.
      </p>

      <button
        style={{
          marginTop: "25px",
          padding: "12px 28px",
          borderRadius: "25px",
          border: "none",
          background: "white",
          color: "#0066ff",
          fontWeight: "600",
          cursor: "pointer",
        }}
      >
        Get Started
      </button>
    </div>
  );
}