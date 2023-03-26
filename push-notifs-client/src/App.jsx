import Header from './components/header/Header.jsx'
import Footer from './components/footer/Footer.jsx'
import ContentWrapper from './components/contentwrapper/ContentWrapper.jsx'
import './App.scss';
import LeftSidePanel from './components/leftsidepanel/LeftSidePanel.jsx';
import RightSidePanel from './components/rightsidepanel/RightSidePanel.jsx';
import MainContent from './components/maincontent/MainContent.jsx';
import AppWrapper from "./components/AppWrapper";

function App() {
  return (
    <div className="App">
      <AppWrapper>
        <Header />
        <ContentWrapper>
          <LeftSidePanel />
          <MainContent />
          <RightSidePanel />
        </ContentWrapper>
        <Footer />
      </AppWrapper>
    </div>
  );
}

export default App;
