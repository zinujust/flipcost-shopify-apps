import Body from "./components/layout/Body";
import Header from "./components/layout/Header";
import MenuBar from "./components/layout/MenuBar";

const App = () => {
  return (
    <div className="font-sans text-white box-border mx-0 h-screen">
      <Header />
      <MenuBar />
      <Body />
    </div>
  );
};

export default App;
