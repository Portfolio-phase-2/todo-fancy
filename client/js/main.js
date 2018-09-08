$(document).ready( function() {
    listmenu()
})

function converFromDB(tgl) {
    let yyyy = tgl.substring(0, 4)
    let MM = tgl.substring(5, 7)
    let dd = tgl.substring(8, 10)
    let hh = tgl.substring(11, 13)
    let mm = tgl.substring(14, 16)
    return yyyy+'-'+MM+'-'+dd+'T'+hh+':'+mm
}

function converToDB(tgl) {
    let yyyy = tgl.substring(0, 4)
    let MM = tgl.substring(5, 7)
    let dd = tgl.substring(8, 10)
    let hh = tgl.substring(11, 13)
    let mm = tgl.substring(14, 16)
    return yyyy+'-'+MM+'-'+dd+'T'+hh+':'+mm+'000Z'
}

function listmenu() {
    $("#listMenu").text("")
    $("#listMenu").append(`
        <a href="#" class="list-group-item bg-danger text-white text-center"> Todo Manger </a>
        <a href="#" class="list-group-item" onclick="addTodoForm()"> Add New Todo</a>
        <a href="#" class="list-group-item" onclick="getAllDo()"> My Todo Doing</a>
        <a href="#" class="list-group-item" onclick="getAllDone()"> My Todo Done</a>
    `)
}

function addTodoForm() {
    $("#contentNow").text("")
    $("#contentNow").append(`
        <div class="card">
            <div class="card-header bg-danger">Add New Todo</div>
            <div class="card-body">
                <input type="text" placeholder="Title todo..." class="form-control mb-3" autofocus required id="name" />
                <textarea class="form-control mb-3" placeholder="Description" id="description"></textarea>
                <input type='datetime-local' placeholder="Date Time" class="form-control mb-3" min="${new Date()}" pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}" id="dueDate" required/>
                <input type='submit' class="btn btn-block btn-outline-danger mb-3" onclick="createOne()" value="Save Todo"/>
            </div> 
            <div class="card-footer">Footer</div>
        </div>
    `)
}

function validate() {
    let name = $("#name").val()
    let description = $("#description").val()
    let dueDate = $("#dueDate").val()

    if(name == '' || name == ' ') failDo('Wrong Title')
    if(description == '' || description == ' ') failDo('Wrong Description')
    if(dueDate == '' || dueDate == ' ') failDo('Wrong dueDate')

}

function contentNow() {
    $("#contentNow").text("")
    $("#contentNow").append(`
        <div class="card">
            <div class="card-header bg-danger text-white">My Todo List</div>
            <div class="card-body">
                <div class="card" id="myTodo" style="border: 1px solid rgba(255, 2, 2, 0)">
                </div>
            </div> 
        </div>
    `)
}