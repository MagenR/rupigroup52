
window.addEventListener('DOMContentLoaded', event => {

    // Toggle the side navigation
    const sidebarToggle = document.body.querySelector('#sidebarToggle');
    if (sidebarToggle) {
        // Uncomment Below to persist sidebar toggle between refreshes
        // if (localStorage.getItem('sb|sidebar-toggle') === 'true') {
        //     document.body.classList.toggle('sb-sidenav-toggled');
        // }
        sidebarToggle.addEventListener('click', event => {
            event.preventDefault();
            document.body.classList.toggle('sb-sidenav-toggled');
            localStorage.setItem('sb|sidebar-toggle', document.body.classList.contains('sb-sidenav-toggled'));
        });
    }

});

$(document).ready(function () {

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    var urlParam = urlParams.get('category');

    if (urlParam == 'episodes')
         getEpisodes();  
    else if (urlParam == 'series')
        getSeries();
    else
        getUsers();
});

function getUsers() {
    let api = "../api/Users";

    ajaxCall("GET", api, "", getUsersSuccessCB, getErrorCB);
}

function getUsersSuccessCB(users) {
    renderUsers(users);
}

function getEpisodes() {
    let api = "../api/Episodes";

    ajaxCall("GET", api, "", getEpisodesSuccessCB, getErrorCB);
}

function getEpisodesSuccessCB(episodes) {
    renderEpisodes(episodes);
}

function getSeries() {
    let api = "../api/Series";

    ajaxCall("GET", api, "", getSeriesSuccessCB, getErrorCB);
}

function getSeriesSuccessCB(series) {
    renderSeries(series);
}

function getErrorCB(err) {
    console.log(err.status + " " + err.responseJSON.Message);
    if (err.status == '404')
        swal("Error!", "404: " + err.responseJSON.Message, "error");
    else
        swal("Error!", err.responseJSON.Message, "error");
}

function renderUsers(users) {

    $('#dataTableInsert').html(
        '<thead>' +
        '<tr>' +
        '<th>User Id</th>' +
        '<th>Email</th>' +
        '<th>First Name</th>' +
        '<th>Last Name</th>' +
        '<th>Password</th>' +
        '<th>Phone</th>' +
        '<th>Address</th>' +
        '<th>Fav Genre</th>' +
        '<th>Gender</th>' +
        '<th>Birthday</th>' +
        '</tr>' +
        '</thead>' +
        '<tbody>' +
        '</tbody>' +
        '<tfoot>' +
        '<tr>' +
        '<th>User Id</th>' +
        '<th>Email</th>' +
        '<th>First Name</th>' +
        '<th>Last Name</th>' +
        '<th>Password</th>' +
        '<th>Phone</th>' +
        '<th>Address</th>' +
        '<th>Fav Genre</th>' +
        '<th>Gender</th>' +
        '<th>Birthday</th>' +
        '</tr>' +
        '</tfoot>'
    );

    try {
        tbl = $('#dataTableInsert').DataTable({
            data: users,
            pageLength: 10,
            columns: [
                { data: "User_id" },
                { data: "Email" },
                { data: "First_name" },
                { data: "Last_name" },
                { data: "Password" },
                { data: "Phone_num" },
                { data: "Address" },
                { data: "Fav_genre" },
                { data: "Gender" },
                { data: "Birth_date" },
            ],
        });
    }
    catch (err) {
        alert(err);
    }
}

function renderSeries(series) {

    $('#dataTableInsert').html(
        '<thead>' +
        '<tr>' +
        '<th>Series Id</th>' +
        '<th>Name</th>' +
        '<th>Original Airing</th>' + 
        '<th>Origin</th>' +
        '<th>Language</th>' +
        '<th>Popularity</th>' +
        '</tr>' +
        '</thead>' +
        '<tbody>' +
        '</tbody>' +
        '<tfoot>' +
        '<tr>' +
        '<th>Series Id</th>' +
        '<th>Name</th>' +
        '<th>Original Airing</th>' +
        '<th>Origin</th>' +
        '<th>Language</th>' +
        '<th>Popularity</th>' +
        '</tr>' +
        '</tfoot>'
    );

    try {
        tbl = $('#dataTableInsert').DataTable({
            data: series,
            pageLength: 10,
            columns: [
                { data: "Tv_id" },
                { data: "Name" },
                { data: "First_air_date" },
                { data: "Origin_country" },
                { data: "Original_language" },
                { data: "Popularity" },
            ],
        });
    }
    catch (err) {
        alert(err);
    }
}

function renderEpisodes(episodes) {

    $('#dataTableInsert').html(
        '<thead>' +
        '<tr>' +
        '<th>Series Id</th>' +
        '<th>Series Name</th>' +
        '<th>Season Number</th>' +
        '<th>Episode Number</th>' +
        '<th>Episode Name</th>' +
        '<th>Original Airing</th>' +
        '</tr>' +
        '</thead>' +
        '<tbody>' +
        '</tbody>' +
        '<tfoot>' +
        '<tr>' +
        '<th>Series Id</th>' +
        '<th>Series Name</th>' +
        '<th>Season Number</th>' +
        '<th>Episode Number</th>' +
        '<th>Episode Name</th>' +
        '<th>Original Airing</th>' +
        '</tr>' +
        '</tfoot>'
    );

    try {
        tbl = $('#dataTableInsert').DataTable({
            data: episodes,
            pageLength: 10,
            columns: [
                { data: "Tv_id" },
                { data: "Name" },
                { data: "Season_number" },
                { data: "Episode_number" },
                { data: "Air_date" },
            ],
        });
    }
    catch (err) {
        alert(err);
    }
}