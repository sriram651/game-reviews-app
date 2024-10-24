"use client";

import { SIGNUP_USER } from "@/graphql/mutations";
import { useMutation } from "@apollo/client";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SignupForm() {
    const { push } = useRouter();
    const [signupUser, { loading }] = useMutation(SIGNUP_USER)

    async function handleSignup(e) {
        e.preventDefault();
        const email = e.target.email.value;
        const userName = e.target.userName.value;
        const password = e.target.password.value;
        const confirmPassword = e.target.confirmPassword.value;

        let isPasswordMatch = password === confirmPassword;
        let isPasswordValid = password.length >= 8;
        let isUserNameValid = userName.length >= 3;
        let isFormValid = isPasswordMatch && isPasswordValid && isUserNameValid;

        try {
            if (isFormValid) {
                const { data, errors } = await signupUser({
                    variables: {
                        newUser: {
                            email,
                            userName,
                            password,
                            role: "USER"
                        }
                    }
                });
                console.log(errors);

                if (data) {
                    let { token } = data.registerNewUser;

                    if (token) {
                        localStorage.setItem('game-auth-token', token);
                        push("/");
                    }
                }
            } else {
                console.log('Invalid form data');
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <form
            className='signup-form'
            onSubmit={handleSignup}
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
                <label htmlFor='userName'>
                    Username
                </label>
                <input
                    type='userName'
                    name='userName'
                    id='userName'
                    autoComplete='userName'
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
            <div className='form-group'>
                <label htmlFor='confirmPassword'>
                    Confirm Password
                </label>
                <input
                    type='password'
                    name='confirmPassword'
                    id='confirmPassword'
                    autoComplete='current-password'
                    required
                    disabled={loading}
                />
            </div>
            <div className='signup-btn-container'>
                <button
                    type='submit'
                    disabled={loading}
                >
                    Signup
                </button>
            </div>
            <div className="login-link-container">
                Already have an account?
                <Link
                    href={`/auth/login`}
                    referrerPolicy="no-referrer"
                >
                    {" "}Login here.
                </Link>
            </div>
        </form>
    )
}
