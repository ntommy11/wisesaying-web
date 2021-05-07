import { Link } from "react-router-dom";
import styled from "styled-components";
import { BaseBox } from "../shared";

const Container = styled(BaseBox)`
  padding: 20px 0px;
  text-align:center;
  span{
    font-size: 12px;
  };
  a{
    margin-left: 5px;
    color: ${props=>props.theme.blue}
  }
`

function BottomBox({cta,link,linkText}){
  return(
    <Container>
      <span>{cta}</span>
      <Link to={link}>{linkText}</Link>
    </Container>
  )
}


export default BottomBox;