import React from 'react'
import ExperienceForm from '../components/ExperienceForm'
import getCookies from '../helpers/getCookie';

const page = () => {
  let user = getCookies('user');
  return (
    <div className='card-body' >
      <ExperienceForm userId={user.id} />
    </div>
  )
}

export default page
