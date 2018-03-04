"use strict";
// import THREE = require('three');
const THREE = require('three');
class Boid {
    constructor() {
        this.vector = new THREE.Vector3();
        this._acceleration = new THREE.Vector3();
        this._width = 500;
        this._height = 500;
        this._depth = 200;
        this._neighborhoodRadius = 100;
        this._maxSpeed = 4;
        this._maxSteerForce = 0.1;
        this._avoidWalls = false;
        this.position = new THREE.Vector3();
        this.velocity = new THREE.Vector3();
    }
    setGoal(target) {
        this._goal = target;
    }
    ;
    setAvoidWalls(value) {
        this._avoidWalls = value;
    }
    ;
    setWorldSize(width, height, depth) {
        this._width = width;
        this._height = height;
        this._depth = depth;
    }
    ;
    run(boids) {
        if (this._avoidWalls) {
            this.vector.set(-this._width, this.position.y, this.position.z);
            this.vector = this.avoid(this.vector);
            this.vector.multiplyScalar(5);
            this._acceleration.add(this.vector);
            this.vector.set(this._width, this.position.y, this.position.z);
            this.vector = this.avoid(this.vector);
            this.vector.multiplyScalar(5);
            this._acceleration.add(this.vector);
            this.vector.set(this.position.x, -this._height, this.position.z);
            this.vector = this.avoid(this.vector);
            this.vector.multiplyScalar(5);
            this._acceleration.add(this.vector);
            this.vector.set(this.position.x, this._height, this.position.z);
            this.vector = this.avoid(this.vector);
            this.vector.multiplyScalar(5);
            this._acceleration.add(this.vector);
            this.vector.set(this.position.x, this.position.y, -this._depth);
            this.vector = this.avoid(this.vector);
            this.vector.multiplyScalar(5);
            this._acceleration.add(this.vector);
            this.vector.set(this.position.x, this.position.y, this._depth);
            this.vector = this.avoid(this.vector);
            this.vector.multiplyScalar(5);
            this._acceleration.add(this.vector);
        } /* else {

            this.checkBounds();

        }
        */
        if (Math.random() > 0.5) {
            this.flock(boids);
        }
        this.move();
    }
    ;
    flock(boids) {
        if (this._goal) {
            this._acceleration.add(this.reach(this._goal, 0.005));
        }
        this._acceleration.add(this.alignment(boids));
        this._acceleration.add(this.cohesion(boids));
        this._acceleration.add(this.separation(boids));
    }
    ;
    move() {
        this.velocity.add(this._acceleration);
        var l = this.velocity.length();
        if (l > this._maxSpeed) {
            this.velocity.divideScalar(l / this._maxSpeed);
        }
        this.position.add(this.velocity);
        this._acceleration.set(0, 0, 0);
    }
    ;
    checkBounds() {
        if (this.position.x > this._width)
            this.position.x = -this._width;
        if (this.position.x < -this._width)
            this.position.x = this._width;
        if (this.position.y > this._height)
            this.position.y = -this._height;
        if (this.position.y < -this._height)
            this.position.y = this._height;
        if (this.position.z > this._depth)
            this.position.z = -this._depth;
        if (this.position.z < -this._depth)
            this.position.z = this._depth;
    }
    ;
    //
    avoid(target) {
        var steer = new THREE.Vector3();
        steer.copy(this.position);
        steer.sub(target);
        steer.multiplyScalar(1 / this.position.distanceToSquared(target));
        return steer;
    }
    ;
    repulse(target) {
        var distance = this.position.distanceTo(target);
        if (distance < 150) {
            var steer = new THREE.Vector3();
            steer.subVectors(this.position, target);
            steer.multiplyScalar(0.5 / distance);
            this._acceleration.add(steer);
        }
    }
    ;
    reach(target, amount) {
        var steer = new THREE.Vector3();
        steer.subVectors(target, this.position);
        steer.multiplyScalar(amount);
        return steer;
    }
    ;
    alignment(boids) {
        var boid, velSum = new THREE.Vector3(), count = 0;
        for (var i = 0, il = boids.length; i < il; i++) {
            if (Math.random() > 0.6)
                continue;
            boid = boids[i];
            let distance = boid.position.distanceTo(this.position);
            if (distance > 0 && distance <= this._neighborhoodRadius) {
                velSum.add(boid.velocity);
                count++;
            }
        }
        if (count > 0) {
            velSum.divideScalar(count);
            var l = velSum.length();
            if (l > this._maxSteerForce) {
                velSum.divideScalar(l / this._maxSteerForce);
            }
        }
        return velSum;
    }
    ;
    cohesion(boids) {
        var boid, distance, posSum = new THREE.Vector3(), steer = new THREE.Vector3(), count = 0;
        for (var i = 0, il = boids.length; i < il; i++) {
            if (Math.random() > 0.6)
                continue;
            boid = boids[i];
            distance = boid.position.distanceTo(this.position);
            if (distance > 0 && distance <= this._neighborhoodRadius) {
                posSum.add(boid.position);
                count++;
            }
        }
        if (count > 0) {
            posSum.divideScalar(count);
        }
        steer.subVectors(posSum, this.position);
        var l = steer.length();
        if (l > this._maxSteerForce) {
            steer.divideScalar(l / this._maxSteerForce);
        }
        return steer;
    }
    ;
    separation(boids) {
        var boid, distance, posSum = new THREE.Vector3(), repulse = new THREE.Vector3();
        for (var i = 0, il = boids.length; i < il; i++) {
            if (Math.random() > 0.6)
                continue;
            boid = boids[i];
            distance = boid.position.distanceTo(this.position);
            if (distance > 0 && distance <= this._neighborhoodRadius) {
                repulse.subVectors(this.position, boid.position);
                repulse.normalize();
                repulse.divideScalar(distance);
                posSum.add(repulse);
            }
        }
        return posSum;
    }
}
exports.Boid = Boid;
//# sourceMappingURL=boid.js.map