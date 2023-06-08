import styles from './App.module.css';
import { OptionsProvider } from './context/optionsContext';
import ChooseAndPlay from './sections/ChooseAndPlay';
import ScoreAndResults from './sections/ScoreAndResults';



function App() {
  return (
    <div className={styles.container}>
      <div className={styles.titleCtn}>
        <h1>ROCK, PAPER, SCISSORS</h1>
        <p>React Typescript Game!</p>
      </div>
      <OptionsProvider>
        <ScoreAndResults />
        <ChooseAndPlay />
      </OptionsProvider>
    </div>
  );
}

export default App;