import React from 'react'
import ProjectsForm from '../components/ProjectsForm'
import getCookies from '../helpers/getCookie';

const page = () => {
  let user = getCookies('user');
  return (
    <div className='card-body' >
      <ProjectsForm userId={user.id} />
    </div>
  )
}

export default page
