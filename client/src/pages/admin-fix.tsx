import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, AlertCircle, CheckCircle } from "lucide-react";

export default function AdminFix() {
  const [isRunning, setIsRunning] = useState(false);
  const [results, setResults] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const runFix = async () => {
    setIsRunning(true);
    setError(null);
    setResults(null);

    try {
      const response = await fetch("/api/fix-failed-subscriptions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      });

      if (response.ok) {
        const data = await response.json();
        setResults(data.results);
      } else {
        const errorData = await response.json();
        setError(errorData.error || "Failed to run fix");
      }
    } catch (err: any) {
      setError(err.message || "An error occurred");
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle>Fix Failed Subscriptions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                This will find subscriptions with payment issues and link them to their original payment methods.
              </AlertDescription>
            </Alert>

            <Button onClick={runFix} disabled={isRunning} className="w-full">
              {isRunning ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Running...
                </>
              ) : (
                "Run Fix"
              )}
            </Button>

            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {results && (
              <Alert>
                <CheckCircle className="h-4 w-4" />
                <AlertDescription>
                  Processed: {results.processed}, Fixed: {results.fixed}, Failed: {results.failed}
                  {results.errors?.length > 0 && (
                    <div className="mt-2">
                      <strong>Errors:</strong>
                      <ul className="list-disc ml-4">
                        {results.errors.map((err: string, i: number) => (
                          <li key={i}>{err}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </AlertDescription>
              </Alert>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}