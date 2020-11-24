const urlExpress = "";
const nbItemPerPage = 10;

function loadLieux() {
    return fetch(urlExpress+"/lieux").then((response)=>{
        return response
    }).catch((err)=>{
        console.log(err)
    });
}
function loadLieu(id) {
    return fetch(urlExpress+"/lieu/"+id).then((response)=>{
        return response
    }).catch((err)=>{
        console.log(err)
    });
}

async function render() {
    const lieux = await loadLieux();
    const body = document.getElementById("tbody");
    const page = sessionStorage.getItem("page") || 1;
    paginate(lieux, 10, page).forEach((e)=>{
        body.innerHTML += "<tr><td>"+e.id+"</td><td>"+e.name+"</td><td>"+e.description+"</td><td><a href='javascript:redirectDetail("+e.id+")'>Détail</a></td></tr>";
    });
}
function redirectDetail(id) {
    sessionStorage.setItem("idDetail",id);
    window.location.href= "../detail.html";
}

function paginate(arr, size, page_number) {
    return arr.slice((page_numer - 1) * size, page_number * size);
}