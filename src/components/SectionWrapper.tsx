/* import packages */
import clsx from "clsx";

/* import local components */
import Container from "container";
import { SectionProps } from "types";

export function SectionWrapper({
  title,
  subTitle,
  content,
  sectionClass,
  titleClass,
  contentClass,
}: SectionProps) {
  return (
    <section className={clsx("py-10 text-[#172B4D]", sectionClass)}>
      <Container>
        {title && (
          <div className={clsx("section-title", "mb-5")}>
            <h3
              className={clsx(
                "title",
                "uppercase text-[#172B4D] text-2xl font-extrabold tracking-wide relative",
                subTitle && "mb-3",
                titleClass
              )}
            >
              <span className="relative z-[2]">{title}</span>
            </h3>
            {subTitle && (
              <h6
                className={clsx(
                  "section-sub-title text-base tracking-wider text-[#172B4D]/70 font-medium"
                )}
              >
                {subTitle}
              </h6>
            )}
          </div>
        )}
        {content && (
          <div className={clsx("section-content", contentClass)}>{content}</div>
        )}
      </Container>
    </section>
  );
}
