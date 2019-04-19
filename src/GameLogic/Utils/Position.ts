class Position {
    x: number;
    y: number;
    z: number;
    private _directionX: number;
    private _directionY: number;
    private _directionZ: number;

    constructor(x: number, z: number, y: number ) {
        this.x = x;
        this.y = y;
        this.z = z;
        this._directionX = 0;
        this._directionY = 0;
        this._directionZ = 0;
    }

}

export default Position;
