import Dexie from "dexie"
import { pdfjs } from 'react-pdf'


const db = new Dexie("OrderDatabase")

db.version(1).stores({
    informations: "id,address,city,zip,phone,optionChoose,cityPrice,filesPrice,orderPrice,optionPrice",
    files: "++id,key,color,both_sides,reliure,amount,price,file"
})

/* Files request */

export const savePdfFile = async (file) => {

    const randomKey = (Math.random() + 1).toString(36).substring(7)

    const pFileReader = (f) => {
        return new Promise((resolve, reject) => {
            const fr = new FileReader()

            fr.onload = () => {


                pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
                const typedarray = new Uint8Array(fr.result)

                pdfjs.getDocument(typedarray).promise.then(async (pdf) => {

                    const numPages = pdf.numPages

                    resolve(numPages)

                })

            }

            fr.onerror = reject
            fr.readAsArrayBuffer(f)
        });
    }

    await pFileReader(file).then((res) => {

        const price = res * .5
        let obj = {
            'key': randomKey,
            'color': false,
            'both_sides': false,
            'starting_price': price,
            'reliure': false,
            'amount': 1,
            'price': price,
            'file': file
        }
        db.table('files').add(obj)
    })

    return randomKey
}

export const getPdfFile = async (id) => { 

    let res 

    await db.table('files').get({key:id}).then( async (value) => {
        res = await value
    })

    return res
}

export const getPdfFiles = async () => {

    let res=[]

    await db.table('files').each((value,i)=>{
        res.push(value)
    })

    return res
}

export const getPricePdfFile = async () => {

    let price = 0

    await db.table('files').each((value)=>{
        price += value.price
    })

    return price 
}

export const updatePdfFile = async (id, champ, value, price) => {

    if (champ == 'color')
        await db.table('files').update(id, { color: value })
    else if (champ == 'both_sides')
        await db.table('files').update(id, { both_sides: value })
    else if (champ == 'copies')
        await db.table('files').update(id, { amount: value })
    else if (champ == 'starting_price')
        await db.table('files').update(id, { starting_price: value })
    else if (champ == 'reliure')
        await db.table('files').update(id, { reliure: value })

    await db.table('files').update(id, { price: price })

    return getPricePdfFile()
}

export const deletePdfFile = async (id) => {
    db.table('files').delete(id)

}

export const fillForm = async (informations) =>{


    let files
    let options=[]

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

    filesForm.files=await dataTransfer.files
    addressForm.value=` ${ informations.address }`
    cityForm.value=` ${informations.city }`
    zipForm.value=` ${informations.zip} `
    priceForm.value=informations.orderPrice
    statusForm.value=0;
    stateForm.value=0;
    phoneForm.value=informations.phone
    sendOptionForm.value=informations.optionChoose
    optionsForm.value=await JSON.stringify(options)

}

export const clearStore = () =>{

    db.table('files').clear()

}

/* Informations request */

export const createBD = () => {


    db.table('informations').count().then((res) => {

        if (res == 0) {
            let obj = {
                'id': 0,
                'address': "",
                'city': "",
                'zip': "",
                'phone': "",
                'optionChoose': -1,
                'cityPrice': 0,
                'filesPrice': 0,
                'orderPrice': 0,
                'optionPrice': 0
            }
            db.table('informations').add(obj)

        }

    })


}

export const getAllDBInformations = () => {
    return db.table('informations').get(0).then(res => res )
}

export const getDBInformations = () => {

    return db.table('informations').get(0).then(res =>  {

        const data = {
            address : res.address,
            zip: res.zip,
            city: res.city,
            cityPrice: res.cityPrice,
            phone: res.phone,
            filesPrice: res.filesPrice
        }

        return data 

    })

}

export const setFilesPriceDBInformations = (price) => {
    createBD()
    db.table('informations').update(0, {filesPrice : price } )

}

export const setBDInformations = (data) => {

    db.table('informations').update(0, data )
}

export const setOptionsDBInformations = (idChoose, priceChoose, price) => {

    db.table('informations').update(0, { optionChoose: idChoose, optionPrice: priceChoose , orderPrice : price })

}

export const getOptionsDBInformations = () => {

    return db.table('informations').get(0).then(res => {

        const price= res.filesPrice + res.cityPrice
        
        return { optionChoose : res.optionChoose, priceChoose : res.optionPrice , price }
    })

}

export const clearDBInformations = () => {

    db.table('informations').clear()
}