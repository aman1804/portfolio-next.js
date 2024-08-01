// app/admin/layout.js
import { redirect } from "next/navigation";
import Header from "./components/Header";
import getCookies from "./helpers/getCookie";


export const metadata = {
  title: "Admin Layout",
  description: "Admin dashboard layout for the application",
};

export default async function AdminLayout({ children }) {

  let user = await getCookies('user');

  if (!user) {
    redirect('/login'); // Redirect to the dashboard if the user is authenticated
  }
  return (
        <div className="container text-start ">
          <div className="card mb-3 bg-black text-white-50">
            <Header />
            {children}
          </div>
        </div>

  );
}
