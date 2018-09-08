const url = 'http://localhost:3000'
$(document).ready( function() {
    setTimeout(() => {
        loginForm()
    }, 3000);
    
})

function loginForm() {
    $("#formAuth").append(`

    <div class="row h-100 justify-content-center align-items-center">
        <form class="col-12">
            <div class="form-group">
                <input type="email" class="form-control" id="email" placeholder="Email">
            </div>
            <div class="form-group">
                <input type="text" class="form-control" id="password" placeholder="Password">
            </div>

            <input type="button" value="Sign In" class="btn btn-outline-light btn-block" onclick="doLogin()">
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


