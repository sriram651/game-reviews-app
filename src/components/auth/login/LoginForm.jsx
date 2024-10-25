"use client";

import { LOGIN_USER } from "@/graphql/mutations";
import useToast from "@/hooks/useToast";
import { useMutation } from "@apollo/client";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginForm() {
    const { push } = useRouter();
    const { showToast } = useToast();
    const [loginUser, { loading }] = useMutation(LOGIN_USER)

    async function handleLogin(e) {
        e.preventDefault();
        const email = e.target.email.value
        const password = e.target.password.value

        try {
            if (!email) {
                showToast("Email is required!", { type: "error" });
                return;
            }

            if (!password) {
                showToast("Password is required!", { type: "error" });
                return;
            }

            if (password.length < 8) {
                showToast("Password must be at least 8 characters long!", { type: "error" });
                return;
            }

            if (email && password) {
                const { data, errors } = await loginUser({
                    variables: {
                        userLogin: {
                            email,
                            password
                        }
                    }
                });

                if (data) {
                    let { token } = data.loginUser;

                    if (token) {
                        showToast("Logged in successfully!", { type: "success" });
                        localStorage.setItem('game-auth-token', token);
                        push("/");
                    }
                }
            }
        } catch (error) {
            showToast(error.message, { type: "error" });
        }
    }

    return (
        <form
            className='login-form'
            onSubmit={handleLogin}
        >
            <div className='form-group'>
                <label htmlFor='email'>
                    Email
                </label>
                <input
                    type='email'
                    name='email'
                    id='email'
                    autoComplete='email'
                    required
                    disabled={loading}
                />
            </div>
            <div className='form-group'>
                <label htmlFor='password'>
                    Password
                </label>
                <input
                    type='password'
                    name='password'
                    id='password'
                    autoComplete='current-password'
                    required
                    disabled={loading}
                />
            </div>
            <div className='login-btn-container'>
                <button
                    type='submit'
                    disabled={loading}
                >
                    Login
                </button>
            </div>
            <div className="signup-link-container">
                Don&apos;t have an account?
                <Link
                    href={`/auth/signup`}
                    referrerPolicy="no-referrer"
                >
                    {" "} Signup now.
                </Link>
            </div>
        </form>
    )
}
