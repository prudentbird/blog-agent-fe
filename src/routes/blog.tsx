import { z } from "zod/v4";
import { zodValidator } from "@tanstack/zod-adapter";
import { createFileRoute } from "@tanstack/react-router";

const blogParamsSchema = z.object({
  content: z.string(),
});

export const Route = createFileRoute("/blog")({
  component: RouteComponent,
  validateSearch: zodValidator(blogParamsSchema),
});

function RouteComponent() {
  const { content } = Route.useSearch();
  return <div className="flex flex-col gap-4 p-4">{content}</div>;
}
