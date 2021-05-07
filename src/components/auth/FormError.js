import styled from "styled-components";

const Container = styled.span`
  color: tomato;
  font-weight:500;
  font-size: 12px;
  margin: 5px 0px 10px 0px;
`

function FormError({message}){
  return message===""|!message?null:<Container>{message}</Container>
}
export default FormError;