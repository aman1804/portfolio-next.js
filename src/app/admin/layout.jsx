// app/admin/layout.js

import Header from "./components/Header";


export const metadata = {
  title: "Admin Layout",
  description: "Admin dashboard layout for the application",
};

export default function AdminLayout({ children }) {
  return (
    // <html lang="en">
    //   <body className={`${inter.className} bg-black`}>
        <div className="container text-start ">
          <div className="card mb-3 bg-black text-white-50">
            <Header />
            {children}
          </div>
        </div>
    //   </body>
    // </html>
  );
}
