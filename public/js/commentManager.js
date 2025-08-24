import commento from './commenti.js';

class CommentManager
{

    constructor(){
        this.comments = [];
    }

    async getComment (ID_commento) {
        let response = await fetch('/api/commenti/'+ID_commento);
        const commentJson = await response.json();
        if (response.ok)
        {
            return commento.from(commentJson);
        }
        else
        {
            throw commentJson;
        }    
    }  

 

    async getComments (ID_documento) {
        let response = await fetch(`/api/commenti/${ID_documento}`);
        const commentJson = await response.json();
        if (response.ok)
        {
            this.comments =commentJson.map((el) => {return commento.from(el);});
            return this.comments;
        }
        else
        {
            throw commentJson;
        }    
    } 
 
    async addComment (commento){
        let response = await fetch('/api/commenti', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(commento),});
        if(response.ok) 
        {const ID = await response.json();
            commento.ID = ID['ID'];
            console.log('received id: ', ID);
            this.comments.push (commento);
            return;
        }
        else 
        {
            try 
            {
                const errDetail = await response.json();
                throw errDetail.errors;
            }
            catch(err) 
            {
                if(Array.isArray(err)) 
                {
                    let errors = '';
                    err.forEach((e, i) => errors += `${i}. ${e.msg} for ${e.param}, `);
                    throw `Error: ${errors}`;
                }
                else
                    throw 'Error: cannot parse server response';
            }
        }
    } 


    // update a comment
    async updateComment(comment) {        
        let response = await fetch(`/api/commenti/${comment.ID}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(comment),
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

    async deleteComment(ID_commento) {
        let response = await fetch(`/api/commenti/${ID_commento}`, {
            method: 'DELETE',
        });
        if(response.ok) 
        {
            return;
        }
        else 
        {
            try 
            {
                const errDetail = await response.json();
                throw errDetail.errors;
            }
            catch(err) 
            {
                if(Array.isArray(err)) 
                {
                    let errors = '';
                    err.forEach((e, i) => errors += `${i}. ${e.msg} for ${e.param}, `);
                    throw `Error: ${errors}`;
                }
                else
                    throw 'Error: cannot parse server response';
            }
        }
    }

    getHtmlNode(commento, path){
        const outerDiv = document.createElement('div');
        outerDiv.className ='d-flex w-100 justify-content-between';
        const buttonsDiv = document.createElement('div');
        const innerDiv = document.createElement('div');
        innerDiv.className='form-check';



        //add button to edit a task
        const editLink = document.createElement('a');
        // use href and routing instead of event handlers to implement button action
        editLink.href = `/commenti/${commento.ID}/edit`;
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
        deleteLink.href =  `/commenti/${commento.ID}/delete`;
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


    /*static upDownComment = async (commentId, vote) => {
        let response = await fetch(`/api/comments/${commentId}/${vote}`, {
            method: 'PUT',
        });
        if(response.ok) 
        {
            let json = await response.json();
            return json.message;
        }
        else 
        {
            try 
            {
                const errDetail = await response.json();
                throw errDetail.errors;
            }
            catch(err) 
            {
                if(Array.isArray(err)) 
                {
                    let errors = '';
                    err.forEach((e, i) => errors += `${i}. ${e.msg} for ${e.param}, `);
                    throw `Error: ${errors}`;
                }
                else
                    throw 'Error: cannot parse server response';
            }
        }
    }*/
}

export default CommentManager;