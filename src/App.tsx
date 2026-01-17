import Banner from "./components/Sections/Banner";
import Header from "./components/Header";
import AboutMe from "./components/Sections/AboutMe";
import Projects from "./components/Sections/Projects";

import styles from "./App.module.scss";

function App() {
  return (
    <>
      <Header />
      <Banner />
      <main className={styles.main}>
        <AboutMe />
        <Projects />
      </main>
    </>
  );
}

export default App;
