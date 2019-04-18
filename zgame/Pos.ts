class Pos {
    private _posX: number;
    private _posY: number;
    private _posZ: number;
    private _directionX: number;
    private _directionY: number;
    private _directionZ: number;

    constructor() {
        this._posX = 0;
        this._posY = 0;
        this._posZ = 0;
        this._directionX = 0;
        this._directionY = 0;
        this._directionZ = 0;
    }


    get posX(): number {
        return this._posX;
    }

    set posX(value: number) {
        this._posX = value;
    }

    get posY(): number {
        return this._posY;
    }

    set posY(value: number) {
        this._posY = value;
    }

    get posZ(): number {
        return this._posZ;
    }

    set posZ(value: number) {
        this._posZ = value;
    }

    get directionX(): number {
        return this._directionX;
    }

    set directionX(value: number) {
        this._directionX = value;
    }

    get directionY(): number {
        return this._directionY;
    }

    set directionY(value: number) {
        this._directionY = value;
    }

    get directionZ(): number {
        return this._directionZ;
    }

    set directionZ(value: number) {
        this._directionZ = value;
    }
}

export { Pos };
