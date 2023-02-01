import React from "react";
import Header from "./components/Header"
import { ThemeProvider } from '@mui/material/styles';
import theme from "./components/theme";
import MainScreen from "./screens/MainScreen";
import PostModal from "./components/PostModal";

function App() {
  

  return (
    <ThemeProvider theme={theme}>
      <Header />
      <MainScreen />
      <PostModal />
    </ThemeProvider>
  );
}

export default App;
