import { z } from "zod";

/**
 * Schema for a single layer in the video template stack.
 * Layers render bottom-to-top (index 0 = back).
 */
export const LayerDefSchema = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("solid"),
    color: z.string(),
    grain: z.boolean().optional(),
  }),
  z.object({
    type: z.literal("spiral"),
    asset: z.string(),
    rotationSpeed: z.number().optional(),
    opacity: z.number().optional(),
  }),
  z.object({
    type: z.literal("cabinet-frame"),
    asset: z.string(),
    artClip: z.boolean().optional(),
  }),
  z.object({
    type: z.literal("title-image"),
    asset: z.string(),
    layout: z.enum(["flanking", "stacked"]),
    leftAsset: z.string().optional(),
    rightAsset: z.string().optional(),
  }),
]);

export type LayerDef = z.infer<typeof LayerDefSchema>;

export const OrientationSchema = z.object({
  width: z.number(),
  height: z.number(),
  layers: z.array(LayerDefSchema),
});

export type OrientationConfig = z.infer<typeof OrientationSchema>;

export const TemplateConfigSchema = z.object({
  name: z.string(),
  show: z.string(),
  fps: z.number().default(30),
  horizontal: OrientationSchema,
  vertical: OrientationSchema,
});

export type TemplateConfig = z.infer<typeof TemplateConfigSchema>;
