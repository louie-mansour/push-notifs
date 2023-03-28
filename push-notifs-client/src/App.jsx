import Header from './components/header/Header.jsx'
import Footer from './components/footer/Footer.jsx'
import ContentWrapper from './components/contentwrapper/ContentWrapper.jsx'
import './App.scss';
import LeftSidePanel from './components/leftsidepanel/LeftSidePanel.jsx';
import RightSidePanel from './components/rightsidepanel/RightSidePanel.jsx';
import MainContent from './components/maincontent/MainContent.jsx';
import {UserContext} from "./components/usercontext/UserContext";
import {getAppInfo} from "./services/appinfo/AppInfoService";
import {useEffect, useState} from "react";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import UserAccountContent from "./components/useraccountcontent/UserAccountContent";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ContentWrapper>
        <LeftSidePanel />
        <MainContent />
        <RightSidePanel />
      </ContentWrapper>
    ),
  }, {
    path: "/user/:userId",
    element: (
        <ContentWrapper>
          <RightSidePanel />
          <UserAccountContent />
          <RightSidePanel />
        </ContentWrapper>
    )
  }
]);

function App() {
  const [userInfo, setUserInfo] = useState({
    isLoggedIn: false,
    userId: 'anon'
  });
  useEffect(() => {
    const fetchAppInfo = async () => {
      const appInfo = await getAppInfo()
      setUserInfo(appInfo)
    }
    fetchAppInfo()
        .catch(err => console.log(err))
  }, [])
  return (
    <div className="App">
      <UserContext.Provider value={userInfo}>
        <Header />
        <RouterProvider router={router} />
        <Footer />
      </UserContext.Provider>
    </div>
  );
}

export default App;
