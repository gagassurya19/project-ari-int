import Link from "next/link"
import Image from "next/image"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"

export default function SignInPage() {
    return (
        <div className="flex min-h-screen items-center justify-center">
            <div className="flex w-full lg:w-1/2 flex-col px-8 py-12 lg:px-12">
                <div className="absolute left-0 top-0">
                    <Image
                        src="/sign/pojokkiriatas-inup.svg"
                        alt="Decorative squares"
                        width={100}
                        height={100}
                    />
                </div>

                <div className="mx-auto w-full max-w-md">
                    <h1 className="text-4xl font-bold">Sign In</h1>
                    <p className="mt-4 text-xl text-gray-600">
                        Hello again! Immerse yourself in the world of luxury scents
                    </p>

                    <form className="mt-8 space-y-6">
                        <div className="space-y-1">
                            <Input
                                type="text"
                                placeholder="username"
                                className="h-12 border-2 border-navy-blue rounded-md"
                            />
                        </div>

                        <div className="space-y-1">
                            <Input
                                type="password"
                                placeholder="password"
                                className="h-12 border-2 border-navy-blue rounded-md"
                            />
                        </div>

                        <div className="flex items-center space-x-2">
                            <Checkbox id="terms" />
                            <label htmlFor="terms" className="text-sm text-gray-600">
                                by continuing agree to{" "}
                                <Link href="/terms" className="text-navy-blue underline">
                                    Terms & Conditions
                                </Link>
                                {" "}and{" "}
                                <Link href="/privacy" className="text-navy-blue underline">
                                    Privacy Policy
                                </Link>
                            </label>
                        </div>

                        <Button
                            type="submit"
                            className="w-full h-12 bg-[#0A1172] hover:bg-[#0A1172]/90"
                        >
                            Sign In
                        </Button>
                    </form>

                    <p className="mt-6 text-center text-sm text-gray-600">
                        Don't have an account?{" "}
                        <Link href="/sign-up" className="text-navy-blue underline">
                            Sign up
                        </Link>
                        {" "}now
                    </p>
                </div>
                <div className="absolute bottom-0 left-0">
                    <Image
                        src="/sign/pojokkananbawah-inup.svg"
                        alt="Decorative squares"
                        width={100}
                        height={100}
                    />
                </div>

            </div>

            <div className="relative h-screen hidden lg:block lg:w-1/2">
                <Image
                    src="/sign/signin-bg.png"
                    alt="Decorative perfume image"
                    fill
                    className="object-cover"
                />
                {/* <div className="absolute inset-0 bg-black/10 flex items-start justify-center pt-16">
                    <h1 className="text-9xl font-croissant text-white">
                        Versatile
                    </h1>
                </div> */}
            </div>

        </div>
    )
}

