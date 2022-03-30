import React, { useReducer, useState, Component } from "react";
import "../styles/tailwind.css"

const showMobileMenu = $(document).ready(function () {
    const btn = document.querySelector("button.mobile-menu-button")
    const menu = document.querySelector(".mobile-menu");

    btn.addEventListener("click", () => {
        menu.classList.toggle("hidden");
    });
});

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errMsg, setErrMsg] = useState("");

    function handleEmail(event) {
        event.preventDefault();
        setEmail(event.target.value);
    }

    function handlePassword(event) {
        event.preventDefault();
        setPassword(event.target.value);
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();

        let email = e.target.elements.email?.value;
        let password = e.target.elements.password?.value;

        // async function handleSignIn(event) {
        //     event.preventDefault();
        //     setErrMsg('');
        //     try {
        //         setErrMsg("Error signing in");
        //     } catch (err) {
        //         setErrMsg("Error signing in")
        //     }
        // }
    }

    return (
        <div className="container mx-auto pt-10">
            <form onSubmit={handleFormSubmit} className=" bg-slate-500">
                <div>
                    <div className="mb-4 px-5 pt-5">
                        <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Email</label>
                        <input type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@email.com" required />
                    </div>
                    <div className="mb-6 px-5">
                        <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Your password</label>
                        <input type="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Password" required />
                    </div>
                    <div className="flex items-start mb-6 px-5">
                        <div className="flex items-center h-5">
                            <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 bg-gray-50 rounded border border-gray-300 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800" required />
                        </div>
                        <div className="ml-3 text-sm px-5">
                            <label for="remember" className="font-medium text-gray-900 dark:text-gray-300">Remember me</label>
                        </div>
                    </div>
                    <button type="submit" className="py-4 px-5 text-white border-b-4 font-semibold bg-slate-500 hover:bg-slate-300 border-slate-500 transition duration-300 ">
                        Submit
                    </button>
                </div>
            </form>
        </div>
    )

    // const formLogic = $(document).ready(function () {
    //     const validateLogin = () {
    //         const charRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    //         return email.length > 0 && password.length > 0 && email.match(charRegex);
    //     }
    // })

}

export default Login