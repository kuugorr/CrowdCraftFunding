import documento from './documenti.js';

class docManager {

    constructor(){
        this.docs = [];
    }

 /**
     * Get the list of my progs
     */
 async getDoc(ID) {
    console.log(ID);
    let response = await fetch(`/api/documenti/${ID}`);
    const docsJson = await response.json();

    if (response.ok) {
        this.docs = docsJson.map((d) =>  {return documento.from(d);});
      
        return this.docs;
    } else {
        throw docsJson;  // an object with the error coming from the server
    }
}
    /**
     * Add a new prog to the list
     * @param {documento} documento 
     */
async addDoc(documento) {
    let response = await fetch('/api/documenti', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(documento),});
            if(response.ok) {
                const ID = await response.json();
                documento.ID = ID['ID'];
                console.log('received id: ', ID);
                this.docs.push (documento);
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

        getHtmlNode(doc, path){
            const outerDiv = document.createElement('div');
            outerDiv.className ='d-flex w-100 justify-content-between';
            const buttonsDiv = document.createElement('div');
            const innerDiv = document.createElement('div');
            innerDiv.className='form-check';
    
    
    
            //add button to edit a task
            const editLink = document.createElement('a');
            // use href and routing instead of event handlers to implement button action
            editLink.href = `/documenti/${doc.ID}/edit`;
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
            deleteLink.href =  `/documenti/${doc.ID}/delete`;
            const imgDelete = document.createElement('img');
            imgDelete.width = 20;
            imgDelete.height = 20;
            imgDelete.src = '/svg/delete.svg';
            imgDelete.classList = 'img-button';
    
            deleteLink.appendChild(imgDelete);
            buttonsDiv.appendChild(deleteLink);

            //add button to edit a task
            const commentLink = document.createElement('a');
            // use href and routing instead of event handlers to implement button action
            commentLink.href = `/commenti/${doc.ID}`;
            const imgComment = document.createElement('img');
            imgComment.width = 20;
            imgComment.height = 20;
            imgComment.classList = 'img-button mr-1';
            imgComment.src = '/svg/comment.svg';
    
            commentLink.appendChild(imgComment);
            buttonsDiv.appendChild(commentLink);
    
            outerDiv.className="svg";
            outerDiv.appendChild(buttonsDiv);
    
            return outerDiv;
        }

        async updatedoc(doc) {        
            let response = await fetch(`/api/documenti/${doc.ID}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(doc),
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
        async deleteDoc(ID) {
            let response = await fetch(`/api/documenti/${ID}`, {
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
    
}
export default docManager;