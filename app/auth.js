import Cookies from 'js-cookie';

export default async function Auth() {
    let refresh_token = Cookies.get('refresh');
    let access_token = Cookies.get('access');
    let remember = Cookies.get('remember');

    if (!refresh_token) {
        return;
    } else if (!access_token) {
        access_token = "null";
    }

    try {
        const response = await fetch("https://admin.mortorelite.com/api/auth/token/verify/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                token: access_token
            }),
        });
        if (response.ok) {
            return;
        } else {
            const response2 = await fetch("https://admin.mortorelite.com/api/auth/token/refresh/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    refresh: refresh_token
                }),
            });
            if (response2.ok && remember === 'true') {
                const data = await response2.json();
                Cookies.set("refresh", data.tokens.refresh, {
                    secure: true,
                    path: "/",
                    sameSite: "Strict",
                    expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
                });
                Cookies.set("access", data.access, {
                    secure: true,
                    path: "/",
                    sameSite: "Strict",
                    expires: new Date(Date.now() + 60 * 60 * 1000), // 1 hour
                });
            } else if (response2.ok && remember === 'false') {
                const data = await response2.json();
                Cookies.set("refresh", data.tokens.refresh, {
                    secure: true,
                    path: "/",
                    sameSite: "Strict"
                });
                Cookies.set("access", data.access, {
                    secure: true,
                    path: "/",
                    sameSite: "Strict"
                });
            } else {
                window.location.href = process.env.NEXT_PUBLIC_HOMEPAGE + 'auth/login';
            }
        }
    } catch (error) {
        console.error("Network error:", error);
        alert("Something went wrong. Please try again later.");
    }
}