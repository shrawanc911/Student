import {useEffect,useState} from 'react'
import './Attendence.css'
import {Link,useLocation,useParams,useNavigate} from 'react-router-dom'
import toast from 'react-hot-toast'
import '@fortawesome/fontawesome-free/css/all.min.css'
import axios from 'axios'

const Attend = ()=>{

    // const location = useLocation()
    // console.log(location)
    // const ind = location.state?.ind ?? 1;

    const {ind} = useParams()
    const navigate = useNavigate()


    const month = ["July 2024","August 2024","September 2024"]

    const monthStartDay = {
        "July 2024":0,
        "August 2024":3,
        "September 2024":6
    }

    const [attendence ,setAttendence] = useState({});
    useEffect(()=>{
        let b = document.querySelectorAll('.dn');
        b.forEach(element => {
            element.style.display = 'flex';
            element.style.height = '100%';
            element.style.width = '100%';
            element.style.textAlign = 'center';
            element.style.justifyContent = 'center';
            element.style.alignItems = 'center';
            element.style.margin = '0';
            element.style.border = '1px solid black';
        })
        for(let i=1;i<43;i++){
            let a = document.querySelector(`.date${i}`)
                a.style.display = 'flex';
                a.style.height = '100%';
                a.style.width = '100%';
                a.style.textAlign = 'center';
                a.style.justifyContent = 'center';
                a.style.alignItems = 'center';
                a.style.margin = '0';
                a.style.border = '1px solid black';
                a.style.backgroundColor = 'white';
                a.innerHTML = ''
            }  
        // const attendenceData = {
        //     1:"A",
        //     2:"P",
        //     30:"A",
        //     40:"P"
        // }
        const fetchData = async()=>{
            try{
                if(Number(ind)>2){
                    console.log(ind)
                    alert("You are to move forward");
                    navigate(`/move/${Number(ind)-1}`)
                    return 
                }
                if(Number(ind)<0){
                    console.log(ind)
                    alert("You are to moving back");
                    navigate(`/move/${Number(ind)+1}`)
                    return 
                }
                // console.log("You are return ",ind)
                const r = month[ind]
                const response = await axios.post(`http://localhost:8000/att/${r}`);
                setAttendence(response.data)
                const attend = response.data
                const monthNameClass = document.querySelector(".name");
                monthNameClass.innerHTML = `${attend.monthName}`;
                // console.log(ind)
                const extraDay = monthStartDay[monthNameClass.innerHTML]
                if (attend && attend.Days) {
                    Object.entries(attend.Days).forEach(([key, value]) => {
                        let a = document.querySelector(`.date${Number(key)+Number(extraDay)}`);
                        if (a) {
                            if (value === 'P') {
                                a.style.backgroundColor = 'rgb(5, 175, 13)';
                                a.style.color = 'black';
                                // a.innerHTML = `${key}`
                            } else if (value === 'A') {
                                a.style.backgroundColor = 'rgb(255, 8, 0)';
                                a.style.color = 'black';
                                // a.innerText = `${key}`;
                            }
                        }
                    })}
                    let i = 1;
                    let day = fetchMonthLastDay(attend.monthName);
                    while (i<=day) {
                        let a = document.querySelector(`.date${i+extraDay}`);
                        a.innerText = `${i}`;
                        i++;
                    }
                }catch(err){
                // console.error("Error in fetching the data: ",err);
                toast.error(()=>{
                    if(err.response?.status===401){
                        toast.error("Unauthorized. Please login again.",{
                            position:'top-right'
                        })
                    }else{
                        toast.error("Failed to fetch the user data",{
                            position:'top-right'
                        })
                    }
                })
                
            }
        }
        const fetchMonthLastDay = (monthName)=>{
            const monthTotalDay = {
                "July":31,
                "August":31,
                "September":30
            }
            const monthData = monthName.split(' ')
            if(monthData[0]==="February" && (Number(monthData[1])%4===0)){
                return 29
            }
            console.log(monthTotalDay[monthData[0]])
            return monthTotalDay[monthData[0]]
        }
        fetchData()
        // console.log(attendence[0].Days)
        

        
    },[ind])
    // useEffect(() => {
    //     let b = document.querySelectorAll('.dn');
    //     b.forEach(element => {
    //         element.style.display = 'flex';
    //         element.style.height = '100%';
    //         element.style.width = '100%';
    //         element.style.textAlign = 'center';
    //         element.style.justifyContent = 'center';
    //         element.style.alignItems = 'center';
    //         element.style.margin = '0';
    //         element.style.border = '1px solid black';
    //         element.style.innerHtml = ''
    //     })
    //     for(let i=1;i<43;i++){
    //         let a = document.querySelector(`.date${i}`)
    //             a.style.display = 'flex';
    //             a.style.height = '100%';
    //             a.style.width = '100%';
    //             a.style.textAlign = 'center';
    //             a.style.justifyContent = 'center';
    //             a.style.alignItems = 'center';
    //             a.style.margin = '0';
    //             a.style.border = '1px solid black';
    //         }  
        // if (attendence[0] && attendence[0].Days) {
        //     Object.entries(attendence[0].Days).forEach(([key, value]) => {
        //         let a = document.querySelector(`.date${key}`);
        //         if (a) {
        //             if (value === 'P') {
        //                 a.style.backgroundColor = 'rgb(5, 175, 13)';
        //                 a.style.color = 'black';
        //             } else if (value === 'A') {
        //                 a.style.backgroundColor = 'rgb(255, 8, 0)';
        //                 a.style.color = 'black';
        //             }
        //         }
        //     });
    //     }},[attendence])
        // Object.entries(attendence).forEach(([key, value]) => {
            //     let a = document.querySelector(`.date${key}`)
            //     if (value === 'P') {
                //         console.log(a)
                //         a.style.backgroundColor = 'rgb(5, 175, 13)'
                //         a.style.color = 'black'
                //     }else if(value == 'A'){
                    //         a.style.backgroundColor = 'rgb(255, 8, 0)'
                    //         a.style.color = 'black'
                    //     }
                    // })
                
        // useEffect(()=>{
        //     console.log(attendence[0].Days)
        //     // if (attendence && attendence.Days) {
        //         Object.entries(attendence[0].Days).forEach(([key,value])=>{
        //             let a = document.querySelector(`date${key}`);
        //             if (a) {
        //                 if (value === "P") {
        //                     a.style.backgroundColor = "rgb(5, 175, 13)";
        //                     a.style.color = "black";
        //                 } else if (value === "A") {
        //                     a.style.backgroundColor = "rgb(255, 8, 0)";
        //                     a.style.color = "black";
        //                 }
        //             }
        //         })
        //     }
        // ,[])
    
    return (
        <>
            <section>
                <nav className="navbar">
                    <Link to={'/'} className="links">Profile</Link>          
                    <Link to={`/attendence/${0}`} className="links">Attendence</Link>          
                    <Link to={'/result'} className="links">Result</Link>
                    <Link to={'/'} className="links">Sign In</Link>
                    <Link to={'/'} className="links">Login</Link>
                </nav>
            </section>
            <section>
                <div className="mainbody">
                    <div className="calendarbody">
                        <div className="calendar">
                            <div className="monthname">
                               <div className="leftmove">
                                 <Link to={`/move/${Number(ind)-1}`} style={{color:'inherit'}}><i className="fa-solid fa-caret-left"></i></Link>
                               </div>
                               <div className="month"><p className="name">{/*July 2024*/}</p></div>
                               <div className="rightmove">
                                 <Link to={`/move/${Number(ind)+1}`} style={{color:'inherit'}}><i className="fa-solid fa-caret-right"></i></Link>
                               </div>
                            </div>
                            <div className="attend">
                                <div className="dn">Mon</div>
                                <div className="dn">Tue</div>
                                <div className="dn">Wed</div>
                                <div className="dn">Thu</div>
                                <div className="dn">Fri</div>
                                <div className="dn">Sat</div>
                                <div className="dn">Sun</div>
                                <div className="date1"></div>
                                <div className="date2"></div>
                                <div className="date3"></div>
                                <div className="date4"></div>
                                <div className="date5"></div>
                                <div className="date6"></div>
                                <div className="date7"></div>
                                <div className="date8"></div>
                                <div className="date9"></div>
                                <div className="date10"></div>
                                <div className="date11"></div>
                                <div className="date12"></div>
                                <div className="date13"></div>
                                <div className="date14"></div>
                                <div className="date15"></div>
                                <div className="date16"></div>
                                <div className="date17"></div>
                                <div className="date18"></div>
                                <div className="date19"></div>
                                <div className="date20"></div>
                                <div className="date21"></div>
                                <div className="date22"></div>
                                <div className="date23"></div>
                                <div className="date24"></div>
                                <div className="date25"></div>
                                <div className="date26"></div>
                                <div className="date27"></div>
                                <div className="date28"></div>
                                <div className="date29"></div>
                                <div className="date30"></div>
                                <div className="date31"></div>
                                <div className="date32"></div>
                                <div className="date33"></div>
                                <div className="date34"></div>
                                <div className="date35"></div>
                                <div className="date36"></div>
                                <div className="date37"></div>
                                <div className="date38"></div>
                                <div className="date39"></div>
                                <div className="date40"></div>
                                <div className="date41"></div>
                                <div className="date42"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Attend