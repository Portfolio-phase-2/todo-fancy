const url = 'http://localhost:3000'

function createOne() {
    let title = $("#title").val()
    let description = $("#description").val()
    let dueDate = $("#dueDate").val()
    $.ajax({
        url: url + `/tasks`,
        method: 'POST',
        data: {
            title: title,
            description: description,
            dueDate: dueDate,
        },
        header: {
            token: localStorage.getItem('token')
        }
    })
    .done( function(result) {})
    .fail( function(error) {})
}

function getAllDo() {
    $.ajax({
        url: url + `/tasks`,
        method: 'GET',
        header: {
            token: localStorage.getItem('token')
        }
    })
    .done( function(result) {})
    .fail( function(error) {})
}

function getAllDone() {
    $.ajax({
        url: url + `/tasks/done`,
        method: 'GET',
        header: {
            token: localStorage.getItem('token')
        }
    })
    .done( function(result) {})
    .fail( function(error) {})
}

function getOne(id) {
    $.ajax({
        url: url + `/tasks/${id}`,
        method: 'GET',
        header: {
            token: localStorage.getItem('token')
        }
    })
    .done( function(result) {})
    .fail( function(error) {})
}

function setDo(id) {
    $.ajax({
        url: url + `/tasks/${id}/do`,
        method: 'PATCH',
        header: {
            token: localStorage.getItem('token')
        }
    })
    .done( function(result) {})
    .fail( function(error) {})
}

function setDone(id) {
    $.ajax({
        url: url + `/tasks/${id}/done`,
        method: 'PATCH',
        header: {
            token: localStorage.getItem('token')
        }
    })
    .done( function(result) {})
    .fail( function(error) {})
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
    let title = $("#title").val()
    let description = $("#description").val()
    let dueDate = $("#dueDate").val()
    $.ajax({
        url: url + `/tasks/${id}`,
        method: 'PUT',
        data: {
            title: title,
            description: description,
            dueDate: dueDate,
        },
        header: {
            token: localStorage.getItem('token')
        }
    })
    .done( function(result) {})
    .fail( function(error) {})
}

function deleteOne(id) {
    $.ajax({
        url: url + `/tasks/${id}`,
        method: 'DELETE',
        header: {
            token: localStorage.getItem('token')
        }
    })
    .done( function(result) {})
    .fail( function(error) {})
}