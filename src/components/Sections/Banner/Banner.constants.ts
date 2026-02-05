import { SocialMediaType } from "../../../@types";

// configurações do efeito
export const STEP_MS = 70;
export const HOLD_MS = 900;
export const RANDOM_ORDER = true;
export const INITIAL_TEXT_DELAY_MS = 3000;

export function padRight(str: string, len: number, ch = " ") {
  if (str.length >= len) return str;
  return str + ch.repeat(len - str.length);
}

export function shuffle<T>(arr: T[]) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function hexToRgb(hex: string) {
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

export function lerp(a: number, b: number, t: number) {
  return Math.round(a + (b - a) * t);
}

export function lerpColor(fromHex: string, toHex: string, t: number) {
  const a = hexToRgb(fromHex);
  const b = hexToRgb(toHex);
  const r = lerp(a.r, b.r, t);
  const g = lerp(a.g, b.g, t);
  const b2 = lerp(a.b, b.b, t);
  return `rgb(${r}, ${g}, ${b2})`;
}

export function handleSocialMediaClick(socialMedia: SocialMediaType) {
  window.open(socialMedia.url, "_blank");
}
