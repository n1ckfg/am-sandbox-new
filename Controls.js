import {b3 as e, aY as t, c as i} from "./vendor.js";
class r {
    constructor(i) {
        var {clickables: r, engine: a} = i;
        this.clickables = r,
        this.clickNodes = r.map((e=>e.node)),
        this.engine = a,
        this.rotationMatrix = new e,
        this.raycaster = new t,
        this.click = this.click.bind(this),
        this.select = this.select.bind(this)
    }
    click(e) {
        var {clickables: t, clickNodes: i} = this;
        if (!0 === t)
            this.handle();
        else {
            var {raycaster: r} = this
              , {camera: a, renderer: n} = this.engine
              , s = e.clientX / n.domElement.clientWidth * 2 - 1
              , c = -e.clientY / n.domElement.clientHeight * 2 + 1;
            r.setFromCamera({
                x: s,
                y: c
            }, a);
            var l = r.intersectObjects(i, !0);
            this.handle(l)
        }
    }
    select() {
        var e = this;
        return i((function*() {
            var {clickables: t, clickNodes: i} = e;
            if (!0 === t)
                yield e.handle();
            else {
                var {raycaster: r, rotationMatrix: a} = e
                  , {controller: n} = e.engine;
                a.extractRotation(n.matrixWorld),
                r.ray.origin.setFromMatrixPosition(n.matrixWorld),
                r.ray.direction.set(0, 0, -1).applyMatrix4(a);
                var s = r.intersectObjects(i, !0);
                yield e.handle(s)
            }
        }
        ))()
    }
    handle() {
        var e = arguments
          , t = this;
        return i((function*() {
            var i = (e.length > 0 && void 0 !== e[0] ? e[0] : []).map((e=>{
                var {object: i} = e;
                return [i.name, t.clickables.find((e=>e.node.name === i.name))]
            }
            ))
              , r = Object.fromEntries(i)
              , a = Object.values(r);
            return yield t.engine.onTouch(a),
            a
        }
        ))()
    }
}
export {r as Controls};
