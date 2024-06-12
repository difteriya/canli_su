import { useState, useEffect } from "react";
import { Formik, Field, ErrorMessage, Form } from "formik";
import * as Yup from "yup";
import Modal from "@/components/ui/Modal";
import AddressModalFields from "./AddressModalFields";
import { useTranslation } from "next-i18next";
import axios from "axios";

export const ShippingFormSchema = Yup.object().shape({
  first_name: Yup.string()
    .max(100, "Too Long!")
    .required("me:form-field-required"),
  last_name: Yup.string()
    .max(100, "Too Long!")
    .required("me:form-field-required"),
  address: Yup.string()
    .max(500, "Too Long!")
    .required("me:form-field-required"),
  phone: Yup.string().max(100, "Too Long!").required("me:form-field-required"),
  country: Yup.string().max(2, "Too Long!").required("me:form-field-required"),
  city: Yup.string().max(100, "Too Long!").required("me:form-field-required")
});

export const initialValues = {
  first_name: "",
  last_name: "",
  phone: "",
  country: "AZ",
  city: "",
  address: ""
};

const AddressModal = ({ visible, onClose, data, onEnd }) => {
  console.log("data", data);
  const { t } = useTranslation();
  const [formInitialValues, setFormInitialValues] = useState(
    () => initialValues
  );

  useEffect(() => {
    if (data) {
      setFormInitialValues(data);
    } else {
      setFormInitialValues(initialValues);
    }
  }, [data]);

  const onSubmit = async (values, { setErrors, setSubmitting }) => {
    console.log(values);
    try {
      const res = await axios.post(`/api/site/me?c=shippingAddress`, values, {
        withCredentials: true
      });
      if (res.status === 200) {
        if (res.data.type === "field-error") {
          setErrors(res.data.message);
        } else {
          onEnd({ id: res.data.rid, ...values });
          onClose();
        }
        await setSubmitting(false);
      }
    } catch (error) {
      console.error(error.message);
      await setSubmitting(false);
    }
  };

  return (
    <Modal
      safeClose={true}
      title={data ? t("me:change-address") : t("me:new-address")}
      visible={visible}
      onClose={onClose}
    >
      <Formik
        enableReinitialize
        onSubmit={onSubmit}
        initialValues={formInitialValues}
        validationSchema={ShippingFormSchema}
      >
        {({ isSubmitting }) => (
          <Form>
            <AddressModalFields />
            <div className="mt-6">
              <button
                disabled={isSubmitting}
                className="flex ml-auto disabled:bg-gray-200 disabled:text-gray-500 items-center justify-center rounded-[5px] text-sm border border-transparent bg-th-700 px-6 py-3 font-semibold text-white shadow-sm hover:bg-th-700/80"
                type="submit"
              >
                {isSubmitting
                  ? t("common:loading")
                  : data
                  ? t("me:form-btn-change")
                  : t("me:form-btn-create")}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default AddressModal;
