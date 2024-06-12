import React, { useState } from "react";
import Modal from "@/components/ui/Modal";
import Image from "next/image";
import { useTranslation } from "next-i18next";

const Composition = ({ composition }) => {
  const { t } = useTranslation();
  const [visibleModal, setVisibleModal] = useState(false);
  const [modalData, setModalData] = useState({});
  const openModal = (c) => {
    setVisibleModal(true);
    setModalData(c);
  };
  const closeModal = () => setVisibleModal(false);
  return (
    <section className="py-14 bg-gradient-to-b to-gray-50 from-white overflow-hidden">
      <div className="container max-w-screen-lg mx-auto  px-4">
        <p className="mb-2 text-center uppercase text-sm font-semibold text-th-700">
          {t("home:comp-subtitle")}
        </p>
        <h2 className="font-extrabold text-th-700  text-3xl md:text-5xl text-center  mb-14">
          {t("home:comp-title-1")}
          <span className="text-th-600 pl-3">{t("home:comp-title-2")}</span>
        </h2>

        <div className="relative">
          <div className="absolute  h-96  left-1/2 top-1/2 w-96 -translate-x-1/2 -translate-y-1/2">
            <div className="w-full h-full border border-gray-200/70 absolute -bottom-6 rounded-full p-7 scale-110">
              <div className="w-full h-full border border-gray-200/70  rounded-full p-7">
                <div className="w-full h-full border border-gray-200/70  rounded-full"></div>
              </div>
            </div>

            <Image
              className="relative w-full h-full object-contain object-center"
              src="/mineral-glass.png"
              alt="test"
              layout="fill"
            />
          </div>
          <div
            dir="ltr"
            className="home-composition grid grid-cols-2 relative z-10 min-h-[400px]"
          >
            {composition.map(({ composition_langs }, i) => {
              const { e_symbol, e_name, body, e_value, description } =
                composition_langs;
              return (
                <div className="w-[60%] even:text-right even:ml-auto" key={i}>
                  <div
                    onClick={() => openModal({ body, e_name })}
                    className="inline-flex md:hidden cursor-pointer transition-colors  select-none font-bold text-lg group-hover:underline text-th-600 shadow-2xl shadow-th-700/20 bg-white hover:bg-th-600 hover:text-white w-20 h-20 rounded-full  items-center justify-center"
                  >
                    {e_symbol}
                  </div>
                  <div
                    onClick={() => openModal({ body, e_name })}
                    className="hidden md:flex select-none transition-all   flex-col justify-center cursor-pointer hover:shadow-2xl  hover:shadow-th-700/10 hover:bg-white group p-4 rounded-2xl"
                  >
                    <div className=" mb-1 font-bold text-lg group-hover:underline text-th-700">
                      {e_name}, {e_symbol}
                    </div>
                    {e_value && (
                      <div className=" mb-1 font-semibold text-th-600">
                        {e_value}
                      </div>
                    )}
                    <div className=" mb-1 text-sm line-clamp-2 text-th-700/80  opacity-80">
                      {description}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <Modal
        visible={visibleModal}
        title={modalData?.e_name}
        onClose={closeModal}
      >
        <div>{modalData?.body}</div>
      </Modal>
    </section>
  );
};

export default Composition;
