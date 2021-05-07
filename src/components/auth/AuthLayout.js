import { useReactiveVar } from "@apollo/client"
import { faMoon, faSun } from "@fortawesome/free-regular-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import styled from "styled-components"
import { darkModeVar, disableDarkmode, enableDarkmode } from "../../apollo"

const Container = styled.div`
  display:flex;
  height: 100vh;
  justify-content:center;
  align-items:center;
  flex-direction: column;
`
const Wrapper = styled.div`
  max-width: 300px;
  width: 100%;
`
const Footer = styled.footer`
  margin-top: 20px;
`
const DarkModeBtn = styled.span`
  cursor: pointer;
`


function AuthLayout({children}){
  const darkmode = useReactiveVar(darkModeVar);
  return (
    <Container>
      <Wrapper>
        {children}
      </Wrapper>
      <Footer>
        <DarkModeBtn onClick={darkmode? disableDarkmode: enableDarkmode}>
          <FontAwesomeIcon icon={darkmode? faSun: faMoon} color="orange"/>
        </DarkModeBtn>
      </Footer>
    </Container>
  );
}

export default AuthLayout;