import {Player} from "../../src/GameLogic/Entities/Player";
import {OwnShip} from "./Entities/Ships/OwnShip";
import {EnemyShip} from "./Entities/Ships/EnemyShip";
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

        this.camera = CAMERA.getInstance();
        this.engine = ENGINE.getInstance();
        this.scene = SCENE.getInstance();
        this.socket = io();
        this.loadPhysics();
        this.skyBox = new SkyBox();
        this.water = new Water();
        this.water.addToRenderList(this.skyBox.skyBoxMesh);
        this.light = new Light();

        window.addEventListener("resize", () => {
            this.engine.resize();
        });


        this.run();
        this.attachSocket();

    }

    public loadPhysics(): void {
        let phsicsEnabled = this.scene.enablePhysics(new BABYLON.Vector3(0,-9.81, 0), new BABYLON.OimoJSPlugin());
        console.log("Is physics initialized?:"+ phsicsEnabled.toString());
        this.scene.executeWhenReady(() => {
            this.run();
        });
    }

    public run(): void{
        let self = this;
        this.engine.runRenderLoop(() => {
            this.scene.render();
            let deltaTime = this.engine.getDeltaTime();

            if(self.myShip!=null)
                self.myShip.applyMovement(deltaTime);

        });
    }




    private attachSocket(): void{
        let self = this;

        this.socket.on('shipDisconnected', function(shipName){
                self.enemyShips[shipName].dispose();
                //console.log("Ship to dispose:");
                //console.log(self.enemyShips[shipName]);
                delete self.enemyShips[shipName];
        });

        this.socket.on('createMyShip', function(ship){
            console.log("Received own ship");
            console.log(ship);
            self.myShip = new OwnShip(ship);
            CAMERA.getInstance().position.x = ship.pos.x+200;
            CAMERA.getInstance().position.y = ship.pos.y+100;
            CAMERA.getInstance().position.z = ship.pos.z;
/*            CAMERA.getInstance().target = SCENE.getInstance().getMeshByName(ship.name);
            CAMERA.getInstance().rotation = new BABYLON.Vector3(BABYLON.Tools.ToRadians(20), BABYLON.Tools.ToRadians(90), BABYLON.Tools.ToRadians(0));*/
            self.myShip.draw();
            console.log(self.myShip);
        });

        this.socket.on('otherExistingShips', function(ships){
            console.log("Received other existing ships");
            console.log(ships);
            for (var k in ships){
                if (ships.hasOwnProperty(k)) {
                    self.enemyShips[ships[k].name] = new EnemyShip(ships[k]);
                    self.enemyShips[ships[k].name].draw();
                }
            }
        });
        this.socket.on('newlyConnectedShip', function(ship){
            console.log("Received newly connected ship");
            console.log(ship);
            let enemyShip =  new EnemyShip(ship);
            self.enemyShips[ship.name] = enemyShip;
            enemyShip.draw();
        });


    }


}
