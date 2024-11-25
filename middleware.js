// We import the createHmac method specifically, not the entire crypto library.
const { createHmac } = require("crypto");

function logRequest(req, res, next) {
  const logString = `[${new Date().toISOString()}] ${req.method} ${req.url}`;
  console.log(logString);
  next();
}

function hashPassword(req, res, next) {
  const { password } = req.body;
  //   const password = req.body.password;

  if (!password) {
    return res.status(400).json({ message: "The password is missing." });
  }

  // Secret är en hemlig sträng som inkluderas i hashen, den bör sparas någon annastans givetvis men för uppgiftense syfte så spelar det ingen roll. Läs på om ENV-variabler:
  const secret = "starwarsattackoftheclones";

  // Denna funktionsslinga använder sig av en krypteringsmetod tillsammans med din "hemlighet" för att hasha lösenordet. Mer än så behöver vi inte veta.
  const hashedPassword = createHmac("sha256", secret)
    .update(password)
    .digest("hex");

  // Vi lägger på ett attribut på req.objektet som då innhåller det hashade lösenorder. Vi modiferar alltså data i denna middleware också.
  req.hashedPassword = hashedPassword;

  // Vi tar bort password-attributet från req-objektet så att det inte kan hanteras vidare.
  delete req.password;

  next();
}

module.exports = { logRequest, hashPassword };
