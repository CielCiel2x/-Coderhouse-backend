const express = require('express');
const {Router } = express;
const app = express();
const PORT = process.env.PORT || 8080;


let productsArray = [];


const routerProducts = Router();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(express.static("public"));

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// R O U T E R S

routerProducts.get("/", async (req, res) => {
    const productsList = await new Container("./products.json");

    const products = await productsList.getAll();

    productsArray = await [...products];
    res.send(await productsArray);
});

routerProducts.get("/:id", async (req, res) => {
    const productsList = await new Container("./products.json");
    res.send(await productsList.getById(parseInt(req.params.id)));
})



routerProducts.post("/", async (req, res) => {
    const productsList = await new Container("./products.json");
    const newProduct = await req.body;
    await productsList.save(newProduct);

    res.json(newProduct);
})

routerProducts.put("/:id", async (req, res) => {
    const productsList = await new Container("./products.json");
    const newProduct = await req.body;
    await productsList.update(parseInt(req.params.id), newProduct);
    res.send(newProduct);
})


routerProducts.delete("/:id", async (req, res) => {
    const productsList = await new Container("./products.json");
    await productsList.deleteById(parseInt(req.params.id));
    res.send("Producto eliminado");
})

app.use("/products", routerProducts);




//F I L E   M A N A G E M E N T

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
        return object;
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

    async update(id, newProduct) {
        const data = await fs.promises.readFile(this.filePath, "utf-8")
        const catalogue = JSON.parse(data);
        const index = await catalogue.findIndex(product => product.id === id);
        catalogue[index] = newProduct;
        fs.writeFile(this.filePath, JSON.stringify(catalogue, null, 2), (err) => {
            if (err) {
                console.log("error writing the file")
            }
        });
    }

}