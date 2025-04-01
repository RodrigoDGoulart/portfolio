import Input from "./components/Input";
import SearchIcon from "./assets/icons/search.svg?react";

function App() {
  return (
    <>
      <Input icon={SearchIcon} placeholder="teste" style={{width: '300px'}} />
    </>
  );
}

export default App;
