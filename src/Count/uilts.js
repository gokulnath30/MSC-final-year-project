
const CurrentTime = () =>{
  var today = new Date();
  var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
  var time = today.getHours()+':'+today.getMinutes()+':'+today.getSeconds();
  
  return date+' '+time
  }

export default CurrentTime