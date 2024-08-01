import React from 'react'
import PersonalInfoForm from './components/PersonalInfoForm'
import getCookies from './helpers/getCookie';

const Admin = () => {
  let user = getCookies('user');
  // console.log(user)
  return (
    <div className='card-body' >
        <PersonalInfoForm userId={user.id}/>
    </div>
  )
}

export default Admin
