import mongoose, { mongo } from "mongoose";

const resultSchema4thSem = new mongoose.Schema({
    enrollment :{
        type : String
    },
    result:{
        type:Map,
        of: new mongoose.Schema({
            code:{
                type:Number
            },
            subjectName:{
                type:String
            },
            credit:{
                type:String
            },
            marks:{
                type:String
            }
        },{_id:false})
    }
})

const resultSchema3rdSem = new mongoose.Schema({
    enrollment :{
        type : String
    },
    result:{
        type:Map,
        of: new mongoose.Schema({
            code:{
                type:Number
            },
            subjectName:{
                type:String
            },
            credit:{
                type:String
            },
            marks:{
                type:String
            }
        },{_id:false})
    }
})

const resultSchema2ndSem = new mongoose.Schema({
    enrollment:{
        type:String
    },
    result:{
        type:Map,
        of: new mongoose.Schema({
            code:{
                type:Number
            },
            subjectName:{
                type:String
            },
            credit:{
                type:String
            },
            marks:{
                type:String
            }
        },{_id:false})
    }
})

const resultSchema1stSem = new mongoose.Schema({
    enrollment:{
        type:String
    },
    result:{
        type:Map,
        of: new mongoose.Schema({
            subjectName:{
                type:String
            },
            code:{
                type:Number
            },
            credit:{
                type:String
            },
            marks:{
                type:String
            }
        },{_id:false})
    }
})


const Result4thSem = mongoose.model("Result4thSem",resultSchema4thSem,"results4thSem")
const Result3rdSem = mongoose.model("Result3rdSem",resultSchema3rdSem,"results3rdSem")
const Result2ndSem = mongoose.model("Result2ndSem",resultSchema2ndSem,"results2ndSem")
const Result1stSem = mongoose.model("Result1stSem",resultSchema1stSem,"results1stSem")

export {Result3rdSem,Result4thSem,Result2ndSem,Result1stSem}