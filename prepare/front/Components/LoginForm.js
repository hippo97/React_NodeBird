import React, { useCallback, useEffect } from 'react';
import { Form, Input, Button } from 'antd';
import Link from 'next/link';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { loginRequestAction } from '../reducers/user';
import useInput from '../hooks/useInput';

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

const LoginForm = () => {
  const dispatch = useDispatch();

  const { logInLoading, logInError } = useSelector(
    (state) => state.user
  );

  const [email, onChangeEmail] = useInput('');
  const [password, onChangePassword] = useInput('');

  useEffect(() => {
    if (logInError) {
      alert(logInError);
    }
  }, [logInError]);

  const onSubmitForm = useCallback(() => {
    console.log(email, password);
    dispatch(loginRequestAction({ email, password }));
  }, [email, password]);

  return (
    <Container>
      <FormWrapper onFinish={onSubmitForm}>
        <InputWrapper>
          <Input
            name="user-email"
            value={email}
            placeholder="Email"
            type="email"
            onChange={onChangeEmail}
            bordered={false}
            required
          />
        </InputWrapper>
        <InputWrapper>
          <Input
            name="user-password"
            type="password"
            value={password}
            placeholder="Password"
            onChange={onChangePassword}
            bordered={false}
            required
          />
        </InputWrapper>
        <ButtonWrapper>
          <SButton loading={logInLoading}>로그인</SButton>
          <Link href="/signup">
            <a>
              <SButton>회원가입</SButton>
            </a>
          </Link>
        </ButtonWrapper>
      </FormWrapper>
    </Container>
  );
};

export default LoginForm;
