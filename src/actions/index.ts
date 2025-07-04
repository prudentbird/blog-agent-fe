import { createServerFn } from "@tanstack/react-start";

export const generateBlogPost = createServerFn({ method: "POST" })
  .validator(
    (data: { query: string | undefined; error?: string; result?: string }) => {
      if (!data?.query || !data.query.trim()) {
        return {
          query: undefined,
          error: "Query is required",
        };
      }
      return data;
    },
  )
  .handler(async ({ data, signal }) => {
    try {
      if (data.error) {
        throw new Error(data.error);
      }

      const res = await fetch(`${process.env.API_URL}/blog`, {
        method: "POST",
        body: JSON.stringify({ query: data.query }),
        headers: {
          "Content-Type": "application/json",
        },
        signal,
      });

      if (!res.ok) {
        const { error } = await res.json();
        throw new Error(error ?? "Failed to generate blog post");
      }

      const { result } = await res.json();
      return { error: undefined, result, query: data.query };
    } catch (err: unknown) {
      return {
        query: data.query,
        result: undefined,
        error: err instanceof Error ? err.message : "Something went wrong",
      };
    }
  });
