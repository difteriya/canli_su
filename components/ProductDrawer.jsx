import React from "react";
import Drawer from "@/components/ui/Drawer";
import { Formik, Field, Form } from "formik";

const ProductDrawer = ({ visible, selected, onClose, onEnd, products }) => {
  const onSubmitForm = async (values) => {
    const mm = products
      .filter((p) => values.product_ids.includes(p.id.toString()))
      .map(({ id, products_langs, price }) => ({
        product_id: id,
        name: products_langs?.name,
        price,
        quantity: 1
      }));

    onEnd("products", [...selected, ...mm], true);
    onClose();
  };

  return (
    <Drawer title="Məhsullar" visible={visible} onClose={onClose}>
      <Formik
        enableReinitialize={true}
        initialValues={{
          product_ids: []
        }}
        onSubmit={onSubmitForm}
      >
        {({ values, submitForm }) => (
          <>
            <div className="flex-1 overflow-y-auto pb-6">
              <Form>
                <table className="w-full">
                  <thead>
                    <tr className="border-b  border-gray-200/75">
                      <th className="w-10"></th>
                      <th className="px-4 py-3 text-left text-sm font-medium">
                        Adı
                      </th>
                      <th className="px-4 py-3 w-20 text-center text-sm font-medium">
                        Qiyməti
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {products
                      ?.filter(
                        (p) =>
                          selected.findIndex((_p) => _p.product_id == p.id) ===
                          -1
                      )
                      ?.map(({ id, products_langs, price }) => {
                        const name = products_langs?.name;
                        return (
                          <tr
                            key={id}
                            className="border-t border-gray-100 hover:bg-gray-50"
                          >
                            <td className="whitespace-nowrap relative text-sm font-normal text-gray-500">
                              <label className="w-full h-full absolute inset-0 flex items-center justify-center pl-4">
                                <Field
                                  className="f-checkbox"
                                  type="checkbox"
                                  name="product_ids"
                                  value={`${id}`}
                                />
                              </label>
                            </td>
                            <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-500">
                              {name}
                            </td>
                            <td className="p-4 text-center whitespace-nowrap text-sm font-normal text-gray-500">
                              ₼{price}
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </Form>
            </div>
            <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
              <button
                type="submit"
                onClick={submitForm}
                disabled={values.product_ids.length === 0}
                className="flex w-full items-center justify-center rounded-md border border-transparent  px-6 py-3 text-base font-medium text-white shadow-sm disabled:bg-gray-300 bg-th-700 hover:bg-th-700/80 "
              >
                Əlavə et ({values.product_ids.length})
              </button>
            </div>
          </>
        )}
      </Formik>
    </Drawer>
  );
};

export default ProductDrawer;
