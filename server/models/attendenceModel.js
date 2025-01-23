import mongoose from "mongoose";

const Attendence = new mongoose.Schema({
    monthName:{
        type:String
    },
    Days:{
        type:Map,
        of:String
    }
})



export default mongoose.model("Attendence",Attendence)