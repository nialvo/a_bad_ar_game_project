
let Q =new Array(4)
let q =new Array(4);

for(let h=0;h<4;h++){
    q[h]=0;
} 

Q[0] = document.getElementById("q0");
Q[1] = document.getElementById("q1");
Q[2] = document.getElementById("q2");
Q[3] = document.getElementById("q3");
M = document.getElementById("m");


const options = { frequency: 30, referenceFrame: 'device' };
const sensor = new AbsoluteOrientationSensor(options);

sensor.addEventListener('reading', () => {
    for(let h=0;h<4;h++){
        q[h]=sensor.quaternion[h];
        Q[h].textContent=Math.round(q[h]*100)/100;
    } 
    m=q[0]*q[0]+q[1]*q[1]+q[2]*q[2]+q[3]*q[3];
    M.textContent=m;

});




const video = document.querySelector('video');




const canvas = document.getElementById("aug");
const ctx = canvas.getContext("2d");
ctx.globalAlpha=1;
let gangst = document.getElementById("image1");
let pos = [];

let w = window.innerWidth;
let h = window.innerHeight;


let midX=Math.round(w/2);
let midY=Math.round(h/2);
video.setAttribute("width",w);
video.setAttribute("height",w);
canvas.setAttribute("width",w);
canvas.setAttribute("height",w);

let xInc = w/.3;
//let incY = Math.round(midY/5);


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










function draw(){
    //clear previous drawing
    ctx.clearRect(0,0,w,w);
    //draw 
    ctx.drawImage(gangst,pos[0], pos[1]);  
}


function loop(){
    pos[0]=Math.round(midX-100+(q[2])*xInc);
    pos[1]=Math.round(midX-250+(q[0]-.5)*xInc);
    
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




