import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

import { Layout } from "@/components/Layout";
import Home from "@/pages/Home";
import Products from "@/pages/Products";
import Pricing from "@/pages/Pricing";
import Solutions from "@/pages/Solutions";
import WhyCloudflare from "@/pages/WhyCloudflare";
import Enterprise from "@/pages/Enterprise";
import ZeroTrust from "@/pages/ZeroTrust";
import Developers from "@/pages/Developers";
import {
  PrivacyPolicyPage,
  TermsOfUsePage,
  ReportSecurityPage,
  ResourcesIndexPage,
  ResourcesBlogPage,
  ResourcesCaseStudiesPage,
  ResourcesWebinarsPage,
  ResourcesDocumentationPage,
  ResourcesCommunityPage,
  CompanyIndexPage,
  CompanyAboutPage,
  CompanyCareersPage,
  CompanyPressPage,
  CompanyInvestorsPage,
  CompanyImpactPage,
  SupportIndexPage,
  SupportHelpCenterPage,
  SupportSystemStatusPage,
  SupportCompliancePage,
  SupportTrustHubPage,
  SupportCookiePreferencesPage,
} from "@/pages/InfoPages";
import NotFound from "@/pages/not-found";
import ApexlynNavPage from "@/pages/ApexlynNavPage";
import PlatformsOverview from "@/pages/PlatformsOverview";
import TrackPlatformPage from "@/pages/TrackPlatformPage";
import LensPlatformPage from "@/pages/LensPlatformPage";
import ArchitectureOverviewPage from "@/pages/ArchitectureOverviewPage";
import IndustriesIndexPage from "@/pages/IndustriesIndexPage";
import IndustryPage from "@/pages/IndustryPage";
import TrustCenterPage from "@/pages/TrustCenterPage";
import TrustRequestDocumentationPage from "@/pages/TrustRequestDocumentationPage";
import ContactApexlynPage from "@/pages/ContactApexlynPage";
import TestSecurityStatePage from "@/pages/TestSecurityStatePage";
import {
  ResourcesWhitepapersPage,
  ResourcesFrameworkGuidesPage,
  ResourcesAIRiskBriefsPage,
} from "@/pages/ResourcesSubpages";

const queryClient = new QueryClient();

function Router() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/platforms/track" component={TrackPlatformPage} />
        <Route path="/platforms/lens" component={LensPlatformPage} />
        <Route path="/platforms/architecture" component={ArchitectureOverviewPage} />
        <Route path="/products" component={Products} />
        <Route path="/pricing" component={Pricing} />
        <Route path="/plans" component={Pricing} />
        <Route path="/solutions/cyber-security-services" component={ApexlynNavPage} />
        <Route path="/solutions/ai-governance-advisory" component={ApexlynNavPage} />
        <Route path="/solutions/compliance-operations" component={ApexlynNavPage} />
        <Route path="/solutions" component={Solutions} />
        <Route path="/why-cloudflare" component={WhyCloudflare} />
        <Route path="/enterprise" component={Enterprise} />
        <Route path="/zero-trust" component={ZeroTrust} />
        <Route path="/cloudflare-one" component={ZeroTrust} />
        <Route path="/developers" component={Developers} />
        <Route path="/privacy-policy" component={PrivacyPolicyPage} />
        <Route path="/terms-of-use" component={TermsOfUsePage} />
        <Route path="/report-security" component={ReportSecurityPage} />
        <Route path="/resources/whitepapers" component={ResourcesWhitepapersPage} />
        <Route path="/resources/framework-guides" component={ResourcesFrameworkGuidesPage} />
        <Route path="/resources/ai-risk-briefs" component={ResourcesAIRiskBriefsPage} />
        <Route path="/resources" component={ResourcesIndexPage} />
        <Route path="/resources/blog" component={ResourcesBlogPage} />
        <Route path="/resources/case-studies" component={ResourcesCaseStudiesPage} />
        <Route path="/resources/webinars" component={ResourcesWebinarsPage} />
        <Route path="/resources/documentation" component={ResourcesDocumentationPage} />
        <Route path="/resources/community" component={ResourcesCommunityPage} />
        <Route path="/company/contact" component={ContactApexlynPage} />
        <Route path="/company/about" component={CompanyAboutPage} />
        <Route path="/company/careers" component={CompanyCareersPage} />
        <Route path="/company" component={CompanyIndexPage} />
        <Route path="/company/press" component={CompanyPressPage} />
        <Route path="/company/investors" component={CompanyInvestorsPage} />
        <Route path="/company/impact" component={CompanyImpactPage} />
        <Route path="/support" component={SupportIndexPage} />
        <Route path="/support/help-center" component={SupportHelpCenterPage} />
        <Route path="/support/system-status" component={SupportSystemStatusPage} />
        <Route path="/support/compliance" component={SupportCompliancePage} />
        <Route path="/support/trust-hub" component={SupportTrustHubPage} />
        <Route path="/support/cookie-preferences" component={SupportCookiePreferencesPage} />
        <Route path="/platforms" component={PlatformsOverview} />
        <Route path="/industries/:slug" component={IndustryPage} />
        <Route path="/industries" component={IndustriesIndexPage} />
        <Route path="/trust-center/request-documentation" component={TrustRequestDocumentationPage} />
        <Route path="/trust-center" component={TrustCenterPage} />
        <Route path="/test-security-state" component={TestSecurityStatePage} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
