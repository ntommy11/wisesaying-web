import { gql, useQuery, useReactiveVar } from "@apollo/client";
import { faCompass, faTimesCircle, faUser } from "@fortawesome/free-regular-svg-icons";
import { faHome, faQuoteRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useMediaQuery } from "react-responsive";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import { isLoggedInVar } from "../../apollo";
import routes from "../../routes";

const TAKE = 3;
const SEARCH_TAG = gql`
  query searchTag($keyword: String!, $take: Int!, $lastId:Int){
    searchTag(keword: $keyword, take: $take, lastId:$lastId){
      id
      name
      totalSayings
    }
  }
`
const SEARCH_AUTHOR = gql`
  query searchAuthor($keyword: String!, $take: Int!, $lastId: Int){
    searchAuthor(keyword: $keyword, take:$take, lastId:$lastId){
      id
      name
      totalSayings
    }
  }
`

const SHeader = styled.header`
  width: 100%;
  border-bottom: 1px solid ${(props) => props.theme.borderColor};
  background-color: white;
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
  font-family: 'Black Han Sans', sans-serif;
  display: inline;
  font-size: 28px;
`

const TitleM = styled.span`
  font-family: 'Black Han Sans', sans-serif;
  display: inline;
  font-size: 20px;
`
const Input = styled.input`
  text-align:center;
  box-sizing: border-box;
  width:150px;
  border-radius: 3px;
  margin-bottom: 5px;
  padding: 7px;
  background-color: #fafafa;
  border: 0.5px solid ${props=>props.invalid?"tomato":props.theme.borderColor};
  &:focus{
    border-color: ${props=>props.invalid?"tomato":"rgba(28,128,192,0.5)"};
  }
`
/*
const Form = styled.div`
  border-top: 1px solid #dedede;
  padding-top: 10px;
  margin-top: 10px;
  background-color:#efefef;
  padding: 7px;
  border-radius: 15px;
  margin-inline: 5px;
  margin-bottom: 0px;
  &:focus{
      border: 1px solid red;
    }
  input{

  }
`*/
const SearchItem = styled.div`
  border-top: 1px solid #dedede;
  padding: 5px;
  cursor: pointer;
`

function SearchAuthorResult({keyword}){
  const history = useHistory();
  const {data, loading, error, fetchMore} = useQuery(SEARCH_AUTHOR,{
    variables:{
      keyword: keyword,
      take: TAKE,
    },
  });
  if(data){
    console.log(data);
    return(
      <>
        <SearchTitle>작자</SearchTitle>
        {data.searchAuthor.map((item,index)=>{
          return(
            <SearchItem key={index} onClick={()=>{
              history.push(routes.search,{
                keyword:item.name,
                id:item.id,
                type:"author"
              })
            }}>
              {item.name}({item.totalSayings})
            </SearchItem>
          )
        })}
      </>
    )
  }
  return <></>
}

function SearchTagResult({keyword}){
  const history = useHistory();
  const {data, loading, error, fetchMore} = useQuery(SEARCH_TAG,{
    variables:{
      keyword: keyword,
      take: TAKE,
    },
  });
  if(data){
    console.log(data);
    return(
      <>
        <SearchTitle>태그</SearchTitle>
        {data.searchTag.map((item,index)=>{
          return(
            <SearchItem key={index} onClick={()=>{
              history.push(routes.search,{
                keyword:item.name,
                id:item.id,
                type:"tag",
              })
            }}>
              {item.name}({item.totalSayings})
            </SearchItem>
          )
        })}
      </>
    )
  }
  return <></>
}

const SearchTitle = styled.div`
  background-color: #dedede;
  padding: 3px;
  font-weight: 600;
  font-size: 12px;
`

const List = styled.div`
  position: absolute;
  width: 150px;
  height: 150px;
  background-color: white;
  overflow: scroll;
  overflow-x: hidden;
  border: 0.5px solid ${props=>props.theme.borderColor};
  border-radius: 5px;
  scrollbar-width: none;
`

function SearchResult({keyword,setValue}){
  return(
    <List>
      <SearchTagResult keyword={keyword}/>
      <SearchAuthorResult keyword={keyword}/>
    </List>
  )
}

function Header() {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const {
    register,
    formState,
    watch,
    handleSubmit,
    setValue,
  } = useForm({
    mode:"onChange",
    defaultValues:{
      keyword: "",
    }
  });

  const [showResult,setShowResult] = useState(true);
  // do not show search result when clicked anywhere 
  // except the input 
  const isMobile = useMediaQuery({
    query: "(max-width:762px)",
  })
  useEffect(()=>{
    document.addEventListener('click',(event)=>{
      //console.log(event.target.tagName);
      if(event.target.tagName!='INPUT'){
        setShowResult(false);
      }else{
        setShowResult(true);
      }
      setValue("keyword","");
      //console.log('clicked!');
    })
  })
  return (
    <SHeader>
      <Wrapper>
        <Column>
          {isMobile?<TitleM>인생글귀 </TitleM>:<Title>인생글귀 </Title>}
          <FontAwesomeIcon icon={faQuoteRight} style={{fontSize:24}}/>
        </Column>
        <Column>
          <form>
            <Input 
              {
              ...register('keyword')
              }
              name="keyword" type="text" placeholder="찾아보기"/>
          </form>
          {watch('keyword')!="" && showResult && <SearchResult keyword={watch('keyword')}/>}
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