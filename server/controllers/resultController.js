import {Result3rdSem,Result4thSem,Result2ndSem,Result1stSem} from '../models/resultModel.js';
import { AvailableResult } from '../models/studentAvailableResult.js';

const getAvailableResult = async(req,res)=>{
    try{
        const enroll = req.query.enr;
        const availres = await AvailableResult.findOne({enrollment:enroll})
        res.json(availres)
    }catch(err){
        res.json({"msg":err.message})
    }
}

const getResult = async(req,res)=>{
    try{
        const sem = req.query.sem
        const enroll = req.params.enrollment.trim();
        if(sem==="1th"){
            const rsl = await Result1stSem.findOne({ enrollment:enroll});
            if (!rsl) return res.json({"msg": "Result not found for the given enrollment."})
            res.json(rsl)
        }else if(sem === "2th"){
            const rsl = await Result2ndSem.findOne({enrollment:enroll});
            if(!rsl) return res.json({"msg":"Result not found for the given enrollment."})
            res.json(rsl)
        }else if(sem==="3th"){
            const rsl = await Result3rdSem.findOne({enrollment:enroll});
            if(!rsl) return res.json({"msg":"Result not found for the given enrollment."})
            res.json(rsl)
        }else if(sem==="4th"){
            const rsl = await Result4thSem.findOne({enrollment:enroll});
            if(!rsl) return res.json({"msg":"Result not found for the given enrollment."})
            res.json(rsl)
        }
        // console.log("Query Result:", rsl);
        
        // console.log(rsl)
        
    }
    catch(err){
        res.json({msg:err.message})
    }
}

export {getResult,getAvailableResult};