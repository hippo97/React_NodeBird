import React, { useCallback, useEffect } from 'react';
import { Form, Button } from 'antd';
import Link from 'next/link';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';

import img from '../assets/images/dochi.jpg';
import { loginRequestAction } from '../reducers/user';
import useInput from '../hooks/useInput';
import { useRouter } from 'next/router';

const ButtonWrapper = styled.div``;

const SButton = styled(Button)`
  width: 100%;
  border-radius: 30px;
  text-align: center;
  background: #04aaff;
  color: white;
  margin-top: 10px;
  cursor: pointer;
`;

const FormWrapper = styled(Form)`
  padding: 10px;
  width: 100%;
  max-width: 320px;
  display: flex;
  flex-direction: column;
`;

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: black;
`;

const InputWrapper = styled.div`
  max-width: 320px;
  width: 100%;
  padding: 10px;
  border-radius: 30px;
  background-color: rgba(255, 255, 255, 1);
  margin-bottom: 10px;
  font-size: 12px;
  color: black;
`;

const Image = styled.div`
  background-image: url(${img});
  width: 100%;
  max-width: 320px;
  height: 320px;
  background-size: cover;
  border-radius: 50%;
  background-position: center center;
  margin-bottom: 20px;
`;

const SInput = styled.input`
  border: none;
  outline: none;
  padding: 0px 30px;
  font-size: 20px;
`;

const LoginForm = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { logInLoading, logInError, logInDone } =
    useSelector((state) => state.user);

  const [email, onChangeEmail] = useInput('');
  const [password, onChangePassword] = useInput('');

  useEffect(() => {
    if (logInError) {
      alert(logInError);
    }
    if (logInDone) {
      router.push('/');
    }
  }, [logInError, logInDone]);

  const onSubmitForm = useCallback(() => {
    console.log(email, password);
    dispatch(loginRequestAction({ email, password }));
  }, [email, password]);

  return (
    <Container>
      <Image />
      <FormWrapper onFinish={onSubmitForm}>
        <InputWrapper>
          <SInput
            value={email}
            placeholder="Email"
            type="text"
            onChange={onChangeEmail}
            required
          />
        </InputWrapper>
        <InputWrapper>
          <SInput
            type="password"
            value={password}
            placeholder="Password"
            onChange={onChangePassword}
            required
          />
        </InputWrapper>
        <ButtonWrapper>
          <SButton htmlType="submit" loading={logInLoading}>
            ?????????
          </SButton>
          <Link href="/signup">
            <a>
              <SButton>????????????</SButton>
            </a>
          </Link>
        </ButtonWrapper>
      </FormWrapper>
    </Container>
  );
};

export default LoginForm;
