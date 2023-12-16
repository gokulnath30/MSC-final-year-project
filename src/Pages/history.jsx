import React,{useState,useEffect} from "react";
import BNav from '../nav'
import Database from '../database'
import csvDownload from 'json-to-csv-export'

import  {auth,app} from '../firebase'
import { getFirestore } from "firebase/firestore";
import { collection, getDocs } from "firebase/firestore"; 

let db = Database()



export default function History(){
  const [historyData, historyUpdate]  = useState([]);
  const [headerData, headerUpdate]  = useState([]);
  const database = getFirestore(app);
  
const getDatas = async()=>{
  var res = []
  const querySnapshot = await getDocs(collection(database, "users"));
  querySnapshot.forEach((doc) => {
    res.push(doc.data())
  });
  return res
} 

  useEffect( () => { 
    // var usertable  = db.history.toArray()
    var higher = 0;
    var usertable = getDatas()
    usertable.then(async(res)=>{
      const exportD = {}
      res.map((keys,val)=>{
        var temp = {}
        Object.keys(keys).forEach((k)=>{
            if(k !== 'url' && k !== 'id')
              temp[k] = keys[k] 
        });
        
        var lenobj = Object.keys(temp).length
        if(higher < lenobj)
        {
          headerUpdate(Object.keys(temp).sort())
           higher = lenobj
        }
       
      });
      
      historyUpdate([...exportD])
      })
  
  }, []);

  const exportFun = ()=>{
    console.log(historyData,headerData,'::::::::::::')
    const dataToConvert = {
      data: [historyData],
      filename: 'Countshpae',
      delimiter: ',',
      headers: headerData
    }

    csvDownload(dataToConvert)
  }
  
  
    return (
     <div className="p-2">
      
      <div className="row">
          <div className="col-6">
            <h5 className="bold">History</h5>
          </div>
          <div className="col-6">
            <button onClick={exportFun}  type="button" className="float-end btn btn-primary btn-circle text-right">Export</button>
          </div>  
        </div>

       <div className="row">
         {
          console.log(historyData)
        //  historyData.map((val, key) =>{
         
        //   return (  
        //       <div key={key} className="card mt-3">
        //         <div className="card-body">
        //           <div className="d-flex justify-content-between">
        //             <div className="">
                      
        //               <h6>Count : {val['count']}</h6>
        //               <h6>Time : {val['time']}</h6>
        //             </div>
        //             <div>
        //             <img className="mb-4 logo_form mt-2" src={val['url']} alt="" width="72" height="57" />
        //             </div>
        //           </div>
        //         </div>         
        //     </div>
        //   )
        // })
          }
        
       </div>


      

        <BNav/>

        
     </div>

 
  )
  }