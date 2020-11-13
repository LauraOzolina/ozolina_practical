import * as THREE from './three.js-dev/build/three.module.js';
import { GUI } from './three.js-dev/examples/jsm/libs/dat.gui.module.js';

export function practical() {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    //geometry
    const geometry = new THREE.BoxGeometry();

    //material
    const loader = new THREE.TextureLoader();
    const material = new THREE.MeshBasicMaterial({
        map: loader.load('./matt.jpg'),
        //color: 0x31cc02
    })

    //cube

    const cube = new THREE.Mesh(geometry, material);
    camera.position.z = 50;

    const gui = new GUI();
    const gui_container = gui.addFolder('Zoom');
    //earth stuff
    const geometry1 = new THREE.SphereGeometry(5, 32, 32);
    const material1 = new THREE.MeshPhongMaterial({ map: loader.load('./earth.jpg'), });
    const earth = new THREE.Mesh(geometry1, material1);
    //moon stuff
    const geometry2 = new THREE.SphereGeometry(1, 32, 32);
    const material2 = new THREE.MeshPhongMaterial({ map: loader.load('./moon.jpg'), });
    const moon = new THREE.Mesh(geometry2, material2);

    //asteroid
    const geometry3 = new THREE.SphereGeometry(0.2, 32, 32);
    const material3 = new THREE.MeshPhongMaterial({ map: loader.load('./asteroid.jpg'), });
    const asteroid = new THREE.Mesh(geometry3, material3);
    let mesh;
    let mesh_arr = [];
    for (let this_y = -50; this_y < 50; this_y++) {
        mesh = asteroid.clone();
        mesh.position.set(this_y * Math.random(), this_y * Math.random(), this_y * Math.random());
        mesh_arr.push(mesh)
        scene.add(mesh);

    }
    let params = {
        zoom:0,

    }
    gui_container.add(params,'zoom',6, 70).step(0.1).onChange(function (value) {
        camera.position.z = value;

    });
    //light stuff
    moon.position.set(30, 10, 10);
    const point_light = new THREE.PointLight(0xfff7ab, 3, 1000);
    point_light.position.set(-20, 10, 10);
    var moonPivot;
    moonPivot = new THREE.Group();
    earth.add(moonPivot);
    moonPivot.add(moon);
    //add to scene
    scene.add(point_light);
    scene.add(moonPivot);
    scene.add(earth);
    scene.background = new THREE.Color( 0x02022e );
    renderer.setAnimationLoop(function () {
        earth.rotation.y += Math.PI / 180;
        moon.rotation.y += Math.PI / 180;
        moonPivot.rotation.y += 0.01;
        mesh_arr.forEach(function(mesh){
            mesh.translateZ(0.1);
           
        })
       
        renderer.render(scene, camera)
    });

    document.body.appendChild(renderer.domElement);
}