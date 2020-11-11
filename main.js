var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

var geometry = new THREE.BoxGeometry();
var loader = new THREE.CubeTextureLoader();
loader.setPath('https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/SNice.svg/1200px-SNice.svg.png');



var textureCube = loader.load( [
	'px.png', 'nx.png',
	'py.png', 'ny.png',
	'pz.png', 'nz.png'
] );

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


var material2 = new THREE.MeshBasicMaterial( { color: "red" } );
var cube = new THREE.Mesh( geometry, imgCubeMaterial );
var cube2 = new THREE.Mesh( geometry, material2 );






var edges = new THREE.EdgesGeometry( geometry );
var edges2 = new THREE.EdgesGeometry( geometry );
var line = new THREE.LineSegments( edges, new THREE.LineBasicMaterial( { color: 0xffffff }) );
var line2 = new THREE.LineSegments( edges2, new THREE.LineBasicMaterial( { color: 0xffffff }) );
scene.add( line );
scene.add( line2 );
scene.add( cube );
scene.add( cube2 );

line2.position.x = 2;

cube2.position.x = 2;
camera.position.z = 9;




var animate = function () {
    requestAnimationFrame( animate );

    line.rotation.y += 0.01;
    cube.rotation.y += 0.01;

    renderer.render( scene, camera );
};

animate();


function mouseMoved(){
    var e = window.event;

    var posX = e.clientX;
    var posY = e.clientY;
    textureCube.rotation.y = posX/100;
    line.rotation.y = posX/100;
    line2.rotation.y = posX/100;
    cube.rotation.y = posX/100;
    cube2.rotation.y = posX/100;
    line.rotation.x = posY/100;
    line2.rotation.x = posY/200;
    cube.rotation.x = posY/100;
    cube2.rotation.x = posY/200;

    console.log(posX)
}