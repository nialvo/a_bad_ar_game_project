


const X = document.getElementById("x");
const Y = document.getElementById("y");
const Z = document.getElementById("z");
let x = 1;//initial gangster position
let y = 1;
let z = 1;
let i=0;//new position 
let j=0;
let k=0;

let a=1;//initialize default quaternion (just to buffer till we get a reading)
let b=0;
let c=0;
let d=0;


const options = { frequency: 30, referenceFrame: 'device' };
const sensor = new AbsoluteOrientationSensor(options);

sensor.addEventListener('reading', () => {
    a=sensor.quaternion[0];
    b=sensor.quaternion[1];
    c=sensor.quaternion[2];
    d=sensor.quaternion[3];
    
});




const video = document.querySelector('video');




const canvas = document.getElementById("aug");
const ctx = canvas.getContext("2d");
ctx.globalAlpha=1;
//let gangst = document.getElementById("image1");


let w = window.innerWidth;
let h = window.innerHeight;


let midX=Math.round(w/2);
let midY=Math.round(h/2);
video.setAttribute("width",w);
video.setAttribute("height",w);
canvas.setAttribute("width",w);
canvas.setAttribute("height",w);

//let xInc = w/.3;
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








/* hold on the gangster rendering for now

function draw(){
    //clear previous drawing
    ctx.clearRect(0,0,w,w);
    //draw 
    ctx.drawImage(gangst,pos[0], pos[1]);  
}
*/

function loop(){
    //multiply initial position by quaternion and inverse
    i=x*(a*a+b*b+c*c+d*d)+2*b*(y*c+z*d);
    j=y*(a*a+b*b+c*c+d*d)+2*c*(b*x+d*z);
    k=x*(a*a+b*b+c*c+d*d)+2*d*(b*x+y*c);
    
    X.innerText=Math.round(i*100)/100;
    Y.innerText=Math.round(j*100)/100;
    Z.innerText=Math.round(k*100)/100;

    
    //draw();
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




