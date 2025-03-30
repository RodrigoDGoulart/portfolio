import Button from "./components/Button";

import GithubIcon from "./assets/icons/github.svg?react";

function App() {
  return (
    <>
      <Button icon={GithubIcon} >
        teste
      </Button>
      <Button icon={GithubIcon} styleType="secondary">
        teste
      </Button>
      <Button icon={GithubIcon} styleType="text-only">
        teste
      </Button>
      <Button icon={GithubIcon} styleType="link">
        teste
      </Button>
    </>
  );
}

export default App;
