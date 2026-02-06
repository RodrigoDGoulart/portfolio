import Banner from "./components/Sections/Banner";
import Header from "./components/Header";
import AboutMe from "./components/Sections/AboutMe";
import Projects from "./components/Sections/Projects";

import styles from "./App.module.scss";
import Footer from "./components/Footer";
import { ToastContextProvider } from "./contexts/ToastContext";

function App() {
  return (
    <ToastContextProvider>
      <div id="app-scroll">
        <div className="scroll-inner">
          <Header />
          <Banner />
          <main className={styles.main}>
            <AboutMe />
            <Projects />
          </main>
          <Footer />
        </div>
      </div>
    </ToastContextProvider>
  );
}

export default App;
