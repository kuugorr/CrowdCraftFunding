'use strict';
const moment = require('moment');
class commento{

    constructor(ID,ID_commentatore,ID_documento,testo,data) {
        this.ID = ID;
        this.ID_commentatore=ID_commentatore;
        this.ID_documento=ID_documento;
        this.testo = testo;
        this.data=moment(data);
    }

    static from(json) {
        const c = Object.assign(new commento(), json);
        c.data = moment(c.data);
        return c;
    }
    }

    module.exports = commento;