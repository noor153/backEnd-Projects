const getHttp = new XMLHttpRequest()

getHttp.open('GET','http://localhost:3000/getAllUsers',true)


let users = document.getElementById('inputGroupSelect04')

let Sender = document.getElementById('Sender')

Sender.value = localStorage.getItem('senderId')

var transAmount = document.getElementById('Amount')


let view = document.getElementById('view')



let submision = ()=>{
    window.location.href='../viewCustomers.html'

}

getHttp.onreadystatechange=()=>{
    if(getHttp.readyState == 4){

        var allUsers = [`<option selected>Choose Reciver...</option>`]

        for(let i = 0;i<(JSON.parse(getHttp.response).allusers).length;i++)
        {
            allUsers +=`
            <option value="`+(i+1)+`">`+JSON.parse(getHttp.response).allusers[i].name+`</option>
`
        }
        users.innerHTML = allUsers;
        id = localStorage.getItem('senderId') -1
        view.innerHTML= `<h5 class="card-title py-2">Sparks Foundation Banking System </h5>
        <p class="card-text">`+JSON.parse(getHttp.response).allusers[id].name+` </p>
        <p class="card-text"> `+JSON.parse(getHttp.response).allusers[id].email+`</p>
        <p class="card-text"> `+JSON.parse(getHttp.response).allusers[id].currentBalance+`</p>
        <button type="submit" onclick="moneyTrans()" class="btn py-2">Make a Money Transfer</button>`


    }

}
getHttp.send()

let forma = document.getElementById('forma')

let moneyTrans=()=>{
    forma.style.display = "flex"
}



