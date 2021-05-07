import { createGlobalStyle } from "styled-components"
import reset from 'styled-reset';
export const lightTheme = {
  bgColor: "#FAFAFA",  
  blue: "#0095f6",
  fontColor: "rgb(38,38,38)",
  borderColor: "rgb(219,219,219)",
  boxColor: "white",
}
export const darkTheme = {
  fontColor: "#dedede",
  bgColor: "#2c2c2c",
  blue: "#0095f6",
  borderColor: "#787878",
  boxColor: "#1b1b1b",
}

export const GlobalStyles = createGlobalStyle`
    ${reset}
    input {
      all:unset;
    }
    * {
      box-sizing:border-box;
    }
    body {
        background-color: ${(props) => props.theme.bgColor};
        font-size:14px;
        font-family:'Open Sans', sans-serif;
        color: ${props=>props.theme.fontColor}
    }
    a {
      text-decoration: none;
    }
`;