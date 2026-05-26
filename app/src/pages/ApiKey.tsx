import { useState } from "react";
import Button from "../components/Button";
import Card from "../components/Card";
import { C } from "../utils/constants";
import "./ApiKey.css";

function ApiKey  () {
  const [revealed, setRevealed] = useState(false);
  const key = "sk-live-xK9mP2qR7vL4nW0aZ5bC8dE3fG6hI1jK4lM7";
  return (
    <div className="api-key-page">
      <h2 className="api-key-title">API Key</h2>
      <p className="api-key-description">
        Use this key to authenticate requests from your application.
      </p>
      <Card className="api-key-card">
        <div className="api-key-label">Your secret key</div>
        <div className="api-key-secret">
          <code className="api-key-value">
            {revealed ? key : key.slice(0, 10) + "••••••••••••••••••••••"}
          </code>
          <Button variant="ghost" onClick={() => setRevealed(v => !v)} className="api-key-action">
            {revealed ? "Hide" : "Reveal"}
          </Button>
        </div>
        {/* <div style={{ marginTop: 16, display: "flex", gap: 10 }}>
          <Button variant="ghost" style={{ fontSize: 13 }}>Copy</Button>
          <Button variant="ghost" style={{ fontSize: 13, color: C.danger, borderColor: "rgba(163,45,45,0.25)" }}>Regenerate</Button>
        </div> */}
      </Card>

      <Card className="api-key-usage-card">
        <div className="api-key-usage-title">Usage example</div>
        <pre className="api-key-code">{`fetch("https://api.logr.io/v1/events", {\n  headers: {\n    "Authorization": "Bearer YOUR_API_KEY"\n  }\n})`}</pre>
      </Card>
    </div>
  );
};

export default ApiKey