import { useState, useEffect } from "react";
import Link from "next/link";
import Layout from "@/components/Layout";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import AccountLayout from "@/components/Layout/AccountLayout";
import AddressModal from "@/components/AddressModal";
import { PlusIcon } from "@heroicons/react/outline";
import { getUserSession, getUserAddress } from "../api/site/me";

const ShippingAddress = ({ userAddressData }) => {
  const { t } = useTranslation();
  const [visibleModal, setVisibleModal] = useState(false);
  const [data, setData] = useState([]);
  const [modalData, setModalData] = useState(null);

  useEffect(() => {
    setData(userAddressData);
  }, [userAddressData]);

  const onModalEnd = (data = null) => {
    console.log("onModalEnd", data);
    if (data) {
      if (data?.id && modalData?.id) {
        setData((prev) =>
          prev.map((p) => {
            if (p.id === data.id) {
              p = { ...p, ...data };
            }
            return p;
          })
        );
      } else {
        setData((prev) => [...prev, data]);
      }
    }
  };

  const onCloseModal = () => {
    setVisibleModal(false);
  };
  const onOpenModal = (data = null) => {
    setVisibleModal(true);
    setModalData(data);
  };

  return (
    <AccountLayout title={t("common:user-shipping-address")}>
      <div className="p-6">
        <div className="flex items-center justify-between  mb-6">
          <h1 className="font-semibold text-2xl">
            {t("common:user-shipping-address")}
          </h1>
        </div>
        <div>
          <div className="grid grid-col-1 md:grid-cols-2 gap-4">
            {data &&
              data.map(
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
                    <div
                      key={id}
                      onClick={() =>
                        onOpenModal({
                          id,
                          first_name,
                          last_name,
                          address,
                          phone,
                          city,
                          country
                        })
                      }
                      className="border rounded-md p-4 hover:border-th-600 hover:bg-th-600/5 cursor-pointer"
                    >
                      <div className="font-medium">
                        {first_name} {last_name}
                      </div>

                      <div className="text-sm ">
                        {address}, {phone}
                      </div>
                      <div className="text-sm">
                        {city}, {country}
                      </div>
                    </div>
                  );
                }
              )}
            <div
              onClick={() => onOpenModal()}
              className="border group cursor-pointer bg-white  hover:border-th-600 border-dashed rounded-md flex items-center justify-center"
            >
              <PlusIcon className="w-5 h-5 mr-2 group-hover:text-th-600" />
              <span className="font-medium text-sm p-4 group-hover:text-th-600">
                {t("me:new-address")}
              </span>
            </div>
          </div>
        </div>
      </div>
      <AddressModal
        visible={visibleModal}
        data={modalData}
        onClose={onCloseModal}
        onEnd={onModalEnd}
      />
    </AccountLayout>
  );
};

export const getServerSideProps = async ({ req, res, locale }) => {
  let user = await getUserSession(req, res);

  if (!user?.id) {
    return {
      notFound: true
    };
  }

  const userAddressData = await getUserAddress(user?.id);

  return {
    props: {
      userAddressData,
      ...(await serverSideTranslations(locale, ["common", "me"]))
    }
  };
};

ShippingAddress.Layout = Layout;

export default ShippingAddress;
