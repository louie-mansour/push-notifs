import Header from './components/header/Header.jsx'
import Footer from './components/footer/Footer.jsx'
import ContentWrapper from './components/contentwrapper/ContentWrapper.jsx'
import './App.scss';
import LeftSidePanel from './components/leftsidepanel/LeftSidePanel.jsx';
import RightSidePanel from './components/rightsidepanel/RightSidePanel.jsx';
import MainContent from './components/maincontent/MainContent.jsx';

function App() {
  return (
    <div className="App">
      <Header />
      <ContentWrapper>
        <LeftSidePanel />
        <MainContent />
        <RightSidePanel />
      </ContentWrapper>
      <Footer />
    </div>
  );
}

export default App;
