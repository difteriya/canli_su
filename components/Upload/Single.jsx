import React, { useState } from "react";
import { Upload } from "react-feather";
import axios from "axios";
import Image from "next/image";
import toast from "react-hot-toast";
import { XIcon } from "@heroicons/react/solid";

const Single = ({ onChange, value, folder = "" }) => {
  const [loading, setLoading] = useState(false);

  const onRemoveFile = () => {
    onChange("");
  };

  const onChangeHandler = async (event) => {
    if (!event.target.files?.length) {
      return;
    }

    setLoading(true);
    // const formData = new FormData();

    // Array.from(event.target.files).forEach((file) => {
    //   formData.append(event.target.name, file);
    // });

    try {
      const file = event.target.files[0];
   

      const formData = new FormData();
      formData.append("single-file", file);
      // formData.append('folder', folder);

      const response = await axios.post("/api/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data" // Important for handling FormData
        }
      });

      console.log(response.data);

      // const { data } = await axios.post("/api/upload", {
      //   name,
      //   type,
      //   folder
      // });

      // const config = {
      //   headers: {
      //     "Content-type": file.type,
      //     "Access-Control-Allow-Origin": "*"
      //   }
      // };
      const { filename } = response.data;

      // // await axios.post(url, file, config);

      toast.success("Şəkil yükləndi");
      onChange(filename);
    } catch (error) {
      console.log(error);
      toast.error("Sekil yuklenmedi");
    }
    setLoading(false);
  };

  return (
    <div>
      {value ? (
        <div className="mt-2">
          <div className="relative shadow-sm  border rounded inline-flex flex-col items-center p-1">
            <Image
              src={`${process.env.NEXT_PUBLIC_HOSTNAME}/uploads/${value}`}
              alt={value}
              width={208}
              height={208}
              className="object-contain object-center"
            />
            {/* <div className="text-sm">{value}</div> */}
            <button
              onClick={onRemoveFile}
              className="w-7 h-7 right-2 bottom-2 shadow bg-white absolute  flex items-center justify-center text-gray-600 hover:text-red-600 hover:bg-red-50 transition-colors divide-x rounded-full"
            >
              <XIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        <label
          htmlFor="u-f"
          className="inline-flex items-center justify-center gap-2.5 group transition-colors cursor-pointer relative px-4 py-2  border border-gray-300/75 bg-white hover:border-blue-600 rounded"
        >
          {loading ? (
            <>
              <svg
                className="animate-spin -ml-1 h-5 w-5 text-gray-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              <div className="text-sm">Yüklənir...</div>
            </>
          ) : (
            <>
              <Upload className="w-4 h-4" />
              <div className="text-sm">Şəkil seçin</div>
            </>
          )}

          <input
            className="hidden"
            name="single-file-upload"
            id="u-f"
            type="file"
            accept="image/*"
            onChange={onChangeHandler}
          />
        </label>
      )}
    </div>
  );
};

export default Single;
