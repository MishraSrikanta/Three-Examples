
import { Red, Walnut } from "src/Constants/ColorConstants";
import * as THREE from "three";


export class Material{
    constructor(){}


    static addMaterial(){
        var material = new THREE.MeshBasicMaterial({
            color: Walnut,
           
            

            // roughness: 1,
            // map: new THREE.TextureLoader().load("../assets/Material/Woodpic3.jpg")
        });
        
        
        return material;
    }
}