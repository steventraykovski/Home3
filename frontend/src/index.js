import * as React from 'react';

import ReactDOM from "react-dom";
//import { Dapp } from "./components/Dapp";

import { Home3app } from "./components/Home3app";
import { Dapp } from "./components/Dapp";


//import { extendTheme, ChakraProvider } from '@chakra-ui/react';


// We import bootstrap here, but you can remove if you want
// import "bootstrap/dist/css/bootstrap.css";

// This is the entry point of your application, but it just renders the Dapp
// react component. All of the logic is contained in it.

ReactDOM.render(
  <React.StrictMode>
    
      <Dapp />
    
  </React.StrictMode>,
  document.getElementById("root")
);
