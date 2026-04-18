// src/template/TemplateLoader.ts
import fs from "fs";
import path from "path";
import { TemplateConfigSchema, TemplateConfig } from "./types";

/**
 * Load and validate a show's video template config.
 *
 * @param showSlug - e.g. "wonder-cabinet"
 * @param suiteRoot - path to podcast-publishing-suite root
 * @returns Validated TemplateConfig
 */
export function loadTemplate(
  showSlug: string,
  suiteRoot: string
): TemplateConfig {
  const templatePath = path.join(
    suiteRoot,
    "shows",
    showSlug,
    "video-template",
    "template.json"
  );

  if (!fs.existsSync(templatePath)) {
    throw new Error(
      `Template not found for show "${showSlug}" at ${templatePath}`
    );
  }

  const raw = JSON.parse(fs.readFileSync(templatePath, "utf-8"));
  return TemplateConfigSchema.parse(raw);
}

/**
 * Resolve an asset filename to its path in the audiogram-tools images/ directory.
 * Assets referenced in template.json are filenames only (e.g. "bg-galaxy-spiral-1200w@2x.png").
 * They must exist in modules/audiogram-tools/images/.
 */
export function resolveAssetPath(
  assetFilename: string,
  audiogramRoot: string
): string {
  const assetPath = path.join(audiogramRoot, "images", assetFilename);
  if (!fs.existsSync(assetPath)) {
    throw new Error(
      `Asset "${assetFilename}" not found at ${assetPath}`
    );
  }
  return assetPath;
}
