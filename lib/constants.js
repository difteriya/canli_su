import country from "./names.json";

export const countries = Object.keys(country)
  .map((c) => ({
    label: country[c],
    value: c
  }))
  .sort(function (a, b) {
    return a.label.localeCompare(b.label);
  });

export const languages = [
  { label: "Azərbaycanca", value: "az" },
  { label: "English", value: "en" },
  { label: "Русский", value: "ru" },
  { label: "Türkçe", value: "tr" },
  { label: "عربي", value: "ar" }
];

export const menu = [
  {
    label: "common:nav-link-home",
    href: "/"
  },
  {
    label: "common:nav-link-products",
    href: "/products"
  },
  {
    label: "common:nav-link-blog",
    href: "/blog"
  },
  {
    label: "common:nav-link-about",
    href: "/about"
  },
  {
    label: "common:nav-link-contact",
    href: "/contact"
  }
];

export const translationFiles = [
  { label: "Ümumi", file: "common" },
  { label: "Ana səhifə", file: "home" },
  { label: "Əlaqə", file: "contact" },
  { label: "İstifadəçi profili", file: "me" },
  { label: "Sifariş", file: "order" }
];

export const translationKeys = ["common", "home", "contact", "me", "order"];

export const paymentMethod = {
  0: "order:payment-card",
  1: "order:payment-cod"
};

export const paymentStatus = {
  0: "order:p-s-pending",
  1: "order:p-s-paid",
  2: "order:p-s-failed",
  3: "order:p-s-canceled",
  4: "order:p-s-refunded"
};

export const orderStatus = {
  0: "order:o-s-active",
  1: "order:o-s-completed",
  2: "order:o-s-canceled"
};

export const deliveryStatus = {
  0: "order:s-m-order-placed",
  1: "order:s-m-processing",
  2: "order:s-m-in-transit",
  3: "order:s-m-delivered"
  // 4: "order:s-m-returned"
};
