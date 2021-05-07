import styled from "styled-components"

const Input = styled.input`
  box-sizing: border-box;
  width:100%;
  border-radius: 3px;
  margin-bottom: 5px;
  padding: 7px;
  background-color: #fafafa;
  border: 0.5px solid ${props=>props.invalid?"tomato":props.theme.borderColor};
  &:focus{
    border-color: ${props=>props.invalid?"tomato":"rgba(28,128,192,0.5)"};
  }
`

export default Input;