import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import AdminLayout from "@/components/Layout/AdminLayout";
import { PlusIcon } from "@heroicons/react/solid";
import { useRouter } from "next/router";
import { getAllProducts } from "../../api/products";
import toast from "react-hot-toast";
import axios from "axios";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors
} from "@dnd-kit/core";
import {
  useSortable,
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import cls from "classnames";

function SortableIcon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="1em"
      height="1em"
      {...props}
    >
      <path fill="none" d="M0 0h24v24H0z" />
      <path
        fill="currentColor"
        d="M18 11V8l4 4-4 4v-3h-5v5h3l-4 4-4-4h3v-5H6v3l-4-4 4-4v3h5V6H8l4-4 4 4h-3v5z"
      />
    </svg>
  );
}

function SortableItem({ id, name, photo, price }) {
  const {
    active,
    isSorting,
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition
  } = useSortable({ id: id });

  const router = useRouter();

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  };

  // <div
  //     className="p-3 border-b bg-white"
  //     ref={setNodeRef}
  //     style={style}
  //     {...attributes}
  //     {...listeners}
  //   >
  //     {props.id}
  //   </div>

  return (
    <tr
      ref={setNodeRef}
      style={style}
      onClick={() => router.push(`/admin/products/${id}`)}
      className={cls(
        "border-t bg-white border-gray-100 hover:bg-gray-50 cursor-pointer ",
        { "bg-white relative z-10 shadow-xl": active?.id === id },
        { "pointer-events-none": isSorting }
        // { ' border-blue-500': isOverContainer },
        // isOverContainer ? (isBefore ? 'border-l-4' : 'border-r-4') : '',
      )}
    >
      <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-500">
        <div
          className="rounded-full hover:bg-th-600/10 hover:text-th-600 hover:cursor-move transition-colors inline-flex items-center justify-center w-9 h-9"
          {...attributes}
          {...listeners}
        >
          <SortableIcon className="text-[18px]" />
        </div>
      </td>
      <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-500">
        <div className="h-12 w-12 flex-shrink-0 overflow-hidden">
          <Image
           src={`${process.env.NEXT_PUBLIC_HOSTNAME}/uploads/${photo}`}
            alt={name}
            width="100%"
            height="100%"
            className="object-contain object-center"
          />
        </div>
      </td>

      <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-500">
        {name}
      </td>
      <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-500">
        ₼ {price}
      </td>
    </tr>
  );
}

const ProductsPage = ({ products }) => {
  const [items, setItems] = useState(() => products);

  const itemIds = items.map((item) => item.id);

  function handleDragEnd(event) {
    const { active, over } = event;

    if (active.id !== over.id) {
      setItems((items) => {
        const oldIndex = active.data.current.sortable.index;
        const newIndex = over.data.current?.sortable.index || 0;
        const newItems = arrayMove(items, oldIndex, newIndex);
        saveSort(newItems.map((item, i) => ({ id: item.id, position: i })));
        return newItems;
      });
    }
  }

  const saveSort = async (values) => {
    try {
      const res = await axios.post(`/api/products?c=sort-products`, values, {
        withCredentials: true
      });
      if (res.status === 200) {
        toast.success("Yadda saxlanildi");
      }
    } catch (error) {
      toast.error(error.message);
    }

    //
  };

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
  );

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden  w-full">
      <div className="p-4 flex items-center justify-between">
        <h3 className="text-xl font-semibold  text-gray-900">Məhsullar</h3>
        <div className="flex-shrink-0">
          <Link href="/admin/products/new">
            <a className="text-sm font-medium bg-th-700 h-10 px-4  flex items-center justify-center gap-2 text-white hover:opacity-75 rounded">
              <PlusIcon className="w-4" />
              <span>Yarat</span>
            </a>
          </Link>
        </div>
      </div>
      <div className="overflow-x-auto">
        <div className="align-middle inline-block min-w-full">
          <div className="overflow-hidden">
            <div className="bg-gray-100">
              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
              >
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-white">
                    <tr className="border-b border-t border-gray-200/75">
                      <th className="px-4 py-3 text-left text-xs font-medium  uppercase tracking-wider">
                        Id
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium  uppercase tracking-wider">
                        Şəkil
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium  uppercase tracking-wider">
                        Adı
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium  uppercase tracking-wider">
                        Qiymət
                      </th>
                      {/* <th></th> */}
                    </tr>
                  </thead>
                  <tbody>
                    <SortableContext
                      items={itemIds}
                      strategy={verticalListSortingStrategy}
                    >
                      {items.map(({ id, photo, products_langs, price }) => {
                        const name = products_langs?.name;
                        return (
                          <SortableItem
                            key={id}
                            id={id}
                            name={name}
                            photo={photo}
                            price={price}
                          />
                        );
                      })}
                    </SortableContext>
                  </tbody>
                </table>
              </DndContext>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async () => {
  const products = await getAllProducts();
  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
      breadcrumbs: [{ label: "Məhsullar" }]
    }
  };
};

ProductsPage.Layout = AdminLayout;

export default ProductsPage;
