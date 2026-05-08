/** Part 8 — Trust Center copy and table rows (verbatim from build spec). */

export type TrustSummaryCard = { label: string; value: string };

export const TRUST_SUMMARY_CARDS: TrustSummaryCard[] = [
  { label: 'Data hosting', value: 'AWS Sydney (ap-southeast-2)' },
  { label: 'Encryption at rest', value: 'AES-256 via AWS KMS' },
  { label: 'Encryption in transit', value: 'TLS 1.3' },
  { label: 'Evidence storage', value: 'WORM — Write Once, Read Many' },
  { label: 'Tenant isolation', value: 'Row-level security + per-tenant chains' },
  { label: 'Access control', value: 'RBAC, deny-by-default, MFA all tiers' },
  { label: 'Data retention', value: '7 years default, tenant-configurable' },
  { label: 'Audit logging', value: 'Immutable, AU-resident, 7-year retention' },
];

export const TRUST_RESIDENCY_ROWS: [string, string][] = [
  ['Primary hosting\nregion', 'AWS Sydney (ap-southeast-2)'],
  ['Secondary / DR\nregion', 'AWS Melbourne (ap-southeast-4) where applicable'],
  ['Cross-region\nreplication', 'Blocked entirely. No data replication to any region outside Australia.'],
  [
    'Evidence object\nstorage',
    'S3 buckets with region-locked bucket policies enforcing aws:RequestedRegion = ap-southeast-2. Block Public Access enabled. No public ACL or public policy permitted.',
  ],
  [
    'Evidence object\naccess',
    'VPC endpoint access (aws:sourceVpce) where feasible. No public internet access to evidence storage.',
  ],
  [
    'Database\nhosting',
    'Amazon RDS PostgreSQL in private subnets. No public internet exposure. No public endpoint.',
  ],
  ['Database\nsnapshots', 'Region-restricted. Snapshot copy outside ap-southeast-2 is blocked.'],
  ['S3 replication', 'Blocked entirely at bucket configuration level.'],
  ['Logging and\nmonitoring', 'AWS CloudWatch in ap-southeast-2 only. No log shipping outside Australia.'],
  [
    'CI/CD artifacts',
    'Any CI/CD artifact containing customer data remains AU-resident and is not processed outside the Australian production constraint.',
  ],
  [
    'Third-party\nprocessing',
    'No third-party processing or telemetry shipping outside Australia unless the service is hosted in-region and explicitly approved. Any such approval is recorded as a governance audit event including: who approved, service name, region, and date.',
  ],
  [
    'Governance\nemail delivery',
    'Governance emails and secure review links are delivered through an AU-region compliant service path consistent with data residency rules.',
  ],
];

export const TRUST_ENCRYPTION_ROWS: [string, string, string][] = [
  ['Data at rest —\nevidence objects', 'AES-256', 'SSE-KMS (AWS S3 server-side encryption with KMS-managed keys)'],
  ['Data at rest —\ndatabase', 'AES-256', 'RDS storage encryption with AWS KMS'],
  [
    'Data at rest — secrets',
    'AES-256',
    'Secrets stored in AWS Secrets Manager or SSM Parameter Store, KMS-encrypted',
  ],
  ['Data in transit —\nexternal', 'TLS 1.3', 'All public and portal-facing traffic'],
  [
    'Data in transit —\ninternal',
    'TLS 1.3 /\nmTLS',
    'Mutual TLS or equivalent strong authenticated transport for sensitive internal service paths where appropriate',
  ],
  [
    'Key management',
    'AWS KMS',
    'Key rotation schedule enforced. Separation of duties between key administrators and key users.',
  ],
  [
    'Customer-managed\nkeys',
    'Available',
    'Enterprise Sovereign and Government tiers support customer-managed keys (CMK) for tenant-specific encryption.',
  ],
];

