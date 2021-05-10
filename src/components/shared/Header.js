import { useReactiveVar } from "@apollo/client";
import { faCompass, faUser } from "@fortawesome/free-regular-svg-icons";
import { faHome, faQuoteRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { isLoggedInVar } from "../../apollo";
import routes from "../../routes";

const SHeader = styled.header`
  width: 100%;
  border-bottom: 1px solid ${(props) => props.theme.borderColor};
  background-color: ${(props) => props.theme.bgColor};
  padding: 18px 0px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
`;

const Wrapper = styled.div`
  max-width: 930px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Column = styled.div``;

const Icon = styled.span`
  margin-right: 15px;
`;

const Button = styled.span`
  background-color: ${props=>props.theme.blue};
  border-radius: 5px;
  color:white;
  padding: 4px 15px;
  font-weight: 600;
  margin-right: 10px;
`
const IconsContainer = styled.div`
  display:flex;
  align-items:center;
`
const Title = styled.span`
  font-family: 'Nanum Myeongjo', serif;
  font-weight: bolder;
  display: inline;
  font-size: 24px;
`


function Header() {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  //const {data} = useUser();
  return (
    <SHeader>
      <Wrapper>
        <Column>
          <Title>인생글귀 </Title>
          <FontAwesomeIcon icon={faQuoteRight} style={{fontSize:24}}/>
        </Column>
        <Column>
          {isLoggedIn ? (
            <IconsContainer>
              <Icon>
                <FontAwesomeIcon icon={faHome} size="lg" />
              </Icon>
              <Icon>
                <FontAwesomeIcon icon={faCompass} size="lg" />
              </Icon>
              <Icon>
                <FontAwesomeIcon icon={faUser} size="lg" />
              </Icon>
            </IconsContainer>
          ) : (<Link to={routes.home}><Button>Login</Button></Link>)}
        </Column>
      </Wrapper>
    </SHeader>
  );
}
export default Header;