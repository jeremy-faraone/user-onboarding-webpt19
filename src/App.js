import React from "react";
import "./App.css";
import Form from "./Form";
import styled from "styled-components";

const Title = styled.h1`
  text-shadow: 2px 1px red;
  font-size: 35px;
`;

export default function App() {
  return (
    <div className="App">
      <Title>Join Our Program !!!</Title>
      <Form />
    </div>
  );
}
