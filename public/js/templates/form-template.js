'use strict';

function createAddForm() {
    return`<main class="col-8 mx-auto below-nav">
    <form role="form" method="POST" action="" id="add-form">
      <div id="error-messages"></div>
      <input type="text" name="ID" id="form-ID" hidden/>         
      <div class="form-group">
        <label for='titolo'>Titolo</label>
        <input type='text' required name='titolo' class='form-control input-lg' id="form-titolo"/>
      </div>

      <div class="form-group">
        <label for='categoria'>Categoria</label>
        <input type='text' required name='categoria' class='form-control input-lg' id='form-categoria' />
      </div>

      <div class="form-group">
        <label for='immagine'>Immagine</label>
        <input type='img' required name='immagine' class='form-control input-lg' id='form-immagine'/>
      </div>

      <div class="form-group">
        <label for='descrizione'>Descrizione</label>
        <input type='text' required name='descrizione' class='form-control input-lg' id='form-descrizione'/>
      </div>

      <div class="form-group">
        <div>
            <button type="submit" class="btn btn-primary">Salva</button>
        </div>
      </div>
    </form>
  </main>`;
}

function createAddDocForm() {
  return`
  <main class="col-8 mx-auto below-nav">
  <form role="form" method="POST" action="" id="add-form1">
  <div class="modal-body">   
  <div id="error-messages"></div>
  <input type="number" name="id" id="form-ID1" hidden/>  

    <div class="form-group">
        <label for='titolo'>Titolo</label>
        <input type='string' required name='titolo' class='form-control' id="form-titolo1"/>
      </div>
      <div class="form-group">
        <input type='date'  name='data' class='form-control' id="form-data1" hidden/>
      </div>
      <div class="form-group">
        <label for='descrizione'>Descrizione</label>
        <input type='string' required name='descrizione' class='form-control' id="form-descrizione1"/>
      </div>
      <div class="form-group">
        <label for='prezzo'>prezzo</label>
        <input type='number' required name='prezzo' class='form-control' id='form-prezzo1'/>
      </div>

</div>
  <div class="modal-footer">
    <div class="form-group">
      <div>
          <button type="submit" class="btn btn-primary">Salva</button>
      </div>
    </div>
  </div>

</form>
              
</main>`;
}


function createAddCommentForm() {
  return `
  <main class="col-8 mx-auto below-nav">
  <form role="form" method="POST" action="" id="add-form3">
  <div class="modal-body">   
  <div id="error-messages"></div>
  <input type="number" name="id" id="form-ID3" hidden/>  

    <div class="form-group">
        <label for='testo'>testo</label>
        <input type='string' required name='testo' class='form-control' id="form-testo"/>
      </div>
      <div class="form-group">
        <input type='date'  name='data' class='form-control' id="form-data1" hidden/>
      </div>
</div>
  <div class="modal-footer">
    <div class="form-group">
      <div>
          <button type="submit" class="btn btn-primary">Salva</button>
      </div>
    </div>
  </div>

</form>
              
</main>`;
}

