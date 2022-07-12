// S E R V E R   C O D E

const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

app.get("/", (req, res) => {
    res.send("<h1>entrega 03</h1>");
})

app.get("/products", async (req, res) => {
    const plushies = await new Container("./products.json");
    res.send(await plushies.getAll());
})


app.get("/randomProduct", async (req, res) => {
    const plushies = await new Container("./products.json");
    const randomId = Math.floor(Math.random() * (await plushies.getAll()).length) + 1;
    console.log(randomId);
    res.send(await plushies.getById(randomId));
})



// P R O D U C T S   C O D E

const fs = require("fs");

class Container {
    constructor(filePath) {
        this.filePath = filePath;
    }

    async save(object) {
        const data = await fs.promises.readFile(this.filePath, "utf-8")
        const catalogue = JSON.parse(data);

        if (catalogue.length === 0) {
            object.id = 1;
        } else {
            object.id = catalogue[catalogue.length - 1].id + 1;
        }



        catalogue.push(object);
        await fs.writeFile(this.filePath, JSON.stringify(catalogue, null, 2), (err) => {
            if (err) {
                console.log("error writing the file")
            }
        });
        return object.id;
    }

    async getById(id) {
        const data = await fs.promises.readFile(this.filePath, "utf-8")
        const catalogue = JSON.parse(data);
        return catalogue.find(product => product.id === id);
    }

    async getAll() {
        const data = await fs.promises.readFile(this.filePath, "utf-8");
        const catalogue = JSON.parse(data);
        return catalogue;
    }

    async deleteById(id) {
        const data = await fs.promises.readFile(this.filePath, "utf-8")
        const catalogue = JSON.parse(data);
        const index = await catalogue.findIndex(product => product.id === id);
        catalogue.splice(index, 1);
        fs.writeFile(this.filePath, JSON.stringify(catalogue, null, 2), (err) => {
            if (err) {
                console.log("error writing the file")
            }
        });
    }

    async deleteAll() {
        const data = await fs.promises.readFile(this.filePath, "utf-8")
        const catalogue = JSON.parse(data);
        await catalogue.splice(0, catalogue.length);
        fs.writeFile(this.filePath, JSON.stringify(catalogue, null, 2), (err) => {
            if (err) {
                console.log("error writing the file")
            }
        });
    }

}

