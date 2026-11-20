import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    // Placeholder builds (no confirmed domain) are kept out of search engines.
    rules: site.url.confirmed ? { userAgent: "*", allow: "/" } : { userAgent: "*", disallow: "/" },
    sitemap: `${site.url.value}/sitemap.xml`,
  };
}
