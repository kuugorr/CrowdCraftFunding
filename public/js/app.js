import ProgManager from './prog-Manager.js';
import Filter from './filter.js';
import progetto from './PROGETTI.js';
import page from '//unpkg.com/page/page.mjs';
import {userPage, createProfileAnswer} from './templates/user-template.js';
import index from './templates/progetti-template.js';
import {createLogin, createUser} from './templates/nav-template.js';
import Api from './api.js';
import createAlert from './templates/alert-template.js';
import {createAddForm,createAddDocForm,donationForm,createLoginForm,createRegisterForm,createAddCommentForm} from './templates/form-template.js';
import Commform from './templates/comments-template.js';
import finanziatore from './finanziatore.js';
import docform from './templates/documenti-template.js';
import docManager from './doc-manager.js'
import documento from './documenti.js';
import donazione from './donazioni.js';
import CommentManager from './commentManager.js';
import commento from './commenti.js'
import guidaForm from './templates/guida-template.js'
import footerr from './templates/footer-template.js'
import donationManager from './donationManager.js';




class App {
    constructor(appContainer,userContainer,navLinks,navButtons,footer) {
        // reference to the task list container
        this.appContainer = appContainer;
        this.userContainer = userContainer;
        this.progManager = new ProgManager();
        this.Api=new Api();
        this.docManager=new docManager();
        this.CommentManager=new CommentManager();
        this.footer=footer;
       // this.footer.innerHTML=footerr();
        this.donationManager=new donationManager();

        

          // routing
          page('/',  async() => {
            this.userContainer.innerHTML = createLogin();
            page('/progetti');
        });
        page('/logout', async()=>{
            this.loggedIn=0;
            await Api.doLogout();
            this.userContainer.innerHTML = createLogin();
            localStorage.clear;
            page.redirect('/');
        });
        page('/progetti', (ctx) => {
            this.showAllProgetti(ctx.path);
        });
        page('/progetti/:ID/delete', (ctx) => {
            this.deleteProg(ctx.params.ID);
        });
        page('/progetti/:filter', (ctx) => {
            this.showFilteredProgs(ctx.params.filter, ctx.path);
        });
        page('/progetti/:ID/edit', (ctx) => {
            this.showAddEditForm(ctx.params.ID);
        });
        page('/documenti/:ID', (ctx) => {
            localStorage.clear;
            localStorage.setItem('progID',ctx.params.ID)
            this.showProgDoc(ctx.params.ID,ctx.path);
        });
        page('/documenti/:ID/edit', (ctx) => {
            this.showAddEditFormDoc(ctx.params.ID);
        });
        page('/documenti/:ID/delete', (ctx) => {
            this.deleteDoc(ctx.params.ID);
        });
        page('/progetti/:ID/dona', (ctx) => {
            localStorage.clear;
            localStorage.setItem('progID',ctx.params.ID)
            this.showDonationForm(ctx.params.ID,ctx.path);
        });
        page('/login', () => {
            this.userContainer.innerHTML = createLogin();
            this.appContainer.innerHTML = '';
            this.appContainer.insertAdjacentHTML('beforeend', createLoginForm());
            document.getElementById('login-form').addEventListener('submit', this.onLoginSubmitted);
            this.userContainer.innerHTML = createUser();
        });
        page('/register', () => {
            this.appContainer.innerHTML = '';
            this.appContainer.insertAdjacentHTML('beforeend', createRegisterForm());
            document.getElementById('register-form').addEventListener('submit', this.onRegisterSubmitted);
        });
        page('/profile', (ctx) => 
        {
            this.appContainer.innerHTML = '';
            this.appContainer.insertAdjacentHTML('beforeend', userPage());
            this.showUser();
        }); 
        page('/commenti/:ID', (ctx) => {
            localStorage.clear;
            localStorage.setItem('docID',ctx.params.ID)
            this.showAllComments(ctx.params.ID);
        });
        page('/commenti/:ID/edit', (ctx) => {
            this.showAddEditFormComment(ctx.params.ID);
        });
        page('/commenti/:ID/delete', (ctx) => {
            this.deleteComment(ctx.params.ID);
        });
        page('/guida', (ctx) => {
            this.appContainer.innerHTML = guidaForm();
        });
        page();
    }


