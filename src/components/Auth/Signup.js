import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAsyncFn } from "react-use";
import styled from "@emotion/styled";
import { Button, Form, Message } from "semantic-ui-react";
import { css } from "@emotion/core";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { Container } from "../../styled/Layout/Layout";
import { FormFieldError } from "../../styled/Alerts";
import { useAuth } from "../../context";
import { auth } from "../../services/auth/auth";

const SIGNUP = gql`
  mutation signup($username: String, $email: String!, $password: String!) {
    signup(username: $username, email: $email, password: $password) {
      id
      token
      username
      email
    }
  }
`;

const Signup = ({ history }) => {
  const { register, handleSubmit, errors } = useForm();
  const signup = useMutation(SIGNUP)[0];
  const { refetch } = useAuth();

  const [{ error, loading }, submit] = useAsyncFn(async (d) => {
    const { username, email, password } = d;
    const resp = await signup({ variables: { username, email, password } });
    const { signup: data } = resp.data;
    auth.signup(data.token, () => {
      refetch();
      history.push("/");
    });
    return true;
  });

  return (
    <Container>
      <Header>Sign up</Header>

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
            name="password"
            type="password"
            minLength={6}
            ref={register({ required: "Password is required" })}
          />
        </Form.Field>
        <Form.Field>
          <label>Username</label>
          <input placeholder="Username" name="username" ref={register} />
        </Form.Field>
        <Form.Field>
          <p>
            Have an account? <Link to="/login"> Login here.</Link>
          </p>
        </Form.Field>
        <Button type="submit" disabled={loading}>
          Submit
        </Button>
      </Form>
    </Container>
  );
};

const Header = styled.h1``;

export default Signup;
