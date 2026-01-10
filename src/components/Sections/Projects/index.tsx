import { useMemo, useState } from "react";
import Input from "../../Input";
import Title from "../../Title";

import styles from "./Projects.module.scss";

import searchIcon from "../../../assets/icons/search.svg?react";
import githubIcon from "../../../assets/icons/github.svg?react";
import openLinkIcon from "../../../assets/icons/openlink.svg?react";
import texts from "../../../assets/texts.json";

import Card from "../../Card";

import { getBadgeData } from "../../../constants/badges.constants";
import { BadgeType, Project as ProjectType } from "../../../@types";

function normalize(str: string) {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // remove acentos
    .trim();
}

export default function Projects() {
  const [search, setSearch] = useState("");

  // 1) lista base (mapeada do JSON) - não depende de search
  const allItems = useMemo<ProjectType[]>(() => {
    return texts.projects.map((project) => ({
      title: project.title,
      subtitle: project.subtitle,
      image_url: project.image,
      desc: project.desc,
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
  }, []);

  // 2) filtra conforme search
  const filteredItems = useMemo(() => {
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
        Projetos
      </Title>

      <div className={styles.desc}>{texts.projects_desc}</div>

      <Input
        icon={searchIcon}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className={styles.search_input}
        placeholder="Pesquisar por nome, tecnologia, empresa..."
      />

      <div className={styles.projects_container}>
        {filteredItems.map((project, index) => (
          <Card key={index} content={project} />
        ))}
      </div>
    </div>
  );
}
