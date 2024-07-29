import React from "react";
import "./styles.css";
import PersonalInfo from "./components/PersonalInfo";
import Skills from "./components/Skills";
import Education from "./components/Education";
import Experiences from "./components/Experiences";
const page = () => {
  return (
    <div className="row text-start">
      <PersonalInfo/>
      <div className="col-lg-12">
        <div className="row">
          <div className="col-lg-12 mb-4 mb-sm-5">
            <Skills/>
            
            <Education/>

            <Experiences/>

            
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
