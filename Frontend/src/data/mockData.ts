// Mock data for the AI Governance Dashboard

export const mockAIResponse = {
  query: "What are the key compliance requirements for our new product launch?",
  response: `Based on our internal compliance documentation and regulatory framework analysis, the key requirements for the product launch include:

1. **Data Privacy Compliance**: Ensure GDPR and CCPA compliance for all user data collection. This includes implementing proper consent mechanisms and data retention policies.

2. **Security Standards**: The product must meet SOC 2 Type II certification requirements before launch. All API endpoints require encryption in transit and at rest.

3. **Accessibility Requirements**: WCAG 2.1 Level AA compliance is mandatory for all user-facing interfaces.

4. **Documentation**: Complete audit trail documentation must be maintained for all AI-assisted decisions.

These recommendations are based on verified internal policy documents with 94% confidence.`,
  confidence: 94,
  riskLevel: "low" as const,
  biasScore: 12,
  timestamp: new Date().toISOString(),
};

export const mockSources = [
  {
    id: "1",
    name: "Corporate Compliance Handbook v3.2",
    section: "Section 4.2 - Product Launch Requirements",
    trustLevel: "verified" as const,
  },
  {
    id: "2",
    name: "GDPR Implementation Guide",
    section: "Chapter 7 - Data Collection Policies",
    trustLevel: "verified" as const,
  },
  {
    id: "3",
    name: "Security Standards Framework",
    section: "SOC 2 Certification Checklist",
    trustLevel: "trusted" as const,
  },
  {
    id: "4",
    name: "Accessibility Guidelines 2024",
    section: "WCAG 2.1 Level AA Requirements",
    trustLevel: "trusted" as const,
  },
];

export const mockReviewQueue = [
  {
    id: "rev-001",
    query: "Can we proceed with the merger without antitrust review?",
    riskLevel: "critical" as const,
    confidence: 45,
    timestamp: "2024-01-15T14:32:00Z",
    status: "pending" as const,
  },
  {
    id: "rev-002",
    query: "What are the tax implications for international expansion?",
    riskLevel: "high" as const,
    confidence: 67,
    timestamp: "2024-01-15T13:15:00Z",
    status: "pending" as const,
  },
  {
    id: "rev-003",
    query: "Is the new marketing campaign compliant with FTC guidelines?",
    riskLevel: "medium" as const,
    confidence: 78,
    timestamp: "2024-01-15T11:45:00Z",
    status: "pending" as const,
  },
  {
    id: "rev-004",
    query: "Can we use customer data for AI model training?",
    riskLevel: "high" as const,
    confidence: 52,
    timestamp: "2024-01-15T10:20:00Z",
    status: "pending" as const,
  },
  {
    id: "rev-005",
    query: "What's the recommended approach for handling customer complaints?",
    riskLevel: "low" as const,
    confidence: 89,
    timestamp: "2024-01-15T09:00:00Z",
    status: "pending" as const,
  },
];

export const mockAuditLog = {
  id: "audit-001",
  modelInfo: {
    name: "GPT-4 Turbo",
    version: "gpt-4-turbo-2024-01-25",
    temperature: 0.3,
    timestamp: "2024-01-15T14:32:15.342Z",
  },
  sources: [
    {
      name: "Corporate Compliance Handbook v3.2",
      hash: "0x7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069",
    },
    {
      name: "GDPR Implementation Guide",
      hash: "0x3a7bd3e2360a3d29eea436fcfb7e44c735d117c42d1c1835420b6b9942dd4f1b",
    },
    {
      name: "Security Standards Framework",
      hash: "0x64ec88ca00b268e5ba1a35678a1b5316d212f4f366b2477232534a8aeca37f3c",
    },
  ],
  evaluationScores: {
    hallucination: 8,
    bias: 12,
    toxicity: 2,
  },
  auditChain: {
    previousHash: "0x4b227777d4dd1fc61c6f884f48641d02b4d121d3fd328cb08b5531fcacdabf8a",
    currentHash: "0x9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08",
  },
};
