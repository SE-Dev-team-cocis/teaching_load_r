import React from 'react'
import { NavLink } from 'react-router-dom'

const AdminNavbar = () => {
  return (
    <nav className='mt-5 ml-4 admin-nav'>
        <ul className='flex gap-5'>
            <NavLink to={"/admin/staff"}><li>Staff</li></NavLink>
            <NavLink to={"/admin/colleges"}><li>Colleges</li></NavLink>
            <li>Courses</li>
            <li>Departments</li>
        </ul>
    </nav>
  )
}

export default AdminNavbar