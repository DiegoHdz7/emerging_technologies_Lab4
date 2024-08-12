import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {ApolloClient, InMemoryCache, ApolloProvider} from "@apollo/client";
import {BrowserRouter} from "react-router-dom";


const root = ReactDOM.createRoot(document.getElementById('root'));
const client = new ApolloClient({
  uri: "http://localhost:3001/graphql",
  cache: new InMemoryCache(),
});

root.render(
 

  <BrowserRouter>
      <ApolloProvider client={client}>
      <App></App>

      </ApolloProvider>
  </BrowserRouter>


);


