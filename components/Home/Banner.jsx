import Link from "next/link";
import Image from "next/image";
import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
import "@splidejs/react-splide/css/core";
import {
  ArrowNarrowRightIcon,
  ArrowNarrowLeftIcon
} from "@heroicons/react/outline";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";

const options = {
  type: "loop",
  rewind: true,
  // height: "450px",
  perPage: 1,
  gap: "0px",
  autoplay: false,
  pauseOnHover: false,
  pagination: false,
  resetProgress: false
};

const Banner = ({ slider }) => {
  const router = useRouter();
  const { t } = useTranslation();
  return (
    <section>
      <div className="container  max-w-screen-lg  mx-auto  px-2 md:px-4 py-4">
        <div className="overflow-hidden rounded-xl">
          <Splide
            options={{
              ...options,
              direction: router.locale === "ar" ? "rtl" : "ltr"
            }}
            hasTrack={false}
          >
            <SplideTrack>
              {slider.map(({ slider_langs }, i) => {
                const theme = "dark";
                const { id, title, subtitle, photo, url } = slider_langs;
                return (
                  <SplideSlide key={id}>
                    <Image
                      className="absolute inset-0 w-full h-full c-img object-cover object-center"
                      alt={title}
                      src={`${process.env.NEXT_PUBLIC_HOSTNAME}/uploads/${photo}`}
                      layout="fill"
                      priority={i === 0}
                    />
                    <div
                      className={`flex relative h-full w-full cw ${
                        theme === "dark" ? "cw-black" : ""
                      }`}
                    >
                      <div
                        className={`c1 w-full h-full absolute inset-0 bg-gradient-to-r ${
                          theme === "dark"
                            ? "from-black/70"
                            : "from-white/80 to-transparent"
                        }`}
                      ></div>

                      <div className=" w-full  lg:w-1/2 md:w-2/3 p-6 md:h-[400px]  lg:h-[450px] flex flex-col relative z-10 items-start gap-y-6 justify-center ">
                        <h2 className="font-bold text-3xl md:text-5xl c3 ">
                          {title}
                        </h2>
                        {subtitle && (
                          <p className="leading-7 c4 line-clamp-3 ">
                            {subtitle}
                          </p>
                        )}
                        {url && (
                          <Link href={url}>
                            <a className="c5">
                              {t("home:banner-btn-more")}
                              <ArrowNarrowRightIcon className="ml-3 w-5" />
                            </a>
                          </Link>
                        )}
                      </div>
                    </div>
                  </SplideSlide>
                );
              })}
            </SplideTrack>
            <div className="splide__arrows">
              <button className="splide__arrow splide__arrow--prev">
                <ArrowNarrowLeftIcon className="w-6" />
              </button>
              <button className="splide__arrow splide__arrow--next">
                <ArrowNarrowRightIcon className="w-6" />
              </button>
            </div>
          </Splide>
        </div>
      </div>
    </section>
  );
};

export default Banner;
