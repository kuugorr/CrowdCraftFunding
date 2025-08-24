import progetto from './PROGETTI.js';

class progettoManager {

    constructor(){
        this.progs = [];
    }

     /**
     * Get the list of my progs
     */
     async getprog() {
        let response = await fetch('/api/progetti');
        const progsJson = await response.json();
        if (response.ok) {
            this.progs = progsJson.map((p) =>  {return progetto.from(p);});
          
            return this.progs;
        } else {
            throw progsJson;  // an object with the error coming from the server
        }
    }


    /* Get all the documents of a given project
     * 
     * @param {*} project the given project
     */
    getByProject(project) {
        return this.progs.filter((id) => {
            return id.project === project;
        });
    }

    async updateprog(prog) {        
        let response = await fetch(`/api/progetti/${prog.ID}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(prog),
        });
        if(response.ok) {
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

    /**
     * Add a new prog to the list
     * @param {progetto} progetto 
     */
    async addProg(progetto) {
        let response = await fetch('/api/progetti', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(progetto),
            });
                if(response.ok) {
                    const ID = await response.json();
                    progetto.ID = ID['ID'];
                    console.log('received id: ', ID);
                    this.progs.push (progetto);
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

    getHtmlDonazioni(prog, path){
            const outerDiv = document.createElement('div');
            outerDiv.className ='d-flex w-100 justify-content-between';
            const buttonsDiv = document.createElement('div');
            const innerDiv = document.createElement('div');
            innerDiv.className='form-check';
            const donationLink = document.createElement('a');
            // use href and routing instead of event handlers to implement button action
            donationLink.href=`/progetti/${prog.ID}/dona`;
            const imgDonation = document.createElement('img');
            imgDonation.width = 20;
            imgDonation.height = 20
            imgDonation.classList = 'img-button mr-1';
            imgDonation.src='/svg/dollaro.svg';
    
            donationLink.appendChild(imgDonation);
            buttonsDiv.appendChild(donationLink);
    
            outerDiv.className="svg";
            outerDiv.appendChild(buttonsDiv);
    
            return outerDiv;
        }
    /**
         * returns the representation for the current task as a snippet of HTML code
         * @param {*} task the task object
         * @param {*} path the current path (URL)
         */  
    getHtmlNode(prog, path){
        const outerDiv = document.createElement('div');
        outerDiv.className ='d-flex w-100 justify-content-between';
        const buttonsDiv = document.createElement('div');
        const innerDiv = document.createElement('div');
        innerDiv.className='form-check';



        //add button to edit a task
        const editLink = document.createElement('a');
        // use href and routing instead of event handlers to implement button action
        editLink.href = `/progetti/${prog.ID}/edit`;
        const imgEdit = document.createElement('img');
        imgEdit.width = 20;
        imgEdit.height = 20;
        imgEdit.classList = 'img-button mr-1';
        imgEdit.src = '/svg/edit.svg';

        editLink.appendChild(imgEdit);
        buttonsDiv.appendChild(editLink);


        // create delete button
        const deleteLink = document.createElement('a');
        // use href and routing instead of event handlers to implement button action
        deleteLink.href =  `/progetti/${prog.ID}/delete`;
        const imgDelete = document.createElement('img');
        imgDelete.width = 20;
        imgDelete.height = 20;
        imgDelete.src = '/svg/delete.svg';
        imgDelete.classList = 'img-button';

        deleteLink.appendChild(imgDelete);
        buttonsDiv.appendChild(deleteLink);

        outerDiv.className="svg";
        outerDiv.appendChild(buttonsDiv);

        return outerDiv;
    }

    /**
     * Delete a task
     * 
     * @param {*} id the id of the task to be deleted
     */
    async deleteProg(ID) {
        let response = await fetch(`/api/progetti/${ID}`, {
            method: 'DELETE',
        });
        if(response.ok) {
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


    async getprogByIdddddddd(id) {
        let response = await fetch('/api/progetti/:id'+id,'/info');
        const questionJson = await response.json();
        if (response.ok)
        {
            let prog = progetto.from(questionJson);
            return prog;
        }
        else
        {
            throw questionJson;
        }
    }

    async getprogById(id) {
        let response = await fetch(`/api/progetti/${id}`);
        const progsJson = await response.json();
        if (response.ok) {
            this.progs = progsJson.map((p) =>  {return progetto.from(p);});
        }
        else
        {
            throw questionJson;
        }
    }


        /* project modifier
     * 
     * @param {*} project the project to be added
     */
        change(project) {
            
        }

         /**
     * Return a filtered array, with only the progs done in a specific year
     * @param {*} year 
     */
    getByYear(year) {
        // OPTION 1: filtering the existing progs list, which should be updated periodically
        return this.progs.filter(p => p.data.isBetween(year+'-01-01', year+'-12-31', undefined, []));

        // OPTION 2: calling an API, so that you are sure to have the most updated information
    }


    /**
     * Get all the tasks flagged as important
     */
    filterImportant(){
    let i=this.progs.length;
    this.progs=this.qs(this.progs);
    console.log(this.progs);
    return this.progs;    
    }

    qs(progs)
{
    const n=progs.length
    for(let i=0;i<n;i++){
        for(let y=0;y<n-1;y++){
            if(progs[y].donazioni>progs[y+1].donazioni){
                y++
            }
            else{
                let temp=progs[y];
                progs[y]=progs[y+1];
                progs[y+1]=temp;
            }
        }
    }
    return progs;
}

    
}

export default progettoManager;