import React, { useState, useEffect, useMemo } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/router";
import AdminLayout from "@/components/Layout/AdminLayout";
import { Formik, Field, ErrorMessage, FieldArray, Form } from "formik";
import * as Yup from "yup";
import DatePickerField from "@/components/DatePickerField";
import AddressModalFields from "@/components/AddressModal/AddressModalFields";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { DocumentSearchIcon, TrashIcon } from "@heroicons/react/outline";
import ProductDrawer from "@/components/ProductDrawer";
import { getAllProducts } from "../../api/products";
import { getUsers } from "../../api/users";
import { getOrderById } from "../../api/orders/[id]";
import {
  ShippingFormSchema,
  initialValues as shValues
} from "@/components/AddressModal";

const FormSchema = Yup.object().shape({
  // payment_method: Yup.string().required("me:form-field-required"),
  products: Yup.array()
    .of(
      Yup.object().shape({
        quantity: Yup.number().min(1).max(100).required("Bu sahə mütləqdir")
      })
    )
    .min(1, "Ən azı 1 məhsul olmalıdır")
    .required("Bu sahə mütləqdir"),
  delivery_date: Yup.string()
    .max(100, "Too Long!")
    .required("Bu sahə mütləqdir"),
  delivery_note: Yup.string().max(500, "Too Long!").notRequired(),
  shipping: ShippingFormSchema
});

