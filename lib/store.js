// import { useState, useEffect } from "react";
// import create from "zustand";
// import { persist, devtools } from "zustand/middleware";
// import { immer } from "zustand/middleware/immer";

// const auth = (set, get) => ({
//   user: {},
//   isAuthenticated: false,
//   setAuthState: (user) => set({ user, isAuthenticated: !!user }),
//   clearAuthState: () => set({ user: {}, isAuthenticated: false })
// });

// const site = (set, get) => ({
//   sidebarCollapsed: false,
//   toggleSidebar: () =>
//     set((prev) => ({ sidebarCollapsed: !prev.sidebarCollapsed }))
// });

// const products = [
//   {
//     id: 1,
//     name: "Throwback Hip Bag",
//     href: "#",
//     color: "Salmon",
//     price: 4.5,
//     quantity: 1,
//     imageSrc: "/b1.png",
//     imageAlt:
//       "Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt."
//   },
//   {
//     id: 2,
//     name: "Medium Stuff Satchel",
//     href: "#",
//     color: "Blue",
//     price: 0.35,
//     quantity: 1,
//     imageSrc: "/i1.png",
//     imageAlt:
//       "Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch."
//   }
//   // More products...
// ];

// const initialCartState = {
//   items: [],
//   cartCollapsed: false,
//   openCart: () => {
//     return;
//   },
//   closeCart: () => {
//     return;
//   },
//   addCart: () => {
//     return;
//   },
//   clearCart: () => {
//     return;
//   },
//   changeQuantity: () => {
//     return;
//   }
// };

// const cartStore = create(
//   persist(
//     (set, get) => ({
//       items: products,
//       cartCollapsed: false,
//       openCart: () => set(() => ({ cartCollapsed: true })),
//       closeCart: () => set(() => ({ cartCollapsed: false })),
//       addCart: (item) => set((prev) => ({ items: [...prev.items, item] })),
//       checkQuantity: (id) => {
//         return set((prev) => {
//           const newItems = prev.items.map((item) => {
//             if (item.id === id) {
//               if (item.quantity > 0) {
//                 return item;
//               } else {
//                 return { ...item, quantity: 1 };
//               }
//             }
//             return item;
//           });
//           return { items: newItems };
//         });
//       },
//       adjustQuantity: (id, a) => {
//         return set((prev) => {
//           const newItems = prev.items.map((item) => {
//             if (item.id === id) {
//               let qty =
//                 a === "increase"
//                   ? parseInt(item.quantity) + 1
//                   : parseInt(item.quantity) - 1;

//               item.quantity = qty > 0 ? qty : 1;
//             }
//             return item;
//           });
//           return { items: newItems };
//         });
//       },
//       changeQuantity: (value, id) =>
//         set((prev) => ({
//           items: prev.items.map((item) =>
//             item.id === id ? { ...item, quantity: value } : item
//           )
//         })),
//       removeItem: (id) =>
//         set((prev) => ({ items: prev.items.filter((item) => item.id !== id) })),
//       clearCart: () => set(() => ({ items: [] }))
//     }),
//     { name: "canlisu-cart" }
//   )
// );

// export const useCart = (selector, compare) => {
//   const store = cartStore(selector, compare);
//   const [hydrated, setHydrated] = useState(false);
//   useEffect(() => setHydrated(true), []);

//   return hydrated ? store : selector(initialCartState);
// };

// export const useSite = create(persist(site, { name: "canlisu-site" }));
// export const useAuth = create(persist(auth, { name: "canlisu-auth" }));
