import Badge from "./components/Badge";
import GithubIcon from "./assets/icons/github.svg?react";

function App() {
  return (
    <>
      <Badge
        icon={GithubIcon}
        color={{ primary: "#ff0000", secondary: "#ffffff" }}
        label="teste"
      />
    </>
  );
}

export default App;
