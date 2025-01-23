import mongoose from 'mongoose'

const availableResult = new mongoose.Schema({
    enrollment:{
        type:String
    },
    results:{
        type:Map,
        of:String
    }
})

const AvailableResult = mongoose.model("AvailableResult",availableResult,"studentAvailableResult")

export {AvailableResult}