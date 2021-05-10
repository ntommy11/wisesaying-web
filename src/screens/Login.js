import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router";
import styled from "styled-components";
import { logUserIn } from "../apollo";
import AuthLayout from "../components/auth/AuthLayout";
import BottomBox from "../components/auth/BottomBox";
import Button from "../components/auth/Button";
import FormBox from "../components/auth/FormBox";
import Input from "../components/auth/Input";
import routes from "../routes";

const LOGIN_MUTATION = gql`
  mutation login($email:String!, $password: String!){
    login(email:$email, password:$password){
      ok
      token
      error 
    }
  }
`

const Notification = styled.div`
  color:#2ecc71;
`


function Login(){
  const location = useLocation();
  console.log(location);
  // hook form 
  const {
    register,
    watch,
    handleSubmit,
    formState,
    getValues,
  } = useForm({
    mode: "onChange",
    defaultValues:{
      email: location?.state?.email || "",
      password: location?.state?.password || "",
    }
  });
  const onValid = (data)=>{
    if(loading) return; // if mutation not ready
    const {email, password} = getValues();
    login({
      variables:{
        email,
        password, 
      }
    }) 
  }
  // login mutation 
  const [login,{loading}] = useMutation(LOGIN_MUTATION,{
    onCompleted:(data)=>{
      const {login:{ok,error,token}} = data;
      if(!ok){
        alert(error);
      }
      else{
        console.log("token:",token);
        logUserIn(token);
      }
    }
  });
  
  return(
    <AuthLayout>
      <FormBox>
        <Notification>
          {location?.state?.message}
        </Notification>
        <form onSubmit={handleSubmit(onValid)}>
          <Input 
            {
              ...register('email',{
                required: "이메일을 입력하세요",
              })
            }
            name="email"
            type="text"
            placeholder="이메일"
          />
          <Input
            {
              ...register('password',{
                required:"비밀번호를 입력하세요",
                
              })
            }
            name="password"
            type="password"
            placeholder="비밀번호"
          />
          <Button 
            type="submit"
            value="로그인" 
            disabled={!formState.isValid || !Object.keys(watch()).length}
          />
        </form>
      </FormBox>
      <BottomBox cta="계정이 없으신가요?" link={routes.signUp} linkText="회원가입"/>
    </AuthLayout>
  )
}
export default Login;