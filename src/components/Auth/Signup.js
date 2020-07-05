import React from "react";
import styled from "@emotion/styled";
import { Button, Form } from "semantic-ui-react";
import { useForm } from "react-hook-form";
import { Container } from "../../styled/Layout/Layout";
import { Link } from "react-router-dom";
import { FormFieldError } from "../../styled/Alerts";
import { css } from "@emotion/core";

const Signup = () => {
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = (data) => console.log("data", data);

  return (
    <Container>
      <Header>Sign up</Header>
      <Form
        onSubmit={handleSubmit(onSubmit)}
        css={css`
          width: 300px;
        `}
      >
        <Form.Field error={!!errors.email}>
          <label>Email*</label>
          <input
            placeholder="Email"
            name="email"
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
        <Button type="submit">Submit</Button>
      </Form>
    </Container>
  );
};

const Header = styled.h1``;

export default Signup;
