import React from "react";
import { useLocation } from "wouter";
import TrackPlatformPage from "@/pages/TrackPlatformPage";
import LensPlatformPage from "@/pages/LensPlatformPage";
import ArchitectureOverviewPage from "@/pages/ArchitectureOverviewPage";
import IndustryPage from "@/pages/IndustryPage";
import TrustCenterPage from "@/pages/TrustCenterPage";
import TrustRequestDocumentationPage from "@/pages/TrustRequestDocumentationPage";
import ContactApexlynPage from "@/pages/ContactApexlynPage";
import TestSecurityStatePage from "@/pages/TestSecurityStatePage";
import CyberSecurityServicesPage from "@/pages/CyberSecurityServicesPage";
import AIGovernanceAdvisoryPage from "@/pages/AIGovernanceAdvisoryPage";
import ComplianceOperationsPage from "@/pages/ComplianceOperationsPage";

/** Normalise so `/platforms/lens` and `/platforms/lens/` both match. */
function normalizePath(path: string) {
  if (path.length > 1 && path.endsWith("/")) return path.slice(0, -1);
  return path;
}

export default function ApexlynNavPage() {
  const [loc] = useLocation();
  const path = normalizePath(loc);

  // Renders full platform pages even if a stale route still points here (or cache).
  if (path === "/solutions/cyber-security-services") return <CyberSecurityServicesPage />;
  if (path === "/solutions/ai-governance-advisory") return <AIGovernanceAdvisoryPage />;
  if (path === "/solutions/compliance-operations") return <ComplianceOperationsPage />;

  if (path === "/platforms/track") return <TrackPlatformPage />;
  if (path === "/platforms/lens") return <LensPlatformPage />;
  if (path === "/platforms/architecture" || path === "/architecture-overview") return <ArchitectureOverviewPage />;

  if (path.startsWith("/industries/")) {
    const slug = path.slice("/industries/".length).split("/")[0];
    if (slug) return <IndustryPage params={{ slug }} />;
  }

  if (path === "/trust-center/request-documentation" || path === "/request-security-documentation")
    return <TrustRequestDocumentationPage />;
  if (path === "/trust-center") return <TrustCenterPage />;
  if (path === "/company/contact" || path === "/contact") return <ContactApexlynPage />;
  if (path === "/test-security-state" || path === "/test-your-security-state") return <TestSecurityStatePage />;

  const meta = { title: "APEXLyn", eyebrow: undefined as string | undefined };

  return (
    <div className="flex flex-col apex-page-bg min-h-[calc(100dvh-108px)]">
      <div className="max-w-[1280px] w-full mx-auto px-6 py-16 sm:py-20">
        {meta.eyebrow ? (
          <p className="text-sm font-semibold uppercase tracking-widest text-[#1E3A8A] mb-3">
            {meta.eyebrow}
          </p>
        ) : null}
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">{meta.title}</h1>
        <p className="mt-4 text-lg text-slate-600 max-w-2xl leading-relaxed">
          Content for this page will be provided in the next content pass.
        </p>
      </div>
    </div>
  );
}
