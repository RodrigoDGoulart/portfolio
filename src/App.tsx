import Banner from "./components/Sections/Banner";
import Header from "./components/Header";
import AboutMe from "./components/Sections/AboutMe";
import Projects from "./components/Sections/Projects";

import styles from "./App.module.scss";
import Footer from "./components/Footer";
import { ToastContextProvider } from "./contexts/ToastContext";
import { usePortfolioData } from "./contexts/PortfolioDataContext";
import { PropagateLoader } from "react-spinners";

function App() {
  const { loading } = usePortfolioData();

  return (
    <ToastContextProvider>
      <div id="app-scroll">
        <div className="scroll-inner">
          {loading ? (
            <div className={styles.loading_container}>
              <PropagateLoader color="#0000002d" />
            </div>
          ) : (
            <>
              <Header />
              <Banner />
              <main className={styles.main}>
                <AboutMe />
                <Projects />
              </main>
              <Footer />
            </>
          )}
        </div>
      </div>
    </ToastContextProvider>
  );
}

export default App;