    async initFormDoc(ID){
        this.appContainer.innerHTML = '';
        this.appContainer.innerHTML = docform();
        await this.docManager.getDoc(ID);
        console.log(this.docManager.docs);
        this.docContainer=document.getElementById('my-docs');
        document.getElementById('add-form1').addEventListener('submit', this.onFormDocSubmitted);
  }

  async initFormCom(ID){
    this.appContainer.innerHTML = '';
    this.appContainer.innerHTML = Commform();
    await this.CommentManager.getComments(ID);
    console.log(this.CommentManager.comments);
    this.comContainer=document.getElementById('comments');
    document.getElementById('add-form3').addEventListener('submit', this.onFormCommentSubmitted);
}

    /**
     * Init the "add prog" form and set up its callback
     * 
     * @param {*} form the HTML element representing the form
     */
    async initForm(){
        const input=document.getElementById("myInput")
        input.addEventListener("keyup",this.autocomplete);
        this.appContainer.innerHTML = index();
        await this.progManager.getprog();
        this.progContainer=document.getElementById('my-progs');
        document.getElementById('add-form').addEventListener('submit', this.onFormSubmitted)
        
        this.progSidebar = document.querySelector("#prog-side-bar");    
        this.titleContainer = document.querySelector("#title");
  }

     /**
     * remove all filters and reset the page accordingly
     */
     resetFilters(){
         
        // reset the selection sidebar to the first element for consistency
        this.progSidebar.querySelector('a.active').classList.remove('active');
        this.progSidebar.querySelector('a').classList.add('active');
        // reset the title
        this.titleContainer.innerText="Tutti";
    }

    /**
     * Show filtered tasks
     * @param {*} filter the current filter
     * @param {*} path the current path (URL)
     */
    showFilteredProgs = async (filter, path) => {
        await this.initForm();
        let filterSideBar = document.getElementById('prog-side-bar');

        const filters = new Filter(filterSideBar, this.progManager);
        const {progs, title} = filters.onFilterSelected(filter);

        // set the page title
        const pageTitle = document.getElementById('filter-title');
        pageTitle.innerText = title;

        // show all the tasks again!
        this.showProgetti(progs, path);
    }

    /**
     * generate and show the form to add or edit a project
     *  @param {*} id is the id of the current project (undefined for a new project)
     */
    showAddEditForm = async(ID) => {
        if(localStorage.getItem('userID')!==null){
            this.appContainer.innerHTML = createAddForm();
            document.getElementById('error-messages').innerHTML = createAlert('success', `benvenuto nella modifica progetto`);
            setTimeout(() => {
                document.getElementById('error-messages').innerHTML = '';
            }, 3000);
         }
    if(ID !== undefined) {
        if(this.progManager.progs.length === 0)
            await this.progManager.getprog();

        // find the task with the same id     
        const progetti = this.progManager.progs.filter((t) => (t.ID == ID));
        const prog = progetti[0];
        const addForm = document.getElementById('add-form');
        addForm.elements['form-ID'].value = prog.ID;
        addForm.elements['form-titolo'].value=prog.titolo;
        addForm.elements['form-categoria'].value=prog.categoria;
        addForm.elements['form-immagine'].value=prog.immagine;
        addForm.elements['form-descrizione'].value=prog.descrizione;
        }
   
   // set up form callback
        document.getElementById('add-form').addEventListener('submit', this.onFormSubmitted);
    }
   
