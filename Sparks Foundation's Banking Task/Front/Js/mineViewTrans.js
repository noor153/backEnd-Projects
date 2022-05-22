let data = document.getElementById('data')

const http = new XMLHttpRequest()



http.open('GET','http://localhost:3000/getAllTrans',true)


http.onreadystatechange = ()=>{
    if (http.readyState ==4 ){
        console.log((JSON.parse(http.response).allTrans));

        var alltrs = []

        for(let i = 0;i< (JSON.parse(http.response).allTrans).length;i++)
        {
            alltrs +=`<tr class="table-dark">
            <th scope="row">`+(i+1)+`</th>
            <td class="table-dark" scope="row">`+JSON.parse(http.response).allTrans[i].Sender_Name+`</td>
            <td class="table-dark" scope="row">`+JSON.parse(http.response).allTrans[i].Reciver_Name+`</td>
            <td class="table-dark" scope="row">`+JSON.parse(http.response).allTrans[i].TransferedBalance+`</td>
            </tr>`
        }

        data.innerHTML = alltrs;

        }
 }

http.send();

