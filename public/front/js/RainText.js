/*
_________Class | RainText
___Description | Controls creation and movement of the rain of characters

________Author | sumbioun.com
____Programmer | pedro veneroso

_______Version | 0.1β
__Release date | Oct 24th 2016
___Last update | Oct 26th 2016

_______License |GPLv3 2016 sumbioun.com

*/

function RainText() {

    // 每行限制字符数，超过限制时创建新行
    // 行尾不分隔
    // 确认回车

    let master = this;
    let text;
    let draw_text;

    let stop_rain;
    let continue_rain = false;
    let free_text;

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
    let max_time = 120;
    let current_time = 0;
    let count_stop = 0;
    let count_time = 200;
    let count_free = 0;
    let count_end = 0;

    // 物理
    // let drop_size = 18; // 接收创建和更新
    // let drop_mass = 1; // 接收创建和更新
    let drop_wind; // 与质量的关系；根据质量计算偏差
    let store_drop_wind;
    let drop_speed;
    let store_drop_speed;
    // let drop_acceleration = 0;
    let deceleration = 0;
    let decelerate_when;

    let global_wind;
    let gravity;

    // 目录
    // let drop_color = "#ffffff"; // 接收创建和更新


    // 原型
    this.initializeText = function (in_text, in_gravity, in_wind) {
        text = in_text;
        gravity = in_gravity;
        global_wind = in_wind;

        count_time = 14 * in_text.length;

        text_timing = new Array(text.length);
        text_x = new Array(text.length);
        text_y = new Array(text.length);
        draw_text = new Array(text.length);
        drop_speed = new Array(text.length);
        drop_wind = new Array(text.length);
        stop_rain = new Array(text.length);
        text_x_offset = new Array(text.length);
        linear_function = new Array(text.length);
        store_drop_wind = new Array(text.length);
        store_drop_speed = new Array(text.length);
        deceleration = new Array(text.length);
        decelerate_when = new Array(text.length);

        for (let i = 0; i < text_timing.length; i++) {
            text_x_offset[i] = (Math.floor(Math.random() * (35 - 17 + 1)) + 17);
            word_width += text_x_offset[i];
            drop_wind[i] = Math.random() * (0.2 + 0.2) - 0.2;
            drop_wind[i] += global_wind;
            store_drop_wind[i] = drop_wind[i];
            drop_speed[i] = Math.random() * (1.5 - 0.5) + 0.5;
            store_drop_speed[i] = drop_speed[i];
            stop_rain[i] = false;
            deceleration[i] = new Array(2);
            deceleration[i][0] = false;
            decelerate_when[i] = Math.floor(drop_speed[i] * 200);
        }

        min_x = 100;
        max_x = window.innerWidth - word_width - 100;
        origin_x = Math.floor(Math.random() * (max_x - min_x + 1)) + min_x;
        origin_y = Math.floor(Math.random() * (max_y - min_y + 1)) + min_y;

        for (let i = 0; i < text_timing.length; i++) {
            master.linearFunction(i);
            text_timing[i] = Math.floor(Math.random() * (max_time - min_time + 1)) + min_time;
            draw_text[i] = new Array(3);

            text_y[i] = Math.floor(Math.random() * (600 + 1)) - 600;
            text_x[i] = master.getStartPosition(i, text_y[i]);

            draw_text[i][3] = Math.floor(Math.random() * (28 - 12 + 1)) + 12;
        }
    }

    this.reinitializeText = function () {
        drop_speed = new Array(text.length);
        drop_wind = new Array(text.length);

        for (let i = 0; i < text_timing.length; i++) {
            drop_wind[i] = store_drop_wind[i];
            drop_speed[i] = store_drop_speed[i];
        }
        free_text = new Array(text.length);
        for (let n = 0; n < text.length; n++) {
            free_text[n] = Math.floor(Math.random() * (max_time - min_time + 1)) + min_time;
        }
    }

    this.updateText = function () {
        count_stop = 0;
        count_end = 0;
        for (let i = 0; i < text_timing.length; i++) {
            if (text_y[i] >= origin_y) {
                if (continue_rain === false) {
                    stop_rain[i] = true;
                    count_stop++;
                }
            }
            if (stop_rain[i] === false && continue_rain === false) {
                text_y[i] += drop_speed[i];
                if (text_y[i] < (origin_y - (decelerate_when[i]))) {
                    drop_speed[i] += gravity;
                } else {
                    if (deceleration[i][0] === false) {
                        deceleration[i][1] = (1 - drop_speed[i] * drop_speed[i]) / (2 * decelerate_when[i]);
                        deceleration[i][0] = true;
                    }
                    drop_speed[i] += deceleration[i][1];
                }
                text_x[i] = master.getStartPosition(i, text_y[i]);

                draw_text[i][0] = text_x[i];
                draw_text[i][1] = text_y[i];
                draw_text[i][2] = text[i];
            } else if (stop_rain[i] === false && continue_rain === true) {
                if (count_free > free_text[i]) {
                    text_y[i] += drop_speed[i];
                    drop_speed[i] += gravity;

                    text_x[i] = master.getStartPosition(i, text_y[i]);

                    draw_text[i][0] = text_x[i];
                    draw_text[i][1] = text_y[i];
                    draw_text[i][2] = text[i];
                }
            }

            if (text_y[i] >= window.innerHeight + 200) {
                count_end++;
            }
        }
        if (count_stop === text.length) {
            count_time--;
            if (count_time <= 0) {
                continue_rain = true;
                master.reinitializeText();
                for (let m = 0; m < stop_rain.length; m++) {
                    stop_rain[m] = false;
                }
            }
        }
        current_time++;
        if (continue_rain) {
            count_free++;
        }
        if (count_end === text.length) {
            end_rain = true;
        }
    }

    this.getText = function () {
        return draw_text;
    }

    this.echoLine = function () {
        let echo = new Array(text_timing.length);
        let iterations = new Array(text_timing.length);
        for (let i = 0; i < text_timing.length; i++) {
            if (stop_rain[i] === false && free_text === undefined) {
                echo[i] = new Array(2);
                iterations[i] = drop_speed[i] * 6;

                echo[i][1] = text_y[i] - ((drop_speed[i] * (iterations[i] - 1)) - (gravity ^ (iterations[i] - 1)));
                echo[i][0] = master.getStartPosition(i, echo[i][1]);
            } else if (stop_rain[i] === false && count_free > free_text[i]) {
                echo[i] = new Array(2);
                iterations[i] = drop_speed[i] * 6;
                echo[i][1] = text_y[i] - ((drop_speed[i] * (iterations[i] - 1)) - (gravity ^ (iterations[i] - 1)));
                echo[i][0] = master.getStartPosition(i, echo[i][1]);
            } else {
                echo[i] = null;
            }
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

    // this.setText = function (in_text) {
    //     the_text = in_text;
    // }

    this.endRainText = function () {
        return end_rain;
    }

}