import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"

const Landing = () => {
    return (
        <div className=" overflow-auto absolute bg-slate-100 h-full w-full flex flex-col md:flex-row">
            <div className="flex flex-col ml-12 mt-4 sm:mt-12 md:w-1/2">
                <div className="flex flex-row gap-24 lg:ml-20">
                    <h2 className="text-rose-500 font-bold text-2xl sm:text-3xl">TweetX</h2>
                    <Link href='/sign-in'>
                        <Button size={"sm"} className=" text-white bg-rose-500 h-7 sm:h-9 sm:px-8 hover:bg-rose-600">Login</Button>
                    </Link>
                </div>
                <div className=" overflow-hidden relative lg:m-20">
                    <div className="text-start w-2/3 py-10  z-20">
                        <h2 className="text-xl font-extrabold text-black dark:text-white sm:text-4xl">
                            <span className="block">
                                Enter the digital world.
                            </span>
                            <span className="block text-rose-400 md:mt-2">
                                See what your friends are upto?
                            </span>
                        </h2>
                        <div className="lg:mt-2 lg:flex-shrink-0">
                            <div className="inline-flex rounded-md shadow">
                                <Link href='/sign-in'>
                                    <Button size={'sm'} className="mt-4 text-white bg-rose-500 hover:bg-rose-600">Create Account</Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className=" justify-self-end sm:pt-10 md:w-1/2">
                <Image src="/landing.png" alt={""} height={600} width={600} sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
            </div>
        </div>
    )
}

export default Landing