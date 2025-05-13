import { useEffect, useState } from "react";


const Login = () => {
    const [ isConnected,setIsConnected ] = useState(true);

    return(
        <div className="flex flex-col items-center w-full gap-10">
        {
            isConnected ? (
                <div className="flex flex-col items-center w-80 p-4 bg-white border border-gray-200 rounded-lg shadow-sm md:w-100 mb-20">
                    <form className="space-y-6 w-60" action="#">
                        <h5 className="text-xl font-medium text-gray-900 ">Sign in to our platform</h5>
                        <div>
                            <label for="email" class="block mb-2 text-sm font-medium text-gray-900 ">Your email</label>
                            <input type="email" name="email" id="email" class="bg-gray-50 border px-5 py-2 border-gray-300 text-gray-900 text-sm rounded-lg " placeholder="name@company.com" required />
                        </div>
                        <div>
                            <label for="password" class="block mb-2 text-sm font-medium text-gray-900 ">Your password</label>
                            <input type="password" name="password" id="password" placeholder="••••••••" class="bg-gray-50 border px-5 py-2 border-gray-300 text-gray-900 text-sm rounded-lg " required />
                        </div>
                        <div className="flex items-start">
                            <div className="flex items-start">
                                <div className="flex items-center h-5">
                                    <input id="remember" type="checkbox" value="" class="w-4 h-4 border  border-gray-300 rounded-sm bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" required />
                                </div>
                                <label for="remember" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Remember me</label>
                            </div>
                            <a href="#" class="ms-auto text-sm text-blue-700 hover:underline dark:text-blue-500">Lost Password?</a>
                        </div>
                        <button type="submit" class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login to your account</button>
                        <div className="text-sm font-medium text-gray-500 dark:text-gray-300 flex justify-between">
                            Not registered? 
                            <p 
                                onClick={()=>{
                                    setIsConnected(()=>{
                                        return false;
                                    })
                                }} 
                                class="text-blue-700 hover:underline dark:text-blue-500 cursor-pointer">
                                Create account
                            </p>
                        </div>
                    </form>
                </div>
            ) : (
                <form className="flex flex-col items-center gap-5 rounded-2xl bg-gray-300 py-5 w-80 md:w-2/3 xl:flex-row mb-20">
                <div className="grid gap-6 justify-center  md:grid-cols-2 md:w-2/3 xl:pl-10 xl:border-r xl:border-gray-400">
                    <div>
                        <label for="first_name" class="block mb-2 text-sm font-medium text-gray-900 ">First name</label>
                        <input type="text" id="first_name" class="bg-gray-50 px-5 py-2 border border-gray-300 text-gray-900 text-sm rounded-lg" placeholder="John" required />
                    </div>
                    <div>
                        <label for="last_name" class="block mb-2 text-sm font-medium text-gray-900">Last name</label>
                        <input type="text" id="last_name" class="bg-gray-50 px-5 py-2 border border-gray-300 text-gray-900 text-sm rounded-lg" placeholder="Doe" required />
                    </div>
                    <div>
                        <label for="company" class="block mb-2 text-sm font-medium text-gray-900 ">Company</label>
                        <input type="text" id="company" class="bg-gray-50 px-5 py-2 border border-gray-300 text-gray-900 text-sm rounded-lg " placeholder="Flowbite" required />
                    </div>  
                    <div>
                        <label for="phone" class="block mb-2 text-sm font-medium text-gray-900 ">Phone number</label>
                        <input type="tel" id="phone" class="bg-gray-50 px-5 py-2 border border-gray-300 text-gray-900 text-sm rounded-lg " placeholder="123-45-678" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" required />
                    </div>
                    <div>
                        <label for="website" class="block mb-2 text-sm font-medium text-gray-900 ">Website URL</label>
                        <input type="url" id="website" class="bg-gray-50 px-5 py-2 border border-gray-300 text-gray-900 text-sm rounded-lg " placeholder="flowbite.com" required />
                    </div>
                </div>
                <div className="px-10 pt-5 ">
                    <div className="mb-2">
                        <label for="email" class="block mb-2 text-sm font-medium text-gray-900 ">Email address</label>
                        <input type="email" id="email" class="bg-gray-50 px-5 py-2 border border-gray-300 text-gray-900 text-sm rounded-lg" placeholder="john.doe@company.com" required />
                    </div> 
                    <div className="mb-2">
                        <label for="password" class="block mb-2 text-sm font-medium text-gray-900 ">Password</label>
                        <input type="password" id="password" class="bg-gray-50 px-5 py-2 border border-gray-300 text-gray-900 text-sm rounded-lg" placeholder="•••••••••" required />
                    </div> 
                    <div className="mb-2">
                        <label for="confirm_password" class="block mb-2 text-sm font-medium text-gray-900 ">Confirm password</label>
                        <input type="password" id="confirm_password" class="bg-gray-50 px-5 py-2 border border-gray-300 text-gray-900 text-sm rounded-lg " placeholder="•••••••••" required />
                    </div> 
                    <div className="flex items-start mb-6">
                        <div class="flex items-center h-5">
                        <input id="remember" type="checkbox" value="" class="w-4 h-4 border border-gray-300 rounded-sm bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800" required />
                        </div>
                        <label for="remember" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">I agree with the <a href="#" class="text-blue-600 hover:underline dark:text-blue-500">terms and conditions</a>.</label>
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
