$(document).ready( function() {
    checkLogin()
    listmenu()
    weather()
})

function checkLogin() {
    let token = localStorage.getItem('token')
    if(!token) {
        window.location = '/auth.html'
    }
}

function logout() {
    localStorage.removeItem('token')
    window.location = '/auth.html'
}

function converFromDB(tgl) {
    let yyyy = tgl.substring(0, 4)
    let MM = tgl.substring(5, 7)
    let dd = tgl.substring(8, 10)
    let hh = tgl.substring(11, 13)
    let mm = tgl.substring(14, 16)
    return yyyy+'-'+MM+'-'+dd+'T'+hh+':'+mm
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
            <div class="card-footer">Plan yout task</div>
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

function weather() {
    $.ajax({
        method: 'GET',
        url: `https://todooku.padangjs.com/suhu/jakarta`
    })
    .done(function (result) {
        let suhu = result.data.main.temp - 273.15 + `' Celcius`
        let awan = result.data.weather[0].main
        let icon = `<img src="http://openweathermap.org/img/w/${result.data.weather[0].icon}.png" width="100px" alt="icon">`

        $("#weather").append(`
            <div class="card mb-3">
                <div class="card-header bg-danger text-white">Jakarta</div>
                <div class="card-body">
                    ${icon}
                    ${suhu} - ${awan}
                </div>
            </div>
        `)
    })
    .fail(function (err) {
        
    })
}