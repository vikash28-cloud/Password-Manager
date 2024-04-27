import React from 'react'


const Login = () => {
    return <>
        <form action="/" method='post'>

            <main class="flex h-screen w-full items-center justify-center px-4 md:px-6">
                <div class="rounded-lg border bg-card text-card-foreground shadow-sm w-full max-w-md" data-v0-t="card">
                    <div class="flex flex-col space-y-1.5 p-6">
                        <h3 class="whitespace-nowrap tracking-tight text-2xl font-bold">Welcome back</h3>
                        <p class="text-sm text-muted-foreground">Enter your email and password to access your account.</p>
                    </div>
                    <div class="p-6 space-y-4">
                        <div class="space-y-2">
                            <label
                                class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                for="email"
                            >
                                Email
                            </label>
                            <input
                                class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                id="email"
                                placeholder="name@example.com"
                                required=""
                                type="email"
                            />
                        </div>
                        <div class="space-y-2">
                            <div class="flex items-center justify-between">
                                <label
                                    class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    for="password"
                                >
                                    Password
                                </label>
                                <a class="text-sm underline" href="#">
                                    Forgot password?
                                </a>
                            </div>
                            <input
                                class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                id="password"
                                required=""
                                type="password"
                            />
                        </div>
                    </div>
                    <div class="flex items-center p-6">
                        <button
                            class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full bg-purple-500 text-white"
                            type="submit"
                        >
                           LogIn
                        </button>
                    </div>
                </div>
            </main>

        </form >

    </>
}

export default Login