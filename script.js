const API_URL = "http://localhost:3000/programmes";
const programmesContainer = document.getElementById("programmes-container");
const form = document.getElementById("programme-form");

let programmesData = [];

// Charger et afficher les programmes
if (programmesContainer) {
    async function loadProgrammes() {
        try {
            const res = await axios.get(API_URL);
            programmesData = res.data;
            displayProgrammes(programmesData);
        } catch {
            programmesContainer.innerHTML = "";
        }
    }

    function displayProgrammes(list) {
        programmesContainer.innerHTML = "";
        list.forEach(prog => {
            const progEl = document.createElement("div");
            progEl.classList.add("programme-card");

            // Créer la liste des compétences
            let competencesHtml = "";
            if (prog.competences && prog.competences.length > 0) {
                competencesHtml = prog.competences.map(c => `<span class="tag">${c}</span>`).join("");
            }

            progEl.innerHTML = `
                <h3>${prog.titre || ""}</h3>
                <p>${prog.description || ""}</p>
                <p><strong>Durée :</strong> ${prog.duree || ""}</p>
                <div>${competencesHtml}</div>
            `;

            programmesContainer.appendChild(progEl);
        });
    }

    loadProgrammes();
}

// Ajouter un programme
if (form) {
    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const newProg = {
            titre: document.getElementById("titre").value,
            description: document.getElementById("description").value,
            duree: document.getElementById("duree").value,
            competences: document.getElementById("competences").value
                .split(",")
                .map(c => c.trim())
                .filter(c => c)
        };

        try {
            await axios.post(API_URL, newProg);
            form.reset();
            alert("Programme ajouté avec succès !");
        } catch {
            alert("Erreur lors de l'ajout.");
        }
    });
}
