import React from "react";
import { MuiThemeProvider } from "@material-ui/core/styles";
import theme from "./theme";
import UserList from "./containers/UserListContainer";
import Header from "./components/Header";
import Footer from "./components/Footer";

const App = () => {
  return (
    <MuiThemeProvider theme={theme}>
      <Header />
      <div style={{minHeight:"90vh"}}>
        <UserList />
      </div>
      <Footer />
    </MuiThemeProvider>
  );
};

export default App;
