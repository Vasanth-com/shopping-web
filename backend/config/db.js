import mongoose from "mongoose"


export const connectDb = async() =>{
    await mongoose.connect(process.env.MONGO_DB_URL)
    .then(()=>console.log("DB Connected..")
    )
}

