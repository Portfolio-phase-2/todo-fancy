const url = 'http://localhost:3000'
$(document).ready( function() {
    setTimeout(() => {
        loginForm()
    }, 3000);
    checkLogin()
})

function checkLogin() {
    let token = localStorage.getItem('token')
    if(token) {
        window.location = '/'
    }
}


function loginForm() {
    $("#formAuth").html("")
    $("#formAuth").append(`

    <div class="row h-100 justify-content-center align-items-center">
        <form class="col-12">
            <div class="form-group">
                <input type="email" class="form-control" id="email" placeholder="Email">
            </div>
            <div class="form-group">
                <input type="text" class="form-control" id="password" placeholder="Password">
            </div>

            <input type="button" value="Sign In" class="btn btn-outline-light btn-block mb-3" onclick="doLogin()">
            Didnt have account? <strong> <a href="#" class="text-white" onclick="registerForm()">Register</a></strong>
        </form>
    </div>

    `)
}

function registerForm() {
    $("#formAuth").html("")
    $("#formAuth").append(`

    <div class="row h-100 justify-content-center align-items-center">
        <form class="col-12">

            <div class="form-group">
                <input type="text" class="form-control" id="name" placeholder="Full Name">
            </div>
            <div class="form-group">
                <input type="email" class="form-control" id="email" placeholder="Email">
            </div>
            <div class="form-group">
                <input type="text" class="form-control" id="password" placeholder="Password">
            </div>

            <input type="button" value="Sign Up" class="btn btn-outline-light btn-block" onclick="doRegister()">
        </form>
    </div>

    `)
}

function doLogin() {
    let email = $("#email").val()
    let password = $("#password").val()
    
    $.ajax({
        url: url + `/signin`,
        method: 'POST',
        data: { email, password },
    })
    .done( function(result) {
        if(result.token) {
            localStorage.setItem('token', result.token)
            window.location = '/'
        }
    })
    .fail( function(error) {})
}

function doRegister() {
    let name = $("#name").val()
    let email = $("#email").val()
    let password = $("#password").val()
    
    $.ajax({
        url: url + `/signup`,
        method: 'POST',
        data: { name, email, password },
    })
    .done( function(result) {
        if(result.token) {
            localStorage.setItem('token', result.token)
            window.location = '/'
        }
    })
    .fail( function(error) {})
}


