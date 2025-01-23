import Attendence from '../models/attendenceModel.js'

const getAttendence = async(req,res)=>{
    try{
        const month = req.params.id
        const attendData = await Attendence.findOne({monthName:month});
        res.json(attendData)
    }
    catch(err){
        res.json({error:"Error",details:err.message});
        }
    }

export {getAttendence}