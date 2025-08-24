'use strict';
//imports
const morgan = require('morgan'); // logging middleware
const {check, validationResult} = require('express-validator'); // validation middleware
const db = require('./db');
const udb=require('./user-db')
const express = require('express')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const path = require('path');
// const initialize=require('passport-config')


// set up the "username and password" login strategy
// by setting a function to verify username and password
passport.use(new LocalStrategy(
  function(username, password, done) {
    udb.getUser(username, password).then(({user, check}) => {
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!check) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    })
  }
));

// serialize and de-serialize the user (user object <-> session)
passport.serializeUser(function(user, done) {
  done(null, user.ID);
});

passport.deserializeUser(function(ID, done) {
  udb.getUserById(ID).then(user => {
    done(null, user);
  });
});


// check if a given request is coming from an authenticated user
const isLoggedIn = (req, res, next) => {
  if(req.isAuthenticated()){
      return next();
  }
  return res.status(401).json({"statusCode" : 401, "message" : "not authenticated"});
}

//init
const app = express()
const port = 3000;


// set up the middleware
app.use(morgan('tiny'));

// every requests body will be considered as in JSON format
app.use(express.json());

app.use(express.static('public'));

// set up the session
app.use(session({
  secret: 'a secret sentence not to share with anybody and anywhere, used to sign the session ID cookie',
  resave: false,
  saveUninitialized: false 
}));

// init passport
app.use(passport.initialize());
app.use(passport.session());

/* 
app.get('/',(req,res)=>{
    res.render('index.html')
}) */

/* app.get('/api/progetti/:ID/info', (req, res) => { 
  db.getProgById(req.params.ID).then( (progetto) => {
      if(progetti.error){
          res.status(404).json(progetto);
      } else {
          res.json(progetto);
      }}).catch( (err) => {

         res.status(500).json({ 
             'errors': [{'param': 'Server', 'msg': err}],
          }); 
      } )
}); */


// === REST API (course, prog) === //

// GET /progetti
// Get all progetti
// Request body: empty
// Response body: array of objects representing all the courses
app.get('/api/progetti',(req,res)=>{ 
  const filter = req.query.filter; 
  db.getAllProgetti(filter).then((progetti)=>{
    if (progetti.error){
      res.status(404).json(progetti);
    } else {
      res.json(progetti);
  }}).catch( (err) => {

           res.status(500).json({ 
               'errors': [{'param': 'Server', 'msg': err}],
            }); 
        } )  
});  
      
// === REST API (course, prog) === //

// GET /documenti
// Get all documenti
// Request body: empty
// Response body: array of objects representing all the courses
app.get('/api/documenti/:ID',(req,res)=>{ 
  db.getAllDocumenti(req.params.ID).then((documenti)=>{
    if (documenti.error){
      res.status(404).json(documenti);
    } else {
      res.json(documenti);
  }}).catch( (err) => {

           res.status(500).json({ 
               'errors': [{'param': 'Server', 'msg': err}],
            }); 
        } )  
});  

// === REST API (course, prog) === //

// GET /documenti
// Get all documenti
// Request body: empty
// Response body: array of objects representing all the courses
app.get('/api/commenti/:ID',(req,res)=>{ 
  db.getAllCommenti(req.params.ID).then((commenti)=>{
    if (commenti.error){
      res.status(404).json(commenti);
    } else {
      res.json(commenti);
  }}).catch( (err) => {

           res.status(500).json({ 
               'errors': [{'param': 'Server', 'msg': err}],
            }); 
        } )  
});  

