import { Vector, Ray } from './utils.js';
import { Scene } from "./scene.js"

export interface Entities {
    type:string;
    pos:Vector;
    size:Vector;

    intersect(ray: Ray) : Vector[];
}

export class Robot implements Entities{
    type:string = "Robot";
    scene:Scene;
    pos:Vector;
    size:Vector;
    rad:number; // stored in radian
    speed:number
  
    constructor(pos:Vector, size:Vector, angle:number, speed:number, scene:Scene) {
        this.pos = pos;
        this.size = size;
        this.rad = angle * Math.PI / 180;
        this.speed = speed;
        this.scene = scene;
    }
  
    intersect(ray :Ray) : Vector[] {
        return [] as Vector[];
    }

    turn(angle:number) : void {
        this.rad += angle * Math.PI / 180;
        const timeElapsed = angle / this.speed * 250;
        this.scene.time += timeElapsed;
        this.scene.timestamps.push(new Timestamp(this.scene.time, this));
    }

    move(dist:number) : void {
        const dx = Math.cos(this.rad) * dist;
        const dy = Math.sin(this.rad) * dist;

        this.pos.x += dx;
        this.pos.y += dy;

        // Mise à jour du temps dans la scène en fonction de la vitesse de déplacement
        const timeElapsed = dist / this.speed * 250;
        this.scene.time += timeElapsed;
        this.scene.timestamps.push(new Timestamp(this.scene.time, this));
    }

    side(dist:number) : void {
        const sideAngle = this.rad - Math.PI / 2;

        const dx = Math.cos(sideAngle) * dist;
        const dy = Math.sin(sideAngle) * dist;

        this.pos.x += dx;
        this.pos.y += dy;

        // Mise à jour du temps dans la scène en fonction de la vitesse de déplacement
        const timeElapsed = dist / this.speed * 250;
        this.scene.time += timeElapsed;
        this.scene.timestamps.push(new Timestamp(this.scene.time, this));
    }

    getRay(){
        return new Ray(this.pos, Vector.fromAngle(this.rad, 10000).scale(-1));
    }
}

export class Timestamp extends Robot{
    time:number;

    constructor(time:number, robot:Robot){
        super(robot.pos.scale(1), robot.size.scale(1), robot.rad, robot.speed, robot.scene);
        this.rad = robot.rad;
        this.time = time;
    }
}

export class Block implements Entities{
    type:string = "Block";
    pos:Vector;
    size:Vector;
  
    constructor(pos:Vector, size:Vector) {
        this.pos = pos;
        this.size = size;
    }  
  
    intersect(ray :Ray) : Vector[] {

        let getPOI = ray.getPoiFinder()  
        let pois:(Vector|undefined)[] = new Array(4);
        pois[0] = getPOI(this.pos,                            this.pos.plus(this.size.projX()));
        pois[1] = getPOI(this.pos,                            this.pos.plus(this.size.projY()));
        pois[2] = getPOI(this.pos.plus(this.size.projX()),    this.pos.plus(this.size));
        pois[3] = getPOI(this.pos.plus(this.size.projY()),    this.pos.plus(this.size));

        return pois.filter(x => x !== undefined) as Vector[];
    }
}

export class Wall implements Entities{
    type:string = "Wall";
    pos:Vector;
    size:Vector;

    constructor(p1:Vector, p2:Vector) {
        this.pos = p1;
        this.size = p2;
    }
      
    intersect(ray:Ray) : Vector[] {
        const poi = ray.getPoiFinder()(this.pos, this.size);
        return poi ? ([poi] as Vector[]) : ([] as Vector[]);
    }
}