import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import AuthLayout from "../components/auth/AuthLayout";
import BottomBox from "../components/auth/BottomBox";
import Button from "../components/auth/Button";
import FormBox from "../components/auth/FormBox";
import FormError from "../components/auth/FormError";
import Input from "../components/auth/Input";
import routes from "../routes";

const CREATE_ACCOUNT_MUTATION = gql`
  mutation createAccount(
    $name:String!,
    $email:String!,
    $password:String!
  ){
    createAccount(
      name:$name,
      email:$email,
      password:$password,
    ){
      ok
      error 
    }
  }
`

function SignUp(){
  const history = useHistory();
  const [createAccount, {loading}] = useMutation(CREATE_ACCOUNT_MUTATION,{
    onCompleted:(data)=>{
      const {createAccount:{ok}} = data;
      const {email,password} = getValues();
      if(ok){
        history.push(routes.home,{
          message:"계정 생성 완료! 로그인해주세요.",
          email,
          password,
        })
      }
    }
  });
  
  const {
    register,
    formState,
    watch,
    handleSubmit,
    getValues,
  } = useForm({
    mode:"onChange",
  });

  const onValid = (data)=>{
    console.log(data);
    if(loading) return;
    createAccount({
      variables:{
        ...data,
      }
    })
  }
  return(
    <AuthLayout>
      <FormBox>
        <form onSubmit={handleSubmit(onValid)}>
          <Input
            {
              ...register('name',{
                required:"이름을 입력하세요",
                minLength:{
                  value: 3,
                  message: "이름은 3자 이상입니다.",
                }
              })
            }
            name="name"
            type="text"
            placeholder="이름"
          />
          <FormError message={formState.errors?.name?.message}/>
          <Input 
            {
              ...register('email',{
                required:"이메일을 입력하세요",
                pattern: {
                  value: emailRegex,
                  message: "이메일 형식을 확인하세요",
                }
              })
            }
            name="email"
            type="text"
            placeholder="이메일"
          />
          <FormError message={formState.errors?.email?.message}/>
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
          <FormError message={formState.errors?.password?.message}/>
          <Button type="submit" value="가입하기" disabled={!formState.isValid || !Object.keys(watch()).length}/>
        </form>
      </FormBox>
      <BottomBox cta="계정이 있으신가요?" link={routes.home} linkText="로그인"/>
    </AuthLayout>
  )
}
export default SignUp;

const emailRegex = new RegExp(/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/);