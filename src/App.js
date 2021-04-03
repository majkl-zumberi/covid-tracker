import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import Container from "./components/Container";
import CovList from "./components/CovList";
import CovMap from "./components/CovMap";
import ListContainer from "./components/ListContainer";
import Nav from "./components/Nav";
import { fetchCovTotals } from "./redux/actions";
function App() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  console.log({ state });

  useEffect(() => {
    dispatch(fetchCovTotals());
  }, []);

  return (
    <div className="App">
      <Nav />
      <Container>
        <ListContainer>
          <CovList title="Totale decessi" total="2.777.188" />
        </ListContainer>
        <CovMap />
        <ListContainer>
          <CovList />
        </ListContainer>
      </Container>
    </div>
  );
}

export default App;
