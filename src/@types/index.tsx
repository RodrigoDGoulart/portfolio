export type IconType = React.FunctionComponent<React.SVGAttributes<SVGElement>>;

export type TabProp = {
  title: string;
  content: React.ReactNode;
};

export type BadgeType = {
  icon: IconType;
  label: string;
  color: {
    primary: string;
    secondary?: string;
  };
};

export type Project = {
  title: string;
  subtitle: string;
  image_url: string;
  slides: string[];
  desc: string;
  details: string;
  badges: BadgeType[];
  links: {
    label: string;
    url: string;
    icon: IconType;
  }[];
};

export type TimelineItem = {
  title: string;
  subtitle: string;
  desc: string;
  badges: BadgeType[];
};

export type SocialMediaType = {
  name: string;
  icon: IconType;
  url: string;
  label: string;
};

export type LinkType = {
  label: string;
  url: string;
};

export type LanguageType = "pt" | "en";

export interface PortfolioData {
  curriculum: string;
  portfolio_repo_url: string;
  contacts: {
    whatsapp: string;
    whatsapp_label: string;
    linkedin: string;
    github: string;
    email: string;
  };
  pretitle: string;
  title: string;
  subtitle_prefix: string;
  subtitles: {
    name: string;
    color: string;
  }[];
  description: string;
  about_me: string;
  jobs: {
    title: string;
    subtitle: string;
    desc: string;
    badges: string[];
  }[];
  stacks: {
    name: string;
    badges: string[];
  }[];
  projects: {
    imgs: string[];
    title: string;
    subtitle: string;
    badges: string[];
    desc: string;
    details: string;
    links: {
      name: string;
      url: string;
    }[];
  }[];
}
