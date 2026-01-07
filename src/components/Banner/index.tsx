import styles from "./Banner.module.scss";

import Button from "../Button";
import Title from "../Title";

import NotebookImg from "../../assets/notebook.png";
import ClosedNotebookImg from "../../assets/closed_notebook.png";
import { useEffect, useMemo, useRef, useState } from "react";

import texts from "../../assets/texts.json";
import classNames from "classnames";

function padRight(str: string, len: number, ch = " ") {
  if (str.length >= len) return str;
  return str + ch.repeat(len - str.length);
}

function shuffle<T>(arr: T[]) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function hexToRgb(hex: string) {
  const clean = hex.replace("#", "");
  const full =
    clean.length === 3
      ? clean
          .split("")
          .map((c) => c + c)
          .join("")
      : clean;

  const n = parseInt(full, 16);
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
}

function lerp(a: number, b: number, t: number) {
  return Math.round(a + (b - a) * t);
}

function lerpColor(fromHex: string, toHex: string, t: number) {
  const a = hexToRgb(fromHex);
  const b = hexToRgb(toHex);
  const r = lerp(a.r, b.r, t);
  const g = lerp(a.g, b.g, t);
  const b2 = lerp(a.b, b.b, t);
  return `rgb(${r}, ${g}, ${b2})`;
}

export default function Banner() {
  const [wordIndex, setWordIndex] = useState(0);
  const [displayText, setDisplayText] = useState(texts.subtitles[0].name);
  const [displayColor, setDisplayColor] = useState(texts.subtitles[0].color); // <- cor renderizada
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

  // configurações do efeito
  const STEP_MS = 70;
  const HOLD_MS = 900;
  const RANDOM_ORDER = true;
  const INITIAL_TEXT_DELAY_MS = 3000;

  const positions = useMemo(() => {
    const maxLen = Math.max(currentWord.length, nextWord.length);
    const base = Array.from({ length: maxLen }, (_, i) => i);
    return RANDOM_ORDER ? shuffle(base) : base;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wordIndex]);

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
    }, 450); // ajusta (ex: 300-700ms)

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(t);
    };
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.titles_row}>
          <Title size="h1">{texts.pretitle}</Title>
          <Title hightlight size="banner">
            {texts.title}
          </Title>

          <div className={styles.subtitle}>
            {texts.subtitle_prefix}
            <b
              style={{
                color: displayColor,
                transition: `all ${STEP_MS / 1000}s linear`,
                textShadow: `0 0 6px ${displayColor}99`,
              }}
            >
              {displayText}
            </b>
          </div>
        </div>

        <p
          className={styles.paragraph}
          dangerouslySetInnerHTML={{ __html: texts.description }}
        />

        <div className={styles.btns_row}>
          <Button>Baixar currículo (PDF)</Button>
          <Button styleType="secondary">Contato</Button>
        </div>
      </div>

      <img
        src={isOpened ? NotebookImg : ClosedNotebookImg}
        className={classNames(
          styles.banner_img,
          notebookEnter ? styles.banner_img_enter : "",
          isOpened ? "" : styles.banner_margin_top,
          isOpened ? styles.banner_float_infinite : ""
        )}
        draggable={false}
      />
    </div>
  );
}
