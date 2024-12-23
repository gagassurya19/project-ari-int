'use client'

import Link from "next/link"
import Image from "next/image"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { signUp } from "@/lib/api/auth"  // Make sure to import the signUp function from your API helper

export default function SignUpPage() {
    const route = useRouter()

    // State to manage form input values and any potential error messages
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [rePassword, setRePassword] = useState("")
    const [error, setError] = useState("")

    // Handle form submission
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault()

        if (password !== rePassword) {
            setError("Passwords do not match")
            return
        }

        try {
            // Call the signUp API function
            const response = await signUp(username, password)
            console.log("User signed up:", response)

            // Redirect to the thank you page after successful sign-up
            route.push("/thanks")
        } catch (error: any) {
            console.error("Error signing up:", error)
            setError("Failed to sign up. Please try again.")
        }
    }

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
                    <h1 className="text-4xl font-bold">Sign Up</h1>
                    <p className="mt-4 text-xl text-gray-600">
                        Discover your signature scent today!
                    </p>

                    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                        {error && (
                            <div className="text-red-500 text-sm mb-4">
                                {error}
                            </div>
                        )}
                        <div className="space-y-1">
                            <Input
                                type="text"
                                placeholder="Username"
                                className="h-12 border-2 border-navy-blue rounded-md"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>

                        <div className="space-y-1">
                            <Input
                                type="password"
                                placeholder="Password"
                                className="h-12 border-2 border-navy-blue rounded-md"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <div className="space-y-1">
                            <Input
                                type="password"
                                placeholder="Re-password"
                                className="h-12 border-2 border-navy-blue rounded-md"
                                value={rePassword}
                                onChange={(e) => setRePassword(e.target.value)}
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
                            Sign Up
                        </Button>
                    </form>

                    <p className="mt-6 text-center text-sm text-gray-600">
                        Already have an account?{" "}
                        <Link href="/sign-in" className="text-navy-blue underline">
                            Sign in here
                        </Link>
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
                    src="/sign/signup-bg.png"
                    alt="Decorative perfume image"
                    fill
                    className="object-cover"
                />
            </div>
        </div>
    )
}
