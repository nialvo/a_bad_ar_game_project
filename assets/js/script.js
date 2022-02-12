
//character position and rendering

//position
let X = document.getElementById("x");
let Y = document.getElementById("y");
let Z = document.getElementById("z");
var x,y,z;
let acl = new Accelerometer({frequency: 30});

//canvas

let canvas = document.getElementById("aug");
let ctx = canvas.getContext("2d");
ctx.globalAlpha=1;
let gangst = document.getElementById("image1");
let pos = [];



acl.addEventListener('reading', () => {

    x = Math.round(acl.x *10)/10;
    y = Math.round(acl.y *10)/10;
    z = Math.round(acl.z *10)/10;

    X.textContent= x;
    Y.textContent= y;
    Z.textContent= z;
  
});




function loop(){
    pos[0]=540-100-x*60;
    pos[1]=990-250-(z-5)*30;
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
        width: 1080, 
        height: 1980,
        facingMode: {
            exact: 'environment'
        }
        
    } 
};

navigator.mediaDevices.getUserMedia(constraints)
.then(function(mediaStream) {

  video.srcObject = mediaStream;
  video.onloadedmetadata = function(e) {
    video.play();
    acl.start();
    setInterval(loop,25);
  };
})
.catch(function(err) { console.log("nooo"); }); 
