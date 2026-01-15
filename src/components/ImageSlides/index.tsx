import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { EmblaCarouselType } from "embla-carousel";

import styles from "./ImageSlides.module.scss";

import ArrowLeftIcon from "../../assets/icons/arrowleft.svg?react";
import ArrowRightIcon from "../../assets/icons/arrowright.svg?react";
import imgFallback from "../../assets/fallback-img.png";

interface Props {
  loop?: boolean;
  imgs: string[];
}

export default function ImageSlides({ loop = false, imgs }: Props) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop });

  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const updateScrollButtons = useCallback((api: EmblaCarouselType) => {
    setCanScrollPrev(api.canScrollPrev());
    setCanScrollNext(api.canScrollNext());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    updateScrollButtons(emblaApi);

    emblaApi.on("select", updateScrollButtons);
    emblaApi.on("reInit", updateScrollButtons);

    return () => {
      emblaApi.off("select", updateScrollButtons);
      emblaApi.off("reInit", updateScrollButtons);
    };
  }, [emblaApi, updateScrollButtons]);

  const scrollPrev = useCallback(() => {
    emblaApi?.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    emblaApi?.scrollNext();
  }, [emblaApi]);

  return (
    <div className={styles.wrapper}>
      {/* Botão esquerda */}
      <button
        className={styles.arrow}
        disabled={!canScrollPrev}
        onClick={scrollPrev}
        aria-label="Slide anterior"
      >
        <ArrowLeftIcon />
      </button>

      {/* Carousel */}
      <div className={styles.embla} ref={emblaRef}>
        <div className={styles.embla__container}>
          {imgs.map((img, index) => (
            <div className={styles.embla__slide} key={index}>
              <img
                className={styles.img}
                src={img || imgFallback}
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = imgFallback;
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Botão direita */}
      <button
        className={styles.arrow}
        disabled={!canScrollNext}
        onClick={scrollNext}
        aria-label="Próximo slide"
      >
        <ArrowRightIcon />
      </button>
    </div>
  );
}
