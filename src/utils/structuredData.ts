import { PortfolioData } from "../@types";
import { getBadgeData } from "../constants/badges.constants";

export interface SeoConfig {
  site_url?: string;
  profile_image?: string;
  default_language?: string;
  available_languages?: string[];
  job_title?: string;
  home_location?: {
    address_country?: string;
    address_region?: string;
    address_locality?: string;
  };
}

type JsonLdValue =
  | string
  | number
  | boolean
  | null
  | JsonLdValue[]
  | { [key: string]: JsonLdValue };

type JsonLdObject = { [key: string]: JsonLdValue };

const LINKEDIN_URL = "https://linkedin.com/in/";
const GITHUB_URL = "https://github.com/";

function removeEmpty(value: unknown): JsonLdValue | undefined {
  if (value === undefined) return undefined;
  if (value === "" || value === null) return undefined;

  if (Array.isArray(value)) {
    const arr = value
      .map(removeEmpty)
      .filter((item): item is JsonLdValue => item !== undefined);

    return arr.length ? arr : undefined;
  }

  if (typeof value === "object") {
    const entries = Object.entries(value as Record<string, unknown>)
      .map(([key, entry]) => [key, removeEmpty(entry)] as const)
      .filter(([, entry]) => entry !== undefined);

    return entries.length
      ? (Object.fromEntries(entries) as JsonLdObject)
      : undefined;
  }

  if (
    typeof value === "string" ||
    typeof value === "number" ||
    typeof value === "boolean"
  ) {
    return value;
  }

  return undefined;
}

export function stripHtml(value: string) {
  const div = document.createElement("div");
  div.innerHTML = value
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/div>/gi, "\n")
    .replace(/<div[^>]*>/gi, "");

  return (div.textContent ?? "")
    .replace(/\s+\n/g, "\n")
    .replace(/\n\s+/g, "\n")
    .replace(/[ \t]{2,}/g, " ")
    .trim();
}

function getBaseUrl(config: SeoConfig) {
  const fallback = window.location.origin;
  return (config.site_url || fallback).replace(/\/$/, "");
}

function absoluteUrl(pathOrUrl: string | undefined, baseUrl: string) {
  if (!pathOrUrl) return undefined;

  try {
    return new URL(pathOrUrl, `${baseUrl}/`).toString();
  } catch {
    return undefined;
  }
}

function getBadgeLabel(badge: string) {
  return getBadgeData(badge).label;
}

function getUniqueBadgeLabels(groups: { badges: string[] }[]) {
  return Array.from(
    new Set(groups.flatMap((group) => group.badges.map(getBadgeLabel))),
  );
}

function getOrganizationName(subtitle: string) {
  return subtitle.split("(")[0].split("[")[0].trim();
}

function getLanguageCode(language: string, config: SeoConfig) {
  if (language.startsWith("en")) return "en-US";
  if (language.startsWith("pt")) return "pt-BR";

  return config.default_language ?? "pt-BR";
}

function getSameAs(data: PortfolioData) {
  return [
    data.contacts.linkedin
      ? `${LINKEDIN_URL}${data.contacts.linkedin}/`
      : undefined,
    data.contacts.github ? `${GITHUB_URL}${data.contacts.github}` : undefined,
    data.portfolio_repo_url,
  ].filter((url): url is string => Boolean(url));
}

function getProjectId(title: string) {
  return title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function buildPortfolioStructuredData(
  data: PortfolioData,
  config: SeoConfig,
  language: string,
) {
  const baseUrl = getBaseUrl(config);
  const pageUrl = `${baseUrl}/`;
  const personId = `${pageUrl}#person`;
  const websiteId = `${pageUrl}#website`;
  const profilePageId = `${pageUrl}#profile-page`;
  const locale = getLanguageCode(language, config);
  const skills = getUniqueBadgeLabels(data.stacks);

  const projects = data.projects.map((project) => {
    const projectId = `${pageUrl}#project-${getProjectId(project.title)}`;
    const projectUrl = project.links.find((link) => link.url)?.url;

    return removeEmpty({
      "@type": "SoftwareApplication",
      "@id": projectId,
      name: project.title,
      alternateName: project.subtitle,
      description: stripHtml(project.desc),
      image: project.imgs.map((img) => absoluteUrl(img, baseUrl)),
      url: projectUrl,
      mainEntityOfPage: { "@id": profilePageId },
      contributor: { "@id": personId },
      keywords: project.badges.map(getBadgeLabel),
      programmingLanguage: project.badges.map(getBadgeLabel),
      sameAs: project.links.map((link) => link.url),
    }) as JsonLdObject;
  });

  const graph = [
    removeEmpty({
      "@type": "WebSite",
      "@id": websiteId,
      name: `${data.title} Portfolio`,
      url: pageUrl,
      inLanguage: locale,
      author: { "@id": personId },
    }),
    removeEmpty({
      "@type": "ProfilePage",
      "@id": profilePageId,
      name: `${data.title} Portfolio`,
      url: pageUrl,
      inLanguage: locale,
      isPartOf: { "@id": websiteId },
      about: { "@id": personId },
      mainEntity: { "@id": personId },
      primaryImageOfPage: absoluteUrl(config.profile_image, baseUrl),
    }),
    removeEmpty({
      "@type": "Person",
      "@id": personId,
      name: data.title,
      url: pageUrl,
      image: absoluteUrl(config.profile_image, baseUrl),
      jobTitle: config.job_title ?? data.subtitles[0]?.name,
      description: stripHtml(data.description),
      email: data.contacts.email ? `mailto:${data.contacts.email}` : undefined,
      sameAs: getSameAs(data),
      knowsAbout: skills,
      hasOccupation: data.jobs.map((job) =>
        removeEmpty({
          "@type": "Occupation",
          name: job.title,
          skills: job.badges.map(getBadgeLabel),
          occupationLocation: config.home_location
            ? {
                "@type": "Country",
                name: config.home_location.address_country,
              }
            : undefined,
          worksFor: {
            "@type": "Organization",
            name: getOrganizationName(job.subtitle),
          },
          description: stripHtml(job.desc),
        }),
      ),
      homeLocation: config.home_location
        ? {
            "@type": "Place",
            address: {
              "@type": "PostalAddress",
              addressCountry: config.home_location.address_country,
              addressRegion: config.home_location.address_region,
              addressLocality: config.home_location.address_locality,
            },
          }
        : undefined,
      workExample: projects.map((project) => ({ "@id": project["@id"] })),
    }),
    removeEmpty({
      "@type": "ItemList",
      "@id": `${pageUrl}#projects`,
      name: `${data.title} Projects`,
      itemListElement: projects.map((project, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: { "@id": project["@id"] },
      })),
    }),
    ...projects,
  ].filter((item): item is JsonLdObject => Boolean(item));

  return {
    "@context": "https://schema.org",
    "@graph": graph,
  };
}
