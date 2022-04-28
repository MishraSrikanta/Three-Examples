import { Black } from "src/Constants/ColorConstants";
import * as THREE from "three";


export class Line{
    constructor(){}
    static CreateLine(){
        const material = new THREE.MeshBasicMaterial({color: Black});
        const geometry = new THREE.BoxBufferGeometry(5, 5);
        const line = new THREE.Mesh(geometry, material);
        return line;
    }
}