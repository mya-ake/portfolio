import { z } from "zod";
import { extractParameter } from "@shared/url/extract_parameter.ts";

export const Parameter = z.object({
  type: z.enum(["square", "icon", "text"]).default("square"),
  ext: z.enum(["png", "svg"]).default("png"),
  text: z.string().max(100).default("").transform((v) => v?.trim()),
  size: z.preprocess(
    (v) => v && Number(v),
    z.number().min(10).max(2000).default(640),
  ),
}).superRefine(({ type, text }, ctx) => {
  if (type === "text" && (text === undefined || text?.length === 0)) {
    ctx.addIssue({
      code: "custom",
      message: "When type is text, text is required.",
    });
  }
});

export type Parameter = z.infer<typeof Parameter>;

export function parseParameter(url: URL) {
  return Parameter.parse(extractParameter(url));
}
