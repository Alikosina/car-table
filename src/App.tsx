import React from "react";
import styled from "styled-components";
import CarsTable from "./containers/CarsTableContainer";

const AppContainer = styled.div`
  padding: 40px 20px;
`;

const App: React.FC = () => {
  return (
    <AppContainer>
      <CarsTable />
    </AppContainer>
  );
};

export default App;