app.post('/api/documenti',isLoggedIn, [
], (req, res) => {
  console.log(req.body);
  const errors = validationResult(req); // format error message
  if (!errors.isEmpty()) {
    return res.status(422).json({errors: errors.array()});
}
      const documento = {
        ID_progetto:req.body.ID_progetto,
        titolo: req.body.titolo,
        descrizione:req.body.descrizione,
        data: req.body.data,
        prezzo: req.body.prezzo,
      };
      // progetto.ID_creatore=req.user.ID;
      db.createDocumento(documento).then((ID) => {
        // 201 -> Created 
        // Location Header redirects to the newly reported response
        res.status(201).json({'ID': ID});

    }).catch((err) =>{
         res.status(500).json({ 
            'errors': [{'param': 'Server', 'msg': err}],
         }); 
    } );
  });

  app.post('/api/commenti',isLoggedIn, [
  ], (req, res) => {
    const errors = validationResult(req); // format error message
    if (!errors.isEmpty()) {
      return res.status(422).json({errors: errors.array()});
  }
        const commento = {
          ID_documento:req.body.ID_documento,
          testo:req.body.testo,
          data: req.body.data,
        };
        commento.ID_commentatore=req.user.ID
        // progetto.ID_creatore=req.user.ID;
        db.createCommento(commento).then((ID) => {
          console.log(ID);
          // 201 -> Created 
          // Location Header redirects to the newly reported response
          res.status(201).json({'ID': ID});
          
      }).catch((err) =>{
           res.status(500).json({ 
              'errors': [{'param': 'Server', 'msg': err+commento}],
           }); 
      } );
    });

    app.post('/api/donazioni',isLoggedIn, [
    ], (req, res) => {
      console.log(req.body);
      const errors = validationResult(req); // format error message
      if (!errors.isEmpty()) {
        return res.status(422).json({errors: errors.array()});
    }
          const donazione = {
            ID_progetto:req.body.ID_progetto,
            quantità: req.body.quantità,
            data: req.body.data,
          };
          donazione.ID_finanziatore=req.user.ID
          // progetto.ID_creatore=req.user.ID;
          db.createDonazione(donazione).then((ID) => {
            // 201 -> Created 
            // Location Header redirects to the newly reported response
            res.status(201).json({'ID': ID});
    
        }).catch((err) =>{
             res.status(500).json({ 
                'errors': [{'param': 'Server', 'msg': err}],
             }); 
        } );
      });
      

//get task with id
app.get('/api/progetti/:ID', isLoggedIn,(req, res) => { 

  db.getProgettoByUser(req.params.ID).then((progetto) => {
      if(progetto.error){
          res.status(404).json(progetto);
      } else {
          res.json(progetto);
      }}).catch( (err) => {

         res.status(500).json({ 
             'errors': [{'param': 'Server', 'msg': err}],
          }); 
      } )

 
});