const OrderForm = ({ order, users, products, pageLabel }) => {
  const router = useRouter();
  const { t } = useTranslation();

  const [visibleProductDrawer, setVisibleProductDrawer] = useState(false);
  const onCloseProductDrawer = () => {
    setVisibleProductDrawer(false);
  };

  const id = router.query?.id;
  const onSubmit = async (values, actions) => {
    console.log("values", values);
    const total = values.products
      .reduce((acc, curr) => acc + curr.price * curr.quantity, 0)
      .toFixed(2);
    try {
      const res = await axios.post(
        `/api/orders/${id}`,
        { ...values, total },
        {
          withCredentials: true
        }
      );
      if (res.status === 200) {
        toast.success("Yadda saxlanildi");
        // router.push("/admin/products");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const initialValues = useMemo(() => {
    if (id === "new") {
      return {
        products: [],
        payment_method: 1,
        delivery_date: "",
        delivery_note: "",
        user_id: "",
        shipping: shValues
      };
    } else {
      const {
        first_name,
        last_name,
        country,
        city,
        phone,
        address,
        user_id,
        payment_method,
        delivery_date,
        delivery_note,
        orders_items
      } = order;
      console.log("orders_items", orders_items);
      const mm = orders_items.map(({ id, product_id, price, quantity }) => {
        const pName = products.find((p) => p.id === product_id)?.products_langs
          ?.name;
        return {
          product_id,
          name: pName,
          price,
          quantity
        };
      });
      return {
        products: mm,
        user_id: `${user_id}`,
        delivery_date,
        delivery_note,
        payment_method,
        shipping: {
          first_name,
          last_name,
          country,
          city,
          phone,
          address
        }
      };
    }
  }, [id, order, products]);

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="flex items-center justify-between  mb-6">
        <h1 className="font-semibold text-xl">{pageLabel}</h1>
      </div>

      <Formik
        onSubmit={onSubmit}
        validateOnBlur={false}
        validateOnChange={false}
        initialValues={initialValues}
        validationSchema={FormSchema}
      >
        {({ values, setFieldValue, isSubmitting, errors }) => (
          <Form>
            <ProductDrawer
              products={products}
              selected={values.products}
              visible={visibleProductDrawer}
              onClose={onCloseProductDrawer}
              onEnd={setFieldValue}
            />
            <Field name="payment_method" type="hidden" />
            <div className="mt-6">
              <div className="mb-4">
                <label className="f-label" htmlFor="user_id">
                  Müştəri
                </label>
                <Field
                  className="f-input"
                  name="user_id"
                  as="select"
                  disabled={id !== "new"}
                >
                  <option key={0} value="">
                    Secin
                  </option>
                  {users?.map(({ id, first_name, last_name }, i) => (
                    <option key={id} value={id.toString()}>
                      {first_name} {last_name}
                    </option>
                  ))}
                </Field>
                <ErrorMessage
                  render={(msg) => <div className="f-error">{msg}</div>}
                  name="user_id"
                />
              </div>

              <div className="mb-4">
                <label className="f-label">{t("order:delivery-date")}</label>
                <DatePickerField
                  className="f-input"
                  name="delivery_date"
                  value={values.delivery_date}
                  onChange={setFieldValue}
                />
                <ErrorMessage
                  render={(msg) => <div className="f-error">{msg}</div>}
                  name="delivery_date"
                />
              </div>

              <div className="mb-6">
                <label className="f-label" htmlFor="delivery_note">
                  {t("order:delivery-note")}
                </label>
                <Field
                  className="f-input"
                  name="delivery_note"
                  component="textarea"
                />
                <ErrorMessage
                  render={(msg) => <div className="f-error">{msg}</div>}
                  name="delivery_note"
                />
              </div>

              <div className="mb-6">
                <div className="py-2.5 border-b flex items-center  text-lg font-medium">
                  Məhsullar
                </div>
                <div>
                  <FieldArray name="products">
                    {({ remove }) =>
                      values.products.length > 0 ? (
                        <table className="w-full">
                          <thead>
                            <tr className="border-b  border-gray-200/75">
                              <th className="px-4 py-3 text-left text-sm font-medium">
                                Adı
                              </th>

                              <th className="px-4 py-3 w-20 text-center text-sm font-medium">
                                Qiyməti
                              </th>
                              <th className="px-4 py-3 w-20 text-center text-sm font-medium">
                                Miqdar
                              </th>
                              <th className="w-10"></th>
                            </tr>
                          </thead>
                          <tbody>
                            {values.products?.map((product, index) => {
                              const { name, price, product_id } =
                                values.products[index];

                              return (
                                <tr
                                  key={index}
                                  className="border-t border-gray-100 hover:bg-gray-50"
                                >
                                  <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-500">
                                    {name}
                                  </td>
                                  <td className="p-4 text-center whitespace-nowrap text-sm font-normal text-gray-500">
                                    ₼{price}
                                  </td>
                                  <td className="px-4 py-1 text-center whitespace-nowrap text-sm font-normal text-gray-500">
                                    <Field
                                      className="f-input text-center"
                                      name={`products.${index}.quantity`}
                                      placeholder="0"
                                      type="number"
                                    />
                                  </td>
                                  <td>
                                    <button
                                      onClick={(e) => {
                                        e.preventDefault();
                                        remove(index);
                                      }}
                                      className="w-9 h-9 rounded-full hover:bg-gray-200 flex items-center justify-center"
                                    >
                                      <TrashIcon className="w-4 h-4" />
                                    </button>
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      ) : null
                    }
                  </FieldArray>

                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      setVisibleProductDrawer(true);
                    }}
                    className="w-full mt-3  border border-dashed hover:border-blue-600 hover:text-blue-600 flex items-center justify-center gap-2 text-sm font-medium rounded-md h-10"
                  >
                    <DocumentSearchIcon className="w-4 h-4" />
                    <span>Məhsul seç</span>
                  </button>
                </div>
              </div>

              <div className="mb-6">
                <div className="py-2.5 border-b mb-4 flex items-center  text-lg font-medium">
                  Çatdırılma ünvanı
                </div>
                <AddressModalFields alias="shipping" />
              </div>

              <div className="flex items-center justify-between w-full">
                {/* {id !== "new" && id > 0 && (
                  <button
                    onClick={onDelete}
                    disabled={isSubmitting}
                    className="flex disabled:bg-gray-200 disabled:text-gray-500 items-center justify-center rounded-[5px] text-sm border border-red-600 bg-white px-6 py-3 font-semibold text-red-600 shadow-sm hover:bg-red-600 hover:text-white"
                  >
                    Sil
                  </button>
                )} */}
                <button
                  disabled={isSubmitting}
                  className="flex ml-auto disabled:bg-gray-200 disabled:text-gray-500 items-center justify-center rounded-[5px] text-sm border border-transparent bg-th-700 px-6 py-3 font-semibold text-white shadow-sm hover:bg-th-700/80"
                  type="submit"
                >
                  {isSubmitting ? "Saxlanılır..." : "Saxla"}
                </button>
              </div>
            </div>
            {/* <pre>{JSON.stringify(errors, null, 2)}</pre> */}
            {/* <pre>{JSON.stringify(values, null, 2)}</pre> */}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export const getServerSideProps = async ({ params, locale }) => {
  let pageLabel = "Yeni sifariş";
  let order = {};
  if (params.id !== "new") {
    order = await getOrderById(params.id);
    console.log("orderss", order);
    pageLabel = `Dəyiş: ${params.id.toString().padStart(6, "0")}`;

    if (order.status > 0) {
      return { notFound: true };
    }
  }

  const products = await getAllProducts();
  const users = await getUsers(true);

  return {
    props: {
      pageLabel,
      order: JSON.parse(JSON.stringify(order)),
      products: JSON.parse(JSON.stringify(products)),
      users: JSON.parse(JSON.stringify(users)),
      breadcrumbs: [
        { label: "Sifarişlər", href: "/admin/orders" },
        { label: pageLabel }
      ],
      ...(await serverSideTranslations("az", ["me", "order"]))
    }
  };
};

OrderForm.Layout = AdminLayout;

export default OrderForm;
