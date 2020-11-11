var camera;
var scene;
var renderer;
var renderer2;
var mesh;
var videoTexture;
var video;
var stats;
var geometry = new THREE.CubeGeometry(6,12, 12);
var edges = new THREE.EdgesGeometry( geometry );
var line = new THREE.LineSegments( edges, new THREE.LineBasicMaterial( { color: "0xffffff",  lineWidth: 10}) );
var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();

let videos1 = [ "./headimages/flowers.mp4", "./headimages/flowers.mp4", "./headimages/flowers.mp4"]
let videos2 = [ "./headimages/sky2.mp4", "./headimages/sky2.mp4", "./headimages/sky2.mp4"]

init();
animate();
function init() {


  var nodes = document.querySelector('#dits').childNodes;
    for(var i=0; i<nodes.length; i++) {
     nodes[i].style = "top:"+ Math.random()*(window.innerHeight-40) +"px; left:"+ Math.random()*(window.innerWidth-350) +"px";
     
}


// document.querySelector(".dot").style = "background-color: yellow;"


  stats = new Stats();
  document.body.appendChild(stats.dom);

  scene = new THREE.Scene();
  scene.background = new THREE.Color( "black" );

  camera = new THREE.PerspectiveCamera(15, window.innerWidth / window.innerHeight, 0.1, 100);

  //lägg in två ljuspunkter, ändra färg?

  var light = new THREE.DirectionalLight("white");
  light.position.set(-1, 1, 1).normalize();
  scene.add(light);

  var light2 = new THREE.DirectionalLight("white");
  light2.position.set(11, 1, 1).normalize();
  scene.add(light2);

  /// lagg in video, gor till textur


  ///material1
  video = document.querySelector( '#video' );
  videoTexture = new THREE.VideoTexture(video);
  videoTexture.minFilter = THREE.LinearFilter;
  videoTexture.magFilter = THREE.LinearFilter;
  videoTexture.format = THREE.RGBFormat;

  ///material2
  video2 = document.querySelector( '#video' );
  videoTexture2 = new THREE.VideoTexture(video2);
  videoTexture2.minFilter = THREE.LinearFilter;
  videoTexture2.magFilter = THREE.LinearFilter;
  videoTexture2.format = THREE.RGBFormat;

  
  ///material2
  video3 = document.querySelector( '#video' );
  videoTexture3 = new THREE.VideoTexture(video3);
  videoTexture3.minFilter = THREE.LinearFilter;
  videoTexture3.magFilter = THREE.LinearFilter;
  videoTexture3.format = THREE.RGBFormat;

  
  var material = new THREE.MeshPhongMaterial({ map: videoTexture });
  var material2 = new THREE.MeshPhongMaterial({ map: videoTexture2 });
  var material3 = new THREE.MeshPhongMaterial({ map: videoTexture3 });

  // var face1 = [new THREE.Vector2(0, .5), new THREE.Vector2(.3333, .5), new THREE.Vector2(.3333, 1), new THREE.Vector2(0, 1)];
  // var face5 = [new THREE.Vector2(.3333, .5), new THREE.Vector2(.6666, .5), new THREE.Vector2(.6666, 1), new THREE.Vector2(.3333, 1)];
  // var face3 = [new THREE.Vector2(.6666, .5), new THREE.Vector2(1, .5), new THREE.Vector2(1, 1), new THREE.Vector2(.6666, 1)];
  // var face4 = [new THREE.Vector2(0, 0), new THREE.Vector2(.3333, 0), new THREE.Vector2(.3333, .5), new THREE.Vector2(0, .5)];
  // var face2 = [new THREE.Vector2(.3333, 0), new THREE.Vector2(.6666, 0), new THREE.Vector2(.6666, .5), new THREE.Vector2(.3333, .5)];
  // var face6 = [new THREE.Vector2(.6666, 0), new THREE.Vector2(1, 0), new THREE.Vector2(1, .5), new THREE.Vector2(.6666, .5)];

  // geometry.faceVertexUvs[0] = [];

  // geometry.faceVertexUvs[0][0] = [face1[0], face1[1], face1[3]];
  // geometry.faceVertexUvs[0][1] = [face1[1], face1[2], face1[3]];

  // geometry.faceVertexUvs[0][2] = [face2[0], face2[1], face2[3]];
  // geometry.faceVertexUvs[0][3] = [face2[1], face2[2], face2[3]];

  // geometry.faceVertexUvs[0][4] = [face3[0], face3[1], face3[3]];
  // geometry.faceVertexUvs[0][5] = [face3[1], face3[2], face3[3]];

  // geometry.faceVertexUvs[0][6] = [face4[0], face4[1], face4[3]];
  // geometry.faceVertexUvs[0][7] = [face4[1], face4[2], face4[3]];

  // geometry.faceVertexUvs[0][8] = [face5[0], face5[1], face5[3]];
  // geometry.faceVertexUvs[0][9] = [face5[1], face5[2], face5[3]];

  // geometry.faceVertexUvs[0][10] = [face6[0], face6[1], face6[3]];
  // geometry.faceVertexUvs[0][11] = [face6[1], face6[2], face6[3]];

  mesh = new THREE.Mesh(geometry, material);
  mesh2 = new THREE.Mesh(geometry, material2);
  mesh3 = new THREE.Mesh(geometry, material3);

  
  mesh.position.x = 0;
  mesh.position.z = -80;

  mesh2.position.z = -80;
  mesh2.position.x = -20;

  mesh3.position.z = -80;
  mesh3.position.x = 20;

  line.position.z = -80;

  scene.add(mesh);
  scene.add(mesh2);
  scene.add(mesh3);
  // scene.add( line );

  renderer = new THREE.WebGLRenderer();



  renderer.setSize(window.innerWidth, window.innerHeight);
  document.getElementById('container').appendChild(renderer.domElement);

  window.addEventListener('resize', onWindowResize, false);

  render();


}



