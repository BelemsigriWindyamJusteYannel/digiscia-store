import { useEffect, useState } from "react";


const Login = () => {
    const [ isConnected,setIsConnected ] = useState(true);

    return(
        <div className="flex flex-col items-center py-20 w-full gap-10">
        {
            isConnected ? (
                <div className="flex flex-col items-center w-80 p-4 bg-white border border-gray-200 rounded-lg shadow-sm md:w-100 mb-20">
                    <form className="space-y-6 w-60" action="#">
                        <h5 className="text-xl font-medium text-gray-900 ">Sign in to our platform</h5>
                        <div>
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 ">Your email</label>
                            <input type="email" name="email" id="email" className="bg-gray-50 border px-5 py-2 border-gray-300 text-gray-900 text-sm rounded-lg " placeholder="name@company.com" required />
                        </div>
                        <div>
                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 ">Your password</label>
                            <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border px-5 py-2 border-gray-300 text-gray-900 text-sm rounded-lg " required />
                        </div>
                        <div className="flex items-start">
                            <div className="flex items-start">
                                <div className="flex items-center h-5">
                                    <input id="remember" type="checkbox" value="" className="w-4 h-4 border  border-gray-300 rounded-sm bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" required />
                                </div>
                                <label htmlFor="remember" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Remember me</label>
                            </div>
                            <a href="#" className="ms-auto text-sm text-blue-700 hover:underline dark:text-blue-500">Lost Password?</a>
                        </div>
                        <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login to your account</button>
                        <div className="text-sm font-medium text-gray-500 dark:text-gray-300 flex justify-between">
                            Not registered? 
                            <p 
                                onClick={()=>{
                                    setIsConnected(()=>{
                                        return false;
                                    })
                                }} 
                                className="text-blue-700 hover:underline dark:text-blue-500 cursor-pointer">
                                Create account
                            </p>
                        </div>
                    </form>
                </div>
            ) : (
                <form className="flex flex-col items-center gap-5 rounded-2xl bg-gray-300 py-5 w-80 md:w-2/3 xl:flex-row mb-20">
                <div className="grid gap-6 justify-center  md:grid-cols-2 md:w-2/3 xl:pl-10 xl:border-r xl:border-gray-400">
                    <div>
                        <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900 ">First name</label>
                        <input type="text" id="first_name" className="bg-gray-50 px-5 py-2 border border-gray-300 text-gray-900 text-sm rounded-lg" placeholder="John" required />
                    </div>
                    <div>
                        <label htmlFor="last_name" className="block mb-2 text-sm font-medium text-gray-900">Last name</label>
                        <input type="text" id="last_name" className="bg-gray-50 px-5 py-2 border border-gray-300 text-gray-900 text-sm rounded-lg" placeholder="Doe" required />
                    </div>
                    <div>
                        <label htmlFor="company" className="block mb-2 text-sm font-medium text-gray-900 ">Company</label>
                        <input type="text" id="company" className="bg-gray-50 px-5 py-2 border border-gray-300 text-gray-900 text-sm rounded-lg " placeholder="Flowbite" required />
                    </div>  
                    <div>
                        <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 ">Phone number</label>
                        <input type="tel" id="phone" className="bg-gray-50 px-5 py-2 border border-gray-300 text-gray-900 text-sm rounded-lg " placeholder="123-45-678" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" required />
                    </div>
                    <div>
                        <label htmlFor="website" className="block mb-2 text-sm font-medium text-gray-900 ">Website URL</label>
                        <input type="url" id="website" className="bg-gray-50 px-5 py-2 border border-gray-300 text-gray-900 text-sm rounded-lg " placeholder="flowbite.com" required />
                    </div>
                </div>
                <div className="px-10 pt-5 ">
                    <div className="mb-2">
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 ">Email address</label>
                        <input type="email" id="email" className="bg-gray-50 px-5 py-2 border border-gray-300 text-gray-900 text-sm rounded-lg" placeholder="john.doe@company.com" required />
                    </div> 
                    <div className="mb-2">
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 ">Password</label>
                        <input type="password" id="password" className="bg-gray-50 px-5 py-2 border border-gray-300 text-gray-900 text-sm rounded-lg" placeholder="•••••••••" required />
                    </div> 
                    <div className="mb-2">
                        <label htmlFor="confirm_password" className="block mb-2 text-sm font-medium text-gray-900 ">Confirm password</label>
                        <input type="password" id="confirm_password" className="bg-gray-50 px-5 py-2 border border-gray-300 text-gray-900 text-sm rounded-lg " placeholder="•••••••••" required />
                    </div> 
                    <div className="flex items-start mb-6">
                        <div className="flex items-center h-5">
                        <input id="remember" type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded-sm bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800" required />
                        </div>
                        <label htmlFor="remember" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">I agree with the <a href="#" className="text-blue-600 hover:underline dark:text-blue-500">terms and conditions</a>.</label>
                    </div>
                    <button className="w-25 py-2 rounded-2xl text-white bg-blue-700 hover:bg-blue-800text-center">
                        Submit
                    </button>
                </div>
            </form>
            )
        }
        </div>
    )
}

export default Login;
