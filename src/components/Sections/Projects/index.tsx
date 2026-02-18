import { useMemo, useState } from "react";
import Input from "../../Input";
import Title from "../../Title";

import styles from "./Projects.module.scss";

import searchIcon from "../../../assets/icons/search.svg?react";
import githubIcon from "../../../assets/icons/github.svg?react";
import openLinkIcon from "../../../assets/icons/openlink.svg?react";

import Card from "../../Card";

import { getBadgeData } from "../../../constants/badges.constants";
import { BadgeType, Project as ProjectType } from "../../../@types";
import { useTranslation } from "react-i18next";
import { usePortfolioData } from "../../../contexts/PortfolioDataContext";

function normalize(str: string) {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // remove acentos
    .trim();
}

function focusElementById(id: string) {
  const element = document.getElementById(id);

  if (!element) return;

  // rola suavemente até o elemento
  element.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });

  // dá foco (se possível)
  element.focus({ preventScroll: true });
}

export default function Projects() {
  const { t } = useTranslation();
  const { texts } = usePortfolioData();

  const [search, setSearch] = useState("");
  const [expandedIndex, setExpandedIndex] = useState(NaN);

  // 1) lista base (mapeada do JSON) - não depende de search
  const allItems = useMemo<ProjectType[]>(() => {
    return texts.projects.map((project) => ({
      title: project.title,
      subtitle: project.subtitle,
      image_url: project.imgs?.[0],
      slides: project.imgs,
      desc: project.desc,
      details: project.details,
      badges: project.badges.map((badge) => getBadgeData(badge)),
      links: project.links.map((link) => {
        const isGithub = link.url.startsWith("https://github.com");
        return {
          icon: isGithub ? githubIcon : openLinkIcon,
          label: link.name,
          url: link.url,
        };
      }),
    }));
  }, [texts]);

  // 2) filtra conforme search
  const filteredItems = useMemo(() => {
    setExpandedIndex(NaN);

    const q = normalize(search);
    if (!q) return allItems;

    return allItems.filter((p) => {
      const title = normalize(p.title ?? "");
      const subtitle = normalize(p.subtitle ?? "");
      const desc = normalize(p.desc ?? "");

      const badgesText = (p.badges ?? [])
        .map((b: BadgeType) => normalize(b?.label ?? ""))
        .join(" ");

      // pesquisa simples: contém em qualquer campo
      return (
        title.includes(q) ||
        subtitle.includes(q) ||
        desc.includes(q) ||
        badgesText.includes(q)
      );
    });
  }, [search, allItems]);

  return (
    <div id="projects" className={styles.container}>
      <Title className={styles.title} hightlight>
        {t("header.projects")}
      </Title>

      <div
        className={styles.desc}
        dangerouslySetInnerHTML={{ __html: t("projects.description") }}
      />

      <Input
        icon={searchIcon}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className={styles.search_input}
        placeholder={t("projects.search_placeholder")}
      />

      <div className={styles.projects_container}>
        {filteredItems.length !== 0 ? (
          filteredItems.map((project, index) => (
            <Card
              id={`project-card-${index}`}
              key={index}
              content={project}
              expaned={index === expandedIndex}
              onExpandClick={() => {
                if (index !== expandedIndex) {
                  setExpandedIndex(index);
                } else {
                  setExpandedIndex(NaN);
                }
              }}
              onContract={() => {
                if (isNaN(expandedIndex)) {
                  focusElementById(`project-card-${index}`);
                }
              }}
              onExpand={() => {
                focusElementById(`project-card-${index}`);
              }}
            />
          ))
        ) : (
          <div className={styles.no_project_found}>
            {t("projects.no_project_found")}
          </div>
        )}
      </div>
    </div>
  );
}