export const TRUST_IMMUTABILITY_ROWS: [string, string][] = [
  [
    'Object storage',
    'S3 Object Lock in Compliance mode (WORM — Write Once, Read Many). Objects are physically immutable after write. Object Lock cannot be disabled retroactively for existing objects.',
  ],
  [
    'Evidence\nledger',
    'Append-only. No update operation exists. No delete operation exists at the database layer or API layer. Records are permanent.',
  ],
  [
    'Hash\nalgorithm',
    'SHA-256 applied to every evidence payload. Hash is computed after the raw payload is written to WORM storage and before the evidence event record is created.',
  ],
  [
    'Hash chaining',
    'Per-tenant hash chain. Each ledger block includes: block_id (monotonic per tenant), prev_hash, block_hash, payload_sha256, created_at. Block_hash is computed from prev_hash + payload_sha256 + required identity and context fields (tenant_id, event_time, evidence_event_id, control_id, source_system, device identity fields).',
  ],
  [
    'Genesis block',
    'First block in each tenant chain uses a fixed, documented constant as prev_hash. Chain can be verified from genesis to current state.',
  ],
  [
    'Device identity\nbinding',
    'Device identity fields — device_id, hostname, IP address, MAC address where available — are included in the hashed evidence packet. Evidence is cryptographically bound to the device context at the time of collection.',
  ],
  [
    'Commit order',
    'Strict deterministic sequence enforced: (1) write raw payload to S3 Object Lock WORM, (2) compute payload_sha256, (3) insert evidence_event row, (4) append ledger_block to hash chain, (5) emit EvidenceCommitted event. If any step fails, the event is not considered committed. No partial commits.',
  ],
  [
    'Idempotency',
    'Ingestion is idempotent using idempotency_key (source + external_id + timestamp window + payload hash). Retries do not duplicate committed events.',
  ],
  [
    'Corrections',
    'If evidence needs correction, a new record is appended. The original record is never modified. Corrections are additive, not destructive.',
  ],
  [
    'Uniqueness',
    '(tenant_id, block_id) is unique. Ledger appends use optimistic concurrency with retry on conflict.',
  ],
];

export const TRUST_ISOLATION_ROWS: [string, string][] = [
  [
    'Database',
    'Row-Level Security (RLS) enforced at the PostgreSQL layer. Every query is scoped to the authenticated tenant. Cross-tenant JOIN queries are prevented by the RLS policy.',
  ],
  [
    'Connection\npooling',
    'Pooled sessions do not leak tenant context across requests. Tenant context is applied transaction-safely. Support-access elevated sessions do not inherit prior tenant context.',
  ],
  [
    'Evidence\nchains',
    'Per-tenant hash chains. No cross-tenant chaining. Evidence from one tenant never enters another tenant\'s chain.',
  ],
  [
    'Connectors',
    'Every connector instance is bound to a specific tenant_id. Connector credentials, tokens, and agent identities are stored per-tenant and isolated.',
  ],
  [
    'API gateway',
    'Tenant context is derived from authenticated claims (JWT/session), not from client-provided identifiers. Any request attempting cross-tenant access is rejected and logged.',
  ],
  [
    'MSP access',
    'MSP access to client tenants is explicitly assigned per client. No default access to all tenants. If an MSP is suspended, lockout is immediate across all assigned endpoints and tenants.',
  ],
  [
    'Evidence\nobjects',
    'Evidence stored in S3 is keyed by tenant. Tenant boundary is enforced at the storage access layer.',
  ],
  ['Exports', 'Export bundles are tenant-scoped. Cross-tenant exports are not possible.'],
  [
    'Audit logs',
    'Audit events include tenant_id. Audit trail is scoped per tenant for tenant-level visibility and available globally for platform-owner visibility.',
  ],
  [
    'Background\njobs',
    'Background jobs (queue consumers, scheduled tasks) enforce tenant context. No background job processes data outside its authorised tenant scope.',
  ],
];

