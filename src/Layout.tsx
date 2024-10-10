import React from 'react';
import { Outlet } from 'react-router';
import Logo from './assets/nxvet.svg?react';
import './assets/nxvet.svg';
import './assets/nxvet.png';
import { NavLink } from 'react-router-dom';
import { useLocation } from 'react-router-dom';


export const Layout = () => {
    const location = useLocation(); // Get the current location object
    console.log("Your locatio is", location?.pathname);


    return (
        <>
        <div className='flex flex-col h-screen'>

            <div className="p-4  flex justify-between bg-[#f1f1f1]">
                <Logo className=" h-[50px]" viewBox="0 0 1138 477" />
                <p>Don't have an account yet?{location?.pathname=='/signup'?<NavLink to="/login" className="text-primary">Sign In</NavLink >:<NavLink to="/signup" className="text-primary">Sign Up</NavLink >}</p>
            </div>


            <div className='flex flex-row items-stretch' style={{ minHeight: '100vh', width: '100vw', backgroundColor: '#f1f1f1' }}>

                <div className='flex-1 p-2 pt-6' style={{ height: '100vh', overflow: 'scroll' }} id='page-content'>
                    <Outlet />
                </div>
            </div>
        </div>

        </>

    );
}
