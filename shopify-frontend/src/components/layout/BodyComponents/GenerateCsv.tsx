import { useState } from "react";
import GenerateCsvInputComponent from "./GenerateCsvInputComponent";

const GenerateCsv = () => {
  const [file, setFile] = useState<{ [key: string]: File | null }>({
    icaps: null,
    ecdb: null,
    hierarchy: null,
    images: null,
    map: null,
  });

  console.log(import.meta.env.VITE_NODE_ENV);
  console.log(import.meta.env.VITE_API_URL);
  console.log(import.meta.env.VITE_DEV_API_URL);

  const API_URL =
    import.meta.env.NODE_ENV === "production"
      ? import.meta.env.VITE_API_URL
      : `${import.meta.env.VITE_DEV_API_URL}`;

  const [icaps, setIcaps] = useState<File | null>(null);
  const [ecdb, setEcdb] = useState<File | null>(null);
  const [hierarchy, setHierarchy] = useState<File | null>(null);
  const [images, setImages] = useState<File | null>(null);
  const [map, setMap] = useState<File | null>(null);

  const extractFileName = (
    event: React.ChangeEvent<HTMLInputElement>,
    fileType: string
  ) => {
    const file = event.target.files;

    switch (fileType) {
      case "icaps":
        setIcaps(file ? file[0] : null);
        break;
      case "ecdb":
        setEcdb(file ? file[0] : null);
        break;
      case "hierarchy":
        setHierarchy(file ? file[0] : null);
        break;
      case "images":
        setImages(file ? file[0] : null);
        break;
      case "map":
        setMap(file ? file[0] : null);
        break;
    }

    setFile((prevFile) => ({
      ...prevFile,
      [fileType]: file ? file[0] : null,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData();

    Object.entries(file).forEach(([key, file]) => {
      if (file) {
        formData.append(key, file);
      }
    });

    try {
      console.log("Uploading files");
      console.log("API_URL", API_URL);

      const response = await fetch(`${API_URL}/icaps/upload-files`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      console.log("Upload success");

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = `shopify_all_products_data${Date.now()}`;
      document.body.appendChild(a);
      a.click();

      setTimeout(() => {
        console.log("Clearing the URL");

        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      }, 0);

      setIcaps(null);
      setEcdb(null);
      setHierarchy(null);
      setImages(null);
      setMap(null);
    } catch (error) {
      console.error("Upload error", error);
    }
  };

  const handeClear = () => {
    setIcaps(null);
    setEcdb(null);
    setHierarchy(null);
    setImages(null);
    setMap(null);
  };

  return (
    <>
      <h1 className="w-50 m-auto text-black text-center text-2xl">
        Generate CSV
      </h1>
      <form
        onSubmit={handleSubmit}
        className="mx-auto w-200 text-black text-center pt-25 "
        encType="multipart/form-data"
      >
        <div className="h-50 border-1 rounded-lg p-5">
          <span className="flex flex-row justify-between h-40">
            <GenerateCsvInputComponent
              id="icaps"
              file={icaps}
              extractFilename={(e) => extractFileName(e, "icaps")}
              label="ICAPS"
            />
            <GenerateCsvInputComponent
              id="ecdb"
              file={ecdb}
              extractFilename={(e) => extractFileName(e, "ecdb")}
              label="ECDB"
            />
            <GenerateCsvInputComponent
              id="hierarchy"
              file={hierarchy}
              extractFilename={(e) => extractFileName(e, "hierarchy")}
              label="HIERARCHY"
            />
            <GenerateCsvInputComponent
              id="images"
              file={images}
              extractFilename={(e) => extractFileName(e, "images")}
              label="IMAGES"
            />
            <GenerateCsvInputComponent
              id="map"
              file={map}
              extractFilename={(e) => extractFileName(e, "map")}
              label="MAP"
            />
          </span>
        </div>
        <div className="flex flex-row justify-between my-5">
          <button
            className="border border-black  px-5 py-1 rounded-sm text-black w-25 text-center"
            onClick={handeClear}
          >
            Clear
          </button>
          <button
            className="border border-black bg-black px-5 py-1 rounded-sm text-white w-25 text-center"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
    </>
  );
};

export default GenerateCsv;
