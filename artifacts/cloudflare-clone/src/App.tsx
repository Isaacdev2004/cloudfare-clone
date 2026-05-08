import { useEffect } from "react";
import { Switch, Route, Router as WouterRouter, Redirect } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

import { Layout } from "@/components/Layout";
import { DocumentSeo } from "@/components/DocumentSeo";
import { RouteLoadingBar } from "@/components/RouteLoadingBar";
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
  CookiePolicyPage,
  DisclaimerPage,
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
import ResourceArticlePage from "@/pages/ResourceArticlePage";
import { getAnalyticsConsent, initPostHogAfterConsent } from "@/lib/apexlyn-analytics-consent";
import { ResourcesCategoryPage } from "@/pages/ResourcesCategoryPage";

const queryClient = new QueryClient();

function Router() {
  useEffect(() => {
    if (getAnalyticsConsent() === "accepted") initPostHogAfterConsent();
  }, []);

  return (
    <>
      <RouteLoadingBar />
      <DocumentSeo />
      <Layout>
        <Switch>
          {/* §16 canonical primary routes */}
          <Route path="/" component={Home} />
          <Route path="/track" component={TrackPlatformPage} />
          <Route path="/lens" component={LensPlatformPage} />
          <Route path="/architecture" component={ArchitectureOverviewPage} />
          <Route path="/trust" component={TrustCenterPage} />
          <Route path="/pricing" component={Pricing} />
          <Route path="/about" component={CompanyAboutPage} />
          <Route path="/contact" component={ContactApexlynPage} />
          <Route path="/baseline" component={TestSecurityStatePage} />
          <Route path="/documentation" component={TrustRequestDocumentationPage} />

          {/* Legacy → canonical (bookmarks) */}
          <Route path="/platforms/track"><Redirect to="/track" /></Route>
          <Route path="/platforms/lens"><Redirect to="/lens" /></Route>
          <Route path="/platforms/architecture"><Redirect to="/architecture" /></Route>
          <Route path="/architecture-overview"><Redirect to="/architecture" /></Route>
          <Route path="/trust-center"><Redirect to="/trust" /></Route>
          <Route path="/company/about"><Redirect to="/about" /></Route>
          <Route path="/test-your-security-state"><Redirect to="/baseline" /></Route>
          <Route path="/test-security-state"><Redirect to="/baseline" /></Route>
          <Route path="/request-security-documentation"><Redirect to="/documentation" /></Route>
          <Route path="/trust-center/request-documentation"><Redirect to="/documentation" /></Route>

          <Route path="/platforms" component={PlatformsOverview} />
          <Route path="/products" component={Products} />
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
          <Route path="/privacy" component={PrivacyPolicyPage} />
          <Route path="/privacy-policy"><Redirect to="/privacy" /></Route>
          <Route path="/cookies" component={CookiePolicyPage} />
          <Route path="/disclaimer" component={DisclaimerPage} />
          <Route path="/terms" component={TermsOfUsePage} />
          <Route path="/terms-of-use"><Redirect to="/terms" /></Route>
          <Route path="/report-security" component={ReportSecurityPage} />
          <Route
            path="/resources/whitepapers"
            component={() => <ResourcesCategoryPage category="whitepapers" />}
          />
          <Route
            path="/resources/framework-guides"
            component={() => <ResourcesCategoryPage category="framework-guides" />}
          />
          <Route
            path="/resources/ai-risk-briefs"
            component={() => <ResourcesCategoryPage category="ai-risk-briefs" />}
          />
          <Route path="/resources/blog" component={ResourcesBlogPage} />
          <Route path="/resources/case-studies" component={ResourcesCaseStudiesPage} />
          <Route path="/resources/webinars" component={ResourcesWebinarsPage} />
          <Route path="/resources/documentation" component={ResourcesDocumentationPage} />
          <Route path="/resources/community" component={ResourcesCommunityPage} />
          <Route path="/resources/:category/:slug" component={ResourceArticlePage} />
          <Route path="/resources" component={ResourcesIndexPage} />
          <Route path="/company/contact"><Redirect to="/contact" /></Route>
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
          <Route path="/industries/:slug" component={IndustryPage} />
          <Route path="/industries" component={IndustriesIndexPage} />
          <Route path="/404" component={NotFound} />
          <Route component={NotFound} />
        </Switch>
      </Layout>
    </>
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
