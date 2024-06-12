import React, { Fragment, useState } from "react";
import Slider from "@/components/Slider";
import { Transition } from "@headlessui/react";
import Image from "next/image";
import { Formik, Field, ErrorMessage, Form } from "formik";
import * as Yup from "yup";
import { useTranslation } from "next-i18next";

const CalcFormSchema = Yup.object().shape({
  gender: Yup.string().max(100, "Too Long!").required(),
  age: Yup.number().min(1).positive().integer().required(),
  height: Yup.number().min(100).positive().required(),
  weight: Yup.number().min(10).positive().required()
});

const initialValues = {
  gender: "male",
  age: 30,
  height: 175,
  weight: 70,
  activity: ""
};

const levels = [
  { label: "home:calc-level-1", value: 0 },
  { label: "home:calc-level-2", value: 1 },
  { label: "home:calc-level-3", value: 2 },
  { label: "home:calc-level-4", value: 3 },
  { label: "home:calc-level-5", value: 4 }
];

const Calculator = () => {
  const { t } = useTranslation();
  const [result, setResult] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const onSubmit = async ({ age, weight, height, activity, gender }) => {
    /*
    age        -6
    height     +7
    weight     +12
    femaale    -199
    activity   +127
    
    */
    const cc =
      -6 * age +
      height * 7 +
      weight * 12 +
      (gender === "female" ? -199 : 0) +
      activity * 127 +
      56;
    setShowResult(true);
    setResult(cc);
  };

  return (
    <section className="py-10  bg-white">
      <div className="max-w-screen-lg mx-auto  px-4">
        <div className="text-center mb-6 md:mb-14">
          <h2 className="font-extrabold text-th-700 text-3xl md:text-5xl">
            {t("home:calc-label-1")}
            <span className="text-th-600 pl-3">{t("home:calc-label-2")}</span>
          </h2>
          <p className="mt-3 md:mt-6 mb-3 text-center   text-th-700">
            {t("home:calc-subtitle")}
          </p>
        </div>

        <div className="flex items-center justify-center gap-4">
          <div className="flex-1 h-[400px] relative hidden md:block">
            <Image
              className="object-contain object-center"
              layout="fill"
              src="/drinking.png"
              alt="drinking"
            />
          </div>
          <div className="flex-1 bg-white shadow-2xl shadow-th-700/10 p-6 pt-10 rounded-2xl relative overflow-hidden">
            <Formik
              onSubmit={onSubmit}
              initialValues={initialValues}
              validationSchema={CalcFormSchema}
            >
              {({ values, setFieldValue }) => (
                <Form>
                  <div className="mb-6">
                    <div className="flex gap-4">
                      <label className="flex items-center gap-2 cursor-pointer text-sm">
                        <Field
                          className="f-radio"
                          type="radio"
                          name="gender"
                          value="male"
                        />
                        <span>{t("home:calc-gender-male")}</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer  text-sm">
                        <Field
                          className="f-radio"
                          type="radio"
                          name="gender"
                          value="female"
                        />
                        <span>{t("home:calc-gender-female")}</span>
                      </label>
                    </div>
                  </div>
                  <div className="mb-6">
                    <Field
                      className="f-input"
                      name="activity"
                      type="text"
                      as="select"
                    >
                      <option value={""}>{t("home:calc-level-label")}</option>
                      {levels.map(({ label, value }, i) => (
                        <option key={i} value={value}>
                          {t(label)}
                        </option>
                      ))}
                    </Field>
                  </div>
                  <div className="mb-10">
                    <label className="f-label !mb-3 block" htmlFor="age">
                      {t("home:calc-age")}
                    </label>
                    <Slider
                      name="age"
                      min={1}
                      max={100}
                      value={values.age}
                      onChange={setFieldValue}
                    />
                  </div>
                  <div className="mb-10">
                    <label className="f-label !mb-3 block" htmlFor="height">
                      {t("home:calc-height")}
                    </label>
                    <Slider
                      name="height"
                      min={100}
                      max={220}
                      value={values.height}
                      onChange={setFieldValue}
                    />
                  </div>
                  <div className="mb-12">
                    <label className="f-label !mb-3 block" htmlFor="weight">
                      {t("home:calc-weight")}
                    </label>
                    <Slider
                      name="weight"
                      min={10}
                      max={150}
                      value={values.weight}
                      onChange={setFieldValue}
                    />
                  </div>

                  <div className="mt-6 flex justify-center">
                    <button
                      className="btn btn-primary  btn-lg rounded-full w-full block disabled:opacity-50"
                      type="submit"
                    >
                      {t("home:calc-btn-submit")}
                    </button>
                  </div>
                </Form>
              )}
            </Formik>

            <Transition
              as={Fragment}
              show={showResult}
              appear={true}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-75"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-75"
            >
              <div className=" text-center absolute inset-0 w-full h-full z-10 bg-white  text-th-700 p-4 flex flex-col items-center justify-center">
                <div className="relative z-10">
                  <div className="text-6xl font-bold">
                    {(result / 1000).toFixed(1)} {t("home:calc-result-unit-1")}
                  </div>
                  <div className="text-gray-500 mt-3">
                    {result} {t("home:calc-result-unit-2")} (
                    {Math.round(result / 236)} {t("home:calc-result-cup")})
                  </div>
                  <button
                    onClick={() => setShowResult(false)}
                    className="btn btn-bordered mt-6 btn-lg rounded-full"
                    type="submit"
                  >
                    {t("home:calc-result-btn")}
                  </button>
                </div>
              </div>
            </Transition>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Calculator;
