/* globals Triangle:true */
Triangle = function (vertices, speed, angle, color) {
    "use strict";

    this.orgVerts = vertices;
    this.vertices = vertices;
    this.speed = speed;
    this.angle = angle;
    this.color = color;
    this.selected = false;
};

Triangle.prototype = {
    update: function(td) {
        this.angle = (this.angle + this.speed * td) % 360;
    },
    checkClick: function(x, y) {
        var isClicked = false;

        var p = {
            x: x,
            y: y
        };
        var p1 = {
            x: this.vertices[0],
            y: this.vertices[1]
        };
        var p2 = {
            x: this.vertices[2],
            y: this.vertices[3]
        };
        var p3 = {
            x: this.vertices[4],
            y: this.vertices[5]
        };

        p1 = this.getRotatedPoints(p1);
        p2 = this.getRotatedPoints(p2);
        p3 = this.getRotatedPoints(p3);

        var a =
            ((p2.y - p3.y)*(p.x - p3.x) + (p3.x - p2.x)*(p.y - p3.y)) /
            ((p2.y - p3.y)*(p1.x - p3.x) + (p3.x - p2.x)*(p1.y - p3.y));
        var b =
            ((p3.y - p1.y)*(p.x - p3.x) + (p1.x - p3.x)*(p.y - p3.y)) /
            ((p2.y - p3.y)*(p1.x - p3.x) + (p3.x - p2.x)*(p1.y - p3.y));
        var c = 1 - a - b;

        if (a > 0 && b > 0 && c > 0) {
            isClicked = true;
        }

        return isClicked;
    },
    getRotatedPoints: function(points) {
        var a = this.angle * (Math.PI / 180);

        return {
            x: points.x * Math.cos(a) - points.y * Math.sin(a),
            y: points.y * Math.cos(a) + points.x * Math.sin(a),
        };
    }
};
