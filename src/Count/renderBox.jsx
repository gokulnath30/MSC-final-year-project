
import $ from 'jquery';
import Database from '../database'
import html2canvas from 'html2canvas';




export const renderBoxes = (canvasRef, threshold, boxes_data, scores_data, classes_data) => {
  const ctx = canvasRef.current.getContext("2d");
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height); 
  const db = Database();

  const font = "18px sans-serif";
  // let labels = ['1','0']
  ctx.font = font;
  ctx.textBaseline = "top";
  let total = 0
  var frame = document.getElementById('out_img');
  $("#canvasId").attr('width',frame.offsetWidth)
  $("#canvasId").attr('height',frame.offsetHeight)

  for (let i = 0; i < scores_data.length; ++i) {
    if (scores_data[i] > threshold) {
      // const klass = labels[classes_data[i]];
      // const score = (scores_data[i] * 100).toFixed(1);

      let [x1, y1, x2, y2] = boxes_data.slice(i * 4, (i + 1) * 4);
      total +=1

      x1 *= canvasRef.current.width;
      x2 *= canvasRef.current.width;
      y1 *= canvasRef.current.height;
      y2 *= canvasRef.current.height;
      const width = x2 - x1;
      const height = y2 - y1;
     
      
      
      // DRAW circle 
      var cx = (x1+width/2)
      var cy = (y1+height/2)
      ctx.beginPath();
      ctx.arc(cx, cy, 12, 0, Math.PI * 2, true);        
      ctx.font = "bold 10pt Courier";
      ctx.fillText(total, cx-5, cy);
      ctx.fill = 'red';
      ctx.lineWidth = 2;
      ctx.strokeStyle = "#" + Math.floor(Math.random()*16777215).toString(16);
      ctx.stroke();


      $("#totalCount").html(total)

    // $('#showimg').css({"width":this.videoConstraints['width']+"px","height":this.videoConstraints['height']+"px"});

      // Draw the label background.
      // ctx.fillStyle = "#00FF00";
      // const textWidth = ctx.measureText(klass + " - " + score + "%").width;
      // const textHeight = parseInt(font, 10); // base 10
      // ctx.fillRect(x1 - 1, y1 - (textHeight + 2), textWidth + 2, textHeight + 2);

      // Draw labels
      // ctx.fillStyle = "#ffffff";
      // ctx.fillText(klass + " - " + score + "%", x1 - 1, y1 - (textHeight + 2));
    }
  }

 
  // var today = new Date();
  // var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
  // var time = today.getHours()+':'+today.getMinutes()+':'+today.getSeconds();
  // db.history.add({image:frame.src, count: total, time: date + ' '+ time})
  // console.log(total,"dasdad")

  return total
};
