


const iEl = document.getElementById("i");
const jEl = document.getElementById("j");
const kEl = document.getElementById("k");
let I = 5;//initial gangster coordinates 
let J = 5;
let K = 5;
let i=0;//new coordinates 
let j=0;
let k=0;

let w=1;//initialize default quaternion (just to buffer till we get a reading)
let x=0;
let y=0;
let z=0;

let pos=[];


const options = { frequency: 30, referenceFrame: 'device' };
const sensor = new AbsoluteOrientationSensor(options);

sensor.addEventListener('reading', () => {
    w=sensor.quaternion[0];
    x=sensor.quaternion[1];
    y=sensor.quaternion[2];
    z=sensor.quaternion[3];
    
});




const video = document.querySelector('video');




const canvas = document.getElementById("aug");
const ctx = canvas.getContext("2d");
ctx.globalAlpha=1;
let gangst = document.getElementById("image1");


let wid = window.innerWidth;
let hei = window.innerHeight;


let midX=Math.round(wid/2);
let midY=Math.round(hei/2);
video.setAttribute("width",wid);
video.setAttribute("height",wid);
canvas.setAttribute("width",wid);
canvas.setAttribute("height",wid);

let wInc = wid/5;



const constraints = { 
    audio: false,
    video: { 
        width: wid, 
        height: wid,
        facingMode: {
            exact: 'environment'
        }
        
    } 
};










function draw(){
    //clear previous drawing
    ctx.clearRect(0,0,wid,wid);
    //draw 
    ctx.drawImage(gangst,pos[0], pos[1]);  
}


function loop(){
    // quaternion rotation matrix * original position
    i=I*(1-2*(y*y+z*z))+J*2*(x*y-w*z)+K*2*(w*y+x*z);
    j=I*2*(x*y+w*z)+J*(1-2*(x*x+z*z))+K*2*(y*z-w*x);
    k=I*(x*z-w*y)+J*2*(w*x+y*z)+K*(1-2*(x*x+y*y));

    pos[0]=midX-100+k*wInc;
    pos[1]=midX-250+j*wInc;



    
    iEl.innerText=Math.round(i*100)/100;
    jEl.innerText=Math.round(j*100)/100;
    kEl.innerText=Math.round(k*100)/100;

    
    draw();
}


/////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////////////////

navigator.mediaDevices.getUserMedia(constraints)
.then(function(mediaStream) {

    video.srcObject = mediaStream;

    video.onloadedmetadata = function(e) {

        video.play();
        sensor.start();
        setInterval(loop,25);

    };
})
.catch(function(err) { console.log("nooo"); }); 




