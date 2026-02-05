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
      <Header />
      <Banner />
      <main className={styles.main}>
        <AboutMe />
        <Projects />
      </main>
      <Footer />
    </ToastContextProvider>
  );
}

export default App;
