"use client"
import React from "react";
import Link from "next/link";
import { IoMdMenu, IoMdClose } from "react-icons/io"
import { useState } from "react";
import { SignOutButton, UserButton } from "@clerk/nextjs";
import Image from "next/image";


interface NavItem {
    label: string;
    page: string;
}

const NAV_ITEMS: Array<NavItem> = [
    {
        label: "Feed",
        page: "home",
    },
    {
        label: "Users",
        page: "users",
    },
    {
        label: "Profile",
        page: "profile",
    },
];

export default function Navbar() {
    const [navbar, setNavbar] = useState(false)

    return (
        <header className="w-full mx-auto px-4 sm:px-20 fixed top-0 z-50 text-rose-400 bg-blue-100 md:bg-inherit shadow-md">
            <div className="justify-between md:items-center md:flex ">
                <div>
                    <div className="flex items-center justify-between py-2 md:py-4 md:block">
                        <Link href="/home">
                            <div className="container flex items-center space-x-2">
                                <div className="mb-2 md:mb-0">
                                    <a href="/home" className="flex items-center">
                                        <span className=" items-center text-xl font-semibold whitespace-nowrap dark:text-white">TweetX</span>
                                    </a>
                                </div>
                            </div>
                        </Link>
                        <div className="md:hidden ">
                            <button
                                className=" text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border"
                                onClick={() => setNavbar(!navbar)}
                            >
                                {navbar ? <IoMdClose size={30} /> : <IoMdMenu size={30} />}
                            </button>
                        </div>
                    </div>
                </div>
                <div>
                    <div className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${navbar ? "block" : "hidden"
                        }`}>
                        <div className=" space-y-8 md:flex md:space-x-12 md:space-y-0 md:mx-3">
                            {NAV_ITEMS.map((item, idx) => (
                                <Link key={idx} href={`/${item.page}`}>
                                    <p onClick={() => setNavbar(!navbar)} className="block my-3 lg:inline-block hover:text-rose-400 font-medium  text-lg text-slate-400 dark:text-neutral-100 cursor-pointer">
                                        {item.label}
                                    </p>
                                </Link>
                            ))}
                            <div className=" p-2">
                                <UserButton />
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </header>
    );
}