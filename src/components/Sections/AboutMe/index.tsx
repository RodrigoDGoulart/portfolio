import styles from "./AboutMe.module.scss";

import ProfileImg from "@/assets/profile-img.png";

import Title from "../../Title";
import Timeline from "../../Timeline";
import BadgeContainer from "../../BadgeContainer";
import { getBadgeData } from "../../../constants/badges.constants";
import TabContainer from "../../TabContainer";
import { useTranslation } from "react-i18next";
import { getPortfolioData } from "../../../constants/portfolioData.constants";

export default function AboutMe() {
  const { t } = useTranslation();
  
  const texts = getPortfolioData();

  return (
    <div id="about" className={styles.container}>
      <Title hightlight className={styles.title}>
        {t("header.about_me")}
      </Title>
      <div className={styles.content_container}>
        <img src={ProfileImg} alt="" />
        <p>{texts.about_me}</p>
      </div>
      <div className={styles.tab_container}>
        <TabContainer
          tabContent={[
            {
              title: t("about_me.professional_experience"),
              content: (
                <div className={styles.tab_container_item}>
                  <Timeline
                    items={texts.jobs.map((job) => ({
                      title: job.title,
                      subtitle: job.subtitle,
                      badges: job.badges.map((badge) => getBadgeData(badge)),
                      desc: job.desc,
                    }))}
                  />
                </div>
              ),
            },
            {
              title: t("about_me.tech_stacks"),
              content: (
                <div className={styles.stacks_container}>
                  {texts.stacks.map((stack) => (
                    <div className={styles.stack_container}>
                      <Title hightlight size="h2">
                        {stack.name}
                      </Title>
                      <BadgeContainer
                        badges={stack.badges.map((badge) =>
                          getBadgeData(badge)
                        )}
                        alignCenter
                      />
                    </div>
                  ))}
                </div>
              ),
            },
          ]}
        />
      </div>
    </div>
  );
}
