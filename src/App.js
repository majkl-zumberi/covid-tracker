import "./App.css";
import Container from "./components/Container";
import CovDeaths from "./components/Cov-Deaths";
import CovMap from "./components/CovMap";
import ListContainer from "./components/ListContainer";
import Nav from "./components/Nav";
function App() {
  return (
    <div className="App">
      <Nav />
      <Container>
        <ListContainer>
          <CovDeaths />
        </ListContainer>
        <CovMap />
        <ListContainer>
          <CovDeaths />
        </ListContainer>
      </Container>
    </div>
  );
}

export default App;
