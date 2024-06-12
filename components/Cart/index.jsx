import { Fragment, useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { Dialog, Transition } from "@headlessui/react";
import {
  XIcon,
  PlusIcon,
  MinusIcon,
  ShoppingCartIcon,
  EmojiSadIcon
} from "@heroicons/react/outline";
import { useTranslation } from "next-i18next";
import { useStore } from "@/context/AppContext";

export default function Cart() {
  const [state, dispatch] = useStore();
  const router = useRouter();
  const { t } = useTranslation();
  const isEmptyCart = Object.keys(state.cart.items).length === 0;

  const handleCheckout = () => {
    dispatch({ type: "cart:close_modal" });
    router.push("/checkout");
  };

  return (
    <Transition.Root show={state.cart.collapsed} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-50"
        onClose={() => dispatch({ type: "cart:close_modal" })}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-100"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-30 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-300"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-300"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col overflow-y-auto bg-white shadow-xl">
                    <div className="flex-1 overflow-y-auto pb-6 pt-4 px-4 sm:px-6">
                      <div className="flex items-start justify-between">
                        <Dialog.Title className="text-lg font-medium text-gray-900">
                          {t("common:cart-head-title")}
                        </Dialog.Title>
                        <div className="flex h-7 items-center">
                          <button
                            type="button"
                            className="-m-2 p-2 text-gray-400 outline-none hover:text-gray-500"
                            onClick={() =>
                              dispatch({ type: "cart:close_modal" })
                            }
                          >
                            <span className="sr-only">Close panel</span>
                            <XIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>

                      <div className="mt-8">
                        <div className="flow-root">
                          <ul
                            role="list"
                            className="-my-6 divide-y divide-gray-200"
                          >
                            {isEmptyCart ? (
                              <div className="py-16 flex flex-col gap-4 items-center justify-center  text-sm">
                                <EmojiSadIcon className="w-16 h-16 text-gray-300" />
                                <span>{t("common:cart-is-empty")}</span>
                              </div>
                            ) : (
                              Object.values(state.cart.items).map((product) => (
                                <li
                                  key={product.id}
                                  className="flex gap-4 py-6"
                                >
                                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md p-1 border border-gray-200">
                                    <Image
                                      src={`${process.env.NEXT_PUBLIC_HOSTNAME}/uploads/${product.photo}`}
                                      alt={product.name}
                                      width="100%"
                                      height="100%"
                                      className="object-contain object-center"
                                    />
                                  </div>

                                  <div className="flex flex-1 flex-col">
                                    <div>
                                      <div className="flex gap-4 justify-between text-base font-medium text-gray-900">
                                        <h3>{product.name}</h3>
                                        <p>₼{product.price}</p>
                                      </div>
                                      <p className="mt-1 text-sm text-gray-500">
                                        {product.category_name}
                                      </p>
                                    </div>
                                    <div className="flex flex-1 items-end justify-between text-sm">
                                      <div className="text-gray-500  rounded border flex items-center justify-center">
                                        <button
                                          onClick={() =>
                                            dispatch({
                                              type: "cart:item_adjust_quantity",
                                              payload: {
                                                id: product.id,
                                                a: "decrease"
                                              }
                                            })
                                          }
                                          className="hover:text-th-700 active:bg-gray-100 transition-colors rounded w-7 h-8 flex items-center justify-center"
                                        >
                                          <MinusIcon className="h-4 w-4" />
                                        </button>
                                        <input
                                          className="appearance-none text-gray-900 text-center h-8 focus:border-none p-0 w-9 border-t-0 border-b-0 border-gray-200 bg-transparent "
                                          value={product.quantity}
                                          type="number"
                                          onBlur={() =>
                                            dispatch({
                                              type: "cart:item_check_quantity",
                                              payload: product.id
                                            })
                                          }
                                          onChange={(e) =>
                                            dispatch({
                                              type: "cart:item_change_quantity",
                                              payload: {
                                                id: product.id,
                                                value: e.target.value
                                              }
                                            })
                                          }
                                        />
                                        <button
                                          onClick={() =>
                                            dispatch({
                                              type: "cart:item_adjust_quantity",
                                              payload: {
                                                id: product.id,
                                                a: "increase"
                                              }
                                            })
                                          }
                                          className="hover:text-th-700 active:bg-gray-100 transition-colors rounded w-7 h-8 flex items-center justify-center"
                                        >
                                          <PlusIcon className="h-4 w-4" />
                                        </button>
                                      </div>

                                      <div className="flex">
                                        <button
                                          onClick={() =>
                                            dispatch({
                                              type: "cart:item_remove",
                                              payload: product.id
                                            })
                                          }
                                          type="button"
                                          className="font-medium text-th-700 hover:text-th-600"
                                        >
                                          {t("common:cart-product-remove")}
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </li>
                              ))
                            )}
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <p>{t("common:cart-total")}</p>

                        <p>
                          ₼
                          {isEmptyCart
                            ? 0
                            : Object.values(state.cart.items)
                                .reduce((acc, item) => {
                                  return acc + item.price * item.quantity;
                                }, 0)
                                .toFixed(2)}
                        </p>
                      </div>

                      <div className="mt-6">
                        <button
                          onClick={handleCheckout}
                          className={`flex w-full items-center justify-center rounded-md border border-transparent  px-6 py-3 text-base font-medium text-white shadow-sm bg-th-700 hover:bg-th-700/80 ${
                            isEmptyCart ? "pointer-events-none  opacity-80" : ""
                          }`}
                        >
                          {t("common:cart-btn-checkout")}
                        </button>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
