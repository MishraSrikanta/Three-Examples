import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Aqua, Aquamarine, Azure, Black, Blue, Chocolate, DarkGrey, darkSoil, Green, LightCyan, Red, SalmonRoseLight, Silver, Walnut, White, YellowLight } from 'src/Constants/ColorConstants';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import * as THREE from 'three';
import { WindowLeft } from '../WIndowPart/WindowSide';
import { Lights } from '../Visualization/Lights/LightVisualization';
import { ControlContainer } from '@angular/forms';
import { Line } from '../Visualization/Line/Line1';
// import{anime} from 'node_modules/animejs/lib/anime.js'
import { WindowPosition } from '../WIndowPart/Points/WindowPositions';
import { Material } from '../WIndowPart/WIndowMaterial';
import { Geometry } from '../WIndowPart/WindowGeometry';
import {
  CSS2DRenderer,
  CSS2DObject,
} from 'three/examples/jsm/renderers/CSS2DRenderer'

import {
  GrannyKnot,
  HeartCurve,
  VivianiCurve,
  KnotCurve,
  HelixCurve,
  TrefoilKnot,
  TorusKnot,
  CinquefoilKnot,
  TrefoilPolynomialKnot,
  FigureEightPolynomialKnot,
} from 'three/examples/jsm/curves/CurveExtras'
import { WindowScrewBot } from '../WIndowPart/ScrewBot';
import { WindowScrew } from '../WIndowPart/ScrewTop';
import { WindowScrewLeft } from '../WIndowPart/ScrewLeft';
import { WindowScrewRight } from '../WIndowPart/ScrewRight';

import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper'
import { texture1 } from '../Visualization/Texture/Texture1';
import { AddMaterial } from '../WIndowPart/Material1';
import { AddGeometry } from '../WIndowPart/Geometry1';
import { Curve, MeshBasicMaterial, TextureLoader } from 'three';
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls';



@Component({
  selector: 'app-window',
  templateUrl: './window.component.html',
  styleUrls: ['./window.component.css']
})
export class WindowComponent implements OnInit, AfterViewInit {

  private camera!: THREE.PerspectiveCamera;

  // private camera!: THREE.OrthographicCamera;
  private get canvas(): HTMLCanvasElement {
    return this.canvasRef.nativeElement;
  }
  @ViewChild('canvas')
  private canvasRef!: ElementRef;
  private renderer!: THREE.WebGLRenderer;
  // private labelrenderer! : THREE.WebGLRenderer;
  private scene!: THREE.Scene;

  //#region Inputs  
  // @Input() public cameray: number = 500; // Use If Requires
  @Input() public fieldOfView: number = 6;
  @Input('nearClipping') public nearClippingPlane: number = 0.1;
  @Input('farClipping') public farClippingPlane: number = 100000;
  // @Input() public texture: string = '../assets/MaterialMap/Woodpic1.jpg';

  // private loader = new THREE.TextureLoader();
  private geometry = new THREE.BoxGeometry(5, 5, 5);
  private material = new THREE.MeshBasicMaterial({ color: Red });
  private cube = new THREE.Mesh(this.geometry, this.material);
  //#endregion

