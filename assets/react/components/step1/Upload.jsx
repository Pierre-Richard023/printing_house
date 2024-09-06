import React from "react";
import { useDispatch } from "react-redux";
import { savePdfFile } from "../../services/orders";
import { isLoading, uploadFile } from "../../store/slice/orderSlice";
import Dropzone from "react-dropzone";

const Upload = () => {
    const dispatch = useDispatch();

    const handledrop = async (acceptedFiles) => {
        await acceptedFiles.forEach(async (file) => {
            const key = await savePdfFile(file);
            dispatch(uploadFile(key));
        });
    };

    return (
        <>
            <Dropzone onDrop={handledrop} accept={{ "application/pdf": [".pdf"] }}>
                {({ getRootProps, getInputProps }) => (
                    <section>
                        <div className="w-full flex justify-center ">
                            <div
                                className="w-full cursor-pointer flex justify-center md:w-3/4 xl:1/2 h-36 border-2 border-dashed border-primary text-center text-primary items-center hover:border-4 hover:border-primary_dark hover:text-primary_dark"
                                {...getRootProps()}
                            >
                                <input
                                    name="files"
                                    type="file"
                                    accept="application/pdf"
                                    {...getInputProps()}
                                />
                                <h2 className="text-2xl ">
                                    Faites glisser et déposez un fichier ou sélectionnez ajouter
                                    un fichier
                                </h2>
                            </div>
                        </div>
                    </section>
                )}
            </Dropzone>
        </>
    );
};

export default Upload;
