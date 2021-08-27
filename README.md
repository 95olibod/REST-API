# REST-API
js-express submission

Beskrivning:
I den här laborationen ska du individuellt skapa ett enklare REST-API i NodeJS med
express. Då API:et skall har funktionalitet för CRUD skall det finnas 4 st endpoints
inkluderat GET, DELETE, PUT och POST för en resurs. Varje endpoint skall utföra vad
dess anropsmetod ämnar att utföra, dvs. POST för att lägga till, PUT för att uppdatera,
GET för att hämta osv. GET anropet skall hämta alla objekt. Vad API:et hanterar för typ av
resurs väljer du själva, det viktiga är att det finns minst 4 st egenskaper för ett objekt varav
en egenskap är id. Projektet skall inte ha någon databas utan istället ha all data sparad
lokalt i serverfilen (exempelvis en array med produkter). För att testa ert API
rekommenderas du att använda VS Code tilläget REST Client. 


README:
 Den ska innehålla en titel, beskrivning av projektet, vilka krav som är uppfyllda, info om hur projektet byggs
och körs.

Krav för godkänt:
1. Projektet innehåller minst 4 st. endpoints (GET, POST, PUT & DELETE för en resurs)
2. Samtliga endpoints skall kunna nås via en REST Client fil (.rest|.http)
3. Datan som API:et hanterar sparas lokalt i serverfilen
4. Git & GitHub har använts
5. Projektmappen innehåller en README.md fil - (läs ovan för mer info)
6. Uppgiften lämnas in i tid!
Krav för väl godkänt:
1. Alla punkter för godkänt är uppfyllda
2. All data skall vara sparad i en JSON-fil istället för i serverfilen
3. Datan i JSON-filen skall uppdateras då något läggs till, uppdateras eller tas bort
4. Ett simpelt klient-gränssnitt skall finnas för att anropa API:ets olika endpoints, samt
visa upp resultatet vid GET anrop
5. Ytterligare en GET endpoint skall läggas till där det går att hämta ett specifikt objekt


const dbFilePath = path.resolve(__dirname, './animalDb.json'); `
eller använda mig av require iställlet för fs, men valde de övre då det verkar som att fs är mer komatibel med förändringar i dynamiska filer.

filens innehåll finns kvar, trots omstart

edit byter inte ut allt om det inte skrivs något i ett visst fält, då behålls det tidigare värdet.