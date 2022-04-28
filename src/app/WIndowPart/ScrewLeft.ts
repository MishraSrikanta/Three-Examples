import { Silver } from "src/Constants/ColorConstants";
import * as THREE from "three";
import { texture1 } from "../Visualization/Texture/Texture1";

export class WindowScrewLeft{
    constructor() { }
    static createPart() {

        //#region T Shape
        // const points = TShapePoints;
        const shape = new THREE.Shape();
        shape.moveTo(0 ,0);
        shape.lineTo(-0.5,1);
        shape.lineTo(-0.5,4);
        shape.lineTo(-1, 5);
       
        shape.lineTo(1, 5)
        shape.lineTo(0.5, 4);
        shape.lineTo(0.5, 1);
        shape.lineTo(0, 0);
       
        //#endregion
    
        var point1 = new THREE.Vector3(0, 0, 0);
        var point2 = new THREE.Vector3(0, 0, 0.5);
        var path1 = new THREE.LineCurve3(point1, point2)
        var extrudeSettings1 = {
            bevelEnabled: false,
            steps: 20,
            extrudePath: path1
        };
        const texture = new THREE.TextureLoader().load("../assets/Material/Steelpic2.jpg")
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        texture.offset.set(0, 0.5);
        texture.repeat.set(0.1, 0.1);
        const material = new THREE.MeshStandardMaterial({color: Silver, roughness: 0.8})
        material.map =  texture
        const geometry1 = new THREE.ExtrudeBufferGeometry(shape, extrudeSettings1);
        const mesh1 = new THREE.Mesh(geometry1, material);
        mesh1.position.set(0, 2, 0)
        mesh1.rotation.z =   Math.PI 
        mesh1.scale.set(0.1, 0.1, 0.1)
        return mesh1;

    }
}

