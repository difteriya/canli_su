import React from "react";
import Modal from "@/components/ui/Modal";
import { Formik, Field, Form } from "formik";
import { orderStatus, paymentStatus, deliveryStatus } from "@/lib/constants";
import { useTranslation } from "next-i18next";

const OrderStatusModal = ({ visible, data, onClose, onEnd }) => {
  const { t } = useTranslation();
  const onSubmitForm = async (values) => {
    onEnd(values);
    onClose();
  };

  return (
    <Modal title="Statusu dəyiş" visible={visible} onClose={onClose}>
      <Formik
        enableReinitialize={true}
        initialValues={data}
        onSubmit={onSubmitForm}
      >
        {({ values, isSubmitting, dirty, isValid }) => (
          <Form>
            <div className="flex  flex-col gap-4 mb-4">
              <div className="flex-1">
                <label className="f-label" htmlFor="delivery_status">
                  Çatdırılma statusu
                </label>
                <Field className="f-input" name="delivery_status" as="select">
                  {Object.keys(deliveryStatus)?.map((key, i) => (
                    <option key={key} value={key}>
                      {t(deliveryStatus[key])}
                    </option>
                  ))}
                </Field>
              </div>
              <div className="flex-1">
                <label className="f-label" htmlFor="payment_status">
                  Ödəniş statusu
                </label>
                <Field
                  className="f-input"
                  name="payment_status"
                  as="select"
                  disabled={data.payment_method === 0}
                >
                  {Object.keys(paymentStatus)?.map((key, i) => (
                    <option key={key} value={key}>
                      {t(paymentStatus[key])}
                    </option>
                  ))}
                </Field>
              </div>
              <div className="flex-1">
                <label className="f-label" htmlFor="status">
                  Sifariş statusu
                </label>
                <Field
                  className="f-input"
                  name="status"
                  as="select"
                  // disabled={true}
                >
                  {Object.keys(orderStatus)?.map((key, i) => (
                    <option key={key} value={key}>
                      {t(orderStatus[key])}
                    </option>
                  ))}
                </Field>
              </div>
            </div>
            <div className="mb-6">
              <label className="f-label" htmlFor="note">
                Qeyd
              </label>
              <Field className="f-input" name="note" component="textarea" />
            </div>

            <div className="border rounded-md p-4 text-sm border-blue-300 bg-blue-50 mb-6">
              <b>Qeyd: </b>1. Sifarişdə dəyişikliklər yalnız sifariş statusu{" "}
              <u>aktiv</u> olduqda edilə bilər. 2. Ödəniş statusunu yalnız
              ödəniş üsulu <u>qapıda ödəmə</u> seçilibsə dəyişmək olacaq.
            </div>
            <button
              disabled={!dirty || !isValid || isSubmitting}
              className=" self-end flex ml-auto disabled:bg-gray-200 disabled:text-gray-500 items-center justify-center rounded-[5px] text-sm border border-transparent bg-th-700 px-6 h-11 font-semibold text-white shadow-sm hover:bg-th-700/80"
              type="submit"
            >
              {isSubmitting ? "Saxlanılır..." : "Saxla"}
            </button>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default OrderStatusModal;