    /**
     * Submit event handler
     * @param {*} event 
     */
    onFormSubmitted = async (event) => { 
        event.preventDefault();
        const addForm = document.getElementById('add-form');
        const dat = new Date();
        var datt = dat.getFullYear()+'/'+(dat.getMonth()+1)+'/'+(dat.getDate()+1);
        const don=0;
        const ID = addForm.elements['form-ID'].value;
        const progs = this.progManager.progs.filter((q) => (q.ID == ID));
             const progett = progs[0];

                if(addForm.elements['form-ID'].value && addForm.elements['form-ID'].value !== ""){
                    document.getElementById('add-form').addEventListener('submit', this.onFormSubmitted);
                    const titolo = addForm.elements['form-titolo'].value;
                    const categoria = addForm.elements['form-categoria'].value;
                    const immagine = addForm.elements['form-immagine'].value;
                    const descrizione = addForm.elements['form-descrizione'].value;
                    const data = progett.data.format('YYYY-MM-DD');
                    const donazione = progett.donazioni;
                    const IDP =progett.ID_creatore;
                    //there is a task id -> update
                    const id = addForm.elements['form-ID'].value;
                    const proghy =new progetto(id,IDP, titolo, data,categoria,immagine,descrizione,donazione);
                    this.progManager.updateprog(proghy).then(() => {     
                        //reset the form and go back to the home
                        
                        addForm.reset();
                        page('/#');
                        document.getElementById('error-messages').innerHTML = createAlert('success', `Progetto modificato con successo`);
                         setTimeout(() => {
                         document.getElementById('error-messages').innerHTML = '';
                         }, 3000);
                    })
                    .catch((error) => {
                        // add an alert message in DOM
                        document.getElementById('error-messages').innerHTML = createAlert('danger', error);
                        }
                    );
                }
                else {  
                    const titolo = addForm.elements['form-titolo'].value;
                    const categoria = addForm.elements['form-categoria'].value;
                    const immagine = addForm.elements['form-immagine'].value;
                    const descrizione = addForm.elements['form-descrizione'].value;
                    
                    //the id is empty -> add
                    const prog = new progetto(undefined,undefined, titolo, datt,categoria,immagine,descrizione,don);
                    
                    await this.progManager.addProg(prog).then(() => {
                        document.getElementById('error-messages').innerHTML = createAlert('success', `progetto aggiunto con successo`);
                        setTimeout(() => {
                        document.getElementById('error-messages').innerHTML = '';
                        }, 3000);
                        })
                        addForm.reset();
                        page('/#');
                    };     
            }   

    showAddEditFormDoc = async(ID) => {
        if(localStorage.getItem('userID')!=null){
            this.appContainer.innerHTML = createAddDocForm();
            document.getElementById('error-messages').innerHTML = createAlert('success', 'benvenuto nella modifica documento');
            setTimeout(() => {
                document.getElementById('error-messages').innerHTML = '';
            }, 3000);
         }
    if(ID !== undefined) {
        if(this.docManager.docs.length === 0)
            await this.docManager.getDoc();

        // find the task with the same id
        const documenti = this.docManager.docs.filter((t) => (t.ID == ID));
        const doc = documenti[0];
        const addForm = document.getElementById('add-form1');
        addForm.elements['form-ID1'].value = doc.ID;
        addForm.elements['form-titolo1'].value=doc.titolo;
        addForm.elements['form-descrizione1'].value=doc.descrizione;
        addForm.elements['form-prezzo1'].value=doc.prezzo;
        }

   // set up form callback
   document.getElementById('add-form1').addEventListener('submit', this.onFormDocSubmitted);
}

