// skapa en scen, en camera och en renderare
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(2, window.innerWidth / window.innerHeight, 0.1, 1000);
var renderer = new THREE.WebGLRenderer();
var control;
var videoTexture;

// scala bilden till window-size och lägg till allt till dom:en
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// skapa en kub och ett material till kub
var geometry = new THREE.BoxGeometry(1.3,1.3, 1.3);

///gammal
var material = new THREE.MeshBasicMaterial({
    color: 0x00ff00
});

// sammanfoga dessa i en mech som består av kuben och materialet
var cubelist = []

// https://threejs.org/docs/#api/en/core/Raycaster

var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();
var materialParams = {
    envMap: 'HDR',
    roughness: 0.0,
    metalness: 0.0,
    exposure: 1.0
};



var count = 15; 

// skapa en grid av kuber  
var createCubes = function () {
    for (var i = 0; i < count; i++) {
        var templist = []
        for (var j = 0; j < count; j++) {
            var newCube = createCube2(0x000000); 
            templist.push(newCube); 
        }
        cubelist.push(templist); 
    }
}


var createCube2 = function(colorValue) {
    var color = new THREE.Color( colorValue );
    color.setHex( "#F1F1F1");
    var material = new THREE.MeshStandardMaterial( {
            color: color,
            metalness: materialParams.metalness,
            roughness: materialParams.roughness
    });
    var thecube = new THREE.Mesh(geometry, material); 
    return thecube;
}

var addCubesToScene = function () {
  for (var i = 0; i < count; i++) {
        for (var j = 0; j < count; j++) {
            scene.add(cubelist[i][j]); 
        }
    }

}

var setCubesPostion = function () {
  for (var i = 0; i < count; i++) {
        for (var j = 0; j < count; j++) {
            cubelist[i][j].position.setX((i-9)* 2); 
            cubelist[i][j].position.setZ((j-6)*2);  
        }
    }

}


THREE.ImageUtils.crossOrigin = '';
var imgTexture1 = THREE.ImageUtils.loadTexture('./headimages/side.jpg');
imgTexture1.anisotropy = renderer.getMaxAnisotropy();

THREE.ImageUtils.crossOrigin = '';
var imgTexture2 = THREE.ImageUtils.loadTexture('./headimages/side2.jpg');
imgTexture2.anisotropy = renderer.getMaxAnisotropy();

THREE.ImageUtils.crossOrigin = '';
var imgTexture3 = THREE.ImageUtils.loadTexture('./headimages/top.jpg');
imgTexture3.anisotropy = renderer.getMaxAnisotropy();

THREE.ImageUtils.crossOrigin = '';
var imgTexture4 = THREE.ImageUtils.loadTexture('./headimages/front.jpg');
imgTexture4.anisotropy = renderer.getMaxAnisotropy();

THREE.ImageUtils.crossOrigin = '';
var imgTexture5 = THREE.ImageUtils.loadTexture('./headimages/front.jpg');
imgTexture5.anisotropy = renderer.getMaxAnisotropy();

THREE.ImageUtils.crossOrigin = '';
var imgTexture6 = THREE.ImageUtils.loadTexture('./headimages/back.jpg');
imgTexture6.anisotropy = renderer.getMaxAnisotropy();


var imgCubeMaterial = [
    new THREE.MeshBasicMaterial({
        map: imgTexture1 //left
    }),
    new THREE.MeshBasicMaterial({
        map: imgTexture2//right
    }),
    new THREE.MeshBasicMaterial({
        map: imgTexture3// top
    }),
    new THREE.MeshBasicMaterial({
        color: 'red' // bottom
    }),
    new THREE.MeshBasicMaterial({
        map: imgTexture5// front
    }),
    new THREE.MeshBasicMaterial({
        map: imgTexture6//back
    })
];
// var imgCubeMaterial = [
//     new THREE.MeshBasicMaterial({
//         color: 'white' // bottom
//     }),
//     new THREE.MeshBasicMaterial({
//         color: 'blue' // bottom
//     }),
//     new THREE.MeshBasicMaterial({
//         color: 'white' // bottom
//     }),
//     new THREE.MeshBasicMaterial({
//         color: 'blue' // bottom
//     }),
//     new THREE.MeshBasicMaterial({
//         color: 'white' // bottom
//     }),
//     new THREE.MeshBasicMaterial({
//         color: 'blue' // bottom
//     })
// ];

// skapa, positonera och lägg till kuben till scenen
createCubes();
console.log(cubelist)
addCubesToScene(); 
setCubesPostion(); 

///spatial testing


var spotLight = new THREE.SpotLight( 0xffffff );
spotLight.position.set( 100, 1000, 100 );
scene.background = new THREE.Color( "black" );

scene.add( spotLight );
// sätt Kamerans postion 
camera.position.z = 5;
camera.position.y = 1000;



window.onload = function() {
     camera.lookAt(scene.position);
  }

var hex = 0xff0000; 
var animateScene = function () {
    requestAnimationFrame(animateScene); 
    renderer.render( scene, camera );
    // update the picking ray with the camera and mouse position
    raycaster.setFromCamera( mouse, camera );

    // calculate objects intersecting the picking ray
    var intersects = raycaster.intersectObjects( scene.children );

    for ( var i = 0; i < intersects.length; i++ ) {
        var r = Math.abs(intersects[ i ].object.rotation.x *0.5 );
        console.log(r); 
     
        intersects[ i ].object.material = imgCubeMaterial; 
        intersects[ i ].object.material.color = new THREE.Color(0.1+r,0.9,0.8); 
        // intersects[ i ].object.rotation.x -= 0.05;
        intersects[ i ].object.rotation.y -= 0.05;
        // intersects[ i ].object.rotation.z -= 0.05;

    }

    
};

function onMouseMove( event ) {
    // calculate mouse position in normalized device coordinates
    // (-1 to +1) for both components
    mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
}


animateScene();
window.addEventListener( 'mousemove', onMouseMove, false );



function mouseMoved(){

    var e = window.event;

    var posX = e.clientX;
    var posY = e.clientY;



    for (var i = 0; i < count; i++) {
        for (var j = 0; j < count; j++) {
            cubelist[i][j].rotation.y = posX/100; 
            cubelist[i][j].rotation.x = posY/100; 
            
        }
    }

}