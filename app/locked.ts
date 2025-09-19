import Auth from './auth';
import Cookies from 'js-cookie';

export default async function Locked() {
    try {
        const auth = await Auth();
        let access_token = Cookies.get('access');
        if (auth) {
            const response = await fetch("https://admin.mortorelite.com/api/auth/profile/", {
                method: "GET",
                headers: { "Content-Type": "application/json", "Authorization": `Bearer ${access_token}` }
            });
            const data = await response.json();
            return data;
        } else {
            if (window.location.pathname !== "/auth/login" && window.location.pathname !== "/auth/register") {
                window.location.href = process.env.NEXT_PUBLIC_HOMEPAGE + "auth/login";
            }
            return null;
        }
    } catch (error) {
        return null;
    }
}