export const TRUST_AUTH_ROWS: [string, string][] = [
  ['MFA\nrequirement', 'Required for all tiers — Super-Admin, MSP, Client, and User'],
  ['Supported MFA\nmethods', 'TOTP (time-based one-time password) and WebAuthn/FIDO2 (hardware security keys)'],
  [
    'MFA re-check\ntriggers',
    'Exports, approvals and attestations, connector changes (connect/disconnect/rekey), scope changes',
  ],
  ['Idle session\ntimeout', '15 minutes'],
  ['Absolute\nsession lifetime', '8 hours'],
  ['Refresh token\nmax lifetime', '24 hours'],
  ['Token rotation', 'Rotation on every refresh. Immediate token-family invalidation on reuse detection.'],
  ['Failed login\nlockout', 'Enforced after defined threshold. Numerically fixed.'],
  ['MFA recovery', 'Approved audit-logged flow requiring identity verification and Super-Admin or Client Admin approval'],
  [
    'Break-glass\naccess',
    'Maximum 2 accounts. FIDO2 hardware key required. Default 60-minute window. Maximum 4 hours. MFA re-check required. Generates high-severity audit event recording who, why, and when. Optional time-bound access that is automatically revoked at expiry.',
  ],
  [
    'MSP\nsuspension\ncascade',
    'Immediate access revocation across all assigned tenants. All endpoints locked.',
  ],
  ['SSO readiness', 'Architecture supports SSO integration'],
  ['SCIM readiness', 'Architecture supports SCIM provisioning integration'],
];

export const TRUST_AUDIT_FIELD_ROWS: [string, string][] = [
  ['request_id / correlation_id', 'Unique identifier for the request. Enables cross-service tracing.'],
  ['actor_id', 'Identity of the user or service performing the action'],
  ['tenant_id', 'Tenant context for the action'],
  ['action', 'The specific action performed'],
  ['timestamp', 'UTC timestamp of the action'],
  ['result', 'Success or failure'],
  ['IP address', 'Source IP of the request'],
  ['session_id', 'Session identifier'],
  ['resource_type', 'Type of resource affected'],
  ['resource_id', 'Identifier of the specific resource affected'],
  ['details_summary', 'Summary of action-specific details'],
];

export const TRUST_RETENTION_ROWS: [string, string][] = [
  ['Default evidence\nretention', '7 years'],
  [
    'Configurable\nretention',
    'Per-tenant configuration where organisational policy requires different retention periods',
  ],
  ['Retention\nprofiles', 'Tied to plan tier. Extended retention packs available for longer retention requirements.'],
  [
    'Legal hold',
    'Supported. Three hold types: case hold (preserves evidence linked to a specific investigation), tenant hold (preserves all evidence for an entire tenant), external hold (preserves evidence for external legal or regulatory proceedings).',
  ],
  [
    'Hold override\nbehaviour',
    'Legal hold overrides retention expiry, deletion requests, purge jobs, and export cleanup. Held evidence cannot be deleted or purged regardless of retention schedule or account status.',
  ],
  [
    'Hold release',
    'Requires explicit approval from authorised role, release reason, and generates permanent audit event. Post-release retention recalculation determines purge eligibility.',
  ],
  [
    'Non-destructive\noffboarding',
    'Ordinary contract expiry, downgrade, or offboarding does not trigger destructive deletion of protected production evidence unless a lawful, policy-compliant deletion path explicitly applies.',
  ],
  [
    'Deletion method',
    'Where lawful deletion is required: crypto-erasure (delete encryption key) with legal deletion event recorded in the ledger.',
  ],
  [
    'Backup retention',
    'RDS automated backups, S3 Object Lock retention, CloudWatch log retention, and exported report artifacts are all subject to the retention policy.',
  ],
  ['Retention in\nreports', 'Active retention policy is printed in every generated report.'],
];

