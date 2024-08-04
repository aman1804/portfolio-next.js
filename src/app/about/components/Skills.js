import React from "react";
import { getData } from "../../../../lib/apiServices";

const Skills = async () => {
  const data = await getData("/api/skills");
  const skills = data.skills;
  return (
    <>
      <div className="mb-4 mb-sm-5">
        <span className="section-title text-primary mb-3 mb-sm-4">Skill</span>
        <div className="row">
          {skills.length > 0 ? (
            skills.map((skill) => (
              <div className="col-md-6" key={skill.id}>
                <div className="progress-text">
                  <div className="row">
                    <div className="col-6">{skill.skill_name}</div>
                    <div className="col-6 text-end">
                      {skill.proficiency_level}%
                    </div>
                  </div>
                </div>
                <div
                  className="custom-progress progress progress-medium mb-3"
                  style={{ height: 4 }}
                >
                  <div
                    className="animated custom-bar progress-bar slideInLeft bg-secondary"
                    style={{ width: `${skill.proficiency_level}%` }}
                    aria-valuemax={100}
                    aria-valuemin={0}
                    aria-valuenow={10}
                    role="progressbar"
                  />
                </div>
              </div>
            ))
          ) : (
            <h1>No Skills Found</h1>
          )}
        </div>
      </div>
    </>
  );
};

export default Skills;
