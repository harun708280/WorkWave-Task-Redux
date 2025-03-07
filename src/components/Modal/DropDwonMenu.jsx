import { Menu, Transition } from '@headlessui/react'
import { Fragment, useEffect, useRef, useState } from 'react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { FaUserShield } from "react-icons/fa";
import { useDispatch } from 'react-redux';
import { isLogout } from '../../redux/features/user/userSlice';
import { signOut } from 'firebase/auth';
import auth from '../../utils/firebaseConfig';
export default function MenuDropDown({children,email}) {
  const dispatch=useDispatch()

  const handleLogout=()=>{
    signOut(auth)
    dispatch(isLogout())
  }
  return (
    
      <Menu as="div" className="relative inline-block text-left z-[999]">
        <div>
          <Menu.Button >
           {children}
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
            <div className="px-1 py-1 ">
              <Menu.Item>
                <p className='text-[14px] text-gray-600 pl-3 py-2'>  {email}</p>
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? 'bg-primary text-white' : 'text-gray-900'
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    {active ? (
                      <FaUserShield  className="mr-2 h-5 w-5"
                      aria-hidden="true" />
                    ) : (
                        <FaUserShield className="mr-2 h-5 w-5"
                        aria-hidden="true" />
                    )}
                      Profile
                  </button>
                )}
              </Menu.Item>
              
            </div>
            <div className="px-1 py-1">
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? 'bg-primary text-white' : 'text-gray-900'
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                   
                    Archive
                  </button>
                )}
              </Menu.Item>
             
            </div>
            <div className="px-1 py-1">
              <Menu.Item>
                {({ active }) => (
                  <button 
                  onClick={handleLogout}
                    className={`${
                      active ? 'bg-primary text-white' : 'text-gray-900'
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    
                    LogOut
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    
  )
}

