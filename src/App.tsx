import GithubIcon from "./assets/icons/github.svg?react";
import Card from "./components/Card";
import { Project } from "./@types";

const projet_info: Project = {
  title: "My Project",
  subtitle: "A brief description of my project.",
  image_url: "https://via.placeholder.com/150",
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
      <Card content={projet_info} />
    </>
  );
}

export default App;
