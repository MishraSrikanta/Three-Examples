import * as THREE from "three";

export class Geometry{
    constructor(){}

    static addGeometry(point1: any, point2: any){
        var shape = new THREE.Shape();
        shape.moveTo(0, 0);
        shape.lineTo(0, 1);
        shape.lineTo(1, 1);
        shape.lineTo(1, 0);
        shape.lineTo(0, 0);
       
        var path1 = new THREE.LineCurve3(point1, point2)
        var extrudeSettings1 = {
          bevelEnabled: false,
          steps: 20,
          extrudePath: path1
        };
        const geometry = new THREE.ExtrudeBufferGeometry(shape , extrudeSettings1);
        return geometry;
    }
}