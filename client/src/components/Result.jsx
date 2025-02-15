import './Result.css'
import {useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import {toast} from 'react-toastify'
import axios from 'axios'

const Result = ()=>{

    const [resultData,setResultData] = useState()
    const [backlog,setBacklog] = useState()
    const [SGPA,setSGPA] = useState()
    const [CGPA,setCGPA] = useState()
    const [availableSem,setAvailableSem] = useState({})

    useEffect(()=>{
        const fetchAvailableSem = async()=>{
            const enr = 2203051050542
            const availR = await axios.get(`http://localhost:8000/att/availableResult`,{params:{enr}})
            const x = availR.data
            const m = x["results"]
            setAvailableSem(m)
        }

        fetchAvailableSem()
    },[])

    const calculateCGPA = async(r)=>{
        const gradePoint = {
            "F":0,
            "P":5,
            "B":6,
            "B+":7,
            "A":8,
            "A+":9,
            "O":10
        }
        let totalcrd = 0
        let totalpoint = 0
        for(let i =1;i<=r;i++){
            const sem = `${i}th`
            const result = await axios.get(`http://localhost:8000/att/result/${2203051050542}`,{params:{sem}})
            const mainData = result.data
            const c = Object.entries(mainData.result)
            for(let i=0;i<c.length;i++){
                let cdt = Number(c[i][1].credit)
                totalcrd += cdt
                totalpoint += (gradePoint[c[i][1].marks]*cdt)
            }
        }
        setCGPA((totalpoint/totalcrd).toFixed(2))

    }

    const calculateSGPA = (r)=>{
        const gradePoint = {
            "F":0,
            "P":5,
            "B":6,
            "B+":7,
            "A":8,
            "A+":9,
            "O":10
        }
        const c = Object.entries(r.result)
        let totalcrd = 0
        let totalpoint = 0
        let backlog = 0
        for(let i=0;i<c.length;i++){
            let cdt = Number(c[i][1].credit)
            totalcrd += cdt
            totalpoint += (gradePoint[c[i][1].marks]*cdt)
            if(c[i][1].marks==="F"){
                backlog += 1
            }
        }
        setSGPA((totalpoint/totalcrd).toFixed(2))
        setBacklog(backlog)
    }
    
    const viewResult = async(event)=>{
        try{
            const sem = event.target.value
            if(!sem){
                setResultData()
            }
            const r = Number(sem[0])
            const result = await axios.get(`http://localhost:8000/att/result/${2203051050542}`,{params:{sem}})
            setResultData(result.data)   
            calculateSGPA(result.data)
            calculateCGPA(r)
            toast.success("Data Fetched")
        }catch(err){
            toast.error("Failed Fetching")
        }
    }
    return (
        <>
            <section>
                <nav className="navbar">
                    <Link to={'/'} className="links">Profile</Link>          
                    <Link to={`/attendence/${0}`} className="links">Attendence</Link>          
                    <Link to={''} className="links">Result</Link>
                    <Link to={'/'} className="links">Sign In</Link>
                    <Link to={'/'} className="links">Login</Link>
                </nav>
            </section>
            <section className='result-section'>
                <div className='result-section-div'>
                    <label htmlFor="semResult" className='select-label'>Results : </label>
                    <select name="semResult" id="result" onChange={viewResult} className='select-option'>
                        <option value="">--Select Result--</option>
                        {
                            Object.entries(availableSem).map(([index,value])=>{
                                return <option key={index} value={`${index}th`}>{value}</option>
                            })
                        }
                    </select>
                </div>
            </section>
            {resultData &&(
            <section className='result'>
                <div className='result-table'>
                        <div>
                            <h2 style={{marginLeft:"20px"}}>Result Table</h2>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Sr no.</th>
                                        <th className='sname'>Subject</th>
                                        <th className='scode'>Code</th>
                                        <th className='scredit'>Credit</th>
                                        <th className='smarks'>Marks</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Object.entries(resultData.result).map(([subject,data],index)=>( 
                                        <tr key={subject}>
                                            <td>{index+1}</td>
                                            <td>{data.subjectName}</td>
                                            <td>{data.code}</td>
                                            <td className='scredit'>{data.credit}</td>
                                            <td className='scredit'>{data.marks}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                </div>
                <div className='result-calculation'>
                    <div className='box'>
                    <div className='result-calculation-data'>
                        <div className='result-calculation-data-all'>Name</div>
                        <div className='result-calculation-data-all'>Vandan Nandwana</div>
                        <div className='result-calculation-data-all'>Enrollment</div>
                        <div className='result-calculation-data-all'>2203051050376</div>
                        <div className='result-calculation-data-all'>Backlog</div>
                        <div className='result-calculation-data-all'>{backlog}</div>
                        <div className='result-calculation-data-all'>SGPA</div>
                        <div className='result-calculation-data-all'>{SGPA}</div>
                        <div className='result-calculation-data-all'>CGPA</div>
                        <div className='result-calculation-data-all'>{CGPA}</div>
                    </div>
                    </div>
                </div>
            </section>
                    )}
        </>
    )
}

export default Result