let data = [];
let editId = null;
const u = `http://localhost:5000/items/`;

async function fetchData() {
    const response = await fetch(u);
    data = await response.json();
    renderCard();
}

async function postData(newData) {
    await fetch(u, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newData),
    });
    fetchData();
    clickForm(false);
}

async function updateData(id, updatedData) {
    await fetch(`${u}${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
    });
    clickForm(false);
}

async function deleteEntry(id) {
    await fetch(`${u}${id}`, {
        method: "DELETE",
    })
    .then(() => {
         alert(`Deleted item`);
        fetchData();
        backEntry();
    });
}

const image = "https://images.pexels.com/photos/14678750/pexels-photo-14678750.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load";

function handleFormSubmit(event) {
    event.preventDefault();
    const newData = {
        productname: document.getElementById("productname").value,
        description: document.getElementById("description").value,
        price: document.getElementById("price").value,
        quantity: document.getElementById("quantity").value,
        image: image,
    };

    if (editId === null) {
        postData(newData).then(() => {
            resetForm();
        });
    } else {
        updateData(editId, newData).then(() => {
            resetForm();
            fetchData();
        });
    }
}

function resetForm() {
    document.getElementById('formData').reset();
    editId = null;
    showDetail(false);
}

function renderCardDetail(id) {
    const detailDiscriptionContainer = document.getElementById("detailDiscriptionContainer");

    const item = data.find(user => user._id === id);

    detailDiscriptionContainer.innerHTML = `
        <div class="card1" style="width: 90rem;height:43rem; display:flex; gap:35rem;">
            <div id="main"style="display: flex; align-items: center;margin-left:2rem;">
                <img src="${item.data.image}" class="detail" alt="...">
            </div>
            <div class="card-body1" style="display:flex; flex-direction:column; justify-content:center;">
                <h1 class="cards-title">${item.data.productname}</h1>
                <p id="clrr">${'$ ' + item.data.price}</p>
                <h5 class="cards-text">${item.data.description}</h5>
                <p>${'Quality: ' + item.data.quantity}</p>
                <div id="divv" style="display:flex;flex-direction:row; gap:1rem;">
                    <button id="design1" onclick="editEntry('${item._id}')">Edit</button>
                    <button id="design2" onclick="deleteEntry('${item._id}')">Delete</button>
                    <button id="design3" onclick="backEntry('${item._id}')">Back</button>
                </div>
            </div>
        </div>
    `;
    showDetail(true);
}

function renderCard() {
    const discriptionContainer = document.getElementById("discriptionContainer");
    if (!discriptionContainer) {
        console.error("Description container not found!");
        return;
    }

    discriptionContainer.innerHTML = data.map(item => `
        <div class="card" onclick="renderCardDetail('${item._id}')">
            <div class="extra">
             <img src="${item.data.image}" class="card-img-top" alt="...">
            </div>
            <div class="card-body">
                <p class="card-title">${item.data.productname}</p>
                <h5 class="card-text">${item.data.description}</h5>
                <p>${'Quality: ' + item.data.quantity}</p>
                <p id="clrr">${'$ ' + item.data.price}</p>
            </div>
        </div>
    `).join('');
}

function editEntry(id) {
    const item = data.find(user => user._id.toString() === id);
    if (item) {
        document.getElementById("productname").value = item.data.productname;
        document.getElementById("description").value = item.data.description;
        document.getElementById("price").value = item.data.price;
        document.getElementById("quantity").value = item.data.quantity;
        document.getElementById("image").value = item.data.image;
        document.getElementById("bttn").innerText = "Edit Product";
        editId = id;
       clickForm(true);
    }
}

function clickForm(enterData) {
    const mainContainer2 = document.getElementById("mainContainer2");
    const mainContainer = document.getElementById("mainContainer");
    const detailDiscriptionContainer = document.getElementById("detailDiscriptionContainer");

    if (enterData) {
        mainContainer2.style.display = 'block';
        mainContainer.style.display = 'none';
        detailDiscriptionContainer.style.display = 'none';
    }
     else {
        mainContainer2.style.display = 'none';
        mainContainer.style.display = 'block';
        detailDiscriptionContainer.style.display = 'none';
    }
}

function showDetail(details) {
    const detailDiscriptionContainer = document.getElementById("detailDiscriptionContainer");
    const discriptionContainer = document.getElementById("discriptionContainer");
    const mainContainer = document.getElementById("mainContainer");

    if (details) {
        detailDiscriptionContainer.style.display = 'block';
        discriptionContainer.style.display = 'none';
        mainContainer.style.display = 'none';
    } else {
        detailDiscriptionContainer.style.display = 'none';
        discriptionContainer.style.display = 'flex';
        mainContainer.style.display = 'block';
    }
}

function backEntry() {
    const detailDiscriptionContainer = document.getElementById("detailDiscriptionContainer");
    const discriptionContainer = document.getElementById("discriptionContainer");
    const mainContainer = document.getElementById("mainContainer");

    detailDiscriptionContainer.style.display = 'none';
    discriptionContainer.style.display = 'flex';
    mainContainer.style.display = 'block';
}

fetchData();






