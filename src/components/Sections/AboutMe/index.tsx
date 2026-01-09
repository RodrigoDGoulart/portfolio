import styles from "./AboutMe.module.scss";
import texts from "../../../assets/texts.json";

import ProfileImg from "@/assets/profile-img.png";

import Title from "../../Title";
import Timeline from "../../Timeline";
import BadgeContainer from "../../BadgeContainer";
import { getBadgeData } from "../../../constants/badges.constants";
import TabContainer from "../../TabContainer";

export default function AboutMe() {
  return (
    <div id="about" className={styles.container}>
      <Title hightlight className={styles.title}>
        Sobre mim
      </Title>
      <div className={styles.content_container}>
        <img src={ProfileImg} alt="" />
        <p>{texts.about_me}</p>
      </div>
      <div className={styles.tab_container}>
        <TabContainer
          tabContent={[
            {
              title: "Experiência Profissional",
              content: (
                <div className={styles.tab_container}>
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
              title: "Tech Stacks",
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
