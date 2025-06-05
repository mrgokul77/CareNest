import React from 'react'
import { assets } from '../assets/assets'
import { NavLink } from 'react-router-dom'

const Footer = () => {
  return (
    <div className='md:mx-10'>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-6 mt-40 text-sm'>

        {/* left section */}
        <div className='relative top-[-50px]'>
          <img className='-mt-5 w-40' src={assets.logo} alt="" />
          <p className='w-full md:w-2/3 text-gray-600 leading-6'>"CareNest is a trusted platform connecting families with compassionate caregivers for their elderly loved ones. We simplify the process of finding professional, reliable, and experienced caregivers, ensuring comfort, support, and dignity for aging family members."</p>
        </div>

        {/* center section */}
        <div>
          <p className='text-xl font-medium mb-5'>COMPANY</p>
          <ul className='flex flex-col gap-2 text-gray-600'>
            <NavLink to='/'> <li>Home</li> </NavLink>
            <NavLink to='/about'> <li>About</li> </NavLink>
            <NavLink to='/contact'> <li>Contact</li> </NavLink>


            <li>Privacy Policy</li>
          </ul>
        </div>

        {/* right section */}
        <div>
          <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
          <ul className='flex flex-col gap-2 text-gray-600'>
            <li>+977-1-4785678</li>
            <li>info@carenest.com</li>
          </ul>
        </div>

      </div>

      {/* Copy Right */}
      <div>
        <hr />
        <p className='py-5 text-small text-center'>Copyright © 2025 GreatStack - All Right Reserved.</p>
      </div>
    </div>
  )
}

export default Footer