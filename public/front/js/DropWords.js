/*
_________Class | DropWords
___Description | Controls creation and movement of the rain of words

________Author | sumbioun.com
____Programmer | pedro veneroso

_______Version | 0.1β
__Release date | Oct 28th 2016
___Last update | Oct 28th 2016

_______License |GPLv3 2016 sumbioun.com

*/

function DropWords() {

    let master = this;
    let text;
    let draw_text;

    let stop_rain;

    let end_rain = false;

    // let the_text;

    // 位置
    let text_x_offset;
    let linear_function;
    let text_x;
    let text_y;
    // let ref_x = (window.innerWidth / 2);
    // let ref_y = (window.innerHeight / 2);
    let min_x;
    let max_x;
    let min_y = 100;
    let max_y = window.innerHeight - 100;
    let origin_x;
    let origin_y;
    let word_width = 0;

    // 时间
    let text_timing;
    let min_time = 1;
    let max_time = 400;
    // let current_time = 0;
    let count_end = 0;

    // 物理
    // let drop_size = 18; // 接收创建和更新
    // let drop_mass = 1; // 接收创建和更新
    let drop_wind; // 与质量的关系；根据质量计算偏差
    let drop_speed;
    // let drop_acceleration = 0;

    let global_wind;
    let gravity;

    // let standard_time;

    // let test_counter = 0;


    // 原型
    this.initializeText = function (in_text, in_gravity, in_wind) {
        text = in_text;
        gravity = in_gravity;
        global_wind = in_wind;

        text_timing = new Array(text.length);
        text_x = new Array(text.length);
        text_y = new Array(text.length);
        draw_text = new Array(text.length);
        drop_speed = new Array(text.length);
        drop_wind = new Array(text.length);
        stop_rain = new Array(text.length);
        text_x_offset = new Array(text.length);
        linear_function = new Array(text.length);

        min_x = 100;
        word_width = text_timing.length * 25;
        max_x = window.innerWidth - word_width - 100;
        origin_x = Math.floor(Math.random() * (max_x - min_x + 1)) + min_x;
        origin_y = Math.floor(Math.random() * (max_y - min_y + 1)) + min_y;


        for (let i = 0; i < text_timing.length; i++) {
            text_timing[i] = Math.floor(Math.random() * (max_time - min_time + 1)) + min_time;
            text_x_offset[i] = (Math.floor(Math.random() * (35 - 17 + 1)) + 17);
            word_width += text_x_offset[i];
            drop_wind[i] = Math.random() * (0.2 + 0.2) - 0.2;
            drop_wind[i] += global_wind;

            text_y[i] = Math.floor(Math.random() * (200 + 1)) - 200;
            if (i > 0) {
                drop_speed[i] = master.getStartSpeed(i);
            } else {
                drop_speed[i] = Math.random() * (0.8 - 0.5) + 0.5;
            }

            master.linearFunction(i);

            draw_text[i] = new Array(3);
            text_x[i] = master.getStartPosition(i, text_y[i]);
            draw_text[i][3] = Math.floor(Math.random() * (28 - 12 + 1)) + 12;
        }
    }

    this.updateText = function () {
        count_end = 0;
        for (let i = 0; i < text_timing.length; i++) {
            text_y[i] += drop_speed[i];
            drop_speed[i] += gravity;

            text_x[i] = master.getStartPosition(i, text_y[i]);

            draw_text[i][0] = text_x[i];
            draw_text[i][1] = text_y[i];
            draw_text[i][2] = text[i];

            if (text_y[i] >= window.innerHeight + 200) {
                count_end++;
            }
            if (count_end === text.length) {
                end_rain = true;
            }
        }
    }

    this.getText = function () {
        return draw_text;
    }

    this.echoLine = function () {
        let echo = new Array(text_timing.length);
        let iterations = new Array(text_timing.length);
        for (let i = 0; i < text_timing.length; i++) {
            echo[i] = new Array(2);
            iterations[i] = drop_speed[i] * 6;

            echo[i][1] = text_y[i] - ((drop_speed[i] * (iterations[i] - 1)) - (gravity ^ (iterations[i] - 1)));
            echo[i][0] = master.getStartPosition(i, echo[i][1]);
        }
        return echo;
    }

    this.linearFunction = function (in_id) {
        let final_x;
        if (in_id === 0) {
            final_x = origin_x;
        } else {
            final_x = origin_x;
            for (let p = 0; p < in_id; p++) {
                final_x += text_x_offset[p];
            }
        }
        let last_x = final_x - drop_wind[in_id];
        let final_y = origin_y;

        // let check_last_accelaration;
        let check_last_position = 0;
        let check_drop_speed = drop_speed[in_id];

        while (check_last_position < origin_y) {
            check_drop_speed += gravity;
            check_last_position += check_drop_speed;

        }
        let last_y = origin_y - check_drop_speed;
        linear_function[in_id] = [last_x, last_y, final_x, final_y];
    }

    this.getStartPosition = function (in_id, in_y) {
        // 根据最终 x 和 y 坐标计算初始 x 的线性函数
        let m = (linear_function[in_id][3] - linear_function[in_id][1]) / (linear_function[in_id][2] - linear_function[in_id][0]);   //    m=y2-y1/x2-x1
        let b = linear_function[in_id][3] - (m * linear_function[in_id][2]);   // y = mx + b;  b = y - mx
        return (in_y - b) / m;    // y = mx+b;  y-b = mx;  y-b/m = x
    }

    this.getStartSpeed = function (current_id) {
        let reference_start_y = text_y[0];
        let reference_drop_speed = drop_speed[0];
        // let current_timing = text_timing[current_id];
        // let current_start_y = text_y[current_id];

        let reference_y = reference_start_y;
        let iterations = 0;
        while (reference_y < origin_y) {
            reference_y += reference_drop_speed;
            reference_drop_speed += gravity;
            iterations++;
        }
        iterations -= 1;

        return (origin_y - text_y[current_id] - (((gravity * iterations) + gravity) * (iterations / 2))) / iterations;
    }

    this.endRainText = function () {
        return end_rain;
    }

}