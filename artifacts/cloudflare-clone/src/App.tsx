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
  ResourcesBlogPage,
  ResourcesCaseStudiesPage,
  ResourcesWebinarsPage,
  ResourcesDocumentationPage,
  ResourcesCommunityPage,
  CompanyAboutPage,
  CompanyCareersPage,
  CompanyPressPage,
  CompanyInvestorsPage,
  CompanyImpactPage,
  SupportHelpCenterPage,
  SupportSystemStatusPage,
  SupportCompliancePage,
  SupportTrustHubPage,
  SupportCookiePreferencesPage,
} from "@/pages/InfoPages";
import NotFound from "@/pages/not-found";

const queryClient = new QueryClient();

function Router() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/products" component={Products} />
        <Route path="/pricing" component={Pricing} />
        <Route path="/plans" component={Pricing} />
        <Route path="/solutions" component={Solutions} />
        <Route path="/why-cloudflare" component={WhyCloudflare} />
        <Route path="/enterprise" component={Enterprise} />
        <Route path="/zero-trust" component={ZeroTrust} />
        <Route path="/cloudflare-one" component={ZeroTrust} />
        <Route path="/developers" component={Developers} />
        <Route path="/privacy-policy" component={PrivacyPolicyPage} />
        <Route path="/terms-of-use" component={TermsOfUsePage} />
        <Route path="/report-security" component={ReportSecurityPage} />
        <Route path="/resources/blog" component={ResourcesBlogPage} />
        <Route path="/resources/case-studies" component={ResourcesCaseStudiesPage} />
        <Route path="/resources/webinars" component={ResourcesWebinarsPage} />
        <Route path="/resources/documentation" component={ResourcesDocumentationPage} />
        <Route path="/resources/community" component={ResourcesCommunityPage} />
        <Route path="/company/about" component={CompanyAboutPage} />
        <Route path="/company/careers" component={CompanyCareersPage} />
        <Route path="/company/press" component={CompanyPressPage} />
        <Route path="/company/investors" component={CompanyInvestorsPage} />
        <Route path="/company/impact" component={CompanyImpactPage} />
        <Route path="/support/help-center" component={SupportHelpCenterPage} />
        <Route path="/support/system-status" component={SupportSystemStatusPage} />
        <Route path="/support/compliance" component={SupportCompliancePage} />
        <Route path="/support/trust-hub" component={SupportTrustHubPage} />
        <Route path="/support/cookie-preferences" component={SupportCookiePreferencesPage} />
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
