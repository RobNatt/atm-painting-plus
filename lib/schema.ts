import { hoursToDays, site } from "./site";

const businessId = () => `${site.url.value}/#business`;

/**
 * LocalBusiness (HousePainter) schema. Only confirmed values are included,
 * so placeholder phone numbers, hours or towns never reach search engines.
 */
export function localBusinessSchema() {
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "HousePainter",
    "@id": businessId(),
    name: site.name,
    url: site.url.value,
    founder: { "@type": "Person", name: site.owner },
    address: {
      "@type": "PostalAddress",
      addressLocality: site.baseCity.locality,
      addressRegion: site.baseCity.region,
      addressCountry: site.baseCity.country,
    },
    knowsAbout: ["Interior painting", "Exterior house painting"],
  };

  if (site.phone.confirmed) schema.telephone = site.phone.value.tel;
  if (site.logo.confirmed && site.logo.value) schema.logo = `${site.url.value}${site.logo.value}`;
  if (site.towns.confirmed) {
    schema.areaServed = site.towns.value.map((t) => ({ "@type": "City", name: `${t}, MI` }));
  }
  if (site.hours.confirmed) {
    schema.openingHoursSpecification = site.hours.value.map((h) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: hoursToDays[h.label] ?? [],
      opens: h.open,
      closes: h.close,
    }));
  }

  return schema;
}

export function serviceSchema(name: string, path: string, description: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    serviceType: name,
    description,
    url: `${site.url.value}${path}`,
    provider: { "@id": businessId() },
    areaServed: { "@type": "City", name: "Grand Rapids, MI" },
  };
}
