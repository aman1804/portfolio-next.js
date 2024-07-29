import React from 'react'
import { getData } from '../../../../lib/apiServices';
import { formatDate } from './Experiences';

const Education = async() => {
  const data = await getData('/api/education');
  const educations = data.educations;
  console.log(educations)
  return (
    <>
      <div className='text-white-50'>
              <span className="section-title text-primary mb-3 mb-sm-4">
                Education
              </span>
              {educations.length > 0 ? (
                        educations.map((edu) => (
              <div className="row mb-3" key={edu.id}>
                  <div className="col-6">
                    <span className='fs-6 fw-bold text-white'>
                      {edu.degree}
                    </span>
                    <span>{edu.field_of_study?`(${edu.field_of_study})`:''}</span>
                    <br />
                    <span>{edu.institution}</span>
                  </div>
                  <div className="col-6 text-end">{formatDate(edu.start_date)} - {formatDate(edu.end_date)}</div>
              </div>
            ))
                    ) : (
                      <div>No educations Found</div>
                    )}
              
            </div>
    </>
  )
}

export default Education
