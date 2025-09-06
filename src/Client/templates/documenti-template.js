'use strict';

function docform() {
    return `<!-- Main content -->
    <main class="col-sm-8 col-12 below-nav">
       <div id="error-messages"></div> 
           <div class="row">
              <div class="col-lg-8 col">
                <section class="shop" id="shop">
                          <div class="flexbox-container" id="my-docs">
                            <!-- JS will fill it -->
                          </div>
                </section>
                </div>
                <!-- Add a new doc -->
                <button type="button" href="/add" id="add-button1" class="btn btn-primary" data-toggle="modal" data-target="#add-modal1">Nuovo documento</button>
            </div>
        </div>
    

    <!-- Modal for the new prog form -->
    <div class="modal" id="add-modal1" tabindex="-1" role="dialog">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Aggiungi un nuovo documento</h5>
              <button type="button" class="close" id="close-modal1" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
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
          </div>
        </div>
      </div>
                
                </main>`

}

export default docform;