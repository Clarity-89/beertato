import React from "react";
import { Link, Redirect } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation } from "@apollo/react-hooks";
import { useAsyncFn } from "react-use";
import gql from "graphql-tag";
import { css } from "@emotion/core";
import { Button, Form, Message } from "semantic-ui-react";
import { Container } from "../../styled/Layout/Layout";
import { FormFieldError } from "../../styled/Alerts";

const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    signup(email: $email, password: $password)
  }
`;

const Login = () => {
  const { register, handleSubmit, errors } = useForm();
  const login = useMutation(LOGIN)[0];

  const [{ error, value, loading }, submit] = useAsyncFn(async (d) => {
    const { email, password } = d;
    const resp = await login({ variables: { email, password } });
    const { data } = resp;

    localStorage.setItem("token", data.login);
    return true;
  });

  if (value) {
    return <Redirect to="/" />;
  }
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
        onSubmit={handleSubmit(login)}
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
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default Login;
