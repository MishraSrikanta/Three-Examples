import * as THREE from "three";

export class AddGeometry{
    constructor(){}

    static BoxGeometry(){
        const geometry = new THREE.BoxBufferGeometry(15, 15, 15, 5, 5, 5)
        return geometry;
    }

    static RingGeometry(){
        const geometry = new THREE.CapsuleGeometry(2,4,4,8)
        return geometry;
    }
    static CircleGeometry(){
        const geometry = new THREE.CylinderGeometry(2, 2,20,32)
        return geometry;
    }
}