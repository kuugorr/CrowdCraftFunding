'use strict';

function userPage()
 { return  `<main class="col-sm-8 col-12 below-nav">
     <div id="error-messages"></div> 
         <div class="row">
    <aside class="progSide" id="prog-side-bar">
      <div class="list-group list-group-flush">
          <a href="/" class="list-group-item list-group-item-action active">i miei progetti</a>
          <a href="/progetti/today" class="list-group-item list-group-item-action">Oggi</a>
        </div>
  </aside>
            <div class="col-lg-8 col">
            <table class="table table-bordered table-striped">
                    <thead class="thead-light">
                        <tr>
                            <th>nome</th>
                            <th>cognome</th>
                            <th>email</th>
                        </tr>
                    </thead>
                      <tbody id="my-users">
                        <!-- JS will fill it -->
                      </tbody>
                </table>
               </div>
        </div>
        <div id="myprogetti">
                      
                      </div>
      </main>`;
}


function createProfileAnswer(answerWithQuestionInfo) 
{
    let color = "badgeInfo"
    if(answerWithQuestionInfo.votes > 0)
    {
        color = "badgeUp"
    }
    if(answerWithQuestionInfo.votes < 0)
    {
        color = "badgeDown"
    }

    return `
    <div class="row my-2 p-1 bg-light bg-gradient rounded shadow-sm" >
        <div class="col-md-1 col-sm-4 pt-1"> 
            <div class="row text-center rounded border">
                <div><span title="${answerWithQuestionInfo.votes} votes" class="badge rounded-pill text-dark align-middle ${color}"><i class="fas fa-trophy"></i> ${answerWithQuestionInfo.votes}</span></div>
                <div>Votes</div>
            </div>                    
        </div>
        <div class="col-md-11">
            <p class="pb-3 mb-0 small lh-sm border-bottom fs-8 text-break">
            <a href="#" id="selectA${answerWithQuestionInfo.questionId}" class="text-decoration-none fw-bold d-block text-primary fs-6">${answerWithQuestionInfo.questionTitle}</a>    
                ${answerWithQuestionInfo.text.replace(/\n/g,'<BR>')} 
            </p>
        </div>
        <small class="d-block text-end mt-1 ">
        <p class="fs-6 pb-1 mb-1"><span class="badge badgeInfo text-dark"><i class="far fa-user"></i> ${answerWithQuestionInfo.author}</span> <span class="badge badgeInfo text-dark"><i class="far fa-user"></i> ${answerWithQuestionInfo.date}</span></p>
        </small>
    </div>`;
}



export {userPage, createProfileAnswer}