    onFormDocSubmitted= async (event) => {
        const IDP=localStorage.getItem('progID')
        event.preventDefault();
        const addForm = document.getElementById('add-form1');
        const dat = new Date();
        const datt= dat.getFullYear()+ "/" + (dat.getMonth()+1)+'/'+(dat.getDate()+1); 
        const ID = addForm.elements['form-ID1'].value;
        const docs = this.docManager.docs.filter((q) => (q.ID == ID));
        const docum = docs[0];
        if(addForm.elements['form-ID1'].value && addForm.elements['form-ID1'].value !== ""){
            document.getElementById('add-form1').addEventListener('submit', this.onFormDocSubmitted);
            const titolo = addForm.elements['form-titolo1'].value;
            const descrizione = addForm.elements['form-descrizione1'].value;
            const prezzo = addForm.elements['form-prezzo1'].value;
            const data = docum.data.format('YYYY-MM-DD');
            //there is a task id -> update
            const id = addForm.elements['form-ID1'].value;
            const dochy =new documento(id,IDP, titolo,descrizione, data,prezzo);
            this.docManager.updatedoc(dochy).then(() => {     
                //reset the form and go back to the home
                
                addForm.reset();
                page(`/documenti/${IDP}`);
                document.getElementById('error-messages').innerHTML = createAlert('success', `documento modificato con successo`);
                 setTimeout(() => {
                 document.getElementById('error-messages').innerHTML = '';
                 }, 3000);
            })
            .catch((error) => {
                // add an alert message in DOM
                document.getElementById('error-messages').innerHTML = createAlert('danger', error);
                }
            );
        }
        else{
        const titolo = addForm.elements['form-titolo1'].value;
        const descrizione = addForm.elements['form-descrizione1'].value;
        const prezzo = addForm.elements['form-prezzo1'].value;
        const dochy =new documento(undefined,IDP, titolo,descrizione, datt,prezzo,);
        console.log(dochy);
        this.docManager.addDoc(dochy).then(() => {     
        //reset the form and go back to the home
        addForm.reset();
        document.getElementById('error-messages').innerHTML = createAlert('success', `documento aggiunto con successo`);
        setTimeout(() => {
        document.getElementById('error-messages').innerHTML = '';
        }, 3000);
        page(`/documenti/${IDP}`); 
        })
        .catch((error) => {
        // add an alert message in DOM
        document.getElementById('error-messages').innerHTML = createAlert('danger', error);
            });
        }
    }

    showAddEditFormComment = async(ID) => {
        if(localStorage.getItem('userID')!=null){
            this.appContainer.innerHTML = createAddCommentForm();
            document.getElementById('error-messages').innerHTML = createAlert('success', 'benvenuto nella modifica commento');
            setTimeout(() => {
                document.getElementById('error-messages').innerHTML = '';
            }, 3000);
         }
    if(ID !== undefined) {
        if(this.CommentManager.comments.length === 0)
            await this.CommentManager.getComments();

        // find the task with the same id
        const commenti = this.CommentManager.comments.filter((t) => (t.ID == ID));
        const comment = commenti[0];
        const addForm = document.getElementById('add-form3');
        addForm.elements['form-ID3'].value = comment.ID;
        addForm.elements['form-testo'].value=comment.testo;
        }
   // set up form callback
   document.getElementById('add-form3').addEventListener('submit', this.onFormCommentSubmitted);
}
    
    onFormCommentSubmitted= async (event) => {
        const IDD=localStorage.getItem('docID')
        console.log(IDD);
        event.preventDefault();
        const addForm = document.getElementById('add-form3');
        const dat = new Date();
        const datt= dat.getFullYear()+ "/" + (dat.getMonth()+1)+'/'+(dat.getDate()+1);
        if(addForm.elements['form-ID3'].value && addForm.elements['form-ID3'].value !== ""){
            document.getElementById('add-form3').addEventListener('submit', this.onFormCommentSubmitted);
            const id = addForm.elements['form-ID3'].value;
            const testo = addForm.elements['form-testo'].value;
            const commy =new commento(id,undefined,IDD,testo, datt);
            this.CommentManager.updateComment(commy).then(() => {     
                //reset the form and go back to the home
                
                addForm.reset();
                page(`/commenti/${IDD}`);
                document.getElementById('error-messages').innerHTML = createAlert('success', `commento modificato con successo`);
                 setTimeout(() => {
                 document.getElementById('error-messages').innerHTML = '';
                 }, 3000);
            })
            .catch((error) => {
                // add an alert message in DOM
                document.getElementById('error-messages').innerHTML = createAlert('danger', error);
                }
            );
        }
        else{
        const testo = addForm.elements['form-testo'].value;
        const commy =new commento(undefined,undefined,IDD,testo, datt);
        console.log(commy);
        this.CommentManager.addComment(commy).then(() => {    
        //reset the form and go back to the home
        addForm.reset();
        document.getElementById('error-messages').innerHTML = createAlert('success', `commento aggiunto con successo`);
        setTimeout(() => {
        document.getElementById('error-messages').innerHTML = '';
        }, 3000);
        page(`/commenti/${IDD}`); 
        })
        .catch((error) => {
        // add an alert message in DOM
        document.getElementById('error-messages').innerHTML = createAlert('danger', error);
            });
        }
    }


