class progetto{


    constructor(ID,ID_creatore,titolo,data,categoria,immagine,descrizione, donazioni) {
        this.ID = ID;
        this.ID_creatore=ID_creatore;
        this.titolo = titolo;
        this.data=moment(data);
        this.categoria=categoria;
        this.immagine=immagine;
        this.descrizione = descrizione;
        this.donazioni = donazioni;
    }
       /**
     * Construct an prog from a plain object
     * @param {*} json 
     * @return {progetto} the newly created Exam object
     */
       static from(json) {
        const p = Object.assign(new progetto(), json);
        p.data = moment(p.data);
        return p;
    }
}
export default progetto;
