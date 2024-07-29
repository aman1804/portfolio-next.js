// 'use client'
import React from 'react'
import LoginForm from './components/LoginForm'

export async function getData(){
    const data = await fetch("https://dummy.restapiexample.com/api/v1/employees")
    return await data.json()
}


const Login = async() => {
    // const data = await getData()
    // console.log('thamboo',data)
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