  /**
     * Delete a task
     * @param {*} taskId the id of the path to delete
     * @param {*} path the current path (URL)
     */
    deleteProg = async (ID,path) => {
        await this.progManager.deleteProg(ID);
        page('/progetti');
    }    

    async showUser(path){
        let counter=0;
        await this.progManager.getprogById(localStorage.getItem('userID'));
        const progs=this.progManager.progs;
        this.userProfile=document.getElementById('my-users');
        const user = await Api.getUser(localStorage.getItem('userID'));
            const div = document.createElement('tr');

            const tdTitolo = document.createElement('td');
            tdTitolo.innerText = user.nome;

            const tdDate = document.createElement('td');
            tdDate.innerText = user.cognome;

            const tdCategoria = document.createElement('td');
            tdCategoria.innerText = user.email;

            
            div.appendChild(tdTitolo);
            div.appendChild(tdDate);
            div.appendChild(tdCategoria);
            this.progetti=document.getElementById('my-users');
            for(const prog of progs) {
                counter++;
                
                const diva=document.createElement('div');
                const a=document.createElement('a');
                const aIDC=document.createElement('a');
                a.href=`/progetti/${prog.ID}/info`;
    
                const tdTitolo = document.createElement('h3');
                tdTitolo.innerText = prog.titolo;
    
                const tdDate = document.createElement('div');
                tdDate.innerText = prog.data.format('YYYY/MM/DD');
    
                const tdCategoria = document.createElement('i');
                tdCategoria.innerText = prog.categoria;
    
                const tdDescrizione = document.createElement('h4');
                tdDescrizione.innerText = prog.descrizione;
    
                const tdDonazioni = document.createElement('div');
                tdDonazioni.innerText = prog.donazioni;
                
                // const tdSVG= this.progManager.getHtmlNode(prog);
                const tdSVG= this.progManager.getHtmlNode(prog);

    
                a.appendChild(tdTitolo);
                a.appendChild(tdDescrizione);
                diva.appendChild(aIDC);
                diva.appendChild(a);
                diva.appendChild(tdDate);
                diva.appendChild(tdDonazioni);
                diva.appendChild(tdSVG);
                diva.className=`flexbox-item flexbox-item${counter}`;
                this.userProfile.appendChild(div);
                this.progetti.appendChild(diva);
        }
    }

    deleteDoc= async (ID,path) => {
        const IDP=localStorage.getItem('progID')
        await this.docManager.deleteDoc(ID);
        page(`/documenti/${IDP}`);
    }  
    
    deleteComment= async (ID,path) => {
        const IDD=localStorage.getItem('docID')
        await this.CommentManager.deleteComment(ID);
        page(`/commenti/${IDD}`);
    }  

    showProgDoc= async (ID,path) => {
        await this.initFormDoc(ID);
        this.showDocumenti(this.docManager.docs, path);
    }

    /**
     * Show filtered tasks
     * @param {*} tasks the list of tasks to be displayed
     * @param {*} path the current path (URL)
     */
    showDocumenti(docs,path){
        let counter=0;
        for(const doc of docs) {
            counter++;
            
            const div=document.createElement('div');

            const tdTitolo = document.createElement('h3');
            tdTitolo.innerText = doc.titolo;

            const tdDescrizione = document.createElement('h3');
            tdDescrizione.innerText = doc.descrizione;

            const tdDate = document.createElement('div');
            tdDate.innerText = doc.data.format('YYYY/MM/DD');

            const tdprezzo = document.createElement('div');
            tdprezzo.innerText = doc.prezzo;
            
            const tdSVG= this.docManager.getHtmlNode(doc);

            div.appendChild(tdTitolo);
            div.appendChild(tdDescrizione);
            div.appendChild(tdDate);
            div.appendChild(tdprezzo);
            div.appendChild(tdSVG);
            div.className=`flexbox-item flexbox-item${counter}`;
            this.docContainer.appendChild(div);
        }
    }

