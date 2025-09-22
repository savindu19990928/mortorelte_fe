import Cookies from 'js-cookie';

export default async function CartItemCount() {
    try {
        let access_token = Cookies.get('access');
        const response = await fetch("https://admin.mortorelite.com/api/cart/count/", {
            method: "GET",
            headers: { "Authorization": `Bearer ${access_token}` }
        });
        const data = await response.json();
        return data.count;
    } catch (error) {
        return 0;
    }
}