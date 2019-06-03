// #2.1 MVC Patteran Part 2, up to setting object for URL
import app from "./app";
// importing app object from app.js file

const PORT = 4000;

const handleListening = () => console.log(`We Listening on: http://localhost:${PORT}`);

app.listen(PORT, handleListening);
// Listening app object something url change etc..