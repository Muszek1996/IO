import * as BABYLON from 'babylonjs/babylon'
import 'babylonjs-materials'
import 'babylonjs-loaders'
import io from 'socket.io-client';
import {Ship} from './Entities/Ship.js'
import {CAMERA} from './Babylon/CAMERA.js'
import {SCENE} from './Babylon/SCENE.js'
import {ENGINE} from './Babylon/ENGINE.js'

let initialize = function () {

    let scene = SCENE.getInstance();
    let engine = ENGINE.getInstance();
    let camera = CAMERA.getInstance();

    BABYLON.Database.IDBStorageEnabled = true;

    let skybox = BABYLON.Mesh.CreateBox("skyBox", 10000.0, scene);
    let skyboxMaterial = new BABYLON.StandardMaterial("skyBox", scene);
    skyboxMaterial.backFaceCulling = false;
    skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("textures/TropicalSunnyDay", scene);
    skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
    skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
    skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
    skyboxMaterial.disableLighting = true;
    skybox.material = skyboxMaterial;

    let light = new BABYLON.PointLight("omni", new BABYLON.Vector3(1111,1111,1111),scene);
    var material = new BABYLON.StandardMaterial("std",scene);
    material.diffuseColor = new BABYLON.Color3(1,0,0);


    // Water
    let waterMesh = BABYLON.Mesh.CreateGround("waterMesh", 20480, 20480, 2, scene, false);

    let water = new BABYLON.WaterMaterial("water", scene);
    water.bumpTexture = new BABYLON.Texture("textures/waterbump.png", scene);

    // Water properties
    water.windForce = -10;
    water.waveHeight = 0.8;
    water.windDirection = new BABYLON.Vector2(-1, 0.1);
    water.waterColor = new BABYLON.Color3(0.1, 0.1, 0.6);
    water.colorBlendFactor = 0.2;
    water.bumpHeight = 1;
    water.waveLength = 0.1;
    water.waveSpeed = 200;


    // Add skybox and ground to the reflection and refraction
    water.addToRenderList(skybox);
    // water.addToRenderList(ground);

    // Assign the water material
    waterMesh.material = water;

    var Ships = {};
    var shipName = "";//TODO

    //socket integration
    var socket = io();

    socket.on('otherExistingShips', function(ships){
        for (var k in ships){
            if (ships.hasOwnProperty(k)) {
                Ships[ships[k].name] = new Ship(ships[k].pos, "pirate_ship_wo_masts_no_base.stl",ships[k].name);
            }
        }
    });
    socket.on('myShip', function(ship){
        shipName = ship.name;//TODO
        Ships[ship.name] = new Ship(ship.pos, "pirate_ship_wo_masts_no_base.stl",ship.name);
        CAMERA.getInstance().position.x = ship.pos.x-200;
        CAMERA.getInstance().position.y = ship.pos.y+100;
        CAMERA.getInstance().position.z = ship.pos.z;
        CAMERA.getInstance().target = ship;
        CAMERA.getInstance().rotation = new BABYLON.Vector3(BABYLON.Tools.ToRadians(20), BABYLON.Tools.ToRadians(90), BABYLON.Tools.ToRadians(0));

    });

    socket.on('newlyConnectedShip', function(ship){
        Ships[ship.name] = new Ship(ship.pos, "pirate_ship_wo_masts_no_base.stl",ship.name);
    });

    socket.on('shipDisconnected', function(shipID){
        scene.meshes.find(x => x.name === shipID).dispose();
        delete Ships[shipID];
    });


    var map ={}; //object for multiple key presses
    scene.actionManager = new BABYLON.ActionManager(scene);

    scene.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnKeyDownTrigger, function (evt) {
        map[evt.sourceEvent.key] = evt.sourceEvent.type == "keydown";
    }));

    scene.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnKeyUpTrigger, function (evt) {
        map[evt.sourceEvent.key] = evt.sourceEvent.type == "keydown";
    }));



    engine.runRenderLoop(function (){
        scene.render();
    });

    scene.registerAfterRender(function () {
        if(map["a"] || map["A"]){
            console.log("a");
        }
        if(map["d"] || map["D"]){
            console.log("d");
        }
        
    })

    window.addEventListener('resize', function(){
         engine.resize();﻿
     });﻿﻿﻿

    //TODO cleanup
};
document.addEventListener("DOMContentLoaded", function () {
    initialize();
});
