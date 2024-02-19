/*
_________Class | Drops
___Description | Controls creation and movement of the rain of characters

________Author | sumbioun.com
____Programmer | pedro veneroso

_______Version | 0.1β
__Release date | Oct 24th 2016
___Last update | Oct 25th 2016

_______License |GPLv3 2016 sumbioun.com

*/

function Drops(in_id, in_chars, in_gravity) {

    let master = this;
    // let id = in_id;
    let init = true;

    // 物理
    let drop_size = 18; // 接收创建和更新
    // let drop_mass = 1; // 接收创建和更新
    let drop_wind = Math.random() * (0.2 + 0.2) - 0.2; // 与质量的关系；根据质量计算偏差
    let drop_speed = 0;
    // let drop_acceleration = 0;
    let chars = in_chars;

    let global_wind = 0;
    let gravity = in_gravity;

    // 内容
    let drop_char = 0; // 接收创建和更新
    // let drop_color = "#ffffff"; // 接收创建和更新

    // 位置
    let drop_x = 0; // 创建和更新时接收；-100 和 +100 与屏幕有关
    let drop_y = 0; // 在创建和更新时接收；-200 至 0 与屏幕有关

    this.initializeDrop = function () {
        if (init === true) {
            drop_y = Math.floor(Math.random() * (600 + 1)) - 600;
        } else {
            drop_y = Math.floor(Math.random() * (200 + 1)) - 200;
        }
        drop_x = Math.floor(Math.random() * (window.innerWidth + 1));
        drop_size = Math.floor(Math.random() * (26 - 8 + 1)) + 8;
        drop_speed = Math.random() * (1.5 - 0.5) + 0.5;
        drop_char = Math.floor(Math.random() * (26 - 1 + 1)) + 1;
        drop_char = chars[drop_char - 1];
    }

    this.updateDrop = function (in_intensity, in_wind) {
        drop_y += drop_speed;
        drop_speed += gravity;
        if (drop_y > window.innerHeight + 200) {
            master.initializeDrop();
        }

        drop_x += in_wind + drop_wind;
        global_wind = in_wind;
    }

    this.getX = function () {
        return drop_x;
    }

    this.getY = function () {
        return drop_y;
    }

    this.getSize = function () {
        return drop_size;
    }

    this.getChar = function () {
        return drop_char;
    }

    this.echoLine = function () {
        let echo = [];
        let iterations = drop_speed * 6;
        echo[0] = drop_x - ((global_wind + drop_wind) * (iterations - 1));
        echo[1] = drop_y - ((drop_speed * (iterations - 1)) - (gravity ^ (iterations - 1)));
        return echo;
    }

}