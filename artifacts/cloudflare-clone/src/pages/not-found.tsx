import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import { Link } from "wouter";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#f8fafc] px-4">
      <Card className="w-full max-w-md border-slate-200 bg-white">
        <CardContent className="pt-6">
          <div className="flex mb-4 gap-2">
            <AlertCircle className="h-8 w-8 text-[#1E3A8A]" />
            <h1 className="text-2xl font-bold text-slate-900">404 Page Not Found</h1>
          </div>

          <p className="mt-4 text-sm text-slate-600">The page you requested does not exist in this clone.</p>
          <Link
            href="/"
            className="mt-6 inline-flex items-center justify-center rounded px-4 py-2 text-sm font-semibold text-white"
            style={{ backgroundColor: "#1E3A8A" }}
          >
            Back to homepage
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
