import styled from "styled-components";

const BlueButton = styled.input`
  box-sizing: border-box;
  width:100%;
  border-radius: 3px;
  margin-bottom: 5px;
  padding: 8px 0px;
  border: none;
  margin-top: 12px;
  background-color: ${props=>props.theme.blue};
  color: white;
  text-align:center;
  padding: 8px 0px;
  font-weight: 600;
  opacity: ${props=>props.disabled?"0.5":"1"}
`

function Button(props){
  return <BlueButton {...props}/>
}
export default Button;