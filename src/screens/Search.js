import { useQuery } from "@apollo/client";
import { useEffect } from "react";
import { useLocation } from "react-router";
import styled from "styled-components";
import Saying from "../components/Saying";
import { SEE_TAG_SAYING, SEE_AUTHOR_SAYING } from "../queries";
const TAKE = 5;

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

function SayingsByAuthor({id}){
  const {data,fetchMore} = useQuery(SEE_AUTHOR_SAYING,{
    variables:{
      id: id,
      take: TAKE
    }
  });
  const handleScrollToBottom = (id,take,lastId) => {
    fetchMore({
      variables:{
        id: id,
        take: take,
        lastId: lastId,
      }
    });
  }
  if(data){
    let len = data.seeAuthorSaying.length;
    if(!len) return <></>
    let lastId = data.seeAuthorSaying[len-1].id;
    window.onscroll = (event) =>{
      if(window.innerHeight+window.pageYOffset >= document.body.offsetHeight){
        handleScrollToBottom(id,TAKE,lastId);
      }
    }
    return(
      <>
        {
          data.seeAuthorSaying.map((item)=>{
            return(
              <Saying key={item.id} {...item}/>
            )
          })
        }
      </>
    )
  }
  return <></>
}

function SayingsByTag({id}){
  const {data,loading,error,refetch,fetchMore} = useQuery(SEE_TAG_SAYING,{
    variables:{
      id: id,
      take: TAKE
    }
  });
  const handleScrollToBottom = (id,take,lastId) => {
    fetchMore({
      variables:{
        id: id,
        take: take,
        lastId: lastId,
      }
    });
  }
  if(data){
    console.log(data);
    let len = data.seeTagSaying.length;
    if(!len) return <></>
    let lastId = data.seeTagSaying[len-1].id;
    window.onscroll = (event) =>{
      if(window.innerHeight+window.pageYOffset >= document.body.offsetHeight){
        handleScrollToBottom(id,TAKE,lastId);
      }
    }
    return(
      <>
        {
          data.seeTagSaying.map((item,index)=>{
            return(
              <Saying key={item.id} {...item}/>
            );
          })
        }
      </>
    )
  }
  return <></>
}


function Search(){
  const location = useLocation();
  
  if(location?.state?.type=="tag"){
    return(
      <Container>
        <SayingsByTag id={location.state.id}/>
      </Container>
    )
  }
  else if(location?.state?.type=="author"){
    //
    return(
      <Container>
        <SayingsByAuthor id={location.state.id}/>
      </Container>
    )
  }
  return(
    <Container>
      <div>Search:{location?.state?.id} {location?.state?.keyword}</div>
    </Container>
  )
}
export default Search;