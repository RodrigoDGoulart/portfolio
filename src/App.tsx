import GithubIcon from "./assets/icons/github.svg?react";
import { Project } from "./@types";
import Timeline from "./components/Timeline";
import Header from "./components/Header";

const projet_info: Project = {
  image_url: '',
  title: "My Project",
  subtitle: "A brief description of my project.",
  desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris leo diam, vestibulum ut odio vel, eleifend accumsan ante. Suspendisse potenti. Proin quis rhoncus felis. Ut dictum tincidunt laoreet. Praesent nec orci at libero laoreet commodo at eu orci. Ut ut hendrerit tellus. Donec vel nisl at turpis efficitur malesuada. Nam non ante nisi.",
  badges: [
    {
      icon: GithubIcon,
      label: "GitHub",
      color: {
        primary: "#a70000",
        secondary: "#fff",
      },
    },
    {
      icon: GithubIcon,
      label: "GitHub",
      color: {
        primary: "#a70000",
        secondary: "#fff",
      },
    },
    {
      icon: GithubIcon,
      label: "GitHub",
      color: {
        primary: "#a70000",
        secondary: "#fff",
      },
    },
    {
      icon: GithubIcon,
      label: "GitHub",
      color: {
        primary: "#a70000",
        secondary: "#fff",
      },
    },
    {
      icon: GithubIcon,
      label: "GitHub",
      color: {
        primary: "#a70000",
        secondary: "#fff",
      },
    },
    {
      icon: GithubIcon,
      label: "GitHub",
      color: {
        primary: "#a70000",
        secondary: "#fff",
      },
    },
  ],
  links: [
    {
      label: "GitHub",
      url: "https://github.com",
      icon: GithubIcon,
    },
    {
      label: "GitHub",
      url: "https://github.com",
      icon: GithubIcon,
    },
  ],
};

function App() {
  return (
    <>
      <Header />
      <Timeline 
        items={[
          projet_info, 
          projet_info,
          projet_info,
          projet_info,
          projet_info,
          projet_info,
          projet_info,
          projet_info,
          projet_info,
          projet_info,
        ]} />
        <div id="projects">projetos</div>
    </>
  );
}

export default App;
