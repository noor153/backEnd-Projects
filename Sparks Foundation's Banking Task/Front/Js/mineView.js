
let data = document.getElementById('data')
var Http =  new XMLHttpRequest();

 Http.open('GET','http://localhost:3000/getAllUsers',true)

 Http.send()

 Http.onreadystatechange = ()=>{
    if (Http.readyState ==4 ){

        var alltrs = []

        for(let i = 0;i<(JSON.parse(Http.response).allusers).length;i++)
        {
            var id = JSON.parse(Http.responseText).allusers[i].id
            alltrs +=`<tr class="table-dark">
            <th scope="row">`+(i+1)+`</th>
            <td class="table-dark" scope="row">`+JSON.parse(Http.response).allusers[i].name+`</td>
            <td class="table-dark" scope="row">`+JSON.parse(Http.response).allusers[i].email+`</td>
            <td class="table-dark" scope="row">`+JSON.parse(Http.response).allusers[i].age+`</td>
            <td class="table-dark" scope="row">`+JSON.parse(Http.response).allusers[i].currentBalance+`</td>
            <td class="table-dark" scope="row"><button class="btn"  onclick="submit(`+id+`)" >Transfer Money</button></td>
            </tr>`
        }

        data.innerHTML = alltrs;

        }
 }

 let submit =(id)=>{

    localStorage.setItem('senderId',id)
    window.location.href='../transfer.html'

 }