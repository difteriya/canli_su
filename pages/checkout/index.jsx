import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Formik, Field, ErrorMessage, Form } from "formik";
import * as Yup from "yup";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import axios from "axios";
import { useStore } from "@/context/AppContext";
import DatePickerField from "@/components/DatePickerField";
import AddressModalFields from "@/components/AddressModal/AddressModalFields";
import { ShippingFormSchema, initialValues } from "@/components/AddressModal";
import { getUserSession, getUserAddress, getUser } from "../api/site/me";
import { ArrowNarrowLeftIcon } from "@heroicons/react/outline";

const CheckoutSchema = Yup.object().shape({
  shipping_id: Yup.string().required("me:form-field-required"),
  payment_method: Yup.string().required("me:form-field-required"),
  delivery_date: Yup.string()
    .max(100, "Too Long!")
    .required("me:form-field-required"),
  delivery_note: Yup.string().max(500, "Too Long!").notRequired(),
  save_address: Yup.boolean().required("me:form-field-required"),
  shipping: Yup.object().when("shipping_id", {
    is: (shipping_id) => shipping_id === "new",
    then: ShippingFormSchema,
    otherwise: Yup.object().notRequired()
  })
});

const Checkout = ({ userAddressData }) => {
  const [state, dispatch] = useStore();
  const { t } = useTranslation();
  const router = useRouter();

  const [cart, setCart] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkCart(ids) {
      try {
        const res = await axios.post(`/api/site/me?c=checkCart`, ids, {
          withCredentials: true
        });
        if (res.status === 200) {
          setLoading(false);
          const _cp = res.data?.rid;
          if (_cp) {
            const total = _cp
              .reduce((acc, curr) => acc + curr.price * curr.quantity, 0)
              .toFixed(2);
            const totalCp = _cp.length;
            setCart({ total, totalCp, products: _cp });
            console.log({ total, totalCp, products: _cp });
          }
        }
      } catch (error) {
        console.error(error.message);
      }
    }

    const items = Object.values(state.cart.items);
    if (items.length > 0) {
      let val = {};
      items.map((item) => {
        val[item.id] = item.quantity;
      });
      // setCart(val);
      checkCart(val);
    }
  }, [state.cart.items]);

  const onSubmit = async (values, actions) => {
    try {
      const { shipping_id, shipping, ...restValues } = values;
      let shipping_address = shipping;
      if (shipping_id !== "new") {
        shipping_address = userAddressData.find(
          (ua) => ua.id === Number(shipping_id)
        );
      }
      const b = { ...restValues, shipping_address, cart };
      console.log({ order: b });
      const res = await axios.post(`/api/site/me?c=createOrder`, b, {
        withCredentials: true
      });
      if (res.status === 200) {
        router.push(`/checkout/result/${res.data.rid}`);
      }
    } catch (error) {
      console.error(error.message);
    }
    await actions.setSubmitting(false);
  };

  return (
    <div className="max-w-screen-lg mx-auto my-6  px-4">
      <h1 className="text-xl font-semibold mb-6 text-center ">
        {t("order:checkout-title")}
      </h1>
      <Formik
        onSubmit={onSubmit}
        validateOnBlur={false}
        validateOnChange={false}
        initialValues={{
          shipping_id: `${userAddressData?.[0]?.id}`,
          payment_method: "1",
          delivery_date: "",
          delivery_note: "",
          save_address: false,
          shipping: initialValues
        }}
        validationSchema={CheckoutSchema}
      >
        {({ values, setFieldValue, isSubmitting }) => (
          <Form>
            <div>
              <div className="border-b border-t flex items-center gap-5 py-6 ">
                <div className="w-9 h-9 shrink-0 bg-th-600  text-lg text-white rounded-full flex items-center justify-center">
                  1
                </div>
                <div className="text-lg font-medium w-1/4">
                  {t("order:your-cart")}
                </div>
                <div className="flex-1">
                  {loading ? (
                    <span>{t("common:loading")}</span>
                  ) : (
                    <span>
                      {cart.totalCp} {t("order:items")} - ₼{cart.total}
                    </span>
                  )}
                </div>
              </div>
              <div className="border-b py-6">
                <div className="">
                  <div className="flex items-center gap-5">
                    <div className="w-9 h-9 shrink-0 border  text-lg  rounded-full flex items-center justify-center">
                      2
                    </div>
                    <div className="h-9 flex items-center  text-lg font-medium">
                      {t("order:shipping-address")}
                    </div>
                  </div>
                  <div className="w-full md:pl-14">
                    <div className="border rounded-md w-full mt-4">
                      {userAddressData &&
                        userAddressData.map(
                          ({
                            id,
                            first_name,
                            last_name,
                            address,
                            phone,
                            city,
                            country
                          }) => {
                            return (
                              <label
                                key={id}
                                className="flex justify-start p-4 cursor-pointer border-b w-full  text-sm"
                              >
                                <Field
                                  type="radio"
                                  className="f-radio"
                                  name="shipping_id"
                                  value={`${id}`}
                                />
                                <div className="ml-4 -mt-0.5 flex flex-col md:flex-row justify-between items-start w-full">
                                  <div className="leading-6 font-medium w-full md:w-1/4">
                                    {first_name} {last_name}
                                  </div>
                                  <div className="leading-6 flex-1">
                                    <div>
                                      {address}, {phone}
                                    </div>
                                    <div>
                                      {city}, {country}
                                    </div>
                                  </div>
                                </div>
                              </label>
                            );
                          }
                        )}

                      <label className="flex items-center gap-4 p-4 cursor-pointer w-full  text-sm">
                        <Field
                          type="radio"
                          className="f-radio"
                          name="shipping_id"
                          value="new"
                        />
                        <div>{t("order:ship-different-address")}</div>
                      </label>
                      {values?.shipping_id === "new" && (
                        <div className="p-4 border-t">
                          <AddressModalFields alias="shipping" />
                          <label className="flex items-center gap-2 cursor-pointer">
                            <Field
                              type="checkbox"
                              className="f-checkbox"
                              name="save_address"
                            />
                            <span className="text-sm">
                              {t("order:save-address-book")}
                            </span>
                          </label>
                        </div>
                      )}
                    </div>
                    <ErrorMessage
                      render={(msg) => <div className="f-error">{t(msg)}</div>}
                      name="shipping_id"
                    />
                    <div className="mt-6 mb-4">
                      <label className="f-label">
                        {t("order:delivery-date")}
                      </label>
                      <DatePickerField
                        className="f-input"
                        name="delivery_date"
                        value={values.delivery_date}
                        onChange={setFieldValue}
                      />
                      <ErrorMessage
                        render={(msg) => (
                          <div className="f-error">{t(msg)}</div>
                        )}
                        name="delivery_date"
                      />
                    </div>

                    <div>
                      <label className="f-label" htmlFor="delivery_note">
                        {t("order:delivery-note")}
                      </label>
                      <Field
                        className="f-input"
                        name="delivery_note"
                        component="textarea"
                      />
                      <ErrorMessage
                        render={(msg) => (
                          <div className="f-error">{t(msg)}</div>
                        )}
                        name="delivery_note"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="border-b py-6">
                <div className="flex items-center gap-5">
                  <div className="w-9 h-9 shrink-0 border  text-lg  rounded-full flex items-center justify-center">
                    3
                  </div>
                  <div className="h-9 flex items-center text-lg font-medium">
                    {t("order:payment-method")}
                  </div>
                </div>
                <div className="w-full md:pl-14 mt-4">
                  <div className="w-full border rounded-md">
                    <label className="flex items-center gap-4 p-4 cursor-default  w-full border-b">
                      <Field
                        type="radio"
                        className="f-radio disabled:bg-gray-100"
                        name="payment_method"
                        value="0"
                        disabled
                      />
                      <div className="flex items-center justify-between gap-3 w-full text-sm">
                        <span>
                          {t("order:payment-card")}
                          <span className="bg-amber-100 text-amber-800 text-xs font-medium ml-2 px-2 rounded-full py-0.5">
                            {t("common:soon")}
                          </span>
                        </span>
                        <CardIcon className="w-6 h-6 text-gray-500" />
                      </div>
                    </label>
                    <label className="flex items-center gap-4 p-4 cursor-pointer w-full">
                      <Field
                        type="radio"
                        className="f-radio"
                        name="payment_method"
                        value="1"
                      />
                      <div className="flex items-center justify-between gap-3 w-full  text-sm">
                        <span> {t("order:payment-cod")}</span>
                        <WalletIcon className="w-6 h-6 text-gray-500" />
                      </div>
                    </label>
                  </div>
                </div>
              </div>
              <div className="mt-6 flex items-center justify-center">
                <Link href="/">
                  <a className="px-3 py-2 text-th-600 hover:underline flex items-center justify-center gap-2">
                    <ArrowNarrowLeftIcon className="w-4 h-4" />
                    {t("common:nav-link-home")}
                  </a>
                </Link>
                <button
                  disabled={isSubmitting}
                  className="flex ml-auto disabled:bg-gray-200 disabled:text-gray-500 items-center justify-center rounded-[5px] text-sm border border-transparent bg-th-700 px-6 py-3 font-semibold text-white shadow-sm hover:bg-th-700/80"
                  type="submit"
                >
                  {isSubmitting ? "Loading..." : t("order:complete")}
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export const getServerSideProps = async ({ req, res, locale, resolvedUrl }) => {
  const session = await getUserSession(req, res);
  const user = await getUser(session?.id);
  console.log("user", user);

  if (user.status === 0) {
    return {
      redirect: {
        permanent: false,
        destination: `/verify-email`
      }
    };
  }

  const userAddressData = await getUserAddress(user?.id);

  return {
    props: {
      userAddressData,
      ...(await serverSideTranslations(locale, ["common", "me", "order"]))
    }
  };
};

export default Checkout;

const CardIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="ionicon"
    viewBox="0 0 512 512"
    width="1em"
    height="1em"
    {...props}
  >
    <title>{"Card"}</title>
    <rect
      x={48}
      y={96}
      width={416}
      height={320}
      rx={56}
      ry={56}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={32}
    />
    <path
      fill="none"
      stroke="currentColor"
      strokeLinejoin="round"
      strokeWidth={60}
      d="M48 192h416M128 300h48v20h-48z"
    />
  </svg>
);

const WalletIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="ionicon"
    viewBox="0 0 512 512"
    width="1em"
    height="1em"
    {...props}
  >
    <title>{"Wallet"}</title>
    <rect
      x={48}
      y={144}
      width={416}
      height={288}
      rx={48}
      ry={48}
      fill="none"
      stroke="currentColor"
      strokeLinejoin="round"
      strokeWidth={32}
    />
    <path
      d="M411.36 144v-30A50 50 0 0 0 352 64.9L88.64 109.85A50 50 0 0 0 48 159v49"
      fill="none"
      stroke="currentColor"
      strokeLinejoin="round"
      strokeWidth={32}
    />
    <path d="M368 320a32 32 0 1 1 32-32 32 32 0 0 1-32 32z" />
  </svg>
);
