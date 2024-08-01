import React from 'react'
import EducationForm from '../components/EducationForm'
import getCookies from '../helpers/getCookie';

const page = () => {
  let user = getCookies('user');
  return (
    <div className='card-body'>
      <EducationForm userId={user.id}/>
    </div>
  )
}

export default page
