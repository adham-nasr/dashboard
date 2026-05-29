import { useState } from "react";
import Button from "../components/Button";
import Card from "../components/Card";
import "./ApiKey.css";
import { useAuth } from "../hooks/useAuth";

function ApiKey  () {
  const [revealed, setRevealed] = useState(false);
  const { user }= useAuth()
  const key = user?.apiKey || "sk-live-xK9mP2qR7vL4nW0aZ5bC8dE3fG6hI1jK4lM7";


  const visibleApiValue = revealed ? key : key.slice(0, 10) + "••••••••••••••••••••••"

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
            {visibleApiValue}
          </code>
          <Button variant="ghost" onClick={() => setRevealed(v => !v)} className="api-key-action">
            {revealed ? "Hide" : "Reveal"}
          </Button>
        </div>
      </Card>

      <Card className="api-key-usage-card">
        <div className="api-key-usage-title">Usage example</div>
        <pre className="api-key-code">
          {`fetch("https://domain/api/applications/:applicationName/logs", {\n  headers: {\n    "Authorization": "Bearer ${visibleApiValue}"\n  }\n})`}
        </pre>
      </Card>
    </div>
  );
};

export default ApiKey