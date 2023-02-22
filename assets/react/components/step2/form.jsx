import React from "react"
import Address from "./address"
import City from "./city"
import Phone from "./phone"

const Form = () => {




    return (

        <section className="p-6 w-full md:w-1/2 bg-gray-800 text-gray-50 text-center place-self-center">
            <form noValidate="" action="" className="container flex flex-col mx-auto space-y-12 ng-untouched ng-pristine ng-valid">
                <fieldset className="grid grid-cols-4 gap-6 p-6 rounded-md shadow-sm bg-gray-900">
                    <div className="space-y-2 col-span-full">
                        <h1>ADRESSE DE LIVRAISON</h1>
                    </div>
                    <div className="grid grid-cols-6 gap-4 col-span-full">

                        <Address />

                        <City />

                        <Phone />

                    </div>
                </fieldset> 
            </form>
        </section>


    )
}

export default Form