  private CreateScene() {
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(Azure)

    //This Black Background color is used for the lights projects
    // this.scene.background = new THREE.Color(Black)

    // this.scene.add(this.cube) // For Referenxce adding Cube
    this.cube.position.set(-4, 2, 2);



    //#region  Custom Shaders practice
    // let texture = new THREE.TextureLoader().load('../assets/Material/Woodpic3.jpg');
    // var mesh = new THREE.Mesh(new THREE.PlaneBufferGeometry(30, 30, 50, 50), new MeshBasicMaterial({map: texture}));
    // this.scene.add(mesh);

    // var composer = new EffectComposer(this.renderer);
    // var renderPass = new RenderPass(this.scene , this.camera);
    // composer.addPass(renderPass);

    // // let customPass 

    // let customPass = new ShaderPass({vertexShader,fragmentShader});
    //#endregion

    //#region Camera

    //Perspective Camera

    let aspectRatio = this.getAspectRatio()
    this.camera = new THREE.PerspectiveCamera(
      this.fieldOfView,
      aspectRatio,
      this.nearClippingPlane,
      this.farClippingPlane
    )


    //OrthoGraphic Camera

    // let aspectRatio = this.getAspectRatio();
    // let width = 100;
    // let height = 50;
    // this.camera = new THREE.OrthographicCamera(width/-2 , width / 2, height / 2, height / -2, 1, 1000);
    // this.scene.add(this.camera)


    //#endregion

    //#region Adding Many cubes for raycasting(Raycaster)
    // var material = Material.addMaterial();
    var ray = document.getElementById("Raycaster");
    this.camera.position.set(0, 0, 1000)
    ray?.addEventListener('click', event => {
      this.scene.background = new THREE.Color(Black);
      const addstar = () => {
        var material1 = new THREE.MeshStandardMaterial({ color: new THREE.Color(Math.random() * 0xffffff) })
        var geometry1 = new THREE.BoxBufferGeometry(20, 20, 20, 10, 20, 20)
        // var geometry = new THREE.TorusBufferGeometry(5, 2, 5, 5, Math.PI * 2)
        var cube = new THREE.Mesh(geometry1, material1);


        const [x, y, z] = Array(3).fill(10).map(() => THREE.MathUtils.randFloatSpread(1000));
        cube.position.set(x, y, z);

        // cube.position.set(0, 0, 0);
        this.scene.add(cube)
        cube.name = "Cube"
        cube.receiveShadow = true;
      }
      Array(500).fill(10).forEach(addstar);
      // Array(500).forEach(obj =>{
      //   obj.material.color = new THREE.Color(Math.random() * 0xffffff)
      // })

      //Lights
      var directionalLight = new THREE.DirectionalLight(YellowLight, 1);
      // this.scene.add(directionalLight);
      directionalLight.position.set(500, 500, 0);


      var ambientlight = new THREE.AmbientLight(White, 0.2);
      this.scene.add(ambientlight);

      var pointLight = new THREE.PointLight(SalmonRoseLight, 1);
      this.scene.add(pointLight);
      // pointLight.castShadow = true;
      // pointLight.shadow.camera.far = 100;

      const raycaster = new THREE.Raycaster();
      const pointer = new THREE.Vector2();
      // const myobj: THREE.Mesh[] = [cube, cube1, cube2]

      window.addEventListener('pointermove', event => {
        pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
        pointer.y = - (event.clientY / window.innerHeight) * 2 + 1;

        raycaster.setFromCamera(pointer, this.camera);
        const intersects = raycaster.intersectObjects(this.scene.children, true);


        // for(var i = 0; intersects.length > 0; i++){
        if (intersects.length > 0) {


          intersects[0].object.scale.set(1.5, 1.5, 1.5);
        }
        else {
          var cube = this.scene.children;
          cube.forEach(cub => {
            cub.scale.set(1, 1, 1);
          })
        }
        // }
      })
    })
    //#endregion

    //#region path practice
    // let newPosition, tangent, radians; 
    // let fraction = 0;
    // let normal = new THREE.Vector3( 0, 1, 0 ); // up
    // let axis = new THREE.Vector3( );
    // const pointsPath  = new THREE.CurvePath();
    // const bezierLine = new THREE.CubicBezierCurve3(
    //   new THREE.Vector3(  1, 0, -1 ),
    //   new THREE.Vector3(  1, 0,  1 ),
    //   new THREE.Vector3( -1, 0,  1 ),
    //   new THREE.Vector3( -1, 0, -1 ),
    // );
    // pointsPath.add( bezierLine );
    //#endregion

    //#region practice
    // var material2 = AddMaterial.MeshStandard();
    // var geometry2 = AddGeometry.CircleGeometry();
    // var cube1 = new THREE.Mesh(geometry2, material2);
    // cube1.name = "Cube1"
    // // this.scene.add(cube1);
    // cube1.position.set(-20, 0, 0)

    // var material3 = AddMaterial.MeshStandard();
    // var geometry3 = AddGeometry.RingGeometry();
    // var cube2 = new THREE.Mesh(geometry3, material3);
    // // this.scene.add(cube2);
    // cube2.name = "Cube3"
    // cube2.position.set(10, 0, 0)
    //#endregion

    //#region using Raycaster to change the color and scale of the object by hover


    // const raycaster = new THREE.Raycaster();
    // const pointer = new THREE.Vector2();
    // const myobj: THREE.Mesh[] = [cube, cube1, cube2]

    // window.addEventListener('pointermove', event => {
    //   pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
    //   pointer.y = - (event.clientY / window.innerHeight) * 2 + 1;

    //   raycaster.setFromCamera(pointer, this.camera);
    //   const intersects = raycaster.intersectObjects(myobj, true);



    //   // for(let i=0 ; i < intersects.length; i++){
    //   //   // intersects[i].object.material.color.set(0xffffff)
    //   //   console.log("intesected")
    //   // }

    //   // for (var i = 0; i < intersects.length; i++) {
    //   //   console.log(intersects[i])
    //   //   // intersects[i].object.material.color.set(Red)



    //   // }


    //   if (intersects.length > 0) {
    //     var originalcolor1 = new THREE.Color(Aqua);
    //     var originalcolor2 = new THREE.Color(Walnut);
    //     var originalcolor3 = new THREE.Color(Chocolate);
    //     var changecolor = new THREE.Color(Red);
    //     for (var i = 0; i < intersects.length; i++) {
    //       if (intersects[i].object === cube) {
    //         console.log("Cube")
    //         cube.material.color = changecolor;
    //         cube.material.opacity = 0.2;

    //       }
    //        if (intersects[i].object === cube1) {
    //         console.log("Cube1")
    //         // cube1.material.color = changecolor;
    //         cube1.material.opacity = 0.2;
    //       }
    //        if (intersects[i].object === cube2) {
    //         console.log("Cube2")
    //         // cube2.material.color = changecolor;
    //         cube2.material.opacity = 0.2;
    //       } 
    //       // else {
    //         // cube1.material.color = originalcolor1;
    //         // cube2.material.color = originalcolor2;

    //       // }
    //       // if(intersects[i].object === myobj[i]){

    //       // }





    //       // intersects[i].object.material.color.set(Red)
    //       intersects[i].object.scale.set(1.5, 1.5, 1.5);
    //       // intersects[i].object.material.color.set(0xffffff)


    //     }
    //   } else {
    //     console.log("Nothing is selected")
    //     myobj.forEach(obj => {
    //       obj.scale.set(1, 1, 1);
    //       cube.material.color = originalcolor3;
    //       cube.material.opacity = 1;
    //       cube1.material.opacity = 1;
    //       cube2.material.opacity = 1;

    //       // obj.material.color.set(Red)
    //     })
    //   }
    //   // })

    // })
    //#endregion

    //#region Lights

    var ambientlight = Lights.ambientlight();
    // this.scene.add(ambientlight);
    var lightFront = Lights.pointlight3();
    // this.scene.add(lightFront);
    lightFront.position.set(10, 50, 30)
    //#endregion

    //#region TEx-Lights(LIghts reflection with Texture)
    var TextureLights = document.getElementById("TextureLights");
    TextureLights?.addEventListener('click', event => {
      alert("Use W, S, A, D key for movement of Light");

      this.scene.background = new THREE.Color(Black);
      this.camera.position.set(300, 200, 1000);
      const tex1 = new THREE.TextureLoader().load("../assets/Material/Woodpic3.jpg");
      const tex2 = new THREE.TextureLoader().load("../assets/Material/Woodpic3.jpg")
      const earthTex = new THREE.TextureLoader().load("../assets/Material/Earthmap.jpg")

      const boxgeo = new THREE.BoxBufferGeometry(500, 10, 500, 100, 100, 100);
      const boxmat = new THREE.MeshPhysicalMaterial({ color: Walnut, map: tex1, side: THREE.FrontSide })
      // tex1.wrapS = tex1.wrapT = THREE.RepeatWrapping
      const lightplane = new THREE.Mesh(boxgeo, boxmat)
      this.scene.add(lightplane);
      lightplane.receiveShadow = true;
      // lightplane.rotateX(-Math.PI / 2);  

      var geo5 = new THREE.BoxBufferGeometry(10, 10, 10, 5, 5, 5);
      var mat5 = new THREE.MeshPhysicalMaterial({ color: Red, map: tex2 });
      const box1 = new THREE.Mesh(geo5, mat5);
      this.scene.add(box1);
      box1.position.set(-20, 10, 10)
      box1.castShadow = true;

      var geo4 = new THREE.TetrahedronBufferGeometry(5, 10);
      var mat4 = new THREE.MeshPhysicalMaterial({roughness: 0.5});
      var earth = new THREE.Mesh(geo4, mat4);
      this.scene.add(earth);
      earth.name = "Earth";
      earth.castShadow = true;
      earth.material.map = earthTex;
      earth.position.set(30, 10, -30)

      var geo6 = new THREE.TetrahedronBufferGeometry(1, 10)
      var mat6 = new THREE.MeshBasicMaterial({ color: White, transparent: true, opacity: 0.8 });
      var smallbox = new THREE.Mesh(geo6, mat6);
      smallbox.name = "SmallBox"
      this.scene.add(smallbox)

      smallbox.position.set(0, 20, 0)


      const lightnew = new THREE.PointLight(SalmonRoseLight, 3, 1000, 15);
      this.scene.add(lightnew);
      lightnew.name = "LightNew"
      // lightnew.position.set(0, 10, 0);
      smallbox.add(lightnew)
      lightnew.lookAt(0, 0, 0)
      lightnew.castShadow = true;
      lightnew.shadow.camera.near = 1;
      // lightnew.shadow.camera.fov = 100
      lightnew.shadow.camera.far = 100;
      const pointlighthelper1 = new THREE.PointLightHelper(lightnew);
      this.scene.add(pointlighthelper1)

      window.addEventListener('keydown', event => {
        var keycode = event.which;
        if (keycode === 87) {
          console.log("Light Move Top");
          smallbox.position.y += 0.5;
        }
        if (keycode === 83) {
          console.log("Light Move Bot")
          smallbox.position.y -= 0.5
        }
        if (keycode === 65) {
          console.log("Light Move Left")
          smallbox.position.x -= 0.5;
        }
        if (keycode === 68) {
          console.log("Light move Right")
          smallbox.position.x += 0.5;
        }

      })
    })
    //#endregion

    //#region PointLight Under Box(Shadows)
    var obj = document.getElementById("Object");
    obj?.addEventListener('click', event => {


      this.scene.background = new THREE.Color(Black);
      // this.scene.remove(this.scene.children)
      var material1 = AddMaterial.MeshStandard();
      var geometry1 = AddGeometry.BoxGeometry();
      // var geometry = new THREE.TorusBufferGeometry(5, 2, 5, 5, Math.PI * 2)
      var cube = new THREE.Mesh(geometry1, material1);
      cube.position.set(0, 0, 0);
      this.scene.add(cube)
      cube.name = "Cube"
      cube.receiveShadow = true;

      var geo1 = new THREE.TorusKnotBufferGeometry(2, 0.5, 100, 10);
      var mat1 = new THREE.MeshPhongMaterial({
        color: DarkGrey,
        // roughness: 0.5
      });
      var torus2 = new THREE.Mesh(geo1, mat1);
      this.scene.add(torus2);
      torus2.name = "Torus2"
      torus2.position.set(0, 0, 0);
      torus2.castShadow = true;



      var pointlight1 = new THREE.PointLight(SalmonRoseLight, 2, 15, 4)
      this.scene.add(pointlight1);
      // lightpoint.position.set()
      pointlight1.castShadow = true;
      pointlight1.shadow.camera.near = 0.1;
      pointlight1.shadow.camera.far = 10;
      pointlight1.shadow.camera.fov = 200;
      pointlight1.shadow.bias = 0.001;

    })
    //#endregion

    //#region Lights Project(RectAreaLight)
    var lightproject = document.getElementById("Lights");
    lightproject?.addEventListener('click', event => {

      this.scene.background = new THREE.Color(Black);
      var geometryplane = new THREE.PlaneBufferGeometry(200, 200, 100, 100)
      var materialplane = new THREE.MeshStandardMaterial({
        color: White,
        metalness: 0.2,
        // transparent: true,
        // opacity: 0.9

      })
      var plane = new THREE.Mesh(geometryplane, materialplane);
      plane.rotateX(-Math.PI / 2)
      plane.position.set(0, -5, 0)
      plane.receiveShadow = true;
      plane.castShadow = true;
      this.scene.add(plane);

      var mat = new THREE.MeshPhysicalMaterial({
        color: DarkGrey,
        // roughness: 0.2,
        metalness: 0.2
      });
      var geo = new THREE.TorusKnotBufferGeometry(4, 1.5, 100, 100)
      var mesh = new THREE.Mesh(geo, mat);
      mesh.castShadow = true;
      // mesh.receiveShadow = true;
      mesh.name = "Torus";
      mesh.position.set(0, 5, 0);
      this.scene.add(mesh);



      // RectArea Light 1
      const height = 20;
      const width = 10;
      const intensity = 2;
      const rectlight = new THREE.RectAreaLight(Blue, intensity, width, height);
      rectlight.position.set(0, 4, -15);
      rectlight.lookAt(0, 4, 0);
      this.scene.add(rectlight);

      const rectlighthelper = new RectAreaLightHelper(rectlight);
      rectlight.add(rectlighthelper)


      const rectlight2 = new THREE.RectAreaLight(Red, intensity, width, height);
      rectlight2.position.set(-12, 4, -15);
      rectlight2.lookAt(-12, 4, 0);
      this.scene.add(rectlight2);

      const rectlighthelper2 = new RectAreaLightHelper(rectlight2);
      rectlight.add(rectlighthelper2)


      const rectlight3 = new THREE.RectAreaLight(Green, intensity, width, height);
      rectlight3.position.set(12, 4, -15);
      rectlight3.lookAt(12, 4, 0);
      this.scene.add(rectlight3);

      const rectlighthelper3 = new RectAreaLightHelper(rectlight3);
      rectlight.add(rectlighthelper3)
    })
    //#endregion

    //#region Adding Curves to the scene  

    // const curve1 = new CinquefoilKnot();
    // var geo = new THREE.TubeBufferGeometry(curve1, 100, 2, 8, true);
    // const mat = new THREE.MeshBasicMaterial({ color: Aqua, wireframe: true });
    // const tube1 = new THREE.Mesh(geo, mat);
    // tube1.name = "Tube"
    // this.scene.add(tube1);

    //#endregion

    //#region Adding Window
    // var wLeft = WindowLeft.createPart();
    // this.scene.add(wLeft);
    // var wRight = WindowLeft.createPart();
    // this.scene.add(wRight);
    // wRight.position.set(-1, 0, 0)
    //#endregion

    //#region GridHelper
    var gridhelper = new THREE.GridHelper(20, 20);
    gridhelper.rotateX(Math.PI / 2)
    // this.scene.add(gridhelper);
    //#endregion

    //#region practice Raycaster
    // var extrude = document.getElementById("Object");
    // extrude?.addEventListener('click', event => {
    //   const raycaster = new THREE.Raycaster();
    //   const pointer = new THREE.Vector2();
    // const arrowHelper = new THREE.ArrowHelper(
    //   new THREE.Vector3(0, 0, 0),
    //   new THREE.Vector3(0, 0, 0),
    //   2,
    //   Red
    // )
    //   this.scene.add(arrowHelper)
    //   // console.log(arrowHelper)
    // const onPointerMove = (event: { clientX: number; clientY: number; }) => {

    //   pointer.x = (event.clientX / this.renderer.domElement.clientWidth) * 2 - 1;
    //   pointer.y = - (event.clientY / this.renderer.domElement.clientHeight) * 2 + 1;
    //   // console.log(pointer);

    // }
    // window.addEventListener('pointermove', onPointerMove);
    // window.addEventListener('pointermove', event => {
    //   const intersects = raycaster.intersectObjects(this.scene.children, true);
    //   raycaster.setFromCamera(pointer, this.camera);
    //     const n = new THREE.Vector3();
    //     n.copy(intersects[0].object.position);
    //     n.transformDirection(intersects[0].object.matrixWorld)
    //     arrowHelper.setDirection(n);
    //     arrowHelper.position.copy(intersects[0].point)

    //     window.addEventListener('ckick', event => {
    //       if (intersects.length > 0) {
    //         n.copy(intersects[0].object.position);
    //         n.transformDirection(intersects[0].object.matrixWorld)
    //         arrowHelper.setDirection(n);
    //         arrowHelper.position.copy(intersects[0].point)
    //         console.log(pointer)
    //        var geometry = new THREE.BufferGeometry();
    //        var material = new THREE.LineBasicMaterial({
    //          color: Red,
    //          linewidth: 2
    //        })





    //   })
    // })



    //#endregion

    //#region practice draw line 
    // var mouse = new THREE.Vector3();
    // var extrude = document.getElementById("Extrude")
    // extrude?.addEventListener('click', event => {
    // var plane = new THREE.Plane()

    // const shape = new THREE.Shape();
    // shape.moveTo(0, 0);
    // shape.lineTo(0, 1);
    // shape.lineTo(1, 0);
    // shape.lineTo(0, 0);
    // shape.lineTo(0, 0.2)
    // shape.lineTo(0.2, 0.8);
    // shape.lineTo(0.8, 0.2);
    // shape.lineTo(0, 0.2);


    // var point1 = new THREE.Vector3(0, 0, 0);
    // var point2 = new THREE.Vector3(0, 0, 10);
    // var path1 = new THREE.LineCurve3(point1, point2)
    // var extrudeSettings1 = {
    //   bevelEnabled: false,
    //   steps: 20,
    //   extrudePath: path1
    // };

    // var geometry = new THREE.ExtrudeBufferGeometry(shape, extrudeSettings1);
    //   // var geometry = new THREE.BufferGeometry();
    //   var maxpoints = 20;
    //   var position = new Float32Array(maxpoints * 3);
    //   geometry.setAttribute('position', new THREE.BufferAttribute(position, 3));

    //   // var material = new THREE.LineBasicMaterial({
    //   //   color: Red,
    //   //   // linewidth: 2
    //   // });
    //   // var line = new THREE.Line(geometry, material)
    //   // this.scene.add(line);

    //   var material = new THREE.MeshBasicMaterial({color: Blue})
    //   var mesh = new THREE.Mesh(geometry, material);
    //   this.scene.add(mesh);
    //   var count = 0;
    //   function updateLine() {
    //     position[count * 3 - 3] = mouse.x;
    //     position[count * 3 - 2] = mouse.y;
    //     position[count * 3 - 1] = mouse.z;
    //     mesh.geometry.attributes['position'].needsUpdate = true;
    //     console.log("count")
    //   }


    //   const onMouseMove = (event: { clientX: number; clientY: number; }) => {
    //     mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    //     mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    //     mouse.z = 0;
    //     mouse.unproject(this.camera);
    //     if (count !== 0) {
    //       updateLine();
    //       // console.log("line");
    //     }
    //   }
    //   function addPoint() {
    //     console.log("point nr " + count + ": " + mouse.x + " " + mouse.y + " " + mouse.z);
    //     position[count * 3 + 0] = mouse.x;
    //     position[count * 3 + 1] = mouse.y;
    //     position[count * 3 + 2] = mouse.z;
    //     count++;
    //     mesh.geometry.setDrawRange(0, count);
    //     // updateLine();
    //   }

    //   const onMouseDown = (evt: any) => {
    //     // on first click add an extra point
    //     if (count === 0) {
    //       addPoint();
    //       // console.log("hello")
    //     }
    //     addPoint();
    //   }
    //   window.addEventListener("mousemove", onMouseMove, false);
    //   window.addEventListener('mousedown', onMouseDown, false);


    //   const onDocumentKeyDown = (event: { which: any; }) => {
    //     var keyCode = event.which;
    //     if (keyCode == 27) {
    //       console.log("Esc is pressed")
    //       window.removeEventListener('mousemove', onMouseMove, false)

    //     }
    //     if(keyCode == 69){
    //       console.log("E is pressed")
    //       var shape = new THREE.Shape();
    //       shape.moveTo(0, 0);
    //       shape.lineTo(0, 1);
    //       shape.lineTo(1, 0);
    //       shape.lineTo(0, 0);
    //       shape.lineTo(0, 0.2)
    //       shape.lineTo(0.2, 0.8);
    //       shape.lineTo(0.8, 0.2);
    //       shape.lineTo(0, 0.2);
    //       var point1 = new THREE.Vector3(mouse.x, mouse.y, 0);
    //       var point2 = new THREE.Vector3(mouse.x, mouse.y, 0);
    //       var path1 = new THREE.LineCurve3(point1, point2)
    //       var extrudeSettings1 = {
    //         bevelEnabled: false,
    //         steps: 20,
    //         extrudePath: path1
    //       };
    //       var material = new THREE.MeshBasicMaterial({color: Red})
    //       const geometry = new THREE.ExtrudeBufferGeometry(shape, extrudeSettings1)
    //       var mesh = new THREE.Mesh(geometry, material);
    //       this.scene.add(mesh)
    //     }
    //   };
    //   window.addEventListener("keydown", onDocumentKeyDown, false);
    // })
    //#endregion

    //#region (Extrude)Creating Window by Clicking Points
    var extrude = document.getElementById("Extrude");
    extrude?.addEventListener('click', event => {

      this.scene.add(gridhelper)

      var mouse = new THREE.Vector3();
      const raycaster = new THREE.Raycaster();

      var clickCount = 0;
      var controlPoints: any[] = []
      var points: any[] = [];
      window.addEventListener('mousedown', (event) => {
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        raycaster.setFromCamera(mouse, this.camera);
        const intersects = raycaster.intersectObjects(this.scene.children, true);

        if (intersects.length > 0) {

          //#region Using For loop For Ibncrementing Order or you can do just clickCount += 1 or ++clickCount;
          // for (var i = 0; i < 1; i++) {

          // if (i == 0) {
          //   // console.log("Hey its ClickCount", clickCount)

          //   controlPoint[i] = intersects[i].point.clone();
          //   arr.push(controlPoint[i])
          //   clickCount += 1;
          // }

          //Practices
          // if (i == 1) {
          //   console.log("1")
          //   clickCount += 1;
          //   // controlPoint[i] = intersects[i].point.clone();
          // }

          // if (i == 2) {
          //   console.log("2")
          //   clickCount += 1;
          //   // controlPoint[i] = intersects[i].point.clone();
          // }

          // if (i == 3) {
          //   console.log("3")
          //   clickCount += 1;
          //   // controlPoint[i] = intersects[i].point.clone();

          // }

          // }

          // if(clickCount == 0){
          //   console.log(clickCount);
          // controlPoints[clickCount] = intersects[0].point.clone();
          // var geometry = new THREE.BufferGeometry().setFromPoints(controlPoints);
          // var material= new THREE.LineBasicMaterial({color: Red, linewidth: 2})
          // var line = new THREE.Line(geometry, material);
          // this.scene.add(line);
          // }
          //#endregion

          if (clickCount < 4) {
            // var clickCount = 0;
            console.log(clickCount);
            controlPoints[clickCount] = intersects[0].point.clone();

            points.push(intersects[0].point);
            console.log(points);

            //#region Some Practices
            // controlPoint[i] = intersects[i].point.clone();
            // arr.push(controlPoint[i])
            // console.log(clickCount, controlPoints)
            // var geometry = new THREE.BufferGeometry();
            // var maxpoints = 20;
            // var position = new Float32Array(maxpoints * 3);
            // geometry.setAttribute('position', new THREE.BufferAttribute(position, 3));

            // var material = new THREE.LineBasicMaterial({
            //   color: Red,
            //   // linewidth: 2
            // });
            // var line = new THREE.Line(geometry, material)
            //#endregion

            var cp = new THREE.Mesh(new THREE.SphereGeometry(0.125, 16, 12), new THREE.MeshBasicMaterial({ color: "red" }));
            cp.position.copy(intersects[0].point);
            cp.name = "point"
            this.scene.add(cp);
            clickCount += 1;
            // ++clickCount;

          } else {
            console.log("Clicked over")
            // console.log(controlPoints[0])
            console.log(controlPoints[0].x);
            // console.log(points.length)
            this.scene.clear()

            //#region Extrude
            //First Extrude
            var point1 = new THREE.Vector3(controlPoints[0].x, controlPoints[0].y, controlPoints[0].z);
            var point2 = new THREE.Vector3(controlPoints[1].x, controlPoints[1].y, controlPoints[1].z);
            const material1 = Material.addMaterial();
            const geometry1 = Geometry.addGeometry(point1, point2)
            const mesh1 = new THREE.Mesh(geometry1, material1);
            mesh1.position.setY(-1);

            //Second Extrude
            var point1 = new THREE.Vector3(controlPoints[1].x, controlPoints[1].y, controlPoints[1].z);
            var point2 = new THREE.Vector3(controlPoints[2].x, controlPoints[2].y, controlPoints[2].z);
            const material2 = Material.addMaterial();
            const geometry2 = Geometry.addGeometry(point1, point2)
            const mesh2 = new THREE.Mesh(geometry2, material2);
            // mesh2.position.setX(-1);

            //Third Extrude
            var point1 = new THREE.Vector3(controlPoints[2].x, controlPoints[2].y, controlPoints[2].z);
            var point2 = new THREE.Vector3(controlPoints[3].x, controlPoints[3].y, controlPoints[3].z);
            const material3 = Material.addMaterial();
            const geometry3 = Geometry.addGeometry(point1, point2)
            const mesh3 = new THREE.Mesh(geometry3, material3);
            mesh3.position.setY(1)


            //Fourth Extrude
            var point1 = new THREE.Vector3(controlPoints[3].x, controlPoints[3].y, controlPoints[3].z);
            var point2 = new THREE.Vector3(controlPoints[0].x, controlPoints[0].y, controlPoints[0].z);
            const material4 = Material.addMaterial();
            const geometry4 = Geometry.addGeometry(point1, point2)
            const mesh4 = new THREE.Mesh(geometry4, material4);
            // mesh4.position.setX(1);

            this.scene.add(mesh1, mesh2, mesh3, mesh4)
            //#endregion

            //#region Practices
            // console.log(controlPoints)
            // console.log(controlPoints[0].z)
            // var shape = new THREE.Shape();
            // shape.moveTo(controlPoints[0].x, -controlPoints[0].z);
            // shape.lineTo(controlPoints[1].x, -controlPoints[1].z);
            // shape.lineTo(controlPoints[2].x, -controlPoints[2].z);
            // shape.lineTo(controlPoints[3].x, -controlPoints[3].z);
            // shape.lineTo(controlPoints[0].x, -controlPoints[0].z);
            // var extrudeSettings = {
            //   steps: 1,
            //   amount: 20,
            //   bevelEnabled: false
            // };

            // var extrudeGeom = new THREE.ExtrudeBufferGeometry(shape, extrudeSettings);
            // extrudeGeom.rotateX(-Math.PI / 2);
            // var wall = new THREE.Mesh(extrudeGeom, new THREE.MeshStandardMaterial({
            //   color: "lightgray"
            // }));
            // this.scene.add(wall);



            // var obj = document.getElementById("Object");
            // obj?.addEventListener('click', event => {



            //   var points = [];
            //   points.push(controlPoints)
            //   console.log(points)
            //   console.log("else is running")
            //   var shape = new THREE.Shape();
            // shape.moveTo(controlPoints[0].x, -controlPoints[0].z);
            // shape.lineTo(controlPoints[1].x, -controlPoints[1].z);
            // shape.lineTo(controlPoints[2].x, -controlPoints[2].z);
            // shape.lineTo(controlPoints[3].x, -controlPoints[3].z);
            // shape.lineTo(controlPoints[0].x, -controlPoints[0].z);
            // var extrudeSettings = {
            //   steps: 1,
            //   amount: 20,
            //   bevelEnabled: false
            // };

            // var extrudeGeom = new THREE.ExtrudeBufferGeometry(shape, extrudeSettings);
            // extrudeGeom.rotateX(-Math.PI / 2);
            // var wall = new THREE.Mesh(extrudeGeom, new THREE.MeshStandardMaterial({
            //   color: "lightgray"
            // }));
            // this.scene.add(wall);
            //  clickCount = 0;
            //  controlPoints = []
            // })
            // console.log("intesected")
            //#endregion

          }
        }
      })
    })
    //#endregion

    //#region Alt + S and ontrol + C for draw window & colors change 

    window.addEventListener('keydown', event => {
      var keyCode = event.which;

      //You can add alt key also..it is fully customizeable
      // Use keycode to avoid the small key and caps key error....
    
      //Altkey + s to add the screw into the scene
      if (event.altKey && keyCode == 83) {
        console.log("Adding Screw");
        var light = new THREE.AmbientLight(White, 0.7);
        this.scene.add(light);
        this.scene.remove(gridhelper)

        let w1 = WindowLeft.createPart();
        w1.position.set(-5, -5, 0)
        this.scene.add(w1);
        let w2 = WindowLeft.createPart();
        w2.position.set(4, -5, 0)
        this.scene.add(w2);
        let w3 = WindowLeft.createPart();
        w3.position.set(-5, -5, 0)
        w3.rotateY(Math.PI / 2)
        this.scene.add(w3);
        let w4 = WindowLeft.createPart();
        w4.position.set(-5, 5, 0)
        w4.rotateY(Math.PI / 2)
        this.scene.add(w4);

        //Adding Screw

        //Upper side
        let screw1 = WindowScrew.createPart();
        this.scene.add(screw1);
        screw1.position.set(4, 6, 0.5)
        let screw2 = WindowScrew.createPart();
        this.scene.add(screw2);
        screw2.position.set(2, 6, 0.5)


        let screw3 = WindowScrew.createPart();
        this.scene.add(screw3);
        screw3.position.set(0, 6, 0.5)

        let screw4 = WindowScrew.createPart();
        this.scene.add(screw4);
        screw4.position.set(-2, 6, 0.5)

        let screw5 = WindowScrew.createPart();
        this.scene.add(screw5);
        screw5.position.set(-4, 6, 0.5)

        //Lower side
        let screw1Low = WindowScrewBot.createPart();
        this.scene.add(screw1Low);
        screw1Low.position.set(4, -7, 0.5)

        let screw2Low = WindowScrewBot.createPart();
        this.scene.add(screw2Low);
        screw2Low.position.set(2, -7, 0.5)

        let screw3Low = WindowScrewBot.createPart();
        this.scene.add(screw3Low);
        screw3Low.position.set(0, -7, 0.5)

        let screw4Low = WindowScrewBot.createPart();
        this.scene.add(screw4Low);
        screw4Low.position.set(-2, -7, 0.5)

        let screw5Low = WindowScrewBot.createPart();
        this.scene.add(screw5Low);
        screw5Low.position.set(-4, -7, 0.5)

        //Left Screw
        let screwleft1 = WindowScrewLeft.createPart();
        this.scene.add(screwleft1)
        screwleft1.position.set(-6, -4, 0.5)

        let screwleft2 = WindowScrewLeft.createPart();
        this.scene.add(screwleft2)
        screwleft2.position.set(-6, -2, 0.5)

        let screwleft3 = WindowScrewLeft.createPart();
        this.scene.add(screwleft3)
        screwleft3.position.set(-6, 0, 0.5)

        let screwleft4 = WindowScrewLeft.createPart();
        this.scene.add(screwleft4)
        screwleft4.position.set(-6, 2, 0.5)

        let screwleft5 = WindowScrewLeft.createPart();
        this.scene.add(screwleft5)
        screwleft5.position.set(-6, 4, 0.5)

        //Right Screw
        let screwright1 = WindowScrewRight.createPart();
        this.scene.add(screwright1);
        screwright1.position.set(6, -4, 0.5)

        let screwright2 = WindowScrewRight.createPart();
        this.scene.add(screwright2);
        screwright2.position.set(6, -2, 0.5)

        let screwright3 = WindowScrewRight.createPart();
        this.scene.add(screwright3);
        screwright3.position.set(6, 0, 0.5)

        let screwright4 = WindowScrewRight.createPart();
        this.scene.add(screwright4);
        screwright4.position.set(6, 2, 0.5)

        let screwright5 = WindowScrewRight.createPart();
        this.scene.add(screwright5);
        screwright5.position.set(6, 4, 0.5)

      }
      if (event.ctrlKey && keyCode == 67) {     //event.ctlrKey is for Control option and the place the keyEvent...
        console.log("C is pressed", Math.random() * 0xffffff); // Press Ctrl + c for Random changing color of the object
        // cube.material.color.setHex(Math.random() * 0xffffff);

        // tube1.material.color.setHex(Math.random() * 0xffffff);
        // const obj = this.scene.children ;
        // obj.forEach(obj => {
        //  alert("Colors changes")
        // })
      }
    })

    //#endregion

    //#region  Practice

    //     if (intersects.length > 0) {

    //               const n = new THREE.Vector3();
    //       n.copy(intersects[0].object.position);
    //       n.transformDirection(intersects[0].object.matrixWorld)
    //       arrowHelper.setDirection(n);
    //       arrowHelper.position.copy(intersects[0].point)
    //      
    //     }
    //   }
    //   // window.addEventListener('mousedown', onMouseDown, false);
    //#endregion

    //#region Using Raycaster Creating line
    //   // const raycaster = new THREE.Raycaster();
    //   // const pointer = new THREE.Vector3();
    //   // const arrowhelper = new THREE.ArrowHelper(
    //   //   new THREE.Vector3(0, 0, 0),
    //   //   new THREE.Vector3(0, 0, 0),
    //   //   2,
    //   //   Red
    //   // )
    //   // this.scene.add(arrowhelper);
    //   // const onPointerMove = (event: { clientX: number; clientY: number; }) => {

    //   //   pointer.x = (event.clientX / this.renderer.domElement.clientWidth) * 2 - 1;
    //   //   pointer.y = - (event.clientY / this.renderer.domElement.clientHeight) * 2 + 1;
    //   //   pointer.z = 0;
    //   //   // console.log(pointer)


    //   // }
    //   // window.addEventListener('pointermove', onPointerMove);

    //   // window.addEventListener('pointermove', ev => {
    //   //   const intersects = raycaster.intersectObjects(this.scene.children, true);
    //   //   raycaster.setFromCamera(pointer, this.camera);
    //   //   const n = new THREE.Vector3();
    //   //   n.copy(intersects[0].object.position);
    //   //   n.transformDirection(intersects[0].object.matrixWorld)
    //   //   arrowhelper.setDirection(n);
    //   //   arrowhelper.position.copy(intersects[0].point)
    //   //   if (intersects.length > 0) {
    //   //     var geometry = new THREE.BufferGeometry();
    //   //     var maxpoints = 20;
    //   //     var position = new Float32Array(maxpoints * 3);
    //   //     geometry.setAttribute('position', new THREE.BufferAttribute(position, 3));

    //   //     var material = new THREE.LineBasicMaterial({
    //   //       color: Red,
    //   //       // linewidth: 2
    //   //     });
    //   //     var line = new THREE.Line(geometry, material)
    //   //     this.scene.add(line);
    //   //     var count = 0;

    //   //     console.log("pointer", pointer)
    //   //     function updateLine() {
    //   //       position[count * 3 - 3] = pointer.x;
    //   //       position[count * 3 - 2] = pointer.y;
    //   //       position[count * 3 - 1] = pointer.z;
    //   //       line.geometry.attributes['position'].needsUpdate = true;
    //   //     }

    //   //     const onMouseMove = (event: any) => {
    //   //           pointer.unproject(this.camera);
    //   //           if (count !== 0) {
    //   //             updateLine();
    //   //             console.log("line");
    //   //           }
    //   //         }
    //   //         function addPoint() {
    //   //           console.log("point nr " + count + ": " + pointer.x + " " + pointer.y + " " + pointer.z);
    //   //           position[count * 3 + 0] = pointer.x;
    //   //           position[count * 3 + 1] = pointer.y;
    //   //           position[count * 3 + 2] = pointer.z;
    //   //           count++;
    //   //           line.geometry.setDrawRange(0, count);
    //   //           // updateLine();
    //   //         }

    //   //         const onMouseDown = (evt: any) => {
    //   //           // on first click add an extra point
    //   //           if (count === 0) {
    //   //             addPoint();
    //   //             console.log("hello")
    //   //           }
    //   //           addPoint();
    //   //         }
    //   //         window.addEventListener("mousemove", onMouseMove, false);
    //   //         window.addEventListener('mousedown', onMouseDown, false);
    //   //         window.addEventListener("keydown", onDocumentKeyDown, false);

    //   //         function onDocumentKeyDown(event: { which: any; }) {
    //   //           var keyCode = event.which;
    //   //           if (keyCode == 27) {
    //   //             console.log("Esc is pressed")
    //   //             window.removeEventListener('mousemove', onMouseMove, false)

    //   //           }
    //   //         };
    //   //   }

    //   // })
    //#endregion

    //#region Measurements and camera movement Practices
    // const labelrenderer = new CSS2DRenderer();
    // labelrenderer.setSize(window.innerWidth, window.innerHeight);
    // labelrenderer.domElement.style.position = 'absolute';
    // labelrenderer.domElement.style.top = '0px';
    // labelrenderer.domElement.style.pointerEvents = 'none';
    // document.body.appendChild(labelrenderer.domElement);


    // const onWindowResize = () => {
    //   this.camera.aspect = window.innerWidth / window.innerHeight
    //   this.camera.updateProjectionMatrix()
    //   this.renderer.setSize(window.innerWidth, window.innerHeight)
    //   labelrenderer.setSize(window.innerWidth, window.innerHeight)

    // }
    // window.addEventListener('resize', onWindowResize, false);
    // let ctrlDown = false;
    // let lineId = 0;
    // let line: THREE.Line;
    // let drawingLine = false;
    // const measurementLabels: { [key: number]: CSS2DObject } = {}
    // let control = this.orbitcontrol();
    // this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas });

    // window.addEventListener('keydown', function (event) {
    //   if (event.key === 'Control') {
    //     ctrlDown = true
    //     control.enabled = false
    //     // this.renderer.domElement.style.cursor = 'crosshair';
    //   }
    // })

    // window.addEventListener('keyup', function (event) {
    //   if (event.key === 'Control') {
    //     ctrlDown = false
    //     control.enabled = true
    //     // this.renderer.domElement.style.cursor = 'pointer'
    //     if (drawingLine) {
    //       //delete the last line because it wasn't committed
    //       // this.scene.remove(line)
    //       // this.scene.remove(measurementLabels[lineId])
    //       drawingLine = false
    //     }
    //   }
    // })

    //Camera Movement
    //   const updateCamera = () =>{
    //     var tube = this.scene.getObjectByName("tube");
    //     const time = new THREE.Clock().getElapsedTime();
    //     const looptime = 20;
    //     const t = (time % looptime) / looptime ;
    //     const t2 = ((time + 0.1) % looptime) / looptime;

    //     const pos = tube1.geometry.parameters.path.getPointAt(t);
    //     const pos2 = tube1.geometry.parameters.path.getPointAt(t2);
    //     this.camera.position.copy(pos);
    //     this.camera.lookAt(pos2);
    //   }
    //#endregion

    //#region City Model(Practice of Objects and lights)
    var model = document.getElementById("CityModel");
    model?.addEventListener('click', event => {
      // const controls = new PointerLockControls(this.camera, this.renderer.domElement)


      const planegeo = new THREE.PlaneBufferGeometry(100, 100, 50, 50);
      const planemat = new THREE.MeshStandardMaterial({
        color: darkSoil,

      })
      const plane = new THREE.Mesh(planegeo, planemat);
      this.scene.add(plane);

      plane.rotateX(-Math.PI / 2);
      plane.receiveShadow = true;

      const cubes: THREE.Mesh[] = [];
      for (let i = 0; i < 100; i++) {
        const geo = new THREE.BoxGeometry(
          Math.random() * 4,
          Math.random() * 16,
          Math.random() * 4
        )
        var texture1 = new TextureLoader().load("../assets/Material/Building2.jpg")
        var texture2 = new TextureLoader().load("../assets/Material/Building3.jpg")
        var texture3 = new TextureLoader().load("../assets/Material/Building4.jpg")
        const mat = new THREE.MeshPhysicalMaterial({ wireframe: false, metalness: 0.2 });
        switch (i % 3) {
          case 0:
            mat.color = new THREE.Color(Aqua);
            mat.map = texture1;
            break;
          case 1:
            mat.color = new THREE.Color(Green);
            mat.map = texture2;
            break;
          case 2:
            mat.color = new THREE.Color(Red);
            mat.map = texture3;
            break;
        }
        const cube = new THREE.Mesh(geo, mat);
        cubes.push(cube)
        cube.castShadow = true;
      }

      cubes.forEach(cube => {

        cube.position.x = Math.random() * 100 - 50;
        cube.position.z = Math.random() * 100 - 50;
        cube.geometry.computeBoundingBox();
        cube.position.y = ((cube.geometry.boundingBox as THREE.Box3).max.y -
          (cube.geometry.boundingBox as THREE.Box3).min.y) /
          2

        this.scene.add(cube)
        cube.castShadow = true;
        // cube.receiveShadow = true

      })

      let sun = new THREE.PointLight(YellowLight, 1);
      this.scene.add(sun);
      sun.shadow.camera.far = 1000;
      sun.castShadow = true;
      sun.shadow.camera.near = 1
      sun.shadow.camera.fov = 10
      sun.position.set(50, 50, 100)



    })
    //#endregion


  }

