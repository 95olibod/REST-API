# REST-API
js-express submission


Krav för godkänt avklarade:
JA! - 1. Projektet innehåller minst 4 st. endpoints (GET, POST, PUT & DELETE för en resurs)
JA! - 2. Samtliga endpoints skall kunna nås via en REST Client fil (.rest|.http)
JA!(det gjordes tidigare innan vg kravet) - 3. Datan som API:et hanterar sparas lokalt i serverfilen
JA! - 4. Git & GitHub har använts
JA! - 5. Projektmappen innehåller en README.md fil
JA! - 6. Uppgiften lämnas in i tid!

Krav för väl godkänt:
JA! - 1. Alla punkter för godkänt är uppfyllda
JA! - 2. All data skall vara sparad i en JSON-fil istället för i serverfilen
JA! - 3. Datan i JSON-filen skall uppdateras då något läggs till, uppdateras eller tas bort
JA! - 4. Ett simpelt klient-gränssnitt skall finnas för att anropa API:ets olika endpoints, samt
visa upp resultatet vid GET anrop
JA! - 5. Ytterligare en GET endpoint skall läggas till där det går att hämta ett specifikt objekt


DJURPARKEN


Jag har i denna inlämning skapat ett enklare API med express - NODEJS. Jag har här utgått i från CRUD - Create(POST), Read(GET), Update(PUT) och Delete(DELETE), och har här hållt mig till vad som är specifikt för metoderna, ex POST - lägger till ett djur, osv.
I min applikation får som ett admin till en djurpark där du kan se, lägga till och uppdatera information för djuren. Varje djur har 4 egenskaper: id, namn, art-typ och annan information. Alla egenskapar sparas som string och id genereras av en UUID.

Från början sparades alla djur-objekt lokalt i serverfilen(array), men senare uppdaterades detta till en JSON-fil.

För att nå alla objekt har jag till en början använt mig av REST-CLIENT som är ett verktyg för VS-Code. Detta är fortfarande  användbart och filen finns att hitta i rotmappen, med namner setver.http. I denna fil kommer du åt anrop GET och POST genom url: http://localhost:3000/api/animals/ . GET finns även i rest klienten som ett anrop för att hitta specifikt objekt. detta genom url: http://localhost:3000/api/animals/ + id. Detta gäller även för metoderna DELETE och PUT.

Uppbyggnaden av applikationen sker via server.js som använder sig av filen router.js som definerar de endpoingt för projektet. Router filen anropar i sin tur metoder i controller.js där all logik kring våra anrop sker för API:et, samt viss felhantering. 

Jag har även skapat ett simplet klient-gränssnitt där mina endpoints kan anropas, och där resultat visas upp i form av json. Logik till detta finner vi i mappen public där filen script.js finns. I denna fil finns en Event-lyssnare till main. Denna metod som i sin tur tar in metoder som ex requestAnimals(); som innehåller eventlyssnare för en button med ett visst id. När denna metod anropas kommer denna i sin tur anropa de nödvändiga metoder för att få ut objekt. 

På grund av tidsbrist för inlämningen har jag:
I denna inlämning har jag inte lagt mitt fokus kring validering. Jag använder mig av det till viss del i filen script.js inbakat i de metoder som finns där, men när jag i framtiden arbetar med ett projekt är detta såklart en självklarhet för bättre användarupplevelse. Kring css har jag enbart fokuserat på det nödvändigaste

HUR BROJEKTET BYGGS OCH KÖRS.
applikationen körs igång med kommandot: npm start

Jag har för detta projekt använt mig av nodemon som är ett verktyg för node.js. Nodemon gör det möjligt för projektet att startas om automatiskt när ändringar skett i min kod.






README:
 Den ska innehålla en titel, beskrivning av projektet, vilka krav som är uppfyllda, info om hur projektet byggs
och körs.


const dbFilePath = path.resolve(__dirname, './animalDb.json'); `
eller använda mig av require iställlet för fs, men valde de övre då det verkar som att fs är mer komatibel med förändringar i dynamiska filer.

filens innehåll finns kvar, trots omstart

edit byter inte ut allt om det inte skrivs något i ett visst fält, då behålls det tidigare värdet.