{/* <form method="POST" action="" id="donation-form" class="col-6 mx-auto below-nav">
    <div id="error-messages"></div> 

    <div class="form-group">
    <label for="nome">Nome</label>
    <input type="text" name="name" id="nome" class="form-nome" required />
    </div>

    <div class="form-group">
    <label for="cognome">Cognome</label>
    <input type="text" name="cognome" id="cognome" class="form-cognome" required />
    </div>

    <div class="inner show" role="listbox" id="bs-select-25";">
      <ul class="scelta" role="presentation";">
        <li class="selected active">
          <a role="option" class="dropdown-item au-target active selected" id="bs-select-25-0" tabindex="0" aria-setsize="4" aria-posinset="1" aria-selected="true">
            <span class="text">paypal</span>
          </a>
        </li>
        <li>
          <a role="option" class="dropdown-item au-target" id="bs-select-25-1" tabindex="0" aria-setsize="4" aria-posinset="2">
          <span class="text">mastercard</span>
        </a>
      </li>
      <li>
        <a role="option" class="dropdown-item au-target" id="bs-select-25-2" tabindex="0">
        <span class="text">homebank</span>
        </a>
      </li>
      <li>
        <a role="option" class="dropdown-item au-target" id="bs-select-25-3" tabindex="0">
        <span class="text">altro</span>
        </a>
      </li>
    </ul>
  </div>
<div class="form-group">
    <input type='date' name='data' id="form-data" hidden/>
    </div> 
    <div class="form-group">
    <label for="numero">numero carta</label>
    <input type="number" name="numero" id="numero" class="form-carta" required />
    </div>

    <div class="form-group">
      <label for="password">CCV</label>
      <input type="password" name="ccv" id="password" class="form-password" required autocomplete/>
    </div>

    <div class="form-group">
    <label for="importo">importo</label>
    <input type="number" name="importo" id="importo" class="form-importo" required />
    </div>

    <button type="submit" class="btn btn-primary">Investi</button>
  </form>; */




/* <div class="form-group has-success">
                            <label for="nome" class="control-label">nome sulla carta</label>
                            <input id="nome" name="nome" type="text" class="form-nome" data-val="true" data-val-required="Please enter the name on card" autocomplete="nome" aria-required="true" aria-invalid="false" aria-describedby="nome">
                            <span class="help-block field-validation-valid" data-valmsg-for="nome" data-valmsg-replace="true"></span>
                        </div>
                        <div class="form-group">
                            <label for="carta" class="control-label">Card number</label>
                            <input id="carta" name="carta" type="tel" class="form-carta" value="" data-val="true" data-val-required="Please enter the card number" data-val-carta="Please enter a valid card number" autocomplete="carta">
                            <span class="help-block" data-valmsg-for="carta" data-valmsg-replace="true"></span>
                        </div>
                        <div class="row">
                            <div class="col-6">
                                <div class="form-group">
                                    <label for="exp" class="control-label">Expiration</label>
                                    <input id="exp" name="exp" type="tel" class="form-exp" value="" data-val="true" data-val-required="Please enter the card expiration" data-val-exp="Please enter a valid month and year" placeholder="MM / YY" autocomplete="exp">
                                    <span class="help-block" data-valmsg-for="exp" data-valmsg-replace="true"></span>
                                </div>
                            </div>
                            <div class="col-6">
                                <label for="code" class="control-label">Security code</label>
                                <div class="input-group">
                                    <input id="code" name="code" type="tel" class="form-code" value="" data-val="true" data-val-required="Please enter the security code" data-val-cc-cvc="Please enter a valid security code" autocomplete="off">
                                    <div class="input-group-addon">
                                        <span class="fa fa-question-circle fa-lg" data-toggle="popover" data-container="body" data-html="true" data-title="Security Code" 
                                        data-content="<div class='text-center one-card'>The 3 digit code on back of the card..<div class='visa-mc-cvc-preview'></div></div>"
                                        data-trigger="hover"></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="x_zip" class="control-label">Postal code</label>
                            <input id="x_zip" name="x_zip" type="text" class="form-control" value="" data-val="true" data-val-required="Please enter the ZIP/Postal code" autocomplete="postal-code">
                            <span class="help-block" data-valmsg-for="x_zip" data-valmsg-replace="true"></span>
                        </div> 
                      
                       data-val="true" data-val-required="Please enter the name on card" autocomplete="importo" aria-required="true" aria-invalid="false" aria-describedby="importo-error"
                      
                      
                      <form method="POST" action="" class="add-form4">
<div id="error-messages"></div> 
<div class="container py-3">
    <div class="row">
        <div class="col-12 col-sm-8 col-md-6 mx-auto">
            <div id="pay-invoice" class="card">
                <div class="card-body">
                    <div class="card-title">
                        <h2 class="text-center">Dati Donazione</h2>
                    </div>
                    <hr>
                    <form action="" method="post" novalidate="novalidate" id="donation-form">
                        <div class="form-group">
                          <input type='date' name='data' id="form-data" hidden/>
                          </div> 
                        <div class="form-group">
                            <label>Importo</label>
                            <input id="importo" name="importo" type="number" class="form-importo">
                        </div>
                        <div>
                            <button id="payment-button" type="submit" class="btn btn-lg btn-success btn-block">
                                <i class="fa fa-lock fa-lg"></i>&nbsp;
                                <span id="payment-button-amount">Dona</span>
                                <span id="payment-button-sending" style="display:none;">Sending…</span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div></form>*/}
function donationForm() {return`
<main class="col-8 mx-auto below-nav">
<form role="form" method="POST" action="" id="donation-form">
<div class="modal-body">   
<div id="error-messages"></div>
<input type="number" name="id" id="form-ID4" hidden/>  

  <div class="form-group">
      <label for='importo'>importo</label>
      <input type='number' required name='importo' class='form-control' id="form-importo"/>
    </div>
    <div class="form-group">
      <input type='date'  name='data' class='form-control' id="form-data1" hidden/>
    </div>
</div>
<div class="modal-footer">
  <div class="form-group">
    <div>
        <button type="submit" class="btn btn-primary">Dona</button>
    </div>
  </div>
</div>

</form>
            
</main>`
}

function createLoginForm() {
  return`<form method="POST" action="" id="login-form" class="col-6 mx-auto below-nav">
  <div id="error-messages"></div>
  <div class="form-group">
    <label for="email">Indirizzo mail</label>
    <input type="email" name="email" id="email" class="form-control" required />
  </div>

  <div class="form-group">
    <label for="password">Password</label>
    <input type="password" name="password" id="password" class="form-control" required autocomplete/>
  </div>
  <div>non sei ancora registrato? <a href="/register">CLICCA QUI!</a></div>
  <button type="submit" class="btn btn-primary">Login</button>
</form>`;
}

function createRegisterForm() {
  return`<form method="POST" action="" id="register-form" class="col-6 mx-auto below-nav">
  <div id="error-messages"></div> 

  <div class="form-group">
  <label for="nome">Nome</label>
  <input type="text" name="nome" id="nome" class="form-control" required />
  </div>

  <div class="form-group">
  <label for="cognome">cognome</label>
  <input type="text" name="cognome" id="cognome" class="form-control" required />
  </div>

  <div class="form-group">
    <label for="email">Indirizzo mail</label>
    <input type="text" name="email" id="email" class="form-control" required />
  </div>

  <div class="form-group">
    <label for="password">Password</label>
    <input type="password" name="password" id="password" class="form-control" required autocomplete/>
  </div>

  <div class="form-group">
      <div>
        <label for="form-Creatore" class="control-label">Sei un creatore ?</label>
        <input type="checkbox" name="form-Creatore" id="form-control"/>
      </div>
    </div>

  <button type="submit" class="btn btn-primary">Registrati</button>
</form>`;
}

export {createAddForm,createAddDocForm,donationForm,createLoginForm,createRegisterForm,createAddCommentForm};