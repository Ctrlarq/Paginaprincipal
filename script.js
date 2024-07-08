document.addEventListener("DOMContentLoaded", () => {
    loadInsumos();
    loadRubros();
    loadPartidas();
});

function showSection(sectionId) {
    document.querySelectorAll("section").forEach(section => {
        section.classList.add("hidden");
    });
    document.getElementById(sectionId).classList.remove("hidden");
}

let insumos = JSON.parse(localStorage.getItem("insumos")) || [];
let rubros = JSON.parse(localStorage.getItem("rubros")) || [];
let partidas = JSON.parse(localStorage.getItem("partidas")) || [];
let presupuesto = [];

function saveData() {
    localStorage.setItem("insumos", JSON.stringify(insumos));
    localStorage.setItem("rubros", JSON.stringify(rubros));
    localStorage.setItem("partidas", JSON.stringify(partidas));
    localStorage.setItem("presupuesto", JSON.stringify(presupuesto));
}

function loadInsumos() {
    const insumosList = document.getElementById("insumosList");
    insumosList.innerHTML = "";
    insumos.forEach((insumo, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${insumo.codigo}</td>
            <td>${insumo.tipo}</td>
            <td>${insumo.nombre}</td>
            <td>${insumo.unidad}</td>
            <td>${insumo.precio}</td>
            <td><button onclick="deleteInsumo(${index})">Eliminar</button></td>
        `;
        insumosList.appendChild(row);
    });
}

function addInsumo() {
    const codigo = document.getElementById("codigo").value;
    const tipo = document.getElementById("tipo").value;
    const nombre = document.getElementById("nombre").value;
    const unidad = document.getElementById("unidad").value;
    const precio = document.getElementById("precio").value;
    insumos.push({ codigo, tipo, nombre, unidad, precio });
    saveData();
    loadInsumos();
    document.getElementById("formInsumo").reset();
}

function deleteInsumo(index) {
    insumos.splice(index, 1);
    saveData();
    loadInsumos();
}

function loadRubros() {
    const rubrosList = document.getElementById("rubrosList");
    rubrosList.innerHTML = "";
    rubros.forEach((rubro, index) => {
        const li = document.createElement("li");
        li.textContent = rubro;
        li.innerHTML += ` <button onclick="deleteRubro(${index})">Eliminar</button>`;
        rubrosList.appendChild(li);
    });

    const rubroSelect = document.getElementById("rubroPartida");
    rubroSelect.innerHTML = "";
    rubros.forEach(rubro => {
        const option = document.createElement("option");
        option.value = rubro;
        option.textContent = rubro;
        rubroSelect.appendChild(option);
    });
}

function addRubro() {
    const rubro = document.getElementById("rubro").value;
    rubros.push(rubro);
    saveData();
    loadRubros();
    document.getElementById("formRubro").reset();
}

function deleteRubro(index) {
    rubros.splice(index, 1);
    saveData();
    loadRubros();
}

function loadPartidas() {
    const partidasList = document.getElementById("partidasList");
    partidasList.innerHTML = "";
    partidas.forEach((partida, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${partida.rubro}</td>
            <td>${partida.nombre}</td>
            <td>${partida.unidad}</td>
            <td><button onclick="deletePartida(${index})">Eliminar</button></td>
        `;
        partidasList.appendChild(row);
    });
}

function addPartida() {
    const rubro = document.getElementById("rubroPartida").value;
    const nombre = document.getElementById("nombrePartida").value;
    const unidad = document.getElementById("unidadPartida").value;
    partidas.push({ rubro, nombre, unidad });
    saveData();
    loadPartidas();
    document.getElementById("formPartida").reset();
}

function deletePartida(index) {
    partidas.splice(index, 1);
    saveData();
    loadPartidas();
}

// Additional functions for handling materials and labor for partidas will be added here...
