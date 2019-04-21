import {Player} from "../../src/GameLogic/Entities/Player";
import {Ship} from "./Entities/Ship";
import {EnemyShip} from "./Entities/EnemyShip";
import {ENGINE} from "./Babylon/ENGINE";
import {SCENE} from "./Babylon/SCENE";
import * as BABYLON from "babylonjs";
import io from 'socket.io-client';
import 'babylonjs-materials'
import 'babylonjs-loaders'
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
    private static ship: Ship;
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

        //this.loadPhysics();
        this.run();
        this.attachSocket();
    }

    public loadPhysics(): void {
        this.scene.enablePhysics(new BABYLON.Vector3(0, 0, 0), new BABYLON.OimoJSPlugin());
        this.scene.executeWhenReady(() => {
            this.run();
        });
    }

    public run(): void{
        this.engine.runRenderLoop(() => {
            this.scene.render();

        });
    }

    private attachSocket(): void{

        this.socket.on('myShipDisconnected', function(){

        });

        this.socket.on('createMyShip', function(ship){
            Game.ship = new Ship(ship.pos, "pirate_ship_wo_masts_no_base.stl",ship.name);
        });

        this.socket.on('otherExistingShips', function(){

        });
    }


}
