/*
_________Class | Text
___Description | Controls user input of text

________Author | sumbioun.com
____Programmer | pedro veneroso

_______Version | 0.1β
__Release date | Oct 26th 2016
___Last update | Oct 28th 2016

_______License |GPLv3 2016 sumbioun.com

• definir timing
	null ele processa normal, do contrário, pode mostrar mais de um texto por vez na tela

	// tudo junto: timing breve
	// enter: timing longo
	// vários textos: espera terminar de cair cada um

*/

function Text() {

    let master = this;
    let number_of_chars;
    let break_enter;
    let processed_text;
    let index;

    // 输入

    this.processText = function (in_text) {
        master.resetAll();
        number_of_chars = Math.ceil((window.innerWidth - 200) / 35);
        break_enter = in_text.split("\n"); // 填充回车键
        master.prepareText();
        return processed_text;
    }

    this.resetAll = function () {
        index = 0;
        processed_text = [];
        break_enter = undefined;
        number_of_chars = 0;
    }

    this.prepareText = function () {
        for (let i = 0; i < break_enter.length; i++) {
            if (break_enter[i].length <= number_of_chars && break_enter[i].length > 0) {
                processed_text[index] = break_enter[i];
                index++;
            } else if (break_enter[i].length > number_of_chars) {
                let keep_going = true;
                let start_index = 0;
                let end_index = number_of_chars - 1;
                while (keep_going === true) {
                    console.log("run");
                    if (end_index < break_enter[i].length) {
                        if (break_enter[i][end_index] !== " " && break_enter[i][end_index] !== undefined) {
                            let save_end = end_index;
                            let end_while = false;
                            while (!end_while) {
                                end_index--;
                                if (break_enter[i][end_index] === " ") {
                                    end_while = true;
                                } else if (end_index <= start_index) {
                                    end_index = save_end;
                                    end_while = true;
                                }
                            }
                            processed_text[index] = break_enter[i].slice(start_index, end_index + 1);
                            index++;
                            if (break_enter[i][end_index + 1] === " ") {
                                start_index = end_index + 2;
                                end_index = end_index + number_of_chars;
                            } else {
                                start_index = end_index + 1;
                                end_index = end_index + number_of_chars - 1;
                            }
                        } else {
                            processed_text[index] = break_enter[i].slice(start_index, end_index);
                            index++;
                            if (break_enter[i][end_index + 1] === " ") {
                                start_index = end_index + 2;
                                end_index = end_index + number_of_chars;
                            } else {
                                start_index = end_index + 1;
                                end_index = end_index + number_of_chars - 1;
                            }
                        }
                    } else {

                        console.log("else " + end_index);
                        if (start_index < break_enter[i].length) {
                            while (break_enter[i][end_index] === undefined) {
                                end_index--;
                            }
                            processed_text[index] = break_enter[i].slice(start_index, end_index + 1);
                            index++;
                            if (break_enter[i][end_index + 1] === " ") {
                                start_index = end_index + 2;
                                end_index = end_index + number_of_chars;
                            } else {
                                start_index = end_index + 1;
                                end_index = end_index + number_of_chars - 1;
                            }
                            keep_going = false;
                        } else {
                            keep_going = false;
                        }
                    }
                }
                for (let t = 0; t < processed_text.length; t++) {
                    console.log(processed_text[t]);
                }
            }
        }
    }
}