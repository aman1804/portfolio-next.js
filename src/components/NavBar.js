"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavBar = () => {
  const pathname = usePathname();
  
  // Define routes where NavBar and Footer should not be shown
  const noNavFooterRoutes = ['/login', '/admin'];

const showNavFooter = !noNavFooterRoutes.some(route => pathname.startsWith(route));

if (!showNavFooter) {
  return null;
}

  return (
    <header className="mb-auto">
      <div>
        <h3 className="float-md-start mb-0 text-capitalize">{process.env.NODE_ENV}</h3>
        <nav className="nav nav-masthead justify-content-center float-md-end">
          <Link className={`nav-link fw-bold py-1 px-0 ${pathname === "/" ? "active" : ""}`} aria-current={pathname === "/" ? "page" : undefined} href="/">Home</Link>
          <Link className={`nav-link fw-bold py-1 px-0 ${pathname === "/about" ? "active" : ""}`} href="/about">About</Link>
          {/* <Link className={`nav-link fw-bold py-1 px-0 ${pathname === "/login" ? "active" : ""}`} href="/admin">Services</Link> */}
          <Link className={`nav-link fw-bold py-1 px-0 ${pathname === "/projects" ? "active" : ""}`} href="/projects">Projects</Link>
          <Link className={`nav-link fw-bold py-1 px-0 ${pathname === "/contact" ? "active" : ""}`} href="/contact">Contact</Link>
        </nav>
      </div>
    </header>
  );
};

export default NavBar;
