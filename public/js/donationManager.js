import donazione from './donazioni.js';

class donationManager {

    constructor(){
        this.donations = [];
    }

    async addDonation(donazione) {
        let response = await fetch('/api/donazioni', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(donazione),});
                if(response.ok) {
                    const ID = await response.json();
                    donazione.ID = ID['ID'];
                    console.log('received id: ', ID);
                    this.donations.push (donazione);
                    return;
                } 
                else {
                    try {
                        const errDetail = await response.json();
                        throw errDetail.errors;
                    }
                    catch(err) {
                        if(Array.isArray(err)) {
                            let errors = '';
                            err.forEach((e, i) => errors += `${i}. ${e.msg} for '${e.param}', `);
                            throw `Error: ${errors}`;
                        }
                        else
                            throw 'Error: cannot parse server response';
                    }
                }
            }

}
export default donationManager;