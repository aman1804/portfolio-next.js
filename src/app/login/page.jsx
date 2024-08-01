// 'use client'
import React from 'react'
import LoginForm from './components/LoginForm'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'


const Login = async() => {
    // const data = await getData()
    // console.log('thamboo',data)
    const cookieStore = cookies();
    const user = cookieStore.get('user');

    // Redirect if the user is authenticated
    if (user) {
      redirect('/admin'); // Redirect to the dashboard if the user is authenticated
    }
    // console.log(cookies())
  return (
    <div className='m-auto w-50 d-flex align-items-center py-4' >
      <LoginForm/>
    </div>
  )
}

export default Login;




export function generateMetadata() {
  return (
    {
        title:"login",
        description:"login description"
    }
  )
}
