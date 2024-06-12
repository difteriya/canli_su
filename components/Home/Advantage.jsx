import React from "react";
import Image from "next/image";
import { useTranslation } from "next-i18next";

const Advantage = () => {
  const { t } = useTranslation();
  return (
    <section className="py-6 bg-gradient-to-b to-gray-50 from-white">
      <div className="container max-w-screen-lg mx-auto  px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 md:divide-x divide-dashed">
          <div className="text-center p-4">
            <Image
              className="object-contain object-center inline-block mb-4"
              src="/blood.png"
              alt="asd"
              width={56}
              height={56}
            />
            <h4 className="text-xl font-semibold mb-3">
              {t("home:adv-1-title")}
            </h4>
            <p className="text-th-700/75">{t("home:adv-1-desc")}</p>
          </div>
          <div className="text-center  p-4">
            <Image
              className="object-contain object-center inline-block mb-4"
              src="/water-cycle.png"
              alt="asd"
              width={56}
              height={56}
            />
            <h4 className="text-xl font-semibold mb-3">
              {t("home:adv-2-title")}
            </h4>
            <p className="text-th-700/75 ">{t("home:adv-2-desc")}</p>
          </div>
          <div className="text-center  p-4">
            <Image
              className="object-contain object-center inline-block mb-4"
              src="/flask.png"
              alt="asd"
              width={56}
              height={56}
            />
            <h4 className="text-xl font-semibold mb-3">
              {t("home:adv-3-title")}
            </h4>
            <p className="text-th-700/75 ">{t("home:adv-3-desc")}</p>
          </div>
          <div className="text-center p-4">
            <Image
              className="object-contain object-center inline-block mb-4"
              src="/certificate.png"
              alt="asd"
              width={56}
              height={56}
            />
            <h4 className="text-xl font-semibold mb-3">
              {t("home:adv-4-title")}
            </h4>
            <p className="text-th-700/75 ">{t("home:adv-4-desc")}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Advantage;
