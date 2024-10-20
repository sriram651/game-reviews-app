import LoginForm from "@/components/auth/login/LoginForm";
import Image from "next/image";

export default function LoginPage() {
    return (
        <div className='login-page'>
            <div className="bg-cover-container">
                <Image 
                    src='/images/game-consoles.webp'
                    alt='login background'
                    width={1920}
                    height={1076}
                />
            </div>
            <div className='login-form-container'>
                <h1>Login</h1>
                <LoginForm />
            </div>
        </div>
    )
}
