import mongoose from 'mongoose'
const DB_NAME = 'movie'


const connection_DB = async() => {
    try{
        const premices = await mongoose.connect(`${process.env.DATA_BASE_URL}/${DB_NAME}`)
        console.log('database connection eshtablish successfully!!!')
    } catch (error) {
        console.error('error occured while connecting database:', error);
    }
}

export default  connection_DB; 