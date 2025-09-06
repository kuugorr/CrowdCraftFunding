'use strict';
/* function createComment(full, comment) 
{`let commentCommand = 
    <div class="col-auto px-0">
        <div class="col col-auto pt-0 pb-1 ps-3 align-self-end">
            <div class="btn-group bg-body">
                <button type="button" class="btn btn-sm btn-outline-primary" id="editComment${comment.commentId}">Edit</button>
                <button type="button" class="btn btn-sm btn-outline-dark" id="delComment${comment.commentId}">Remove</button>
            </div>
        </div>
    </div>

    let upAndDown = 
    <div class="col col-auto pt-0 pb-1 ps-3 pe-1" id="UpAndDownComment${comment.commentId}">
      <div class="btn-group bg-body">
        <button type="button" class="btn btn-sm btn-outline-success" id="upComment${comment.commentId}">Up</button>
        <button type="button" class="btn btn-sm btn-outline-danger" id="downComment${comment.commentId}">Down</button>
      </div>
    </div>
    return 
    <div class="row justify-content-between border-top pt-1 pb-0">
      ${full===1 ? commentCommand : ''}
    </div>
    <div class="row pb-0">
      <div class="col-auto pt-1 ps-3 pb-1 text-break">
        <p class="pb-3 mb-0 small lh-sm" id="commentText${comment.commentId}">
          ${comment.text.replace(/\n/g,'<BR>')}
        </p>
      </div>
    </div>
    <small class="d-block text-end mt-1 mb-1">
      <p class="fs-6 pb-1 mb-1"><span class="badge badgeInfo text-dark"><i class="far fa-user"></i> ${comment.author}</span> <span class="badge badgeInfo text-dark"><i class="far fa-user"></i> ${comment.date}</span></p>
    </small>;
`
}
function createCommentEditor(questionId, commentText) 
    {return `
          <div class="row pt-2" id="commentEditor">
            <div class="col-auto pt-1 ps-5">
              <label for="question" class="form-label"><p class="fs-5 mb-0 fw-bold">Comment</p></label>
            </div>
          </div>
          <div class="row">
            <div class="ps-5 pb-3">
              <textarea class="form-control" maxlength="720" id="commentText" rows="4" placeholder="${commentText===undefined ? 'Use comments to ask more information or suggest improvements. Avoid answering questions in comments.' : ''}">${commentText === undefined ? '' : commentText}</textarea>
            </div>
          </div>
          <div class="row pb-0">
            <div class="ps-5 pb-3">
              <button type="submit" class="btn btn-success" id="saveComment">Comment</button>
              <a href="/question/${questionId}"><button type="submit" class="btn btn-danger">Cancel</button></a>
            </div>
        </div>;

`} */

function Commform() {
    return `<!-- Main content -->
    <main>
       <div id="error-messages"></div> 
           <div class="row">
                          <div class="flexbox-container" id="comments">
                            <!-- JS will fill it -->
                          </div>
                <!-- Add a new comment -->
                <button type="button" href="/add" id="add-button3" class="btn btn-primary" data-toggle="modal" data-target="#add-modal3">Commenta</button>
            </div>
    

    <!-- Modal for the new comment form -->
    <div class="modal" id="add-modal3" tabindex="-1" role="dialog">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Commento:</h5>
              <button type="button" class="close" id="close-modal3" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <form role="form" method="POST" action="" id="add-form3">
              <div class="modal-body">   
              <div id="error-messages"></div>
              <input type="number" name="id" id="form-ID3" hidden/>  
                  <div class="form-group">
                    <label for='testo'>testo</label>
                    <input type='string' required name='testo' class='form-control' id="form-testo"/>
                  </div>
                  <div class="form-group">
                    <input type='date'  name='data' class='form-control' id="form-data3" hidden/>
                  </div>
            </div>
              <div class="modal-footer">
                <div class="form-group">
                  <div>
                      <button type="submit" class="btn btn-primary">Invia</button>
                  </div>
                </div>
              </div>
  
            </form>
          </div>
        </div>
    </main>`

}

export default Commform;