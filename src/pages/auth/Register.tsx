"use client";

import { Link } from "react-router-dom";
import SBInput from "../../components/ui/form/SBInput";
import SBForm from "../../components/ui/form/SBForm";
import type { SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupValidationSchema } from "../../validation/auth.validation";
import MainLayout from "../../components/layouts/MainLayout";


interface RegisterFormInputs {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const Register = () => {


  
  const onSubmit: SubmitHandler<RegisterFormInputs> = (data) => {
    console.log("Register data:", data);

    if (data.password !== data.confirmPassword) {
      // TODO: toast or error message
      console.error("Passwords do not match");
      return;
    }

    // TODO: send API request to register endpoint
  };

  return (
    <MainLayout>
      <div className="min-h-screen flex items-center justify-center bg-base-200">
        <div className="card w-full max-w-md shadow-md bg-base-100">
          <div className="card-body">
            <h2 className="text-2xl font-bold text-center mb-4">Register</h2>

            <SBForm
              resolver={zodResolver(signupValidationSchema)}
              onSubmit={onSubmit}
            >
              <SBInput
                name="name"
                label="Full Name"
                placeholder="Enter your full name"
                required
              />
              <SBInput
                name="email"
                label="Email"
                type="email"
                placeholder="Enter your email"
                required
              />
              <SBInput
                name="password"
                label="Password"
                type="password"
                placeholder="Create a password"
                required
              />
              <SBInput
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                placeholder="Re-type your password"
                required
              />

              <button className="btn btn-primary w-full mt-2" type="submit">
                Register
              </button>
            </SBForm>

            <p className="text-sm text-center mt-4">
              Already have an account?{" "}
              <Link to="/login" className="link link-primary">
                Login here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Register;
