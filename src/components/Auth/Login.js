import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation } from "@apollo/react-hooks";
import { useAsyncFn } from "react-use";
import gql from "graphql-tag";
import { css } from "@emotion/core";
import { Button, Form, Message } from "semantic-ui-react";
import { Container } from "../../styled/Layout/Layout";
import { FormFieldError } from "../../styled/Alerts";
import { useAuth } from "../../context";
import { auth } from "../../services/auth/auth";

const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      id
      username
      token
      email
    }
  }
`;

const Login = ({ history }) => {
  const { register, handleSubmit, errors } = useForm();
  const login = useMutation(LOGIN)[0];
  const { refetch } = useAuth();
  const [{ error, loading }, submit] = useAsyncFn(async (d) => {
    const { email, password } = d;
    const resp = await login({ variables: { email, password } });
    const { login: data } = resp.data;
    auth.login(data.token, () => {
      refetch();
      history.push("/dashboard/profile");
    });
    return true;
  });

  return (
    <Container>
      <h2>Login</h2>

      {error && (
        <Message negative>
          <Message.Header>Signup error</Message.Header>
          <p>{error.message}</p>
        </Message>
      )}
      <Form
        onSubmit={handleSubmit(submit)}
        css={css`
          width: 300px;
        `}
      >
        <Form.Field error={!!errors.email}>
          <label>Email*</label>
          <input
            placeholder="Email"
            name="email"
            type="email"
            ref={register({ required: "Email is required" })}
          />
          {errors.email && (
            <FormFieldError>{errors.email.message}</FormFieldError>
          )}
        </Form.Field>
        <Form.Field error={!!errors.password}>
          <label>Password*</label>
          <input
            placeholder="Password"
            autoComplete="new-password"
            name="password"
            type="password"
            minLength={6}
            ref={register({ required: "Password is required" })}
          />
        </Form.Field>
        <Form.Field>
          <p>
            Don't have an account? <Link to="/signup">Singup here.</Link>
          </p>
        </Form.Field>
        <Button type="submit" disabled={loading}>
          Login
        </Button>
      </Form>
    </Container>
  );
};

export default Login;
