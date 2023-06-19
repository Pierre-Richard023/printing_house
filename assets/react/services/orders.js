import Dexie from "dexie";
import { pdfjs } from "react-pdf";

const db = new Dexie("OrderStepsDatabase");

db.version(1).stores({
    status: "id",
    step1: "id",
    step2: "id",
    step3: "id",
    step4: "id",
    step5: "id",
    files:
        "++id,key,name,color,both_sides,starting_price,reliure,amount,price,file",
});

/**
 *  STEP 1
 * Files request
 */

export const savePdfFile = async (file) => {
    const randomKey = (Math.random() + 1).toString(36).substring(7);

    const pFileReader = (f) => {
        return new Promise((resolve, reject) => {
            const fr = new FileReader();

            fr.onload = () => {
                pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
                const typedarray = new Uint8Array(fr.result);

                pdfjs.getDocument(typedarray).promise.then(async (pdf) => {
                    const numPages = pdf.numPages;
                    resolve(numPages);
                });
            };

            fr.onerror = reject;
            fr.readAsArrayBuffer(f);
        });
    };

    await pFileReader(file).then(async (res) => {
        const price = res * 0.5;
        let obj = {
            key: randomKey,
            color: false,
            both_sides: false,
            starting_price: price,
            reliure: false,
            amount: 1,
            price: price,
            file: file,
        };
        await db.table("files").add(obj);
    });

    return randomKey;
};

export const getPdfFile = async (id) => {
    let res;

    await db
        .table("files")
        .get({ key: id })
        .then(async (value) => {
            res = await value;
        });

    return res;
};

export const getPdfFiles = async () => {
    let res = [];

    await db.table("files").each((value, i) => {
        res.push(value);
    });

    return res;
};

export const getPricePdfFile = async () => {
    let price = 0;

    await db.table("files").each((value) => {
        price += value.price;
    });

    return price;
};

export const updatePdfFile = async (id, champ, value, price) => {
    if (champ == "color") await db.table("files").update(id, { color: value });
    else if (champ == "both_sides")
        await db.table("files").update(id, { both_sides: value });
    else if (champ == "copies")
        await db.table("files").update(id, { amount: value });
    else if (champ == "starting_price")
        await db.table("files").update(id, { starting_price: value });
    else if (champ == "reliure")
        await db.table("files").update(id, { reliure: value });

    await db.table("files").update(id, { price: price });

    return getPricePdfFile();
};

export const deletePdfFile = async (id) => {
    await db.table("files").delete(id);
};

export const clearFilesTable = async () => {
    await db.table("files").clear();
};


/**
 * ALL
 */

export const setStepInformations = async (name, newData) => {
    const existingInformation = await db.table(name).get(1);

    if (existingInformation)
        await db.table(name).update(1, newData);
    else
        await db.table(name).add({ ...newData, id: 1 });

};

export const getStepInformations = async (name) => {
    return await db.table(name).get(1).then(res => res)
}

export const getStatus = async () => {

    const status = await db.table("status").get(1);

    const data = {
        step: 1
    }

    if (!status)
        await db.table("status").add({ ...data, id: 1 });

    return await db.table("status").get(1);
}

export const setStatus = async (data) => {

    await db.table("status").update(1, data)
}


export const getAllDBInformations = async () => {

    return await db.transaction('r', db.table("status"), db.table("step1"), db.table("step2"), db.table("step3"), db.table("step4"), db.table("step5"), async () => {
        const step1 = await db.table("step1").toArray()
        const step2 = await db.table("step2").toArray()
        const step3 = await db.table("step3").toArray()
        const step4 = await db.table("step4").toArray()
        const step5 = await db.table("step5").toArray()
        const status = await db.table("status").toArray()

        return {
            step1,
            step2,
            step3,
            step4,
            step5,
            status,
        }
    })

}


export const deleteAllTable = () => {

    db.delete().then(() => {
        console.log('Toutes les tables ont été supprimées avec succès.');
    }).catch((error) => {
        console.error('Une erreur s\'est produite lors de la suppression des tables :', error);
    });
}


//

export const OrderFillForm = async () => {

    let files
    let options = []

    await getPdfFiles().then((res)=>{
        files=res
    })

    const dataTransfer=new DataTransfer()

    for(let file of files )
    {
        await dataTransfer.items.add(file.file);
        let option={
            amount:file.amount,
            both_sides:file.both_sides,
            color:file.color,
            reliure : file.reliure,
            price:file.starting_price
        }
        await options.push(option)
    }

    const filesForm =document.querySelector('#orders_files')
    const addressForm=document.querySelector('#orders_address')
    const cityForm=document.querySelector('#orders_city')
    const zipForm=document.querySelector('#orders_zip')
    const priceForm=document.querySelector('#orders_price')
    const statusForm=document.querySelector('#orders_status')
    const stateForm=document.querySelector('#orders_state')
    const phoneForm=document.querySelector('#orders_phone')
    const optionsForm=document.querySelector('#orders_optionsFiles')
    const sendOptionForm=document.querySelector('#orders_option') 

}