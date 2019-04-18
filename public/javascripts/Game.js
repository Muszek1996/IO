var createScene = function () {
    let renderCanvas = document.getElementById("renderCanvas");
    var engine = new BABYLON.Engine(renderCanvas, true);
    var scene = new BABYLON.Scene(engine);
    var player = new Player(scene);

    var camera = new BABYLON.ArcRotateCamera("camera", 1.17, 1.22, 500, BABYLON.Vector3(20480, 100, 0), scene);
    camera.upperBetaLimit = 1.53
    camera.attachControl(renderCanvas);
    scene.clearColor = new BABYLON.Color4(0.9, 0.9, 0.9);

    var skybox = BABYLON.Mesh.CreateBox("skyBox", 10000.0, scene);
    var skyboxMaterial = new BABYLON.StandardMaterial("skyBox", scene);
    skyboxMaterial.backFaceCulling = false;
    skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("textures/TropicalSunnyDay", scene);
    skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
    skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
    skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
    skyboxMaterial.disableLighting = true;
    skybox.material = skyboxMaterial;

    var light = new BABYLON.PointLight("omni", new BABYLON.Vector3(20, 100, 100), scene);

/* UNOSZENIE NA WODZIE ////////////

       scene.registerBeforeRender(function () {
            let time = water._lastTime / 100000;
            let x = newMeshes[0].position.x;
            let z = newMeshes[0].position.z;
            newMeshes[0].position.y = Math.abs((Math.sin(((x / 0.05) + time * water.waveSpeed)) * water.waveHeight * water.windDirection.x * 5.0) + (Math.cos(((z / 0.05) + time * water.waveSpeed)) * water.waveHeight * water.windDirection.y * 5.0));
        });

        water.addToRenderList(newMeshes[0])
*///////////////////////////////////

    var material = new BABYLON.StandardMaterial("std", scene);
    material.diffuseColor = new BABYLON.Color3(1, 0, 0);

    // Ground
// var groundMaterial = new BABYLON.StandardMaterial("groundMaterial", scene);
// groundMaterial.diffuseTexture = new BABYLON.Texture("textures/ground.jpg", scene);
// groundMaterial.diffuseTexture.uScale = groundMaterial.diffuseTexture.vScale = 4;
//
// var ground = BABYLON.Mesh.CreateGround("ground", 10512, 6000, 2, scene, false);
// ground.position.y = -1;
// ground.material = groundMaterial;

// Water
    var waterMesh = BABYLON.Mesh.CreateGround("waterMesh", 20480, 20480, 2, scene, false);

    var water = new BABYLON.WaterMaterial("water", scene);
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


    engine.runRenderLoop(function () {
        scene.render();
    });

}