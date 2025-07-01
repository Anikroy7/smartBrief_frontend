
import { Link, useNavigate } from "react-router-dom";
import SBForm from "../../components/ui/form/SBForm";
import SBInput from "../../components/ui/form/SBInput";
import type { SubmitHandler } from "react-hook-form";
import MainLayout from "../../components/layouts/MainLayout";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginValidationSchema } from "../../validation/auth.validation";
import type { TError } from "../../types";
import { useLoginUserMutation } from "../../redux/api/authApi";
import toast from "react-hot-toast";
import { useEffect } from "react";


interface LoginFormInputs {
    email: string;
    password: string;
}

const Login = () => {
    const navigate = useNavigate();
    const [loginUser, { data, isError, error, isLoading }] =
        useLoginUserMutation<{
            error: TError | undefined;
            isSuccess: boolean | undefined;
            isError: boolean | undefined;
            isLoading: boolean | undefined;
            data: {
                token: string;
                _id: string;
                role: string;
                email: string
            }
        }>();

    useEffect(() => {
        if (error) {
            console.log(error)
            if (error?.data?.errorSources) {
                error?.data?.errorSources?.map((e) => toast.error(e.message));
            } else {
                toast.error('Something went wrong');
            }

        }
        if (data) {
            console.log("Login data:", data);
            const userInfo = {
                email: data.email,
                role: data.role,
                token: data.token,
                userId: data._id
            };
            localStorage.setItem("userInfo", JSON.stringify(userInfo));

            navigate("/");
        }
    }, [isError, data]);

    const onSubmit: SubmitHandler<LoginFormInputs> = (data) => {
        loginUser({ ...data });
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

                            {
                                !isLoading ? <button
                                    type="submit"
                                    className={`btn btn-primary w-full mt-2`}
                                >
                                    Register
                                </button>
                                    : <button className="btn w-full mt-2">
                                        <span className="loading loading-spinner"></span>
                                        Logging...
                                    </button>}
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
