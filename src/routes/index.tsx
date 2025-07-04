import {
  Card,
  CardTitle,
  CardHeader,
  CardFooter,
  CardContent,
  CardDescription,
} from "~/components/ui/card";
import { z } from "zod/v4";
import { useState, useEffect } from "react";
import { generateBlogPost } from "~/actions";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Button } from "~/components/ui/button";
import { AlertCircle, Loader2 } from "lucide-react";
import { zodValidator } from "@tanstack/zod-adapter";
import { Alert, AlertDescription } from "~/components/ui/alert";
import { createFileRoute, useNavigate } from "@tanstack/react-router";

const querySchema = z.object({
  query: z.string().min(3).default(""),
});

export const Route = createFileRoute("/")({
  component: Home,
  validateSearch: zodValidator(querySchema),
});

function Home() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const { query: queryParam } = Route.useSearch();
  const [isPending, setIsPending] = useState(false);
  const [inputQuery, setInputQuery] = useState(queryParam ?? "");

  useEffect(() => {
    if (queryParam) {
      handleSubmit({ query: queryParam });
    }
  }, [queryParam]);

  const handleSubmit = async (data: { query: string }) => {
    try {
      setIsPending(true);
      const response = await generateBlogPost({ data });

      if (response.error) {
        setInputQuery(response.query ?? "");
        throw new Error(response.error);
      }

      navigate({
        to: "/blog",
        replace: true,
        search: { content: response.result ?? "" },
      });
    } catch (error) {
      setError(error instanceof Error ? error.message : "Something went wrong");
    } finally {
      setIsPending(false);
    }
  };

  const query = Route.useSearch().query ?? inputQuery;

  return (
    <div className="flex justify-center items-center h-screen w-full p-4">
      <Card className="w-full max-w-lg mx-auto justify-center self-center">
        <CardHeader>
          <CardTitle>Generate Blog Post</CardTitle>
          <CardDescription>
            Enter a topic to generate a blog post
          </CardDescription>
        </CardHeader>
        <form
          autoComplete="on"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit({ query: e.currentTarget.query.value });
          }}
          className="flex flex-col gap-5"
        >
          <CardContent className="flex flex-col gap-2">
            <Label htmlFor="query">Topic</Label>
            <Input
              required
              id="query"
              type="text"
              name="query"
              minLength={3}
              defaultValue={query}
              placeholder="Enter a topic to generate a blog post"
            />
            {error && (
              <Alert variant={"destructive"}>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
          </CardContent>
          <CardFooter>
            <Button className="w-full" type="submit">
              {isPending ? <Loader2 className="animate-spin" /> : "Generate"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
