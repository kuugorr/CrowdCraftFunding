class finanziatore{

    constructor(ID,creatore,nome,cognome,email,password) {
        this.ID = ID;
        this.creatore = creatore;
        this.nome = nome;
        this.cognome = cognome;
        this.email = email;
        this.password = password;
        
    }

      /**
     * Construct an prog from a plain object
     * @param {*} json 
     * @return {progetto} the newly created Exam object
     */
      static from(json) {
        const f = Object.assign(new finanziatore(), json);
        return f;
    }

}

module.exports = finanziatore;