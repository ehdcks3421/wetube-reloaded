import "dotenv/config";
import "./db.js";
import "./models/Video.js";
import "./models/User.js";
import "./models/Comments.js";
import app from "./server.js";

const PORT = 4000;

const handleListening = () =>
  console.log(`✅server listening on port http://localhost:${PORT}🚀`);

app.listen(PORT, handleListening);
