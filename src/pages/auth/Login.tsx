
import { Link } from "react-router-dom";
import SBForm from "../../components/ui/form/SBForm";
import SBInput from "../../components/ui/form/SBInput";
import type { SubmitHandler } from "react-hook-form";
import MainLayout from "../../components/layouts/MainLayout";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginValidationSchema } from "../../validation/auth.validation";


interface LoginFormInputs {
    email: string;
    password: string;
}

const Login = () => {
    const onSubmit: SubmitHandler<LoginFormInputs> = (data) => {
        console.log("Login data:", data);
        // TODO: call backend login API
    };

    return (
        <MainLayout>
            <div className="min-h-screen flex items-center justify-center bg-base-200">
                <div className="card w-full max-w-md shadow-md bg-base-100">
                    <div className="card-body">
                        <h2 className="text-2xl font-bold text-center mb-4">Login</h2>

                        <SBForm 
                        resolver={zodResolver(loginValidationSchema)}
                        onSubmit={onSubmit}
                        >
                            <SBInput
                                name="email"
                                label="Email"
                                required
                                placeholder="Enter your email"
                                type="email"
                            />
                            <SBInput
                                name="password"
                                label="Password"
                                required
                                placeholder="Enter your password"
                                type="password"
                            />

                            <button className="btn btn-primary w-full mt-2" type="submit">
                                Login
                            </button>
                        </SBForm>

                        <p className="text-sm text-center mt-4">
                            Don’t have an account?{" "}
                            <Link to="/register" className="link link-primary">
                                Register here
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
};

export default Login;