export const TRUST_VERIFICATION_FIELDS: { name: string; desc: string }[] = [
  { name: 'report_id', desc: 'unique report identifier' },
  { name: 'report_hash', desc: 'SHA-256 hash of the generated report' },
  { name: 'generation_timestamp', desc: 'when the report was generated (UTC)' },
  { name: 'framework_versions', desc: 'framework versions and assessment scope bound to the report' },
  { name: 'scope', desc: 'assessment scope the report covers' },
  { name: 'ledger_reference', desc: 'confirmation that the report hash is recorded in the evidence ledger' },
  { name: 'status', desc: 'valid or invalid' },
];

export const TRUST_GOVERNANCE_SIG_ROWS: [string, string][] = [
  ['actor_id', 'Identity of the person performing the governance action'],
  ['actor_role', 'Role of the actor at the time of the action'],
  ['timestamp', 'UTC timestamp of the governance action'],
  ['IP address', 'Source IP of the governance action'],
  ['user_agent', 'Browser or client identifier'],
  ['evidence_event_ids', 'List of evidence events referenced by the governance action'],
  ['payload_sha256 values', 'Cryptographic hashes of the referenced evidence'],
  ['ledger_block_id\nreferences', 'Ledger block references for the referenced evidence'],
  [
    'scope context',
    'Framework, framework version, and as_of_date the governance action relates to',
  ],
  [
    'report binding',
    'Report_id and/or report hash the governance action certifies (where applicable)',
  ],
];

export const TRUST_REPORT_ITEMS: string[] = [
  'Executive summary (plain language) with scope, date, and framework version',
  'Scorecards with RAG status per framework and key hotspots',
  'Top risks in plain English',
  'Findings table: requirement → status → plain explanation → remediation guidance',
  'Assessment coverage: % controls assessed, % requirements assessed, missing evidence sources, excluded frameworks',
  'Evidence Proof Appendix: hashes, timestamps, event IDs, device identity',
  'Governance Appendix: attestations, risk acceptances, expiry dates, signer identity',
  'Data residency and integrity statement',
  'Chain-of-custody statement',
  'Printed binding fields: as_of_date, framework_version, mapping_rules_version, control_rule_version',
  'Report hash (SHA-256)',
  'QR verification code (where enabled)',
  'Evidence freshness indicators: current, stale, or missing per control',
  'Assertion statement: describes exactly what was assessed',
  'Non-assertion statement: describes what was not assessed due to scope or insufficient evidence',
  'Definitions box: all acronyms defined',
];

export const TRUST_CANONICAL_STATUS_ROWS: [string, string, string][] = [
  [
    'PASS',
    'All required evidence is present, fresh, valid, and confidence is HIGH',
    'Compliant',
  ],
  ['FAIL', 'Evidence is present and evaluation determines non-compliance', 'Non-Compliant'],
  [
    'UNKNOWN',
    'Insufficient evidence to determine compliance. Evidence is missing, stale, incomplete, or invalid.',
    'Insufficient\nEvidence',
  ],
  ['NOT_ASSESSED', "Control is intentionally out of scope for this tenant's configuration", 'Out of Scope'],
  [
    'EXCEPTION',
    'Governance-approved exception with documented reason, owner, and expiry date',
    'Exception',
  ],
];

