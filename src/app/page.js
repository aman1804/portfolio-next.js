"use client"
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
// import styles from "./page.module.css";
// import './cover.css'


export default function Home() {
  
  return (
    <>
  <main className="px-3">
    {/* <h1>Aman Dubey</h1> */}
    {/* <p className="animated-">{texts[textIndex]}</p> */}
    <p className="lead animated-text">
        I'm a passionate <span></span> from Bhopal
    </p>
    {/* <p className="lead typing">Cover is a one-page template for building simple and beautiful home pages. Download, edit the text, and add your own fullscreen background photo to make it your own.</p> */}
    <p className="lead">
      <Link href="./uploads/my-resume.pdf" className="btn btn-lg btn-custom-green fw-bold ">Resume</Link>
    </p>
  </main>
    </>
  );
}
