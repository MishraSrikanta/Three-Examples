import * as THREE from "three";
import { texture1 } from "../Visualization/Texture/Texture1";

export class WindowLeft{
    constructor() { }
    static createPart() {

        //#region T Shape
        // const points = TShapePoints;
        const shape = new THREE.Shape();
        shape.moveTo(0 ,0);
        shape.lineTo(0,1);
        shape.lineTo(1,1);
        shape.lineTo(1, 0);
        shape.lineTo(0, 0)
        shape.lineTo(0,0.2);
        shape.lineTo(0.8, 0.2);
        shape.lineTo(0.8, 0.8);
        shape.lineTo(0.2, 0.8);
        shape.lineTo(0.2, 0.2)
        //#endregion
    
        var point1 = new THREE.Vector3(0, 0, 0);
        var point2 = new THREE.Vector3(0, 0, 10);
        var path1 = new THREE.LineCurve3(point1, point2)
        var extrudeSettings1 = {
            bevelEnabled: false,
            steps: 20,
            extrudePath: path1
        };

        const material = texture1.loader();
        const geometry1 = new THREE.ExtrudeBufferGeometry(shape, extrudeSettings1);
        const mesh1 = new THREE.Mesh(geometry1, material);
        mesh1.position.set(-9, 0, 0)
        mesh1.rotation.x = - Math.PI /2
        return mesh1;

    }
}

