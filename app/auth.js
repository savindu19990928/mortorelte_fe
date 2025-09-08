import Cookies from 'js-cookie';

export default async function Auth() {
    let refresh_token = Cookies.get('refresh');
    let access_token = Cookies.get('access');
    let remember = Cookies.get('remember');

    if (!refresh_token) {
        return false;
    }

    try {
        let valid = false;

        if (access_token) {
            // Verify access token
            const response = await fetch("https://admin.mortorelite.com/api/auth/token/verify/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ token: access_token }),
            });

            if (response.ok) {
                valid = true;
            }
        }

        if (valid) {
            return true;
        } else {
            const response2 = await fetch("https://admin.mortorelite.com/api/auth/token/refresh/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ refresh: refresh_token }),
            });

            if (response2.ok) {
                const data = await response2.json();
                if (remember === 'true') {
                    Cookies.set("refresh", data.refresh, {
                        secure: true,
                        path: "/",
                        sameSite: "Strict",
                        expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
                    });
                    Cookies.set("access", data.access, {
                        secure: true,
                        path: "/",
                        sameSite: "Strict",
                        expires: new Date(Date.now() + 60 * 60 * 1000),
                    });
                } else {
                    Cookies.set("refresh", data.refresh, {
                        secure: true,
                        path: "/",
                        sameSite: "Strict",
                    });
                    Cookies.set("access", data.access, {
                        secure: true,
                        path: "/",
                        sameSite: "Strict",
                    });
                }
                return true;
            } else {
                if (window.location.pathname !== "/auth/login" && window.location.pathname !== "/auth/register") {
                    window.location.href = process.env.NEXT_PUBLIC_HOMEPAGE + "auth/login";
                }
                return false;
            }
        }
    } catch (error) {
        return false;
    }
}