  //#region OrbitControls
  private orbitcontrol() {
    const controls = new OrbitControls(this.camera, this.renderer.domElement)
    this.camera.position.set(0, 50, 300);
    controls.enableDamping = true;
    return controls;
  }
  //#endregion

  private getAspectRatio() {
    return this.canvas.clientWidth / this.canvas.clientHeight;
    // return window.innerWidth / window.innerHeight;
  }

  private startRenderingLoop() {

    //#region Practice

    // const scene = this.scene;
    // const renderer = this.renderer;
    // const labelrenderer = new CSS2DRenderer();
    // labelrenderer.setSize(window.innerWidth, window.innerHeight);
    // labelrenderer.domElement.style.position = 'absolute';
    // labelrenderer.domElement.style.top = '0px';
    // labelrenderer.domElement.style.pointerEvents = 'none';
    // document.body.appendChild(labelrenderer.domElement);

    //#endregion

    let tube = this.scene.getObjectByName("Tube")

    let cube1 = this.scene.getObjectByName("Cube1");
    var torus = this.scene.getObjectByName("Torus");
    var torus2 = this.scene.getObjectByName("Torus2");
    var light1 = this.scene.getObjectByName("LightNew");
    var smallbox = this.scene.getObjectByName("SmallBox");

    this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas });

    //These rae used for camera position movement around the objects
    var angle = 0; // use when needed
    var radius = 500; // use when needed
    var lim = 10;
    var clock = new THREE.Clock();
    var speed = 1;
    var dir = new THREE.Vector3(0, 4, 0).normalize();
    var lookAt = new THREE.Vector3();
    var pos = new THREE.Vector3();



    var cubes = this.scene.children;

    const controls = new PointerLockControls(this.camera, this.renderer.domElement);
    let control = this.orbitcontrol();

    this.renderer.setPixelRatio(devicePixelRatio);
    this.renderer.outputEncoding = THREE.sRGBEncoding;
    this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);
    let component: WindowComponent = this;
    this.camera.updateProjectionMatrix();

    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.BasicShadowMap;



    (function render(this: any) {

      requestAnimationFrame(render);
      control.update();

      //#region Roatation of Objects
      // roate the Object(first getObjectName from scene then add it to the render loop)
      // cube?.rotateX(0.01);
      // cube?.rotateY(0.01);
      // cube?.rotateZ(0.01);
      // cube1?.rotateZ(0.01);
      // cube1?.rotateX(0.01);
      // cube1?.rotateY(0.01);

      // cubes.forEach(Obj => {
      //   Obj.rotateX(0.001);
      //   Obj.rotateY(0.001);
      //   Obj.rotateZ(0.001);

      // })

      // torus?.rotateY(0.01)

      //Shadows project(Remove the object addEventListner then ernder loop will continue)
      // torus2?.rotateY(0.01)

      //#endregion
      pos.addScaledVector(dir, speed * clock.getDelta());
      // light1?.position

      //#region Camera position Rotate
      //Camera Movement Side on key event(But When key is presed)
      // document.onkeydown = function(event){
      //   console.log("O is being Pressed")
      //   var keycode = event.which;
      //   if(keycode == 79){

      //Normal loop for camera movement
      // component.camera.position.x = radius * Math.cos(angle);
      // component.camera.position.z = radius * Math.sin(angle);
      // angle += 0.01;

      //   }
      // }
      //#endregion

      // labelrenderer.render(component.scene, component.camera)
      component.renderer.render(component.scene, component.camera);

    }());

    //#region  practice
    //     let ctrlDown = false
    //     window.addEventListener('keydown', function (event) {
    //       var keycode = event.which;
    //       if (keycode === 17) {
    //           console.log("control key is presseed")
    //           ctrlDown = true
    //           control.enabled = false
    //           renderer.domElement.style.cursor = 'crosshair'
    //       }
    //   })
    //   window.addEventListener('keyup', function (event) {
    //     if (event.key === 'Control') {

    //         control.enabled = true
    //         renderer.domElement.style.cursor = 'pointer'
    //         if (drawingLine) {
    //           ctrlDown = false
    //             //delete the last line because it wasn't committed
    //             scene.remove(line)
    //             scene.remove(measurementLabels[lineId])
    //             drawingLine = false
    //         }
    //     }
    // })

    // const raycaster = new THREE.Raycaster()
    // let intersects: THREE.Intersection[]
    // const mouse = new THREE.Vector2()

    //     const onClick = () => {
    //     if (ctrlDown) {
    //         raycaster.setFromCamera(mouse, this.camera)
    //         intersects = raycaster.intersectObjects(scene.children, false)
    //         if (intersects.length > 0) {
    //             if (!drawingLine) {
    //                 //start the line
    //                 const points = []
    //                 points.push(intersects[0].point)
    //                 points.push(intersects[0].point.clone())
    //                 const geometry = new THREE.BufferGeometry().setFromPoints(
    //                     points
    //                 )
    //                 line = new THREE.LineSegments(
    //                     geometry,
    //                     new THREE.LineBasicMaterial({
    //                         color: 0xffffff,
    //                         transparent: true,
    //                         opacity: 0.75,
    //                         // depthTest: false,
    //                         // depthWrite: false
    //                     })
    //                 )
    //                 line.frustumCulled = false
    //                 scene.add(line)

    //                 const measurementDiv = document.createElement(
    //                     'div'
    //                 ) as HTMLDivElement
    //                 measurementDiv.className = 'measurementLabel'
    //                 measurementDiv.innerText = '0.0m'
    //                 const measurementLabel = new CSS2DObject(measurementDiv)
    //                 measurementLabel.position.copy(intersects[0].point)
    //                 measurementLabels[lineId] = measurementLabel
    //                 scene.add(measurementLabels[lineId])
    //                 drawingLine = true
    //             } else {
    //                 //finish the line
    //                 const positions = line.geometry.attributes['position']
    //                     .array as Array<number>
    //                 positions[3] = intersects[0].point.x
    //                 positions[4] = intersects[0].point.y
    //                 positions[5] = intersects[0].point.z
    //                 line.geometry.attributes['position'].needsUpdate = true
    //                 lineId++
    //                 drawingLine = false
    //             }
    //         }
    //     }
    // }
    // renderer.domElement.addEventListener('pointerdown', onClick, false)

    //     const onDocumentMouseMove = (event: MouseEvent) => {
    //     event.preventDefault()

    //     mouse.x = (event.clientX / window.innerWidth) * 2 - 1
    //     mouse.y = -(event.clientY / window.innerHeight) * 2 + 1

    //     if (drawingLine) {
    //         raycaster.setFromCamera(mouse, this.camera)
    //         intersects = raycaster.intersectObjects(scene.children, false)
    //         if (intersects.length > 0) {
    //             const positions = line.geometry.attributes['position']
    //                 .array as Array<number>
    //             const v0 = new THREE.Vector3(
    //                 positions[0],
    //                 positions[1],
    //                 positions[2]
    //             )
    //             const v1 = new THREE.Vector3(
    //                 intersects[0].point.x,
    //                 intersects[0].point.y,
    //                 intersects[0].point.z
    //             )
    //             positions[3] = intersects[0].point.x
    //             positions[4] = intersects[0].point.y
    //             positions[5] = intersects[0].point.z
    //             line.geometry.attributes['position'].needsUpdate = true
    //             const distance = v0.distanceTo(v1)
    //             measurementLabels[lineId].element.innerText =
    //                 distance.toFixed(2) + 'm'
    //             measurementLabels[lineId].position.lerpVectors(v0, v1, 0.5)
    //         }
    //     }
    // }
    // document.addEventListener('mousemove', onDocumentMouseMove, false)

    //#endregion

    //#region  Start Button for pointerLockControl
    const play = document.getElementById("Start-Esc");
    play?.addEventListener('click', event => {
      alert("Please Turn OFF the ORbitControl And Its Update function in the Render Loop, Press Start to play")

      var camera = this.camera;
      var scenes = this.scene
      const menuPanel = document.getElementById('menuPanel') as HTMLDivElement
      const startButton = document.getElementById('startButton') as HTMLInputElement
      startButton.addEventListener(
        'click',
        function () {
          console.log("Start Button is Activated");
          camera.position.y = 1;
          camera.position.z = 10;

          controls.lock()
        },
        false
      )


      // controls.addEventListener('lock', () => (menuPanel.style.display = 'none'))
      // controls.addEventListener('unlock', () => (menuPanel.style.display = 'block'))

      const onKeyDown = function (event: KeyboardEvent) {
        switch (event.code) {
          case 'KeyW':
            controls.moveForward(0.25)
            break
          case 'KeyA':
            controls.moveRight(0.25)
            break
          case 'KeyS':
            controls.moveForward(0.25)
            break
          case 'KeyD':
            controls.moveRight(0.25)
            break
        }
      }
      document.addEventListener('keydown', onKeyDown, false)
      //  })
      //#endregion

      //#region  2D and 3D 
      var ThreeDim = document.getElementById("threeDimension")
      ThreeDim?.addEventListener('click', event => {
        console.log("3D Active");
        control.enableRotate = true;
        this.camera.position.set(-200, 100, 300)
      })
      var TwoDim = document.getElementById("twoDimension")
      TwoDim?.addEventListener('click', event => {
        console.log("2D Active");
        this.camera.position.set(0, 0, 300)
        // control.dispose();
        control.enableRotate = false;
      })
    });
    //#endregion

    //#region  Reload Function(Relad Button)
    var reload = document.getElementById("Reload");
    reload?.addEventListener('click', event => {
      console.log("Reload done");
      window.location.reload();
    })
    //#endregion



  }



  constructor() { }
  ngAfterViewInit(): void {
    this.CreateScene();
    this.startRenderingLoop();
  }

  ngOnInit(): void {
  }



}
