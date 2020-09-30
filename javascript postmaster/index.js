console.log("we are at Post master project")


let addparamCount = 0

function getElementfromstring(string) {
    let div = document.createElement('div')
    div.innerHTML = string
    return div.firstElementChild
}
// initially show json div

let jsondiv = document.getElementById('jsondiv')
let customparamdiv = document.getElementById('customparamdiv')
console.log(customparamdiv)
customparamdiv.style.display = "none"

let jsoncontentType = document.getElementById('json')
let paramcontentType = document.getElementById('customparam')

jsoncontentType.addEventListener('click', () => {
    jsondiv.style.display = "block"
    customparamdiv.style.display = "none"
})

paramcontentType.addEventListener('click', () => {
    jsondiv.style.display = "none"
    customparamdiv.style.display = "block"
})

let paramBtn = document.getElementById('paramBtn')
paramBtn.addEventListener('click', () => {
    let html = ""
    html = `<div class="form-row">
                <label for="url" class="col-form-label col-sm-2">
                    <h4>Parameter</h4>
                </label>
                <div class="col-sm-5">
                    <input type="text" class="form-control" placeholder="Parameter Key ${addparamCount + 2}" id="Parameterkey${addparamCount + 2}">
                </div>
                <div class="col-sm-4">
                    <input type="text" class="form-control" placeholder="Parameter Value ${addparamCount + 2}" id="Parametervalue${addparamCount + 2}">
                </div>

                
                    <button type="button" class="btn btn-dark colbtn deletBtn" id="paramBtn">-</button>
            </div>`

    let addparamdiv = document.getElementById('addparamdiv')
    let element = getElementfromstring(html)
    addparamdiv.appendChild(element)

    let deletBtn = document.getElementsByClassName('deletBtn')

    for (item of deletBtn) {
        item.addEventListener('click', (e) => {
            e.target.parentElement.remove()
        })

    }

    addparamCount++


})

// fetch responce 

let submitBtn = document.getElementById('submitBtn')
submitBtn.addEventListener('click', () => {

    let responseTextarea = document.getElementById('responseTextarea')
    responseTextarea.innerText = `Please wait .. we will show your responce as soon as possible ...`


    let url = document.getElementById('url').value
    let requestType = document.querySelector('input[name=requestType]:checked').value
    let contentType = document.querySelector('input[name=contentType]:checked').value
    console.log(requestType)
    console.log(contentType)
    console.log(url)

    if (contentType == 'customparam') {
        data = {}

        for (let i = 0; i < addparamCount + 1; i++) {

            if (document.getElementById('Parameterkey' + (i + 1)) != undefined) {
                let key = document.getElementById('Parameterkey' + (i + 1)).value
                let value = document.getElementById('Parametervalue' + (i + 1)).value

                data[key] = value
            }
        }
        data = JSON.stringify(data)
    }
    else {
        data = document.getElementById('jsonTextarea').value

    }
    console.log("data::::", data)

    if (requestType == 'GET') {

        fetch(url, {
            method: 'GET',
        }).then(response => response.text()).then(text => {
            let responseText = document.getElementById('responseText').style.height = '150px'
            responseTextarea.innerText = text
           
        })

    }

    if (requestType == 'POST') {

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: data,
        }).then(response => response.text()).then(text => {
            let responseText = document.getElementById('responseText').style.height = '150px'
            responseTextarea.innerText =  text.json()
            
            });

    }

})

