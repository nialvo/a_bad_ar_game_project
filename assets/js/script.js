

let X = document.getElementById("x");
let Y = document.getElementById("y");
let Z = document.getElementById("z");
var x,y,z;
let acl = new Accelerometer({frequency: 30});



const canvas = document.getElementById("aug");
const ctx = canvas.getContext("2d");
ctx.globalAlpha=1;
let gangst = document.getElementById("image1");
let pos = [];

const video = document.querySelector('video');
let w = screen.width;
let h = screen.height;
let midX=Math.round(w);
let midY=Math.round(h);
video.setAttribute("width",w);
video.setAttribute("height",w);
canvas.setAttribute("width",w);
canvas.setAttribute("height",w);
let incX = Math.round(midX/5);
let incY = Math.round(midY/5);



acl.addEventListener('reading', () => {

    x = Math.round(acl.x *10)/10;
    y = Math.round(acl.y *10)/10;
    z = Math.round(acl.z *10)/10;

    X.textContent= x;
    Y.textContent= y;
    Z.textContent= z;
  
});


function draw(){

    //clear previous drawing
    ctx.clearRect(0,0,w,w);

    //draw 
    ctx.drawImage(gangst,pos[0], pos[1]);

}



function loop(){
    pos[0]=midX-100-x*incX;
    pos[1]=midX-250-(z-5)*incX;
    draw();
}

const constraints = { 
    audio: false,
    video: { 
        width: w, 
        height: w,
        facingMode: {
            exact: 'environment'
        }
        
    } 
};
/////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////////////////

navigator.mediaDevices.getUserMedia(constraints)
.then(function(mediaStream) {

  video.srcObject = mediaStream;
  video.onloadedmetadata = function(e) {
    video.play();
    acl.start();

    setInterval(loop,25);
/*
    ctx.clearRect(0,0,w,w);
    let xx = Math.round(midX/2);
    //let yy = Math.round(midY/2);
    ctx.fillStyle = "black";
    ctx.fillRect(midX,midX,100,250);
    ctx.fillStyle = "red";
    ctx.fillRect(xx,xx,100,250);
*/
  };
})
.catch(function(err) { console.log("nooo"); }); 
