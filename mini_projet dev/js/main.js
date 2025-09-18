document.addEventListener("DOMContentLoaded", function() {
  const addGuestButton = document.getElementById("add-guest-button");
  const addGuestModal = document.getElementById("add-guest-modal");
  const closeButton = document.getElementById("close-button");
  const saveButton = document.getElementById("save-button");
  const guestList = document.getElementById("guest-list");
  const clearButton = document.getElementById("clear-button");
  const closeAddButton = document.getElementById("close-add-button");

  const editModal = document.getElementById("edit-modal");
  const closeEditButton = document.getElementById("close-edit-button-form1");
  const editSaveButton = document.getElementById("edit-save-button");
  const closeEditButtonForm = document.getElementById("close-edit-button-form");

  let editIndex = -1;

  function loadGuests() {
    const guests = JSON.parse(localStorage.getItem("guests")) || [];
    guests.forEach((guest, index) => {
      console.log(index);
      addGuestToTable(guest, index);
    });
  }

  function saveGuests(guests) {
    localStorage.setItem("guests", JSON.stringify(guests));
  }

  function addGuestToTable(guest, index = null) {
    if (guestList.querySelector("tr td[colspan]") !== null) {
      guestList.innerHTML = '';
    }
    
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${guest.name}</td>
      <td>${guest.prenom}</td>
      <td>${guest.room}</td>
      <td>${guest.checkin}</td>
      <td>${guest.checkout}</td>
      <td>
        <button class="btn btn-warning btn-sm edit-button"><i class="bi bi-pencil"></i></button>
        <button class="btn btn-danger btn-sm delete-button"><i class="bi bi-trash"></i></button>
      </td>
    `;

    guestList.appendChild(row);

    row.querySelector(".delete-button").addEventListener("click", () => {
      if (confirm("Êtes-vous sûr de vouloir supprimer cet enregistrement ?")) {
        const guests = JSON.parse(localStorage.getItem("guests")) || [];
        guests.splice(index !== null ? index : Array.from(guestList.children).indexOf(row), 1);
        saveGuests(guests);
        guestList.removeChild(row);
        if (guestList.children.length === 0) {
          guestList.innerHTML = '<tr><td colspan="6">Oups la liste est vide !</td></tr>';
        }
      }
    });

    row.querySelector(".edit-button").addEventListener("click", () => {
      editIndex = index !== null ? index : Array.from(guestList.children).indexOf(row);
      document.getElementById("edit-name").value = guest.name;
      document.getElementById("edit-prenom").value = guest.prenom;
      document.getElementById("edit-room").value = guest.room;
      document.getElementById("edit-checkin").value = guest.checkin;
      document.getElementById("edit-checkout").value = guest.checkout;
      editModal.style.display = "block";
    });
  }

  addGuestButton.addEventListener("click", () => {
    addGuestModal.style.display = "block";
  });

  closeButton.addEventListener("click", () => {
    addGuestModal.style.display = "none";
  });

  closeAddButton.addEventListener("click", () => {
    addGuestModal.style.display = "none";
  });

  saveButton.addEventListener("click", () => {
    const name = document.getElementById("name").value;
    const prenom = document.getElementById("prenom").value;
    const room = document.getElementById("room").value;
    const checkin = document.getElementById("checkin").value;
    const checkout = document.getElementById("checkout").value;

    if (validateForm(name, prenom, room, checkin, checkout)) {
      const guest = { name, prenom, room, checkin, checkout };
      const guests = JSON.parse(localStorage.getItem("guests")) || [];
      guests.push(guest);
      saveGuests(guests);
      addGuestToTable(guest, guests.length - 1);
      addGuestModal.style.display = "none";
      clearForm();
    }
  });

  clearButton.addEventListener("click", () => {
    const guests = JSON.parse(localStorage.getItem("guests")) || [];
    if (guests.length === 0) {
      alert("La liste est déjà vide.");
    } else if (confirm("Êtes-vous sûr de vouloir effacer la liste des enregistrements ?")) {
      localStorage.removeItem("guests");
      guestList.innerHTML = '<tr><td colspan="6">Oups la liste est vide !</td></tr>';
    }
  });

  closeEditButton.addEventListener("click", () => {
    editModal.style.display = "none";
  });

  closeEditButtonForm.addEventListener("click", () => {
    editModal.style.display = "none";
  });

  editSaveButton.addEventListener("click", () => {
    const editName = document.getElementById("edit-name").value;
    const editPrenom = document.getElementById("edit-prenom").value;
    const editRoom = document.getElementById("edit-room").value;
    const editCheckin = document.getElementById("edit-checkin").value;
    const editCheckout = document.getElementById("edit-checkout").value;

    if (validateForm(editName, editPrenom, editRoom, editCheckin, editCheckout) && editIndex > -1) {
      const guests = JSON.parse(localStorage.getItem("guests")) || [];
      guests[editIndex] = { name: editName, prenom: editPrenom, room: editRoom, checkin: editCheckin, checkout: editCheckout };
      saveGuests(guests);
      guestList.children[editIndex].cells[0].innerText = editName;
      guestList.children[editIndex].cells[1].innerText = editPrenom;
      guestList.children[editIndex].cells[2].innerText = editRoom;
      guestList.children[editIndex].cells[3].innerText = editCheckin;
      guestList.children[editIndex].cells[4].innerText = editCheckout;
      editModal.style.display = "none";
      editIndex = -1;
    }
  });

  function validateForm(name, prenom, room, checkin, checkout) {
    const nameRegex = /^[a-zA-ZÀ-ÿ\s]{1,30}$/;
    const roomRegex = /^[0-9]+$/;

    if (!nameRegex.test(name)) {
      alert("Le nom doit contenir seulement des lettres et ne pas dépasser 30 caractères.");
      return false;
    }

    if (!nameRegex.test(prenom)) {
      alert("Le prénom doit contenir seulement des lettres et ne pas dépasser 30 caractères.");
      return false;
    }

    if (!roomRegex.test(room)) {
      alert("La chambre doit contenir seulement des numéros.");
      return false;
    }

    const guests = JSON.parse(localStorage.getItem("guests")) || [];
    if (guests.some(guest => guest.room === room)) {
      alert("La chambre est déjà louée.");
      return false;
    }

    const today = new Date().toISOString().split('T')[0];
    if (checkin < today) {
      alert("La date d'arrivée doit être aujourd'hui ou dans le futur.");
      return false;
    }

    if (checkout <= checkin) {
      alert("La date de départ doit être après la date d'arrivée.");
      return false;
    }

    return true;
  }

  function clearForm() {
    document.getElementById("name").value = "";
    document.getElementById("prenom").value = "";
    document.getElementById("room").value = "";
    document.getElementById("checkin").value = "";
    document.getElementById("checkout").value = "";
  }

  function sortGuests(column, order) {
    const guests = JSON.parse(localStorage.getItem("guests")) || [];
    guests.sort((a, b) => {
      let valA = a[column];
      let valB = b[column];
      if (column === "name" || column === "prenom") {
        valA = valA.toLowerCase();
        valB = valB.toLowerCase();
      }
      if (column === "room") {
        valA = parseInt(valA, 10);
        valB = parseInt(valB, 10);
      } else if (column === "checkin" || column === "checkout") {
        valA = new Date(valA);
        valB = new Date(valB);
      }

      if (valA < valB) {
        return order === "asc" ? -1 : 1;
      } else if (valA > valB) {
        return order === "asc" ? 1 : -1;
      } else {
        return 0;
      }
    });

    saveGuests(guests);
    renderGuests(guests);
  }

  function renderGuests(guests) {
    guestList.innerHTML = '';
    if (guests.length === 0) {
      guestList.innerHTML = '<tr><td colspan="6">Oups la liste est vide !</td></tr>';
    } else {
      guests.forEach((guest, index) => {
        addGuestToTable(guest, index);
      });
    }
  }

  document.querySelectorAll("th[data-column]").forEach(header => {
    header.addEventListener("click", () => {
      const column = header.dataset.column;
      const order = header.dataset.order;
      sortGuests(column, order);
      header.dataset.order = order === "asc" ? "desc" : "asc";
      document.querySelectorAll("th[data-column] i").forEach(icon => icon.classList.remove("bi-arrow-down", "bi-arrow-up"));
      header.querySelector("i").classList.add(order === "asc" ? "bi-arrow-up" : "bi-arrow-down");
    });
  });

  loadGuests();
});