// POST /progs
// Create a new prog
// Request body: { "ID: e.ID, creatoreID: e.ID_creatore, titolo: e.titolo, data: e.data, categoria: e.categoria, immagine: e.immagine, descrizione: e.descrizione, donazioni: e.donazioni"}
// Response body: empty (but set the relative path of the new item in the location header)
app.post('/api/progetti',isLoggedIn, [
], (req, res) => {
  console.log(req.body);
  const errors = validationResult(req); // format error message
  if (!errors.isEmpty()) {
    return res.status(422).json({errors: errors.array()});
}
      const progetto = {
        titolo: req.body.titolo,
        data: req.body.data,
        categoria: req.body.categoria,
        immagine: req.body.immagine,
        descrizione: req.body.descrizione,
        donazioni: req.body.donazioni,
      };
      progetto.ID_creatore=req.user.ID
      // progetto.ID_creatore=req.user.ID;
      db.createProgetto(progetto).then((ID) => {
        // 201 -> Created 
        // Location Header redirects to the newly reported response
        res.status(201).json({'ID': ID});
        
    }).catch((err) =>{
         res.status(500).json({ 
            'errors': [{'param': 'Server', 'msg': err}],
         }); 
    } );
  });
  // delete a prog
  app.delete('/api/progetti/:ID',isLoggedIn,(req,res)=> {
    db.deletePROGETTO(req.params.ID,req.user.ID).then( (result) => {
            // 204 -> No content
            res.status(204).end();
        }).catch( (err) => {

          res.status(500).json({ 
              'errors': [{'param': 'Server', 'msg': err}],
            }); 
        } )

  })
  // delete a doc
  app.delete('/api/documenti/:ID',isLoggedIn,(req,res)=> {
    db.deleteDocumento(req.params.ID).then( (result) => {
            // 204 -> No content
            res.status(204).end();
        }).catch( (err) => {

          res.status(500).json({ 
              'errors': [{'param': 'Server', 'msg': err}],
            }); 
        } )

  })
  app.delete('/api/commenti/:ID',isLoggedIn,(req,res)=> {
    db.deleteCommento(req.params.ID).then( (result) => {
            // 204 -> No content
            res.status(204).end();
        }).catch( (err) => {

          res.status(500).json({ 
              'errors': [{'param': 'Server', 'msg': err}],
            }); 
        } )

  })

  // update a prog
  app.put('/api/progetti/:ID',isLoggedIn, [
  ],  (req, res) => {

        console.log(req.body);
        const errors = validationResult(req);
    
        if (!errors.isEmpty()) {
            return res.status(422).json({errors: errors.array()});
    
        }
        const prog = req.body;
        // prog.ID_creatore = req.user.ID;
        db.updateProg(req.params.ID,prog).then((err) => {
            if (err)
                res.status(404).json(err);
            else
                res.status(200).end();

            
        }).catch((err) =>{
            res.status(500).json({ 
                'errors': [{'param': 'Server', 'msg': err}]
            }); 
        } );

    } );
  app.put('/api/documenti/:ID',isLoggedIn, [
    ],  (req, res) => {
  
          console.log(req.body);
          console.log(req.params.ID);
          const errors = validationResult(req);
      
          if (!errors.isEmpty()) {
              return res.status(422).json({errors: errors.array()});
      
          }
          const doc = req.body;
          db.updateDoc(req.params.ID,doc).then((err) => {
              if (err)
                  res.status(404).json(err);
              else
                  res.status(200).end();
  
              
          }).catch((err) =>{
              res.status(500).json({ 
                  'errors': [{'param': 'Server', 'msg': err}]
              }); 
          } );
  
    } );
  app.put('/api/commenti/:ID',isLoggedIn, [
      ],  (req, res) => {
    
            console.log(req.body);
            console.log(req.params.ID);
            const errors = validationResult(req);
        
            if (!errors.isEmpty()) {
                return res.status(422).json({errors: errors.array()});
        
            }
            const comment = req.body;
            comment.ID_commentatore= req.user.ID;
            db.updateComment(req.params.ID,comment).then((err) => {
                if (err)
                    res.status(404).json(err);
                else
                    res.status(200).end();
    
                
            }).catch((err) =>{
                res.status(500).json({ 
                    'errors': [{'param': 'Server', 'msg': err}]
                }); 
            } );
    
    } );


    app.post('/api/login', function(req, res, next) {
      passport.authenticate('local', function(err, user, info) {
          if (err) { return next(err) }
          if (!user) 
          {
              // display wrong login messages
              return res.status(401).json(info);
          }
          // success, perform the login
          req.login(user, function(err) 
          {
              if (err) { return next(err); }
              // req.user contains the authenticated user
              return res.json({ID : req.user.ID, nome : req.user.nome, cognome : req.user.cognome, email: req.user.email});
          });
      })(req, res, next);
  });

  // Logout
app.delete('/api/logout', function(req, res){
  req.logout();
  res.end();
});

//User
app.post ('/api/user', [], 
(req, res) => {   const errors = validationResult(req);  

  if (!errors.isEmpty()) {
      return res.status(422).json({errors: errors.array()});
  }

  let userID = req.body.userId;

  udb.getUserById(userID).then((user) => {
      if (user.error)
      {
          res.status(404).json(user);
      }
      else 
      {
          res.json({nome : user.nome, cognome: user.cognome, email : user.email});
      }
  }).catch( (err) => {
      res.status(500).json({ 
          'errors': [{'param': 'Server', 'msg': err}],
      }); 
  })    
});
app.post('/api/register', [
  check('nome').isString().isLength({ max: 8 }),
  check('cognome').isString().isLength({ max: 8 }),
  check('email').isEmail(),
  check('creatore').isBoolean(),
  check('password').isString().isLength({ min: 8 })],
(req, res) => {

  const errors = validationResult(req);  

  if (!errors.isEmpty()) {
      return res.status(422).json({errors: errors.array()});
  }

  const user = {
        creatore: req.body.creatore,
        nome: req.body.nome,
        cognome: req.body.cognome,
        email: req.body.email,
        password: req.body.password,
      };

  udb.checkUser(user.email).then (() => {
      udb.createUser(user)
      .then((result) => res.status(201).json({'errors': 'user created'}))
      .catch((err) => res.status(503).json({'errors': [{'param': 'Server', 'msg': err}],}));
  }).catch( (err) => {
      res.status(503).json({'errors': err}); 
  })    
});

// All the other requests will be served by our client-side app
app.get('*', function (request, response) {
  response.sendFile(path.resolve(__dirname, 'public/index.html'));
});
// activate the server
app.listen(port, () => console.log(`Server listening at http://localhost:${port}`));
  

 