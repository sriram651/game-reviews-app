import SignupForm from "@/components/auth/signup/SignupForm";
import Image from "next/image";

export default function SignupPage() {
    return (
        <div className='signup-page'>
            <div className="bg-cover-container">
                <Image
                    src='/images/game-consoles.webp'
                    alt='signup background'
                    width={1920}
                    height={1076}
                />
            </div>
            <div className='signup-form-container'>
                <h1>Signup</h1>
                <SignupForm />
            </div>
        </div>
    )
}
