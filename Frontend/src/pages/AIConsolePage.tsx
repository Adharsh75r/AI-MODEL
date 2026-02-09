import { useState } from "react";
import { GlassCard, MetricCard, RiskBadge, SourceList } from "@/components/dashboard";
import { Gauge, AlertTriangle, Scale } from "lucide-react";
import { askQuestion } from "@/api";

export default function AIConsole() {

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  // ===== STATE =====
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState(null);
  const [confidence, setConfidence] = useState(0);
  const [risk, setRisk] = useState(null);
  const [sources, setSources] = useState([]);
  const [selectedMetric, setSelectedMetric] = useState(null);

  const [policyDecision, setPolicyDecision] = useState<{ 
    decision: "UNKNOWN"; 
    reason: "NO REASON"; 
    human_review_required?: false 
  } | null>(null);
  
  const [hallucination, setHallucination] = useState<boolean>(false);

  const [loading, setLoading] = useState(false);



  // ===== BACKEND CALL =====
  const handleSubmit = async () => {
    if (!query) return;
  
    try {
      setLoading(true);
  
      const res = await fetch(`${API_BASE_URL}/ask`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),  
      });
  
      const data = await res.json();
  
      setResponse(data.answer || "No answer");
      setSources(data.sources || []);
      setConfidence(Math.round((data.confidence ?? 0) * 100));
      setRisk(data.risk_level ?? "LOW");
      setPolicyDecision(data.policy_decision ?? { decision: "Unknown", reason: "" });
      setHallucination(data.hallucination_detected ?? false);
  
    } catch (err) {
      console.error(err);
      setResponse("Error connecting to backend");
    } finally {
      setLoading(false);
    }
  };

  // ===== UI =====
  return (
    <div className="h-screen flex flex-col p-6 gap-6">

      {/* ===== RESPONSE SECTION ===== */}
      <div className="h-[35%]">
        <GlassCard className="h-full p-6 flex flex-col">

          <h2 className="text-lg font-semibold mb-4">
            AI Response
          </h2>

          {/* SCROLLABLE RESPONSE */}
          <div className="flex-1 overflow-y-auto pr-2">

            {loading && (
              <p className="text-muted-foreground">Generating response...</p>
            )}

            {!loading && response && (
              <p className="text-sm leading-relaxed whitespace-pre-wrap">
                {response}
              </p>
            )}

            {!loading && !response && (
              <p className="text-muted-foreground">
                Ask a question to see AI response
              </p>
            )}

          </div>

        </GlassCard>
      </div>


      {/* ===== MIDDLE SECTION ===== */}
      <div className="h-[40%] grid grid-cols-3 gap-6">
{/* ===== METRICS MASTER / DETAIL ===== */}
<GlassCard className="col-span-1 p-4 flex flex-col h-full">

  {/* ===== LIST VIEW ===== */}
  {!selectedMetric && (
    <div className="flex flex-col gap-4 h-full">

      <button
        onClick={() => setSelectedMetric("confidence")}
        className="p-4 rounded-xl bg-white/5 hover:bg-white/10 text-left"
      >
        Confidence Score
      </button>

      <button
        onClick={() => setSelectedMetric("risk")}
        className="p-4 rounded-xl bg-white/5 hover:bg-white/10 text-left"
      >
        Risk Level
      </button>

      <button
        onClick={() => setSelectedMetric("bias")}
        className="p-4 rounded-xl bg-white/5 hover:bg-white/10 text-left"
      >
        Bias Score
      </button>

    </div>
  )}

  {/* ===== DETAIL VIEW ===== */}
  {selectedMetric && (
    <div className="flex flex-col h-full">

      {/* HEADER */}
      <div className="flex items-center gap-3 mb-4">

        <button
          onClick={() => setSelectedMetric(null)}
          className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20"
        >
          ←
        </button>

        <h2 className="text-lg font-semibold capitalize">
          {selectedMetric}
        </h2>

      </div>

      {/* SCROLLABLE CONTENT */}
      <div className="flex-1 overflow-y-auto pr-2">

        {/* CONFIDENCE DETAIL */}
        {selectedMetric === "confidence" && (
          <div className="space-y-4">
            <MetricCard
              title="Confidence Score"
              value={confidence ?? 0}
              variant="success"
              icon={<Gauge className="h-5 w-5" />}
            />

            <RiskBadge level={risk ?? "LOW"} />
            <SourceList sources={sources ?? []} />

        {policyDecision?.decision && (
        <p>
          {policyDecision.decision}: {policyDecision.reason}
        </p>
        )}

            <p className="text-sm text-muted-foreground">
              Confidence indicates how strongly the response is grounded
              in retrieved evidence and verified sources.
            </p>
          </div>
        )}

        {/* RISK DETAIL */}
        {selectedMetric === "risk" && (
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-5 w-5" />
              <span>Risk Assessment</span>
            </div>

            {risk ? (
              <RiskBadge level={risk} />
            ) : (
              <p className="text-muted-foreground">No risk data yet</p>
            )}

            <p className="text-sm text-muted-foreground">
              Risk level is calculated based on policy violations,
              uncertainty, and governance rule triggers.
            </p>
          </div>
        )}

        {/* BIAS DETAIL */}

      </div>

    </div>
  )}

</GlassCard>


        {/* ===== EVIDENCE ===== */}
        <GlassCard className="col-span-2 p-6 flex flex-col">

          <h2 className="text-lg font-semibold mb-4">
            Evidence Sources
          </h2>

          {/* SCROLL ENABLED */}
          <div className="flex-1 overflow-y-auto pr-2">

            {sources.length > 0 ? (
              <SourceList sources={sources} />
            ) : (
              <p className="text-muted-foreground">
                No sources yet
              </p>
            )}

          </div>

        </GlassCard>

      </div>


      {/* ===== CHAT INPUT ===== */}
      <div className="h-[15%] mt-20">
        <GlassCard className="h-[vh:10] p-4 flex items-center gap-4">

          <input
            className="flex-1 bg-transparent outline-none text-sm"
            placeholder="Ask a governed AI question..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />

          <button
            onClick={handleSubmit}
            className="px-6 py-2 rounded-xl bg-primary text-white"
          >
            Submit
          </button>

        </GlassCard>
      </div>

    </div>
  );
}
