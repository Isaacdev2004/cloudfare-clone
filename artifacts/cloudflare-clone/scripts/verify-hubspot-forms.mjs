/**
 * Live HubSpot Forms API v3 smoke test (all six site forms).
 * Usage: copy .env.example → .env.local, fill portal + form GUIDs, then `pnpm run verify:hubspot`.
 */
import { readFileSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');

function loadEnvFile(name) {
  const path = resolve(root, name);
  if (!existsSync(path)) return;
  for (const line of readFileSync(path, 'utf8').split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eq = trimmed.indexOf('=');
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    let value = trimmed.slice(eq + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    if (process.env[key] === undefined) process.env[key] = value;
  }
}

loadEnvFile('.env.local');
loadEnvFile('.env');

const portalId = process.env.VITE_HUBSPOT_PORTAL_ID?.trim();
if (!portalId) {
  console.error('Missing VITE_HUBSPOT_PORTAL_ID. Copy .env.example to .env.local and set HubSpot values.');
  process.exit(1);
}

const FORMS = [
  {
    label: 'contact',
    env: 'VITE_HUBSPOT_FORM_APEXLYN_CONTACT',
    fields: [
      { name: 'first_name', value: 'QA' },
      { name: 'last_name', value: 'Contact' },
      { name: 'email', value: 'qa.contact@example-company.com.au' },
      { name: 'phone', value: '+61 2 9000 0000' },
      { name: 'organisation', value: 'APEXLyn QA' },
      { name: 'job_title', value: 'Evaluator' },
      { name: 'inquiry_type', value: 'General inquiry' },
      { name: 'message', value: 'Automated HubSpot smoke test (contact).' },
    ],
  },
  {
    label: 'baseline',
    env: 'VITE_HUBSPOT_FORM_APEXLYN_BASELINE',
    fields: [
      { name: 'full_name', value: 'QA Baseline' },
      { name: 'email', value: 'qa.baseline@example-company.com.au' },
      { name: 'phone', value: '+61 2 9000 0001' },
      { name: 'organisation', value: 'APEXLyn QA' },
      { name: 'job_title', value: 'Evaluator' },
      { name: 'industry', value: 'Professional Services' },
      { name: 'org_size', value: '11-50' },
      { name: 'current_compliance', value: 'Essential Eight' },
      { name: 'environment_type', value: 'Microsoft 365' },
      { name: 'cloud_platforms', value: 'Microsoft Azure' },
      { name: 'security_tools', value: 'Microsoft Defender' },
      { name: 'ai_tools', value: 'No' },
      { name: 'primary_concern', value: 'Automated HubSpot smoke test (baseline).' },
    ],
  },
  {
    label: 'documentation',
    env: 'VITE_HUBSPOT_FORM_APEXLYN_DOCUMENTATION',
    fields: [
      { name: 'full_name', value: 'QA Documentation' },
      { name: 'email', value: 'qa.documentation@example-company.com.au' },
      { name: 'phone', value: '+61 2 9000 0002' },
      { name: 'organisation', value: 'APEXLyn QA' },
      { name: 'job_title', value: 'CISO' },
      { name: 'org_type', value: 'Enterprise' },
      { name: 'platform_interest', value: 'Track and Lens' },
      { name: 'doc_types', value: 'Architecture overview' },
      { name: 'evaluation_context', value: 'Automated HubSpot smoke test (documentation).' },
    ],
  },
  {
    label: 'newsletter',
    env: 'VITE_HUBSPOT_FORM_APEXLYN_NEWSLETTER',
    fields: [{ name: 'email', value: 'qa.newsletter@example-company.com.au' }],
    includeMarketingFields: false,
  },
  {
    label: 'resource_interest',
    env: 'VITE_HUBSPOT_FORM_APEXLYN_RESOURCE_INTEREST',
    fields: [
      { name: 'email', value: 'qa.resources@example-company.com.au' },
      { name: 'interest_category', value: 'whitepapers' },
      { name: 'page_url', value: 'https://www.apexlyn.com.au/resources/whitepapers' },
    ],
    includeMarketingFields: false,
  },
  {
    label: 'pdf_download',
    env: 'VITE_HUBSPOT_FORM_APEXLYN_PDF_DOWNLOAD',
    fields: [
      { name: 'email', value: 'qa.pdf@example-company.com.au' },
      { name: 'resource_slug', value: 'qa-smoke-test' },
      { name: 'resource_title', value: 'QA smoke test' },
    ],
    includeMarketingFields: false,
  },
];

const marketingFields = [
  { name: 'utm_source', value: 'qa' },
  { name: 'utm_medium', value: 'script' },
  { name: 'utm_campaign', value: 'hubspot_verify' },
  { name: 'utm_term', value: '' },
  { name: 'utm_content', value: '' },
  { name: 'referrer_url', value: '' },
  { name: 'landing_page', value: 'https://www.apexlyn.com.au/' },
];

let failed = 0;

for (const form of FORMS) {
  const formGuid = process.env[form.env]?.trim();
  if (!formGuid) {
    console.error(`FAIL ${form.label}: missing ${form.env}`);
    failed += 1;
    continue;
  }

  const fields =
    form.includeMarketingFields === false ? form.fields : [...form.fields, ...marketingFields];

  const res = await fetch(
    `https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${formGuid}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fields,
        context: {
          pageUri: 'https://www.apexlyn.com.au/',
          pageName: 'APEXLyn HubSpot verify',
        },
      }),
    },
  );

  const body = await res.text();
  if (res.ok) {
    console.log(`OK   ${form.label} (${res.status})`);
  } else {
    failed += 1;
    console.error(`FAIL ${form.label} (${res.status}): ${body.slice(0, 240)}`);
  }
}

if (failed > 0) {
  console.error(`\n${failed} form(s) failed. Check HubSpot form field internal names match the site.`);
  process.exit(1);
}

console.log('\nAll HubSpot form submissions succeeded.');
