
import { Aqua, Red, Walnut, White } from "src/Constants/ColorConstants";
import * as THREE from "three";


export class AddMaterial{
    constructor(){}


    static MeshBasic(){
        var material = new THREE.MeshBasicMaterial({
            color: Walnut,
            transparent: true,
            // map: new THREE.TextureLoader().load("../assets/Material/Woodpic3.jpg")
        });
        return material;
    }
    
    static MeshStandard(){
        var material = new THREE.MeshStandardMaterial({
            color: White,
            roughness: 1,
            transparent: true,
            side: THREE.BackSide
            // map: new THREE.TextureLoader().load("../assets/Material/Woodpic3.jpg")
        });
        return material;
    }
    static MEshNormal(){
        var material = new THREE.MeshNormalMaterial({
        });
        return material;
    }

}