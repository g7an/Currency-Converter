import './App.css';
import ConverterForm from './view/ConverterForm'
import CssBaseline from '@material-ui/core/CssBaseline'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'

function App() {

  return (
    <div className="App">
        <CssBaseline />
        <Container maxWidth="lg">
            <Typography variant="h5" component="h1">Currency Converter</Typography>
              <ConverterForm />
        </Container>
    </div>
  );
}

export default App;
