"use client";

import { protectedRoutes } from "@/utils/routes";
import { usePathname, useRouter } from "next/navigation";

export default function AuthLayout({ children }) {
    const { push } = useRouter();
    const pathname = usePathname();

    let isAuthRoute = pathname.includes("/auth");
    let isProtectedRoute = protectedRoutes.includes(pathname);

    if (typeof window !== "undefined") {

        if (isProtectedRoute) {
            let token = localStorage.getItem("game-auth-token");
            if (!token) {
                push("/auth/login");
            }
        }

        if (isAuthRoute) {
            let token = localStorage.getItem("game-auth-token");
            if (token) {
                push("/");
            }
        }
    }

    return (
        <>
            {children}
        </>
    )
}
