import { useState } from "react"

import { Button } from "@/components/ui/button"
import { getCategories } from "../api/category";
import { Link } from 'react-router-dom'
import "../App.css"

export default function Hamburger() {
  const [open, setOpen] = useState(false)

  return (
    <div>
      <Button
        className="group border border-gray-300"
        variant="outline"
        size="icon"
        onClick={() => setOpen((prevState) => !prevState)}
        aria-expanded={open}
        aria-label={open ? "Close menu" : "Open menu"}>
        <svg
          className="pointer-events-none"
          width={16}
          height={16}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M4 12L20 12"
            className="origin-center -translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-x-0 group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[315deg]" />
          <path
            d="M4 12H20"
            className="origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.8)] group-aria-expanded:rotate-45" />
          <path
            d="M4 12H20"
            className="origin-center translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[135deg]" />
        </svg>
      </Button>
      {
        open ? (
              <div className='fixed top-0 bg-orange-300 right-0 left-0 flex flex-col justify-start items-center h-100 gap-5 sm:right-2/3 sm:h-screen z-[999] overflow-hidden'>
                  <div onClick={()=>setOpen(prevState=>!prevState)}>
                    <Button
                      className="mt-5 bg-orange-400 hover:bg-orange-500 w-20 text-[#000]"
                      >
                        X
                    </Button>
                  </div>
                  <ul className='flex flex-col items-start gap-2 w-50 justify-center p-2 overflow-y-scroll custom-scroll-hide sm:overflow-clip'>
                      {
                        getCategories.data.map((categorie, index)=>(
                          <div key={index} className="w-full border-b border-orange-400 ">
                            <Link to={`/CategoriesPage/${categorie.name}`} key={index}>
                                <li 
                                    className='hover:text-[#00000093] hover:scale-100 font-bold' 
                                    onClick={()=>{
                                        setOpen((prev)=>{
                                            return false;
                                        })
                                    }}
                                >
                                    {categorie.name}
                                </li>
                            </Link>
                          </div>
                        ))
                      }
                  </ul>
              </div>
          ): (
              <p className='absolute top-0'></p>
          )
      }
    </div>
  );
}
