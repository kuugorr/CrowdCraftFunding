class commento{

    constructor(ID,ID_commentatore,ID_documento,testo,data) {
        this.ID = ID;
        this.ID_commentatore=ID_commentatore;
        this.ID_documento=ID_documento;
        this.testo = testo;
        this.data=moment(data);
    }

     /**
     * Construct a doc from a plain object
     * @param {*} json 
     * @return {commento} the newly created comment object
     */
     static from(json) {
        const d = Object.assign(new commento(), json);
        d.data = moment(d.data);
        return d;
    }
    }

    export default commento;