    /**
     * Show filtered tasks
     * @param {*} tasks the list of tasks to be displayed
     * @param {*} path the current path (URL)
     */
    showProgetti(progs){
        let counter=0;
        const u = localStorage.getItem('userName');
        for(const prog of progs) {
            counter++;
            
            const div=document.createElement('div');
            const a=document.createElement('a');
            const aIDC=document.createElement('a');
            const immagine=document.createElement('div');
            a.href=`/documenti/${prog.ID}`;

            const tdTitolo = document.createElement('h3');
            tdTitolo.innerText = prog.titolo;

            const tdDate = document.createElement('div');
            tdDate.innerText = prog.data.format('YYYY/MM/DD');

            const tdCategoria = document.createElement('p');
            tdCategoria.innerText = prog.categoria;

            const tdImaggine = document.createElement('img');
            tdImaggine.src = prog.immagine;

            const tdDescrizione = document.createElement('h4');
            tdDescrizione.innerText = prog.descrizione;

            const tdDonazioni = document.createElement('div');
            tdDonazioni.innerText = prog.donazioni;
            
            // const tdSVG= this.progManager.getHtmlNode(prog);
            const dollaro2= this.progManager.getHtmlNode(prog);
            const dollaro= this.progManager.getHtmlDonazioni(prog);
  
            tdImaggine.width = 375;
            tdImaggine.height = 200;
            immagine.className="cetriolo";
            tdTitolo.id="titolo"+counter;

            immagine.appendChild(tdImaggine)
            a.appendChild(immagine);
            a.appendChild(tdTitolo);
            a.appendChild(tdDescrizione);
            div.appendChild(aIDC);
            div.appendChild(a);
            div.appendChild(tdCategoria)
            div.appendChild(tdDate);
            div.appendChild(tdDonazioni);
            if(u!==null){
                div.appendChild(dollaro2)
                div.appendChild(dollaro);
            }
            div.className=`flexbox-item flexbox-item${counter}`;
            this.progContainer.appendChild(div);
        }
    }


     /**
     * Create the HTML table for showing the progs
     * @param {*} progs 
     */
     showAllProgetti= async (path) => {      
            await this.initForm();
            this.showProgetti(this.progManager.progs, path);
        }

        showAllComments=async (ID,path) => {      
            await this.initFormCom(ID);
            this.showComments(this.CommentManager.comments, path);
        }

        showComments = async (comments) => {
            let counter=0;
        const u = localStorage.getItem('userName');
        for(const comment of comments) {
            counter++;
            
            const div=document.createElement('div');
            const testo = document.createElement('div');
            testo.innerText = comment.testo;

            const data = document.createElement('div');
            data.innerText = comment.data.format('YYYY/MM/DD');

            const tdSVG= this.CommentManager.getHtmlNode(comment);


            div.appendChild(testo);
            div.appendChild(data);
            div.appendChild(tdSVG);
            div.className=`flexbox-item flexbox-item${counter}`;
            this.comContainer.appendChild(div);
        }
    }
        

