const BASE_URL = "https://wtass4.000webhostapp.com/rest/api.php";
const form = document.getElementById('form');
const id_call = document.getElementById('by_id');
const rsltable = document.getElementById('result-table');
const notice = document.getElementById('notice');
//call by id function
form.addEventListener('submit', e => {
    e.preventDefault();
    getByID();
});

const itemKeys = {
    id: "ID",
    short_name: "Short Name",
    name: "Name",
    description: "Description",
    price_small: "Price (Small)",
    price_large: "Price (Large)",
    small_portion_name: "Portion (Small)",
    large_portion_name: "Portion (Large)",
};

const denger = (elem, msg) => {
    elem.classList.remove("alert-success");
    elem.classList.add("alert-danger");
    elem.innerHTML = msg;
};

const Successfully = (elem, msg) => {
    elem.classList.add("alert-success");
    elem.classList.remove("alert-danger");
    elem.innerHTML = msg;
};

function addToTable(data) {
    console.log(data);
    for (const item of data) {
        const heading = document.createElement("h3");
        heading.innerText = item.name;
        const table = document.createElement("table");
        table.classList.add("table");
        const body = document.createElement("tbody");
        for (const key of Object.keys(item)) {
            const tr = document.createElement("tr");
            const th = document.createElement("th");
            th.setAttribute("scope", "row");
            th.innerText = itemKeys[key];

            const td = document.createElement("td");
            td.innerText = item[key];

            tr.appendChild(th);
            tr.appendChild(td);
            body.appendChild(tr);
        }

        table.appendChild(body);
        rsltable.appendChild(heading);
        rsltable.appendChild(table);
        rsltable.appendChild(document.createElement("br"));
        rsltable.appendChild(document.createElement("br"));
    }
}

function getByID() {
    rsltable.innerHTML = "";
    const id = id_call.value;
    id.value = "";

    if (isNaN(id)) {
        denger(notice, "Please enter a valid numerical ID");
        return;
    }

    fetch(`${BASE_URL}?id=${id}`)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            if (data.code === "500") {
                denger(notice, "Returned a 500: Internal Server Error.");

            } else if (JSON.parse(data.response) === "Not found") {
                denger(notice, "No item with that ID found.");

            } else {
                Successfully(notice, "Successfully fetched data.");
                addToTable([JSON.parse(data.response)]);
            }
        });
}