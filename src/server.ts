import express from "express";
import router from "./routes/routes";

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/", router);

app.listen(PORT, () => {
    console.log(`O server está rodando em http://localhost:${PORT}`);
});
