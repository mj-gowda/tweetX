import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"

const Landing = () => {
    return (
        <div className=" overflow-auto absolute bg-gray-300 h-full w-full flex flex-col md:flex-row">
            <div className="flex flex-col ml-12 mt-6 sm:mt-12 md:w-1/2">
                <div className="flex flex-row lg:ml-20">
                    <h2 className="text-purple-700 font-bold text-2xl sm:text-3xl mr-16">TweetX</h2>
                    <Link href='/sign-in'>
                        <Button size={"sm"} className=" text-black bg-purple-500 sm:px-8 hover:bg-slate-100">Login</Button>
                    </Link>
                </div>
                <div className=" overflow-hidden relative lg:m-20">
                    <div className="text-start w-2/3 py-10  z-20">
                        <h2 className="text-xl font-extrabold text-black dark:text-white sm:text-4xl">
                            <span className="block">
                                Enter the digital world.
                            </span>
                            <span className="block text-purple-700 md:mt-2">
                                See what your friends are upto?
                            </span>
                        </h2>
                        <div className="lg:mt-2 lg:flex-shrink-0">
                            <div className="inline-flex rounded-md shadow">
                                <Link href='/sign-in'>
                                    <Button size={'sm'} className="mt-4 text-black bg-purple-500 hover:bg-slate-100">Create Account</Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="p-2 justify-self-end md:w-1/2">
                <Image src="/landing.png" alt={""} height={650} width={650} sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
            </div>
        </div>
    )
}

export default Landing