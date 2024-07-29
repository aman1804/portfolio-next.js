import React from 'react'
import { getData } from '../../../../lib/apiServices';


export const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('default', { month: 'short', year: 'numeric' });
  };
const Experiences = async() => {
    const data = await getData('/api/experiences');
  const experiences = data.experiences;
  return (
    <>
      <div>
              <span className="section-title text-primary mb-3 mb-sm-4">
                Experiences
              </span>

                    <ul className="list-unstyled timeline-sm">
                    {experiences.length > 0 ? (
                        experiences.map((exp) => (
                        <li className="timeline-sm-item" key={exp.id}>
                            <span className="timeline-sm-date text-wrap text-center">{formatDate(exp.start_date)} <br/> - <br/> {formatDate(exp.end_date)}</span>
                            <h5 className="mt-0 mb-1">{exp.position}</h5>
                            <p>{exp.company_name}</p>
                            <p className="text-white-50 mt-2">{exp.responsibilities}</p>

                        </li>
                        ))
                    ) : (
                      <li>No Experiences Found</li>
                    )}
                       
                    </ul>
            </div>
    </>
  )
}

export default Experiences
