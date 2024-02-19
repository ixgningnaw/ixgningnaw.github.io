/*
_________Class | Gui
___Description | Controls user interface

________Author | sumbioun.com
____Programmer | pedro veneroso

_______Version | 0.2β
__Release date | Oct 25th 2016
___Last update | Nov 5th 2016

_______License |GPLv3 2016 sumbioun.com

Agora:
• Gerar link para compartilhamento
• Compartilhar em redes sociais

Futuro:
• Seleção de idioma

*/

function Gui() {

    let master = this;
    // let animate = 20;
    // let jump = 4;
    // let width = 32;
    let open = [false, false, false];
    let text = ['关于gogoame', '关于'];
    let current_text;
    let update_text = false;

    this.controlPanel = function () {
        let xx_info_button = document.createElement('div');
        xx_info_button.id = 'xx_info_button';
        xx_info_button.className = 'button';
        xx_info_button.style.width = '32px';
        xx_info_button.style.marginLeft = '0px';
        xx_info_button.style.paddingLeft = "15px";
        xx_info_button.style.paddingRight = "3px";
        xx_info_button.style.marginTop = ((window.innerHeight - 200) / 2) + "px";
        xx_info_button.innerHTML += '<i class="fa-solid fa-cake-candles" aria-hidden="true"></i>';
        document.body.appendChild(xx_info_button);
        xx_info_button = document.getElementById('xx_info_button');
        master.makeButton(xx_info_button, 32, ((window.innerHeight - 200) / 2), 1, 148)

        let info_button = document.createElement('div');
        info_button.id = 'info_button';
        info_button.className = 'button';
        info_button.style.width = '32px';
        info_button.style.marginLeft = '0px';
        info_button.style.marginTop = ((window.innerHeight - 100) / 2) + "px";
        info_button.style.paddingLeft = "14px";
        info_button.style.paddingRight = "4px";
        info_button.innerHTML += '<i class="fa fa-book" aria-hidden="true"></i>';
        document.body.appendChild(info_button);
        info_button = document.getElementById('info_button');
        master.makeButton(info_button, 32, ((window.innerHeight - 100) / 2), 0, 166);
    }

    this.createTooltip = function (x_pos, y_pos, this_id) {
        let tooltip = document.createElement('div');
        tooltip.id = text[this_id];
        tooltip.style.position = "absolute";
        tooltip.style.marginTop = y_pos + 13 + "px";
        tooltip.style.marginLeft = x_pos + 24 + "px";
        tooltip.style.color = "white";
        tooltip.style.font = "Source Sans Pro";
        tooltip.style.fontWeight = "400";
        tooltip.style.textTransform = 'uppercase';
        tooltip.innerHTML = text[this_id];
        document.body.appendChild(tooltip);
    }

    this.removeTooltip = function (this_id) {
        let tooltip = document.getElementById(text[this_id]);
        if (tooltip != null) {
            tooltip.parentNode.removeChild(tooltip);
        }
    }

    this.makeButton = function (this_button, x_pos, y_pos, this_id, this_width) {
        let mouseOver = function () {
            if (open[this_id] === false) {
                this_button.style.backgroundColor = "#7FA1D3";
                this_button.style.width = this_width + "px";
                this_button.style.cursor = "pointer";
                if (document.getElementById(text[this_id]) === null) {
                    master.createTooltip(x_pos, y_pos, this_id);
                }
            }
        };
        let mouseOut = function () {
            if (open[this_id] === false) {
                this_button.style.backgroundColor = "#1D1D1D";
                this_button.style.width = "32px";
                this_button.style.cursor = "none";
                master.removeTooltip(this_id);
            }
        };
        let mouseDown = function () {
            if (open[this_id] === false) {
                if (this_id === 0) {
                    window.open('sobre.html', '_self');
                } else if (this_id === 1) {
                    window.open('about.html', '_self');
                }
            } else {
                open[this_id] = false;
            }
        };
        this_button.onmouseover = mouseOver;
        this_button.onmouseout = mouseOut;
        this_button.onmousedown = mouseDown;
    }

    this.checkInput = function () {
        return update_text;
    }

    this.confirmReceive = function () {
        update_text = false;
    }

    this.getText = function () {
        return current_text;
    }
}