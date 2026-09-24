
const input = document.querySelector(".search-input");
const wynikElement = document.querySelector(".cards");
const results = document.querySelector(".no-results");
const genreSelect = document.querySelector(".genre-select");
const sortSelect = document.querySelector(".sort-select");


fetch("dane.js")
    .then(response => {
        return response.json();
    })
    .then(dane => {

        function render(filmy) {
            wynikElement.innerHTML = "";

            filmy.forEach(film => {
                const div = document.createElement("div");

                div.classList.add("movie-card");
                wynikElement.append(div);

                

                const h2 = document.createElement("h2")

                h2.classList.add("tytul-card");
                div.append(h2)

                h2.textContent = film.tytul

                const rok = document.createElement("p")

                rok.classList.add("rok-card");
                div.append(rok)

                rok.textContent = film.rok

                const rezyser = document.createElement("p")

                rezyser.classList.add("rezyser-card")
                div.append(rezyser)

                rezyser.textContent = film.rezyser

                const gatunek = document.createElement("p")

                gatunek.classList.add("gatunek-card");
                div.append(gatunek)

                gatunek.textContent = film.gatunek

            });
        }

        render(dane);

        function filtrujFilmy() {

            const tekst = input.value.toLowerCase();
            const gatunek = genreSelect.value;
            const sortowanie = sortSelect.value;

            const znalezioneFilmy = dane.filter(film => {
                return film.tytul.toLowerCase().includes(tekst) &&
                       (gatunek === "" || film.gatunek === gatunek);

                       
            });

if (sortowanie === "sort-rosnaco")
    { znalezioneFilmy.sort((a, b) => {
        return a.rok - b.rok 
    })
}
    if(sortowanie === "sort-malejaco"){
        znalezioneFilmy.sort((a, b) =>{
            return b.rok - a.rok
        }
    )
    }

if(sortowanie === "sort-alfabetycznie")
{ znalezioneFilmy.sort((a,b)=>{
    return a.tytul.localeCompare(b.tytul)
})}
                        
                       
            render(znalezioneFilmy);

            if (znalezioneFilmy.length === 0) {
                results.textContent = "Nie znaleziono filmów";
            } else {
                results.textContent = "";
            }
        }

        input.addEventListener("input", () => {
            filtrujFilmy();
        });

        genreSelect.addEventListener("change", () => {
            filtrujFilmy();
        });

        sortSelect.addEventListener("change", () => {
            filtrujFilmy();
        })

    })
    .catch(error => {
        results.textContent = "Nie udało się wczytać danych";
    });


      
   // Z 1 zadaniem korzystałam z ai, a w drugim jak podpowiedział catch to wiedziałam, że to będzie do fetch tylko w złym miejscu napisałam i
   // nie bylam pewna co napisac w srodku