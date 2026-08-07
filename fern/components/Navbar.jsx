export default function Navbar() {
  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "16px 24px",
        borderBottom: "1px solid #0d0e0f",
        backgroundColor: "#110e0e",
        marginBottom: "24px",
      }}
    >
      <h2 style={{ margin: 0 }}>Mono Cloud</h2>

      <div style={{ display: "flex", gap: "20px" }}>
        <a href="/">Home</a>
        <a href="/docs">Docs</a>
        <a href="/api-reference">API</a>
        <a href="/contact">Contact</a>
      </div>
    </nav>
  );
}