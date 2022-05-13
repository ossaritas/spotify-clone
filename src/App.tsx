import Body from "./components/Body/Router/Body";
import Sidebar from "./components/Sidebar/Sidebar";
import Footer from "./components/Footer/Footer";
import MainContainer from "./components/Layout/MainContainer";

function App() {
  return (
    <MainContainer>
      <Sidebar />
      <Footer />
      <Body />
    </MainContainer>
  );
}

export default App;
