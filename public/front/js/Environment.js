/*
_________Class | Environment
___Description | Controls physics simulation for the environment

________Author | sumbioun.com
____Programmer | pedro veneroso

_______Version | 0.1β
__Release date | Oct 24th 2016
___Last update | Oct 28th 2016

_______License |GPLv3 2016 sumbioun.com

formar palavras, a partir de bd, no fluxo da chuva

*/

function Environment() {

    // let master = this;

    // 标准
    // let basic_font_size = 18;
    // let basic_mass = 1;
    // let drop_chars = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];`
    let drop_chars = ['🎂', '⭐', '🌟', '✨', '🌠', '🎇', '🎆', '🎈', '🎉', '🎁', '🎐', '🎊', '🎂', '⭐', '🌟', '✨', '🌠', '🎇', '🎆', '🎈', '🎉', '🎁', '🎐', '🎊', '🌟', '🎉'];

    // 物理 - 常量
    let global_acceleration = 0.01;

    // 物理 - 变量
    let intensity = Math.floor(Math.random() * (1200 - 500 + 1)) + 500; //  屏幕上的字符数
    let current_intensity = 0;
    let windEW = Math.random() - 0.5; // 负向左，正向右
    // let windNS = 0; // 负负得正
    // let time = 0.0; // 自网站开通以来的毫秒数，用于更新位置
    // let current_words_intensity = 3;

    this.updateCurrentIntensity = function () {
        let update_intensity = Math.floor(Math.random() * (3 - 1 + 1)) + 1;
        if ((current_intensity + update_intensity) < intensity) {
            current_intensity += update_intensity;
        }
    }

    this.updateCurrentWind = function (mouse_x) {
        windEW = (mouse_x / window.innerWidth) - 0.5;
    }

    this.getIntensity = function () {
        return intensity;
    }

    this.getCurrentIntensity = function () {
        return current_intensity;
    }

    this.getWind = function () {
        return windEW;
    }

    this.getChars = function () {
        return drop_chars;
    }

    this.getGravity = function () {
        return global_acceleration;
    }

    // this.getCurrentWordsIntensity = function () {
    //     return current_words_intensity;
    // }

    this.initializeCanvas = function () {
        let canvas = document.createElement("canvas");
        canvas.setAttribute('width', Math.floor(window.innerWidth).toString());
        canvas.setAttribute('height', Math.floor(window.innerHeight).toString());
        canvas.id = 'rain_processing';
        document.body.appendChild(canvas);
    }
}