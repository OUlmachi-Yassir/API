import { Link, Outlet, useNavigate } from "react-router-dom";
import { LOGIN_ROUTE } from "../../router";
import { useEffect, useState } from "react";
import axios from "axios";
import { axiosClient } from "../../Api/axios";
import { useUserContext } from "../../context/UserContext";

export default function UserDashboardLayout(){
  const navigate =useNavigate();
  const [itineraries,setItineraire] =useState([])
  const {setUser,setAuthanticated,Authenticated,logout,user} =useUserContext([])

  
  useEffect(() => {
    const fetchRoutes = async () => {
        try {
            const response = await axiosClient.get("/itineraires");
            setItineraire(response.data.itineraries);
            console.log(response.data.itineraries);
        } catch (error) {
            console.error("Error fetching routes:", error);

        }
    };

    fetchRoutes();
}, []);
useEffect(()=>{
  if(!Authenticated){
    navigate(LOGIN_ROUTE)
  }
})

  
    return <>   
    <header>
    <nav className="bg-white border-gray-200 dark:bg-gray-900">
  <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
    <a href="https://flowbite.com/" className="flex items-center space-x-3 rtl:space-x-reverse">
        <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Flowbite Logo" />
        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Flowbite</span>
    </a>
    <button data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
        <span className="sr-only">Open main menu</span>
        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
        </svg>
    </button>
    <div className="hidden w-full md:block md:w-auto" id="navbar-default">
      <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
        <li  className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500" aria-current="page">
            <Link to={'/'}>Home</Link>
         
        </li>
        <li  className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500" aria-current="page">
        <Link to={'/login'}>LogOut</Link>
        </li>
        <li  className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500" aria-current="page">
        <Link to={'/Register'}>Register</Link>
        </li>
        <li  className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500" aria-current="page">
        <Link to={'/posts'}>Posts</Link>
        </li>
        
      </ul>
    </div>
  </div>
</nav>
    </header>
    <main className={'container'}>
        
    {itineraries.map((itinerarie, index) => (
        
        <div key={index} className="w-60 h-80 bg-gray-800 p-3 flex flex-col gap-1 rounded-br-3xl">
  <div className="duration-500 contrast-50 h-48 bg-gradient-to-bl from-black via-orange-900 to-indigo-600  hover:contrast-100"></div>
  <div className="flex flex-col gap-4">
    <div className="flex flex-row justify-between">
      <div className="flex flex-col">
        <span className="text-xl text-gray-50 font-bold">{itinerarie.title}</span>
        <p className="text-xs text-gray-400">{itinerarie.duration}</p>
      </div>
      <span className="font-bold  text-red-600">{itinerarie.category_id}</span>
    </div>
    <button className="hover:bg-sky-700 text-gray-50 bg-sky-800 py-2 rounded-br-xl">{itinerarie.created_at}</button>
  </div>
</div>
       ))}
    </main>
    <footer>
        
    </footer>
    
    
    </>
}