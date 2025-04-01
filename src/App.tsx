import TabContainer from "./components/TabContainer";

function App() {
  return (
    <>
      <TabContainer
        tabContent={[
          { title: "Tab 1", content: "Content 1" },
          { title: "Tab 2", content: "Content 2" },
          { title: "Tab 3", content: "Content 3" },
        ]}
      />
    </>
  );
}

export default App;
