import styled from "styled-components";

const Separator = styled.div`
  margin: 20px 0px 30px 0px;
  text-transform: uppercase;
  display: flex;
  justify-content:center;
  width:100%;
  align-items:center;
  div{
    width: 100%;
    height: 1px;
    background-color: rgb(219,219,219);
  }
  span{
    margin: 0px 5px;
    font-weight: 600;
    color: #8e8e8e;
  }
`
function Devider({text}){
  return(
    <Separator>
      <div></div>
      <span>{text}</span>
      <div></div>
    </Separator>
  )
}

export default Devider;