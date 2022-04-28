
import { Aqua, Black, Walnut, White } from 'src/Constants/ColorConstants';
import * as THREE from 'three'
import { PointLightPosition } from './Points/LightPoints';


export class Lights {
  static pointlight1() {
    let color = White;
    let Intensity = 0.2;
    let distance = 0;
    // You can change the color and intensity here
    const point = PointLightPosition;
    const light1 = new THREE.PointLight(color, Intensity, distance)
    light1.position.set(point[0].light1.x, point[0].light1.y, point[0].light1.z)
    light1.lookAt(0, 0, 0);
    return light1;
  }

  static pointlight2() {
    let color = White;
    let Intensity = 0.2;
    let distance = 0;
    // You can change the color and intensity here
    const point = PointLightPosition
    const light1 = new THREE.PointLight(color, Intensity, distance)
    light1.position.set(point[0].light2.x, point[0].light2.y, point[0].light2.z)
    light1.lookAt(0, 0, 0);
    return light1;
  }

  static pointlight3() {
    let color = White;
    let Intensity = 1;
    let distance = 1000;
    // You can change the color and intensity here
    const point = PointLightPosition
    const light1 = new THREE.PointLight(color, Intensity, distance)
    light1.position.set(point[0].light3.x, point[0].light3.y, point[0].light3.z)
    light1.lookAt(0, 0, 0);
    return light1;
  }
  static pointlight4() {
    let color = White;
    let Intensity = 1;
    let distance = 0;
    // You can change the color and intensity here
    const point = PointLightPosition
    const light1 = new THREE.PointLight(color, Intensity, distance)
    light1.position.set(point[0].light4.x, point[0].light4.y, point[0].light4.z)
    light1.lookAt(0, 0, 0);
    return light1;
  }
  static pointlight5() {
    let color = White;
    let Intensity = 1;
    let distance = 0;
    // You can change the color and intensity here
    const point = PointLightPosition
    const light1 = new THREE.PointLight(color, Intensity, distance)
    light1.position.set(point[0].light5.x, point[0].light5.y, point[0].light5.z)
    light1.lookAt(0, 0, 0);
    return light1;
  }

  static pointlight6() {
    let color = White;
    let Intensity = 0.2;
    let distance = 0;
    // You can change the color and intensity here
    const point = PointLightPosition
    const light1 = new THREE.PointLight(color, Intensity, distance)
    light1.position.set(point[0].light6.x, point[0].light6.y, point[0].light6.z)
    light1.lookAt(0, 0, 0);
    return light1;
  }

  static ambientlight() {
    // let color = 0x6c532f;
    let color = White;
    let Intensity = 0.6;
    // You can change the color and intensity here
    const light2 = new THREE.AmbientLight(color, Intensity);
    return light2;
  }
  static directionalLight(){
    const light = new THREE.DirectionalLight(White, 1);
    light.position.set(50, 50, 50)
    
    return light;
  }


  static HemisphereLight(){
    const light = new THREE.HemisphereLight(Aqua, Walnut,1 )
    return light;
  }


  constructor() { }


}