function animate() {
  // mesh.rotation.x += 0.002;
  // mesh.rotation.y += 0.001;

  render();
  requestAnimationFrame(animate);
}

function render() {
  renderer.render(scene, camera);
}

window.addEventListener('click', onDocumentMouseDown, false);

mesh.callback = function() { 

  document.querySelector("#video").src = "./headimages/flowers.mp4";

}
mesh2.callback = function() { 


    document.querySelector("#video").src = "./headimages/sky2.mp4";

}
mesh3.callback = function() {

  document.querySelector("#video").src = "./headimages/pulp2.mp4";
}


function onDocumentMouseDown( event ) {

      event.preventDefault();

      mouse.x = ( event.clientX / renderer.domElement.clientWidth ) * 2 - 1;
      mouse.y = - ( event.clientY / renderer.domElement.clientHeight ) * 2 + 1;

      raycaster.setFromCamera( mouse, camera );

      var intersects = raycaster.intersectObjects( [mesh, mesh2, mesh3] ); 

      if ( intersects.length > 0 ) {
      
          intersects[0].object.callback();
      
      }

}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  // renderer2.setSize(window.innerWidth, window.innerHeight);
  render();
}

function mouseMoved(){

    var e = window.event;
    var posX = e.clientX;
    var posY = e.clientY;

  mesh.rotation.x = posY/100;
  mesh2 .rotation.x = posX/100;
  mesh3 .rotation.x = posX/250;
  mesh.rotation.z = posX/100;
  mesh2 .rotation.z = -posY/50;
  mesh3 .rotation.z = -posY/50;
  line.rotation.x = posY/100;
  line.rotation.z = posX/100;
}



///JOBBA MED LJUD

var myAudio = document.getElementsByTagName("audio");
var isPlaying = false;

function dotClick(track) {
      // video.src = "./headimages/sky2.mp4"
    for (let i=1; i<12; i++){
      // isPlaying ? myAudio.pause() : myAudio.play();
      document.getElementById("track"+i).pause();
    }
    document.getElementById("track"+track).play();
    // console.log(myAudio)
};



///JOBBA MED MENYER

$(".topbar" ).click(function() {
  $(".topbar" ).animate({
    height: "0vh",
  }, 500,'easeInOutCirc' );
    $(".topcontainer").hide();

});
$(".infobar" ).click(function() {
  $(".infobar" ).animate({
    width: "0vw",
  }, 500,'easeInOutCirc' );
});
$(".underbar" ).click(function() {
  $(".underbar" ).animate({
    height: "0vh",
  }, 500,'easeInOutCirc' );
});


function showInfo(){


      $(".infobar" ).animate({
        width: "50vw",
      }, 500,'easeInOutCirc' );
      $(".hideBtn").show();


      $(".underbar" ).animate({
        height: "50vh",
      }, 500,'easeInOutCirc' );
      $(".hideBtn2").show();


      $(".topbar" ).animate({
        height: "50vh",
      }, 500,'easeInOutCirc' );
      $(".hideBtn3").show();
      $(".topcontainer").show();


};



      $(".dot").draggable();
      $("#smiley").draggable();
      $( ".dot" ).droppable({
        tolerance: 'touch',
        drop: function( event, ui ) {
           $( this )
           .addClass( "droppedon" )
           
           
          //  .html( "Dropped with a touch!" )
        }
     });

  // function dropped(){
  //   alert("dropped")
  // }

      document.querySelector("#smiley").ondrop = function(){    alert("dropped")
    };

      

    //   $(function() {
    //     $("#draggable").draggable();
    //     $("#droppable").droppable({
    //         drop: function(event, ui) {
    //             console.log(event, ui);
    //             alert('dropped!');
    //         }
    //     });
    // });

    // function trigger_drop() {
    //     var draggable = $("#draggable").draggable(),
    //             droppable = $("#droppable").droppable(),

    //             droppableOffset = droppable.offset(),
    //             draggableOffset = draggable.offset(),
    //             dx = droppableOffset.left - draggableOffset.left,
    //             dy = droppableOffset.top - draggableOffset.top;

    //     draggable.simulate("drag", {
    //         dx: dx,
    //         dy: dy
    //     });
    // }

    // https://codepen.io/arifmahmudrana/pen/ZbxrXv