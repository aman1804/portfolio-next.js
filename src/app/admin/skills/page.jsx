import React from 'react'
import SkillsForm from '../components/SkillForm'
import getCookies from '../helpers/getCookie';

const page = () => {
  let user = getCookies('user');

  return (
    <div className='card-body' >
      <SkillsForm userId={user.id} />
    </div>
  )
}

export default page
