import React, { useMemo } from "react";
import { useLocation } from "wouter";
import TrackPlatformPage from "@/pages/TrackPlatformPage";
import LensPlatformPage from "@/pages/LensPlatformPage";
import ArchitectureOverviewPage from "@/pages/ArchitectureOverviewPage";
import IndustryPage from "@/pages/IndustryPage";
import TrustCenterPage from "@/pages/TrustCenterPage";
import TrustRequestDocumentationPage from "@/pages/TrustRequestDocumentationPage";
import ContactApexlynPage from "@/pages/ContactApexlynPage";
import TestSecurityStatePage from "@/pages/TestSecurityStatePage";

/** Normalise so `/platforms/lens` and `/platforms/lens/` both match. */
function normalizePath(path: string) {
  if (path.length > 1 && path.endsWith("/")) return path.slice(0, -1);
  return path;
}

const PAGE_COPY: Record<string, { eyebrow?: string; title: string }> = {
  "/solutions/cyber-security-services": { eyebrow: "Solutions", title: "Cyber Security Services" },
  "/solutions/ai-governance-advisory": { eyebrow: "Solutions", title: "AI Governance Advisory" },
  "/solutions/compliance-operations": { eyebrow: "Solutions", title: "Compliance Operations" },
};

export default function ApexlynNavPage() {
  const [loc] = useLocation();
  const path = normalizePath(loc);

  // Renders full platform pages even if a stale route still points here (or cache).
  if (path === "/platforms/track") return <TrackPlatformPage />;
  if (path === "/platforms/lens") return <LensPlatformPage />;
  if (path === "/platforms/architecture") return <ArchitectureOverviewPage />;

  if (path.startsWith("/industries/")) {
    const slug = path.slice("/industries/".length).split("/")[0];
    if (slug) return <IndustryPage params={{ slug }} />;
  }

  if (path === "/trust-center/request-documentation") return <TrustRequestDocumentationPage />;
  if (path === "/trust-center") return <TrustCenterPage />;
  if (path === "/company/contact") return <ContactApexlynPage />;
  if (path === "/test-security-state") return <TestSecurityStatePage />;

  const meta = useMemo(() => PAGE_COPY[path] ?? { title: "APEXLyn" }, [path]);

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
