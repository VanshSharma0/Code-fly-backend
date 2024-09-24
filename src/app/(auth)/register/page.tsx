"use client"
import React from 'react'
import { useAuthStore } from '@/store/Auth'

function RegisterPage() {
    const {createAccount, login} = useAuthStore()
    const [isLoading, setIsLoading] = React.useState(false)
    const [error, setError] = React.useState('')

    const handleSubmit = async(e: React.
        FormEvent<HTMLFormElement>) => {
            e.preventDefault()

            //collect form data
            const formData = new FormData(e.currentTarget)
            const firstname = formData.get('firstName') 
            const lastname = formData.get('lastName')
            const email = formData.get('email')
            const password = formData.get('password')

            //validate form data
            if(!firstname || !lastname || !email || !password){
                setError(() => 'All fields are required')
                return
            }

            //call the store
            setIsLoading(true)
            setError("")

            const response = await createAccount(
                `${firstname} ${lastname}`,
                email.toString(),
                password.toString()
            )

            if(response.error){
                setError(() => response.error!.message)
            }

            else{
                const loginResponse = await login(email.toString(), password.toString())
                if(loginResponse.error){
                    setError(() => loginResponse.error!.message)
                }
            }

            setIsLoading(() => false)
    }
  return (
    <div>
        {error && (
            <p>{error}</p>
        )}

        <form action="" onSubmit={handleSubmit}>
            <input type="text" name="firstName" placeholder="First Name"/>
            <input type="text" name="lastName" placeholder="Last Name"/>
            <input type="email" name="email" placeholder="Email"/>
            <input type="password" name="password" placeholder="Password"/>
            <button type="submit" disabled={isLoading}>
                {isLoading ? "Loading..." : "Register"}
            </button>
        </form>
    </div>
  )
}

export default RegisterPage