    /**
     * Event listener for the submission of the login form. Handle the login.
     * @param {*} event 
     */
    onLoginSubmitted = async (event) => {
        event.preventDefault();
        const form = event.target;
        const alertMessage = document.getElementById('error-messages');

        if(form.checkValidity()) {
             try {
                const user = await Api.doLogin(form.email.value, form.password.value); 
                localStorage.setItem('userName', user.nome);
                localStorage.setItem('userCoName', user.cognome);
                localStorage.setItem('userID', user.ID);
                localStorage.setItem('userEmail', user.email);
                this.loggedIn=1;
                const u = localStorage.getItem('userName');
                if(u !== null) {
               // welcome the user
               document.getElementById('error-messages').innerHTML = createAlert('success', `Benvenuto ${u}!`);
               // automatically remove the flash message after 3 sec
                setTimeout(() => {
                        document.getElementById('error-messages').innerHTML = '';
                    }, 3000);
                page.redirect('/progetti');
            }
            }
                 catch(error) {
                console.log(error);
                if (error) {
                    const errorMsg = error;
                    // add an alert message in DOM
                    alertMessage.innerHTML = createAlert('danger', errorMsg);
                    // automatically remove the flash message after 3 sec
                    setTimeout(() => {
                        alertMessage.innerHTML = '';
                    }, 3000);
                }
            }
        }
    }

    showDonationForm = async(ID) => {
        if(localStorage.getItem('userID')==null){
            document.getElementById('error-messages').innerHTML = createAlert('success', 'Devi prima loggarti per poter donare');
            setTimeout(() => {
                document.getElementById('error-messages').innerHTML = '';
            }, 3000);
            page('/login');
         }
         else{
            this.appContainer.innerHTML = '';
            this.appContainer.innerHTML = donationForm();
            document.getElementById('donation-form').addEventListener('submit', this.onFormDonSubmitted);
         }
    }

    onRegisterSubmitted = async (event) => {
        event.preventDefault();
        const addForm = event.target;
        const alertMessage = document.getElementById('error-messages');
            const creatore = addForm.elements['form-Creatore'].checked;
            const nome = addForm.elements['nome'].value;
            const cognome = addForm.elements['cognome'].value;
            const email = addForm.elements['email'].value;
            const password = addForm.elements['password'].value;
            const utente = new finanziatore(undefined,creatore, nome, cognome,email,password);
            

                    if(addForm.checkValidity()) {
                        try {
                            await this.Api.doRegister(utente).then(() => {
                                addForm.reset();
                                page('/login');
                            });     
                        } catch(error) {
                            console.log(error);
                            if (error) {
                                const errorMsg = error;
                                // add an alert message in DOM
                                alertMessage.innerHTML = createAlert('danger', errorMsg);
                                // automatically remove the flash message after 3 sec
                                setTimeout(() => {
                                    alertMessage.innerHTML = '';
                                }, 3000);
                            }
                        }
                    }
                }

                onFormDonSubmitted  = async (event) => {
                    event.preventDefault();
                    const addForm = document.getElementById('donation-form');
                    const IDP=localStorage.getItem("progID")
                    const dat = new Date();
                    const datt = dat.getFullYear()+'/'+(dat.getMonth()+1)+'/'+(dat.getDate()+1);
                    const importo = addForm.elements['form-importo'].value;
                    let i=parseInt(importo);
                    const donation=new donazione(undefined,IDP,undefined,importo,datt)
                    this.donationManager.addDonation(donation).then(() => {
                        const progs = this.progManager.progs.filter((q) => (q.ID == IDP));
                        const progett = progs[0];
                        const titolo = progett.titolo;
                        const categoria = progett.categoria;
                        const immagine = progett.immagine;
                        const descrizione = progett.descrizione;
                        const data = progett.data.format('YYYY-MM-DD');
                        const IDC=progett.ID_creatore;
                        const donazione=(progett.donazioni+i);
                        const proghy =new progetto(IDP,IDC, titolo, data,categoria,immagine,descrizione,donazione);
                        console.log(proghy);
                        this.progManager.updateprog(proghy)
                        //reset the form and go back to the home
                        addForm.reset();
                        document.getElementById('error-messages').innerHTML = createAlert('success', 'donazione avvenuta con successo');
                        setTimeout(() => {
                        document.getElementById('error-messages').innerHTML = '';
                        }, 3000);
                        page('/progetti'); 
                    })
                    .catch((error) => {
                    // add an alert message in DOM
                    document.getElementById('error-messages').innerHTML = createAlert('danger', error);
                        });
                    } 


}

    
  


export default App;
