"use client";

import { LOGIN_USER } from "@/graphql/mutations";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/navigation";

export default function LoginForm() {
    const { push } = useRouter();
    const [loginUser, { loading }] = useMutation(LOGIN_USER)

    async function handleLogin(e) {
        e.preventDefault();
        const email = e.target.email.value
        const password = e.target.password.value

        try {
            if (email && password) {
                const { data, errors } = await loginUser({
                    variables: {
                        userLogin: {
                            email,
                            password
                        }
                    }
                });
                console.log(errors);

                if (data) {
                    let { token } = data.loginUser;

                    if (token) {
                        localStorage.setItem('game-auth-token', token);
                        push("/");
                    }
                }
            }
        } catch (error) {
            console.error(error);
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
        </form>
    )
}
