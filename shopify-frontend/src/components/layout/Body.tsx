import GenerateCsv from "./BodyComponents/GenerateCsv";

const Body = () => {
  return (
    <div
      className={`h-[calc(100vh-6rem)] w-[calc(100vw-40px)] m-5 p-5 bg-gray-200 rounded-lg select-none`}
    >
      <GenerateCsv />
    </div>
  );
};

export default Body;
