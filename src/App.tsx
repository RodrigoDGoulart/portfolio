import Title from './components/Title';
import styles from './App.module.scss'

function App() {
  return (
    <>
      <Title size='banner'>teste <b>teste</b></Title>
      <Title size='h1'>teste <b>teste</b></Title>
      <Title size='h2'>teste <b>teste</b></Title>
      <Title size='h2' className={styles.test}>teste <b>teste</b></Title>
    </>
  )
}

export default App
