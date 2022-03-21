import { ChakraProvider } from "@chakra-ui/react";
import "@fontsource/montserrat/900.css"; // Defaults to weight 400.
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { Landing } from "./pages/landing/landing";
import { Profiles } from "./components/profiles";
import { extendTheme } from "@chakra-ui/react";
import { ApolloProvider } from "@apollo/client";
import { apolloClient } from "./lib/apollo-client";
const theme = extendTheme({
  fonts: {
    heading: "Montserrat, sans-serif",
    link: "Montserrat, sans-serif",
    text: "Montserrat, sans-serif",
  },
});
export const App = () => (
  <ApolloProvider client={apolloClient}>
    <ChakraProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />}></Route>
          <Route path="/profiles" element={<Profiles />}></Route>
        </Routes>
      </Router>
    </ChakraProvider>
  </ApolloProvider>
);