export const TRUST_OPERATIONAL_ROWS: [string, string][] = [
  ['Uptime target', '99.9%'],
  ['RPO / RTO', 'Defined per service tier'],
  [
    'Incident response',
    'Documented incident response process with notification timeline. Incident classes include: security, privacy, evidence-integrity, billing, onboarding, export, partner, and availability incidents.',
  ],
  [
    'Evidence\npreservation during\nincidents',
    'During any incident involving possible evidence corruption, data leakage, hold-sensitive data, or export failure, the platform preserves operational evidence sufficient for post-incident reconstruction.',
  ],
  [
    'Backup and recovery',
    'RDS automated backups and snapshots. S3 Object Lock retention. CloudWatch log retention. Exported report artifacts. Backup restore testing cadence defined.',
  ],
  [
    'Vulnerability\nmanagement',
    'Patching SLAs defined. Dependency scanning. Secret scanning. SAST and DAST scanning in CI/CD pipeline.',
  ],
  [
    'Change control',
    'Mapping rule updates require approval and generate governance events. Release notes stored and versioned. Rollback plan maintained.',
  ],
  [
    'Environment\nseparation',
    'Separate dev, staging, and production environments. No production data in non-production environments.',
  ],
  [
    'Supply chain security',
    'SBOM generation. Dependency scanning. Secret scanning. IaC scanning. Artifact signing. Protected CI/CD branches. Mandatory review before production merge.',
  ],
  [
    'Code signing',
    'Controlled software signing for distributed components. Signing metadata persistence. Artifact digest persistence.',
  ],
  [
    'Rate limiting',
    'Per-tenant and per-user/service-principal rate limiting at the API gateway. Throttling events logged for security monitoring.',
  ],
  ['WAF', 'Web Application Firewall applied to public-facing endpoints'],
  [
    'Secrets management',
    'Secrets stored in AWS Secrets Manager or SSM Parameter Store (KMS-encrypted). No secrets in source code. No production secrets in plain configuration files. No long-lived tokens in logs.',
  ],
  [
    'Connector security',
    'Least-privilege IAM templates per connector type. Connector secret rotation and revocation procedures defined.',
  ],
];

export const TRUST_PRIVACY_ROWS: [string, string][] = [
  [
    'PII minimisation',
    'PII minimisation and redaction rules applied before evidence commitment where possible. If redaction cannot be performed pre-commit, payload is classified and tagged to enforce downstream report redaction rules.',
  ],
  [
    'Data classes',
    'Evidence payloads (sensitive configuration), device identifiers, user identifiers — each with defined encryption, masking, and retention rules.',
  ],
  ['Report redaction', 'Defined rules for what never appears in generated PDF reports.'],
  [
    'Deletion path',
    'Where lawful deletion is required: crypto-erasure (delete encryption key) with legal deletion event recorded in the ledger.',
  ],
  [
    'Sensitive data at\ningestion',
    'Applied per Master Specification: PII minimisation/redaction before commit where possible; otherwise classify/tag for downstream handling.',
  ],
  [
    'Data breach\nresponse',
    'Data breach response posture maintained. Under the Notifiable Data Breaches scheme, eligible breaches are reported to the OAIC and affected individuals as required by Part IIIC of the Privacy Act 1988.',
  ],
];

export const TRUST_AUDITED_ACTIONS: { label: string; text: string }[] = [
  { label: 'Authentication events', text: 'login success, login failure, MFA challenge, MFA success, MFA failure.' },
  {
    label: 'Session lifecycle',
    text: 'session start, session end, session refresh, logout, failed attempts.',
  },
  {
    label: 'Role and permission changes',
    text: 'role assignment, role removal, permission changes.',
  },
  {
    label: 'Connector lifecycle',
    text: 'connect, disconnect, rekey, credential rotation, consent state changes.',
  },
  {
    label: 'Evidence actions',
    text: 'evidence ingestion (admin-triggered and system-triggered), evidence commitment events.',
  },
  { label: 'Export actions', text: 'export requests, export generation, export downloads.' },
  {
    label: 'Governance actions',
    text: 'attestation, risk acceptance, risk acceptance termination, governance review request initiation.',
  },
  {
    label: 'Scope changes',
    text: 'framework enablement/disablement, Essential Eight level changes, CIS profile selection changes.',
  },
  {
    label: 'Support access',
    text: 'support session requests, approvals, session start, session end, break-glass access.',
  },
  {
    label: 'Sensitive reads',
    text: 'report exports, cross-tenant portfolio summaries (MSP).',
  },
];
