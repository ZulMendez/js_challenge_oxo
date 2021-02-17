// CIBLER
const statut = document.querySelector('h2')
let jeuActif = true
let joueurActif = "X"

let etatJeu = ["","","","","","","","",""]

const conditionsVictoire = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
]

// Messages à afficher
const gagne = () => `Le joueur ${joueurActif} a gagné`
const egalite = () => `Egalité`
const tourJoueur = () => `C'est au tour du joueur ${joueurActif}`

// Ici on remplit le statut avec le message
statut.innerHTML = tourJoueur()

// Cibler les cases et le bouton + leur fonction respective
let laCase = document.querySelectorAll('.cell')
laCase.forEach(el => {
    el.addEventListener('click', gestionClickCase)
});

let boutonRec = document.querySelector('#recommencer')
boutonRec.addEventListener('click', recommencer)

// Fonction gestionClickCase
function gestionClickCase() {
    let indexCase = parseInt(this.dataset.index)
    console.log(indexCase);
    if (etatJeu[indexCase] !== '' || !jeuActif) {
        return
    }
    etatJeu[indexCase] = joueurActif
    this.innerHTML = joueurActif

    verifgagne()
}

function verifgagne () {
    let tourGagnant = false
    // on va utiliser le tourGagnant par la suite en true si le joueur une des conditions gagnantes
    // Ici on check si chaque élément du tableau contient ou non une valeur. Si pas on continue, si ils ont tous une valeur alors qq a gagné
    for (let condVic of conditionsVictoire) {
        let valeur1 = etatJeu[condVic[0]]
        let valeur2 = etatJeu[condVic[1]]
        let valeur3 = etatJeu[condVic[2]]
        if (valeur1 === "" || valeur2 ==="" || valeur3==="") {
            continue
        } else if (valeur1 === valeur2 && valeur2 === valeur3) {
            tourGagnant = true
            break
        }
    }
    // pour afficher le message Gagné
    if (tourGagnant) {
        statut.innerHTML = gagne()
        jeuActif = false
        return 
    }
    // pour afficher le message Egalité
    if (!etatJeu.includes("")) {
        statut.innerHTML = egalite()
        jeuActif = false
        return
    }
    // Si mnt on a ni gagné ni d'égalité, on doit changer de joueur
    
}
