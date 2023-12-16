import Dexie from 'dexie';

const Database = ()=>{
  var db = new Dexie("countshapes");
  
    db.version(1).stores({
      history: "++id,count,input,mobile,obj_type,output",
      forms: "++id,lable,input,options,time"
    });
    
  return db;
  
}


export default Database