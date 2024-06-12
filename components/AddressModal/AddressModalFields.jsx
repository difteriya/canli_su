import React from "react";
import { Field, ErrorMessage } from "formik";
import NumberFormat from "react-number-format";
import { countries } from "@/lib/constants";
import { useTranslation } from "next-i18next";

const AddressModalFields = ({ alias = "" }) => {
  const { t } = useTranslation();
  return (
    <>
      <div className="mb-4 flex gap-4">
        <div className="flex-1">
          <label
            className="f-label"
            htmlFor={alias ? `${alias}.first_name` : `first_name`}
          >
            {t("me:form-firstname")}
          </label>
          <Field
            className="f-input"
            name={alias ? `${alias}.first_name` : `first_name`}
            type="text"
          />
          <ErrorMessage
            render={(msg) => <div className="f-error">{t(msg)}</div>}
            name={alias ? `${alias}.first_name` : `first_name`}
          />
        </div>
        <div className="flex-1">
          <label
            className="f-label"
            htmlFor={alias ? `${alias}.last_name` : `last_name`}
          >
            {t("me:form-lastname")}
          </label>
          <Field
            className="f-input"
            name={alias ? `${alias}.last_name` : `last_name`}
            type="text"
          />
          <ErrorMessage
            render={(msg) => <div className="f-error">{t(msg)}</div>}
            name={alias ? `${alias}.last_name` : `last_name`}
          />
        </div>
      </div>

      <div className="mb-4">
        <label className="f-label" htmlFor={alias ? `${alias}.phone` : `phone`}>
          {t("me:form-phone")}
        </label>
        <Field
          as={NumberFormat}
          format="+994 (###) ###-####"
          mask="_"
          className="f-input"
          name={alias ? `${alias}.phone` : `phone`}
          type="text"
          // placeholder="+994556667788"
        />
        <ErrorMessage
          render={(msg) => <div className="f-error">{t(msg)}</div>}
          name={alias ? `${alias}.phone` : `phone`}
        />
      </div>

      <div className="mb-4">
        <label
          className="f-label"
          htmlFor={alias ? `${alias}.country` : `country`}
        >
          {t("me:form-country")}
        </label>
        <Field
          className="f-input"
          name={alias ? `${alias}.country` : `country`}
          type="text"
          as="select"
        >
          {countries.map(({ label, value }, i) => (
            <option key={i} value={value}>
              {label}
            </option>
          ))}
        </Field>
        <ErrorMessage
          render={(msg) => <div className="f-error">{t(msg)}</div>}
          name={alias ? `${alias}.country` : `country`}
        />
      </div>

      <div className="mb-4">
        <label className="f-label" htmlFor={alias ? `${alias}.city` : `city`}>
          {t("me:form-city")}
        </label>
        <Field
          className="f-input"
          name={alias ? `${alias}.city` : `city`}
          type="text"
        />
        <ErrorMessage
          render={(msg) => <div className="f-error">{t(msg)}</div>}
          name={alias ? `${alias}.city` : `city`}
        />
      </div>

      <div className="mb-4">
        <label
          className="f-label"
          htmlFor={alias ? `${alias}.address` : `address`}
        >
          {t("me:form-address")}
        </label>
        <Field
          className="f-input"
          name={alias ? `${alias}.address` : `address`}
          type="text"
        />
        <ErrorMessage
          render={(msg) => <div className="f-error">{t(msg)}</div>}
          name={alias ? `${alias}.address` : `address`}
        />
      </div>
    </>
  );
};

export default AddressModalFields;
