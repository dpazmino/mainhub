import { Link } from "wouter";
import { AlertCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function NotFound() {
  return (
    <div className="min-h-screen grid place-items-center px-5 by-noise">
      <div className="absolute inset-0 by-shimmer" />
      <div className="absolute inset-0 by-grid opacity-[0.55]" />

      <Card className="relative w-full max-w-md rounded-3xl bg-white/70 border-border/70 shadow-md backdrop-blur supports-[backdrop-filter]:bg-white/55">
        <CardContent className="pt-6">
          <div className="flex mb-3 gap-3 items-start">
            <div
              className="grid h-10 w-10 place-items-center rounded-2xl border border-border bg-white/70"
              data-testid="img-404-icon"
            >
              <AlertCircle className="h-5 w-5 text-[hsl(var(--destructive))]" />
            </div>
            <div>
              <h1 className="text-2xl font-semibold tracking-tight" data-testid="text-404-title">
                Page not found
              </h1>
              <p className="mt-1 text-sm text-muted-foreground" data-testid="text-404-subtitle">
                That link doesn’t exist in this prototype.
              </p>
            </div>
          </div>

          <div className="mt-5 flex items-center gap-2">
            <Link href="/">
              <Button className="rounded-full" data-testid="button-go-home">
                Go home
              </Button>
            </Link>
            <Button
              variant="secondary"
              className="rounded-full bg-white/70 border border-border hover:bg-white"
              data-testid="button-try-again"
            >
              Try again
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
