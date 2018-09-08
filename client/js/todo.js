const url = 'http://localhost:3000'

$(document).ready(function(){
    getAllDo()
})

function createOne() {
    validate()
    let name = $("#name").val()
    let description = $("#description").val()
    let dueDate = $("#dueDate").val()
    $.ajax({
        url: url + `/tasks`,
        method: 'POST',
        data: {
            name: name,
            description: description,
            dueDate: dueDate,
        },
        headers: {
            token: localStorage.getItem('token')
        }
    })
    .done( function(result) {
        successDo('add new task')
        getAllDo()
    })
    .fail( function(error) {
        failDo('add new task')
    })
}

function getAllDo() {
    console.log('masuk')
    $.ajax({
        url: url + `/tasks`,
        method: 'GET',
        headers: {
            token: localStorage.getItem('token')
        }
    })
    .done( function(result) {
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

        result.content.forEach(e => {
            $("#myTodo").append(`
                <div class="card mb-3">
                    <div class="card-body">
                    <p class="text-danger">${e.name}</p>
                    <p> ${e.description} </p>
                    <button class="btn-sm btn-outline-danger" onclick="setDone('${e._id}')">Done</button>
                    <button class="btn-sm btn-outline-primary" onclick="getOne('${e._id}')">Edit</button>
                    <button class="btn-sm btn-outline-dark">Delete</button>
                    </div>
                </div>
            `)
        })
        
    })
    .fail( function(error) {
        failDo('to get all todo')
    })
}

function getAllDone() {
    $.ajax({
        url: url + `/tasks/done`,
        method: 'GET',
        headers: {
            token: localStorage.getItem('token')
        }
    })
    .done( function(result) {
        $("#contentNow").text("")
        $("#contentNow").append(`
            <div class="card">
                <div class="card-header bg-danger text-white">My Done Todo List</div>
                <div class="card-body">
                    <div class="card" id="myTodo">
                    </div>
                </div> 
            </div>
        `)

        result.content.forEach(e => {
            $("#myTodo").append(`
                <div class="card-body">
                    <p class="text-danger"> <s>${e.name}</s> </p>
                    <p> <s>${e.description}</s> </p>
                    <button class="btn-sm btn-outline-danger" onclick="setDo('${e._id}')">Cancel</button>
                    <button class="btn-sm btn-outline-dark">Delete</button>
                </div>
            `)
        });
    })
    .fail( function(error) {
        failDo('to get all done todo')
    })
}

function getOne(id) {
    $.ajax({
        url: url + `/tasks/${id}`,
        method: 'GET',
        headers: {
            token: localStorage.getItem('token')
        }
    })
    .done( function(result) {
        console.log(result)
        $("#contentNow").text("")
        $("#contentNow").append(`
            <div class="card">
                <div class="card-header bg-danger">Edit My Todo</div>
                <div class="card-body">
                    <input type="text" placeholder="Title todo..." class="form-control mb-3" autofocus required id="name" value="${result.content.name}"/>
                    <textarea class="form-control mb-3" placeholder="Description" id="description">${result.content.description}</textarea>
                    <input type='datetime-local' value="${converFromDB(result.content.dueDate)}" placeholder="Date Time" class="form-control mb-3" min="${new Date()}" pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}" id="dueDate" required/>
                    <input type='submit' class="btn btn-block btn-outline-danger mb-3" onclick="updateOne('${result.content._id}')" value="Update Todo"/>
                </div> 
                <div class="card-footer">Footer</div>
            </div>
        `)
    })
    .fail( function(error) {})
}

function setDo(id) {
    $.ajax({
        url: url + `/tasks/${id}/do`,
        method: 'PATCH',
        headers: {
            token: localStorage.getItem('token')
        }
    })
    .done( function(result) {
        successDo('restore todo')
        getAllDo()
    })
    .fail( function(error) {
        failDo('restore todo')
    })
}

function setDone(id) {
    $.ajax({
        url: url + `/tasks/${id}/done`,
        method: 'PATCH',
        headers: {
            token: localStorage.getItem('token')
        }
    })
    .done( function(result) {
        successDo('done / coplete a todo')
        getAllDo()
    })
    .fail( function(error) {
        failDo('done / coplete a todo')
    })
}

function softdelete(id) {
    $.ajax({
        url: url + `/tasks/${id}/delete`,
        method: 'PATCH',
        header: {
            token: localStorage.getItem('token')
        }
    })
    .done( function(result) {})
    .fail( function(error) {})
}

function unsoftdelete(id) {
    $.ajax({
        url: url + `/tasks/${id}/restore`,
        method: 'PATCH',
        header: {
            token: localStorage.getItem('token')
        }
    })
    .done( function(result) {})
    .fail( function(error) {})
}

function updateOne(id) {
    let name = $("#name").val()
    let description = $("#description").val()
    let dueDate = $("#dueDate").val()
    $.ajax({
        url: url + `/tasks/${id}`,
        method: 'PUT',
        data: {
            name: name,
            description: description,
            dueDate: converToDB(dueDate),
        },
        headers: {
            token: localStorage.getItem('token')
        }
    })
    .done( function(result) {
        successDo('update todo')
        getAllDo()
    })
    .fail( function(error) {
        failDo('update todo')
    })
}

function deleteOne(id) {
    $.ajax({
        url: url + `/tasks/${id}`,
        method: 'DELETE',
        headers: {
            token: localStorage.getItem('token')
        }
    })
    .done( function(result) {
        successDo('delete todo')
    })
    .fail( function(error) {
        failDo('delete todo')
    })
}

function successDo(msg) {
    $("#alert").append(`
        <div class="alert alert-success" role="alert">
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
            <p>Thanks you, ${msg}</p>
        </div>
    `)
    setTimeout(() => {
        $("#alert").text("")
    }, 3000);
}

function failDo(msg) {
    $("#alert").append(`
        <div class="alert alert-danger" role="alert">
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
            <p>Sorry, ${msg}</p>
        </div>
    `)
    setTimeout(() => {
        $("#alert").text("")
    }, 3000);
}