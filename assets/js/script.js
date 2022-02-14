const xaEl = document.getElementById("xa");
const yaEl = document.getElementById("ya");
const zaEl = document.getElementById("za");

let xa=0;//initialize default acceleration (just to buffer till we get a reading)
let ya=0;
let za=0;

let xs=0;//initialize unrotated default speed
let ys=0;
let zs=0;

let dx=0;//initialize default rotated speed
let dy=0;
let dz=0;

const sf=.05; //speed factor, this will prob get dissolved when we use proper projection

const laSensor = new LinearAccelerationSensor({frequency: 60});

laSensor.addEventListener('reading', e => {
  xa=laSensor.x;
  ya=laSensor.y;
  za=laSensor.z;
  
});




const iEl = document.getElementById("i");
const jEl = document.getElementById("j");
const kEl = document.getElementById("k");

let I = 5;//initialize unrotated untranslated gangster coordinates 
let J = 5;
let K = 5;
let i=0;//rotated coordinates 
let j=0;
let k=0;
let pi=0;//
let pj=0;
let pk=0;

let w=1;//initialize default quaternion (just to buffer till we get a reading)
let x=0;
let y=0;
let z=0;




const options2 = { frequency: 60, referenceFrame: 'device' };
const sensor2 = new AbsoluteOrientationSensor(options2);

sensor2.addEventListener('reading', () => {
    w=sensor2.quaternion[0];
    x=sensor2.quaternion[1];
    y=sensor2.quaternion[2];
    z=sensor2.quaternion[3];
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

let wInc = wid/7; //5 too small



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



function polygon(px,py,col){
    
    ctx.fillStyle = col;
    ctx.beginPath();
    ctx.moveTo(px[0], py[0]);
    for(let pts=1; pts<px.length; pts++) ctx.lineTo(px[pts],py[pts]);
    ctx.closePath();
    ctx.fill();
}





let pos=[];

function draw(){
    ctx.clearRect(0,0,wid,wid);//clear previous drawing
    ctx.drawImage(gangst,pos[0], pos[1]);//draw  
}

function loop(){

    xs+=xa;//adjust speed
    ys+=ya;
    zs+=za;

    //rotate translation
    dx=xs*(1-2*(y*y+z*z))+ys*2*(x*y-w*z)+zs*2*(w*y+x*z);// quaternion rotation matrix * original position
    dy=xs*2*(x*y+w*z)+ys*(1-2*(x*x+z*z))+zs*2*(y*z-w*x);
    dz=xs*(x*z-w*y)+ys*2*(w*x+y*z)+zs*(1-2*(x*x+y*y));

    //good luck and patience
    xs/=2;
    ys/=2;
    zs/=2;


    //translate
    I+=dx*sf;
    J+=dy*sf;
    K+=dz*sf;



    //rotate point
    i=I*(1-2*(y*y+z*z))+J*2*(x*y-w*z)+K*2*(w*y+x*z);// quaternion rotation matrix * original position
    j=I*2*(x*y+w*z)+J*(1-2*(x*x+z*z))+K*2*(y*z-w*x);
    k=I*(x*z-w*y)+J*2*(w*x+y*z)+K*(1-2*(x*x+y*y));



    pos[0]=midX-100+k*wInc;
    pos[1]=midX-250+j*wInc;

    xaEl.textContent=Math.round(xa*10)/10;
    yaEl.textContent=Math.round(ya*10)/10;
    zaEl.textContent=Math.round(za*10)/10;
  
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
        sensor2.start();//2 is for experiment
        laSensor.start();
        setInterval(loop,25);
    };
})
.catch(function() { console.log("nooo"); }); 




