// #1.0 Express Routing Testing and Setting
import app from "./app";
// importing app object from app.js file

const PORT = 4000;

const handleListening = () => console.log(`We Listening on: http://localhost:${PORT}`);

app.listen(PORT, handleListening);
// Listening app object something url change etc..