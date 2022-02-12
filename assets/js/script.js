
//character position and rendering

//position
const X = document.getElementById("x");
const Y = document.getElementById("y");
const Z = document.getElementById("z");
var x,y,z;
let acl = new Accelerometer({frequency: 30});

//canvas
var canvas = document.getElementById("aug");
var ctx = canvas.getContext("2d");
const gangst = document.getElementById("imageLoader").children;
var gangsN = gangst.length;
var pos = new Array(gangsN);
for(let k=O;k<gangsN;k++){
    pos[k]= new Array(2);
}
let i=0;

acl.addEventListener('reading', () => {

    x = Math.round(acl.x *10)/10;
    y = Math.round(acl.y *10)/10;
    z = Math.round(acl.z *10)/10;

    pos[i][0]=640-x*6;
    pos[i][1]=360-(z-5)*3;
    draw();

    X.textContent= x;
    Y.textContent= y;
    Z.textContent= z;
  
});

acl.start();

//character rendering


function draw(){

    //clear previous drawing
    ctx.clearRect(0,0,1280,720);

    //draw background
    ctx.drawImage(gangst[i],pos[i][0], pos[i][1]);

}



//video feed
const video = document.querySelector('video');

const constraints = { 
    audio: false,
    video: { 
        width: 1280, 
        height: 720 
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
