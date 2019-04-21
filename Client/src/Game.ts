import {Player} from "../../src/GameLogic/Entities/Player";
import {OwnShip} from "./Entities/OwnShip";
import {EnemyShip} from "./Entities/EnemyShip";
import {ENGINE} from "./Babylon/ENGINE";
import {SCENE} from "./Babylon/SCENE";
import * as BABYLON from "babylonjs";
import io from 'socket.io-client';
import 'babylonjs-materials';
import 'babylonjs-loaders';
import 'babylonjs/Oimo';
import {CAMERA} from "./Babylon/CAMERA";
import {Water} from "./Water";
import {SkyBox} from "./SkyBox";
import {Light} from "./Light";


export class Game {
    private canvas: any;
    private engine: BABYLON.Engine;
    private scene: BABYLON.Scene;
    private camera: BABYLON.Camera;
    private water: Water;
    private skyBox: SkyBox;
    private light: Light;
    private static player: Player;
    private enemys: {[id : string]: EnemyShip} = {};//TODO ENEMY !!!
    public  myShip: OwnShip;
    private enemyShips: {[id : string]: EnemyShip} = {};
    private socket: io;

    constructor() {

        this.canvas = document.getElementById("");
        this.camera = CAMERA.getInstance();
        this.engine = ENGINE.getInstance();
        this.scene = SCENE.getInstance();
        this.socket = io();

        this.skyBox = new SkyBox();
        this.water = new Water();
        this.water.addToRenderList(this.skyBox.skyBoxMesh);
        this.light = new Light();

        window.addEventListener("resize", () => {
            this.engine.resize();
        });

        this.loadPhysics();
        this.run();
        this.attachSocket();

    }

    public loadPhysics(): void {
        this.scene.enablePhysics(new BABYLON.Vector3(0,-9.81, 0), new BABYLON.OimoJSPlugin());
        this.scene.executeWhenReady(() => {
            this.run();
        });
    }

    public run(): void{
        this.engine.runRenderLoop(() => {
            this.scene.render();
            let deltaTime = this.engine.getDeltaTime();

            // console.log(Game.myShip);
            // if(Game.myShip!=null)
            //     Game.myShip.applyMovement(deltaTime);

        });
    }




    private attachSocket(): void{
        let self = this;

        this.socket.on('myShipDisconnected', function(){

        });

        this.socket.on('createMyShip', function(ship){
            self.myShip = new OwnShip(ship);
            CAMERA.getInstance().position.x = ship.pos.x-200;
            CAMERA.getInstance().position.y = ship.pos.y+100;
            CAMERA.getInstance().position.z = ship.pos.z;
/*            CAMERA.getInstance().target = SCENE.getInstance().getMeshByName(ship.name);
            CAMERA.getInstance().rotation = new BABYLON.Vector3(BABYLON.Tools.ToRadians(20), BABYLON.Tools.ToRadians(90), BABYLON.Tools.ToRadians(0));*/
        });

        this.socket.on('otherExistingShips', function(){

        });
    }


}
