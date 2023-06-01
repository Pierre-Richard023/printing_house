import React from "react"
import Address from "./address"
import City from "./city"
import Phone from "./phone"

const Form = () => {


    return (

        <section className="p-6 w-full md:w-1/2 text-gray-50 text-center place-self-center">


            <Address />

            <City />

            <Phone />

        </section>


    )
}

export default Form