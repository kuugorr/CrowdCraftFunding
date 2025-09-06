class documento{


    constructor(ID,ID_progetto,titolo,descrizione,data,prezzo) {
        this.ID = ID;
        this.ID_progetto=ID_progetto;
        this.titolo = titolo;
        this.descrizione = descrizione;
        this.data=moment(data);
        this.prezzo = prezzo;
    }
       /**
     * Construct a doc from a plain object
     * @param {*} json 
     * @return {documento} the newly created document object
     */
       static from(json) {
        const d = Object.assign(new documento(), json);
        d.data = moment(d.data);
        return d;
    }
}
export default documento;
