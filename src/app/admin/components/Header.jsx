"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { postData } from "../../../../lib/apiServices";

const Header = () => {
  const pathname = usePathname();
  const router = useRouter();
      
  const logout = async() => {
    const response = await postData('/api/logout/');
    if (response) {
      console.log(response.message); // Handle successful logout
      router.push('/login');
    } else {
      console.error('Logout failed'); // Handle errors
    }
  };
  
  return (
    <>
      <div className="card-header ">
        <ul className="nav nav-underline d-flex flex-column flex-sm-row nav-fill">
          <li className="nav-item ">
            <Link
              className={`nav-link fw-bold py-1 px-0  ${
                pathname === "/admin" ? "active text-white" : "text-white-50"
              }`}
              aria-current={pathname === "/admin" ? "page" : undefined}
              href="/admin"
            >
              Personal
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className={`nav-link fw-bold py-1 px-0 ${
                pathname === "/admin/skills" ? "active text-white" : "text-white-50"
              }`}
              aria-current={pathname === "/admin/skills" ? "page" : undefined}
              href="/admin/skills"
            >
              Skills
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className={`nav-link fw-bold py-1 px-0 ${
                pathname === "/admin/education" ? "active text-white" : "text-white-50"
              }`}
              aria-current={
                pathname === "/admin/education" ? "page" : undefined
              }
              href="/admin/education"
            >
              Education
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className={`nav-link fw-bold py-1 px-0  ${
                pathname === "/admin/experiences" ? "active text-white" : "text-white-50"
              }`}
              aria-current={
                pathname === "/admin/experiences" ? "page" : undefined
              }
              href="/admin/experiences"
            >
              Experiences
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className={`nav-link fw-bold py-1 px-0 ${
                pathname === "/admin/projects" ? "active text-white" : "text-white-50"
              }`}
              aria-current={pathname === "/admin/projects" ? "page" : undefined}
              href="/admin/projects"
            >
              Projects
            </Link>
          </li>

          <li className="nav-item">
            <Link
              className={`nav-link fw-bold py-1 px-0 ${
                pathname === "/admin/resume" ? "active text-white" : "text-white-50"
              }`}
              aria-current={pathname === "/admin/resume" ? "page" : undefined}
              href="/admin/resume"
            >
              Resume
            </Link>
          </li>

          <li className="nav-item">
            <button
              className={`nav-link fw-bold py-1 px-0 ${
                pathname === "/" ? "active text-white" : "text-white-50"
              }`}
              aria-current={pathname === "/" ? "page" : undefined} 
               onClick={logout}
            >
              Log Out
            </button>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Header;
