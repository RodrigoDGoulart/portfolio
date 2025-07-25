export type IconType = React.FunctionComponent<React.SVGAttributes<SVGElement>>;

export type TabProp = {
  title: string;
  content: React.ReactNode;
}

export type BadgeType = {
  icon: IconType;
  label: string;
  color: {
    primary: string;
    secondary?: string;
  };
}

export type Project = {
  title: string;
  subtitle: string;
  image_url: string;
  desc: string;
  badges: BadgeType[];
  links: {
    label: string;
    url: string;
    icon: IconType;
  }[];
}

export type TimelineItem = {
  title: string;
  subtitle: string;
  desc: string;
  badges: BadgeType[];
};

export type SocialMediaType = {
  icon: IconType;
  url: string;
}

export type LinkType = {
  label: string;
  url: string;
}