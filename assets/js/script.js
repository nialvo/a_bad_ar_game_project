
//character position and rendering

//position
let X = document.getElementById("x");
let Y = document.getElementById("y");
let Z = document.getElementById("z");
var x,y,z;
let acl = new Accelerometer({frequency: 30});

//canvas
/*
let canvas = document.getElementById("aug");
let ctx = canvas.getContext("2d");
ctx.globalAlpha=1;
let gangst = document.getElementById("image1");
let pos = [];

let i=0;
x=0;
z=5;
*/
acl.addEventListener('reading', () => {

    x = Math.round(acl.x *10)/10;
    y = Math.round(acl.y *10)/10;
    z = Math.round(acl.z *10)/10;

    X.textContent= x;
    Y.textContent= y;
    Z.textContent= z;
  
});

acl.start();
/*
setInterval(loop,250)

function loop(){
    pos[0]=640-100-x*6;
    pos[1]=360-250-(z-5)*3;
    draw();
}

//character rendering


function draw(){

    //clear previous drawing
    ctx.clearRect(0,0,1280,720);

    //draw 
    ctx.drawImage(gangst,pos[0], pos[1]);

}



//video feed
const video = document.querySelector('video');

const constraints = { 
    audio: false,
    video: { 
        width: 1280, 
        height: 720,
        
    } 
};

navigator.mediaDevices.getUserMedia(constraints)
.then(function(mediaStream) {
  
  video.srcObject = mediaStream;
  video.onloadedmetadata = function(e) {
    video.play();
  };
})
.catch(function(err) { console.log("nooo"); }); 
*/