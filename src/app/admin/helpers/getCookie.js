import { cookies } from "next/headers";

export default function getCookies(value) {
    const cookieStore = cookies();
    const Cookie = cookieStore.get(value);

    if (Cookie) {
        try {
        return JSON.parse(Cookie.value);
        } catch (error) {
        console.error('Failed to parse user cookie:', error);
        throw error;
        }
    }
};
