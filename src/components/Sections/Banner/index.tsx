import styles from "./Banner.module.scss";

import Button from "../../Button";
import Title from "../../Title";

import NotebookImg from "../../../assets/notebook.png";
import ClosedNotebookImg from "../../../assets/closed_notebook.png";
import { useEffect, useMemo, useRef, useState } from "react";

import classNames from "classnames";
import ActionButton from "../../ActionButton";
import { getSocialMediaArray } from "../../../constants/socialMedia.constants";
import { useTranslation } from "react-i18next";
import { getPortfolioData } from "../../../constants/portfolioData.constants";
import {
  getSocialMediaCopiableValue,
  handleSocialMediaClick,
  HOLD_MS,
  INITIAL_TEXT_DELAY_MS,
  lerpColor,
  padRight,
  RANDOM_ORDER,
  shuffle,
  STEP_MS,
} from "./Banner.constants";

export default function Banner() {
  const { t } = useTranslation();
  const texts = getPortfolioData();

  const SOCIAL_MEDIA = getSocialMediaArray();

  const [wordIndex, setWordIndex] = useState(0);
  const [displayText, setDisplayText] = useState(texts.subtitles[0].name);
  const [displayColor, setDisplayColor] = useState(texts.subtitles[0].color);
  const [isOpened, setIsOpened] = useState(false);
  const [notebookEnter, setNotebookEnter] = useState(false);

  const timersRef = useRef<number[]>([]);
  const runningRef = useRef(false);
  const isFirstRunRef = useRef(true);

  const currentWord = texts.subtitles[wordIndex].name;
  const nextWordIndex = (wordIndex + 1) % texts.subtitles.length;
  const nextWord = texts.subtitles[nextWordIndex].name;

  // cores “ancoradas” em cada palavra
  const currentColor =
    texts.subtitles[wordIndex % texts.subtitles.length].color;
  const nextColor =
    texts.subtitles[nextWordIndex % texts.subtitles.length].color;

  const positions = useMemo(() => {
    const maxLen = Math.max(currentWord.length, nextWord.length);
    const base = Array.from({ length: maxLen }, (_, i) => i);
    return RANDOM_ORDER ? shuffle(base) : base;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wordIndex]);

  async function downloadPdf() {
    const url = `/files/${texts.curriculum}`;

    const res = await fetch(url);
    if (!res.ok) throw new Error("Falha ao baixar o arquivo");

    const blob = await res.blob();
    const blobUrl = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = blobUrl;
    a.download = texts.curriculum;
    document.body.appendChild(a);
    a.click();
    a.remove();

    window.URL.revokeObjectURL(blobUrl);
  }

  useEffect(() => {
    // garante cor certa quando troca a palavra
    setDisplayColor(currentColor);
  }, [currentColor]);

  useEffect(() => {
    if (runningRef.current) return;
    runningRef.current = true;

    const from = currentWord;
    const to = nextWord;

    const maxLen = Math.max(from.length, to.length);
    const fromPad = padRight(from, maxLen, " ");
    const toPad = padRight(to, maxLen, " ");

    let step = 0;
    const totalSteps = positions.length;

    const tick = () => {
      // terminou o morph
      if (step >= totalSteps) {
        setDisplayText(to);
        setDisplayColor(nextColor); // trava na cor final

        const holdId = window.setTimeout(() => {
          setWordIndex((prev) => (prev + 1) % texts.subtitles.length);
          runningRef.current = false;
        }, HOLD_MS);

        timersRef.current.push(holdId);
        return;
      }

      // texto
      const chars = fromPad.split("");
      for (let i = 0; i <= step; i++) {
        const pos = positions[i];
        chars[pos] = toPad[pos];
      }
      setDisplayText(chars.join("").trimEnd());

      // cor: mistura conforme progresso do morph (0 -> 1)
      const t = totalSteps <= 1 ? 1 : step / (totalSteps - 1);
      setDisplayColor(lerpColor(currentColor, nextColor, t));

      step++;

      const tId = window.setTimeout(tick, STEP_MS);
      timersRef.current.push(tId);
    };

    // pausa antes de começar a “mudar”
    const delay = isFirstRunRef.current ? INITIAL_TEXT_DELAY_MS : HOLD_MS;

    const startId = window.setTimeout(() => {
      isFirstRunRef.current = false; // depois da primeira vez, nunca mais
      tick();
    }, delay);

    timersRef.current.push(startId);

    return () => {
      timersRef.current.forEach((t) => window.clearTimeout(t));
      timersRef.current = [];
      runningRef.current = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wordIndex]);

  useEffect(() => {
    // 1) garante que começa no estado inicial (baixo + transparente)
    setNotebookEnter(false);
    setIsOpened(false);

    // 2) no próximo frame, liga a animação (transição acontece de verdade)
    const raf = requestAnimationFrame(() => {
      setNotebookEnter(true);
    });

    // 3) depois de um tempinho, troca a imagem (closed -> open)
    const t = window.setTimeout(() => {
      setIsOpened(true);
    }, 450);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(t);
    };
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.titles_row}>
          <Title size="h1">{t("banner.pretitle")}</Title>
          <Title hightlight size="banner">
            {texts.title}
          </Title>

          <div className={styles.subtitle}>
            {t("banner.prefixsubtitle")}
            <b
              style={{
                color: displayColor,
                transition: `all ${STEP_MS / 1000}s linear`,
                textShadow: `0 0 6px ${displayColor}99`,
              }}
            >
              {displayText}
            </b>
            {t("banner.sufixsubtitle")}
          </div>
        </div>

        <p
          className={styles.paragraph}
          dangerouslySetInnerHTML={{ __html: texts.description }}
        />

        <div className={styles.btns_row}>
          <Button className={styles.btn} onClick={downloadPdf}>
            {t("banner.download_curriculum")}
          </Button>
          <ActionButton
            button={
              <Button className={styles.btn} styleType="secondary">
                {t("banner.contact")}
              </Button>
            }
            options={SOCIAL_MEDIA.map((item) => ({
              icon: item.icon,
              label: item.label,
              onClick: () => handleSocialMediaClick(item),
              copiableValue: getSocialMediaCopiableValue(item),
            }))}
          />
        </div>
      </div>

      <img
        src={isOpened ? NotebookImg : ClosedNotebookImg}
        className={classNames(
          styles.banner_img,
          notebookEnter ? styles.banner_img_enter : "",
          isOpened ? "" : styles.banner_margin_top,
          isOpened ? styles.banner_float_infinite : "",
        )}
        draggable={false}
      />
    </div>
  );
}
