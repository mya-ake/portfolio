import { z } from "zod";
import { extractParameter } from "@shared/url/extract_parameter.ts";

export const Parameter = z.object({
  type: z.enum(["square", "icon"]).default("square"),
  ext: z.enum(["png", "svg"]).default("png"),
  size: z.preprocess(
    (v) => v && Number(v),
    z.number().min(10).max(2000).default(640),
  ),
});

export type Parameter = z.infer<typeof Parameter>;

export function parseParameter(url: URL) {
  return Parameter.parse(extractParameter(url));
}
