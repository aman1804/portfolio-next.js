// app/admin/not-found.js
import Link from 'next/link';
import 'bootstrap/dist/css/bootstrap.min.css';

// import Link from 'next/link';

const NotFoundPage = () => (
  <div className="container text-center mt-5 text-white-50">
    <h1 className="display-4 text-white">404 - Admin Page Not Found</h1>
    <p className="lead">Sorry, we couldn&apos;t find the admin page you&apos;re looking for.</p>
    <Link href="/" className="btn btn-primary mt-3">
      Go Back to Admin Dashboard
    </Link>
  </div>
);

export default NotFoundPage;

