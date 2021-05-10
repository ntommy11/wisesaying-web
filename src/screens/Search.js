import { useLocation } from "react-router";
import styled from "styled-components";

const Container = styled.div`
  display:flex;
  flex-direction:column;
  width: 100%;
  justify-content: center;
  align-items:center;
  align-items:center;
  justify-content:center;
  padding-top: 40px;
`

function Search(){
  const location = useLocation();
  return(
    <Container>
      <div>Search:{location?.state?.id} {location?.state?.keyword}</div>
    </Container>
  )
}
export default Search;