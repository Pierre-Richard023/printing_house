import React, { useEffect, useState } from "react"
import { getPdfFiles } from "../../services/orders"

const Receive = () => {

    const [files, setFiles] = useState([])

    useEffect(() => {
        getPdfFiles().then(response => {
            setFiles(response)
        })
    }, [])

    return (
        <>
            <div className="space-y-8 px-2">

                <h3 className="text-lg">Listes des fichiers</h3>
                <div>
                    <div className="flow-root">
                        <ul className="-my-4 divide-y divide-gray-100">
                            {
                                files?.map((val, i) =>
                                    <li key={i} className="flex items-center gap-4 py-4">
                                        <img
                                            src="/images/pdf.svg"
                                            alt=""
                                            className="h-16 w-16 rounded object-cover"
                                        />

                                        <div>
                                            <h3 className="text-sm text-gray-900">
                                                {
                                                    val?.file?.name
                                                }
                                            </h3>

                                            <dl className="mt-0.5 space-y-px text-[10px] text-gray-600">
                                                <div>
                                                    <dt className="inline">Copies : </dt>
                                                    <dd className="inline">
                                                        {
                                                            val?.amount
                                                        }
                                                    </dd>
                                                </div>

                                                <div>
                                                    <dt className="inline">Couleur : </dt>
                                                    <dd className="inline">
                                                        {
                                                            val?.color ? "oui" : "non"
                                                        }
                                                    </dd>
                                                </div>
                                                <div>
                                                    <dt className="inline">Recto/Verso : </dt>
                                                    <dd className="inline">
                                                        {
                                                            val?.both_sides ? "oui" : "non"
                                                        }
                                                    </dd>
                                                </div>
                                                <div>
                                                    <dt className="inline">Reliure : </dt>
                                                    <dd className="inline">
                                                        {
                                                            val?.reliure ? "oui" : "non"
                                                        }
                                                    </dd>
                                                </div>
                                            </dl>
                                        </div>
                                    </li>
                                )

                            }


                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}


export default Receive