# 2024-11-25 Rest-API med middleware och auth.

<details open>
<summary>Innehåll</summary>

- [Middleware](#middleware)

  - [Vad är middleware?](#vad-är-middleware)
  - [Hur fungerar det?](#hur-fungerar-det)
  - [Exempel: Logga information om förfrågningar](#exempel-logga-information-om-förfrågningar)
  - [Fler användningsområden för middleware](#fler-användningsområden-för-middleware)
  - [Några bilder som illustrerar middleware](#några-bilder-som-illustrerar-middleware')
  - [Metaforen: Middleware som en juicepress](#metaforen-middleware-som-en-juicepress)

- [Autentisering](#autentisering)
  </details>

[Tillbaks till toppen](#2024-11-25-rest-api-med-middleware-och-auth)

## Middleware

Middleware i ett API är som ett filter eller en mellanliggande station där vi kan berabeta inkommande förfrågningar och utgående svar innan de når sin slutdestination, till exempel en endpoint.

### Vad är middleware?

Tänk på middleware som en kontrollstation som varje förfrågan måste passera innan den når sitt mål. Middleware kan användas för:

- Logga information om requestet, till exempel vilken metod som används och vilken URL som anropas, alltså vilken resurs som efterfrågas.

- Kontrollera att användaren är inloggand eller har rätt befogenheter. _( autentisering )_

- Läsa och modifiera datan i förfrågan eller svaret.

- Validera data som skickas med i requestet.

- Hantera fel som kan uppstå i applikationen.

[Tillbaks till toppen](#2024-11-25-rest-api-med-middleware-och-auth)

### Hur fungerar det?

I Express.js är middleware helt enkelt en funktion som körs innan en endpoint hanteras. En middleware har alltid tillgång till tre olika parametrar:

- req **( request )**: innehåller information om förfrågan, som URL och data.

- res **( response )**: används för att skicka ett svar tillbaks till klienten.

- next: en funktion som säger till express att gå vidare till nästa middleware eller endpoint.

Syntax:

```js
function middleWare(req, res, next) {
  // code to execute on the request.
  // Must end with a response or a call to the next function
  // res.send("Something");
  // res.json({message: "some message"});
  // res.status(404).json({message: "some error message"})
  // next();
}
```

[Tillbaks till toppen](#2024-11-25-rest-api-med-middleware-och-auth)

### Exempel: Logga information om förfrågningar

Här har vi ett exempel på hur vi kan använda middleware för att logga infromation om varje request.

`middlewares.js`

```js
function logRequest(req, res, next) {
  const logString = `[${new Date().toISOString()}] ${req.method} ${req.URL}`;

  console.log(logString);
}

module.exports = { logRequest };
```

För att använda en middleware i en expressapplikation så använder vi en metod som heter `app.use()`. Det är faktiskt något som vi redan har använt när vi vill att vårt API ska hantera en body som hänger med i requestet från klienten.

`app.use(express.json())`;

`index.js`

```js
const express = require("express");
const { logRequest } = require("./middleware.js");
const app = express();

app.use(logRequest);

app.get("/test", (req, res) => {
  res.send("Det här är ett svar där förfrågan passerade igenom en middleware.");
});

app.listen(3000, () => {
  console.log("Servern lyssnar på port 3000.");
});
```

Vad händer är:

1. När en användare för en förfrågan, till exemepel en GET till /test, körs middleware-funktionen och logRequest först.
2. Middleware loggar informationen om förfrågan, i det här fallet bara vilken HTTP-metod som används samt vilken URL som anropades.
3. Funktionen next() anropas och skickar vidare requestet till nästa steg i processen. Till slut hamnar den hos endpointen och skickas tillbaks till klienten.

[Tillbaks till toppen](#2024-11-25-rest-api-med-middleware-och-auth)

### Varför är middleware så kraftfullt?

[Tillbaks till toppen](#2024-11-25-rest-api-med-middleware-och-auth)

### Några bilder som illustrerar middleware

<figure>
<image src="assets/middleware1.png">
</figure>
<figure>
<image src="assets/middleware2.webp">
</figure>
<figure>
<image src="assets/middleware3.avif">
</figure>

[Tillbaks till toppen](#2024-11-25-rest-api-med-middleware-och-auth)

### Metaforen: Middleware som en juicepress

1. **Skugg-gubben med kundvagn (Requesten):**
   Gubben representerar en klient som skickar en förfrågan till servern. Kundvagnen innehåller rådata (citroner) som representerar informationen i förfrågan, till exempel parametrar, headers eller payload.

2. **Juicepressen (Middleware):**
   Juicepressen är middleware-funktionen som bearbetar citronerna. Den tar in rådata (citroner), gör något med den, till exempel:

   - Kontrollerar att citronerna är av rätt kvalitet (autentisering eller validering).
   - Extraherar det viktiga (citronjuice) och kastar bort det som inte behövs (ta bort oönskad data).
   - Loggar hur många citroner som bearbetades (loggning).

3. **Citronjuiceflaskan (Response):**
   Efter att citronerna bearbetats av juicepressen (middleware) skickas den färdiga citronjuicen (bearbetad data eller ett svar) vidare till mottagaren. I API-världen är detta svaret som klienten får tillbaka.

#### **Hur detta kopplas till Express.js:**

När en klient skickar en förfrågan till en server i Express.js:

1. **Requesten:** Rådata kommer in (citroner i kundvagnen).
2. **Middleware:** Data bearbetas på olika sätt. Flera middleware kan användas för olika steg:
   - En middleware loggar förfrågningen.
   - En annan middleware autentiserar användaren.
   - En tredje middleware validerar och transformerar data.
3. **Response:** Ett slutgiltigt svar skickas tillbaka till klienten, precis som en flaska med citronjuice.

#### **Exempel i Express.js:**

`middlewares.js`

```js
// Middleware för att logga förfrågningar
function logMiddleware(req, res, next) {
  console.log(`[LOG] ${req.method} ${req.url}`);
  next();
}

// Middleware för att validera citronerna (t.ex. att data finns)
function validateMiddleware(req, res, next) {
  if (!req.query.citroner) {
    return res.status(400).send("Inga citroner i kundvagnen!");
  }
  next();
}

// Middleware för att omvandla citronerna till juice
function processMiddleware(req, res, next) {
  req.juice = `${req.query.citroner} flaskor citronjuice`;
  next();
}
```

`index.js`

```javascript
const express = require("express");
const app = express();

// Endpoint som skickar svaret
app.get(
  "/juice",
  [logMiddleware, validateMiddleware, processMiddleware,]
  (req, res) => {
    res.send(req.juice);
  }
);

app.listen(3000, () => console.log("Server körs på http://localhost:3000"));
```

**_Ett nytt inslag i koden ovan, det finns en hakparantes i endpointens definition, vad gör den? Jo hakparantesen här innehåller de olika middlewares som ska köras på specifikt den här endpointen. Alltså de körs INTE på ALLA requests, utan endast på de get-request som matchas mot den här endpointen. De kommer även att köras sekventiellt, alltså efter varandra i den ordningen de kommer. Varje middleware gör sin grej och de kan både modifiera req-objektet, skicka tillbaks ett response i förtid som situationen kräver eller passa vidare ansvaret till nästa middleware eller endpoint._**

När du anropar `/juice?citroner=5` med en GET-förfrågan:

1. **Loggning:** Förfrågan loggas av `logMiddleware`.
2. **Validering:** `validateMiddleware` kontrollerar att citroner skickats.
3. **Bearbetning:** `processMiddleware` omvandlar citronerna till juice.
4. **Svar:** Slutligen skickas svaret tillbaka till klienten som en flaska citronjuice.
   Metaforen med citroner och juice är en utmärkt illustration av hur middleware fungerar för att bearbeta data steg för steg i ett API!

[Tillbaks till toppen](#2024-11-25-rest-api-med-middleware-och-auth)

## Autentisering
