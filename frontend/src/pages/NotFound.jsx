import { Link } from "react-router-dom";
import Button from "@/components/common/Button/Button";
export default function NotFound() {
  return (
    <div style={{
      minHeight: "100vh", display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center", padding: "2rem",
      background: "var(--color-bg)", color: "var(--color-text)", textAlign: "center",
    }}>
      <h1 style={{ fontSize: "6rem", fontWeight: 800, letterSpacing: "-0.04em", color: "var(--color-primary)" }}>404</h1>
      <h2 style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>Page not found</h2>
      <p className="text-muted-2" style={{ maxWidth: 420, marginBottom: "1.5rem" }}>
        The page you're looking for doesn't exist or has been moved. Let's get you back on track.
      </p>
      <Link to="/dashboard"><Button size="lg">Back to dashboard</Button></Link>
    </div>
  );
}
