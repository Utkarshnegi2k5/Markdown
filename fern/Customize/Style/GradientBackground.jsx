export default function GradientBox({ children }) {
  return (
    <div
      style={{
        background: "linear-gradient(135deg, #667eea, #764ba2)",
        padding: "40px",
        borderRadius: "16px",
        color: "white",
      }}
    >
      {children}
    </div>
  );
}