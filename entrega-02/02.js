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
        await fs.writeFile(this.filePath, JSON.stringify(catalogue), (err) => {
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
        fs.writeFile(this.filePath, JSON.stringify(catalogue), (err) => {
            if (err) {
                console.log("error writing the file")
            }
        });
    }

    deleteAll() {
        const data = await fs.promises.readFile(this.filePath, "utf-8")
        const catalogue = JSON.parse(data);
        await catalogue.splice(0, catalogue.length);
        fs.writeFile(this.filePath, JSON.stringify(catalogue), (err) => {
            if (err) {
                console.log("error writing the file")
            }
        });
    }

}

// T E S T I N G   C O D E

const plushies = new Container("products.json");

plushies.save({
    "title": "Cyndaquil plushie",
    "price": 444.44,
    "thumbnail": "https://d3ugyf2ht6aenh.cloudfront.net/stores/110/201/products/peluche-bayas-cynda1-f3fa15e5d3c31839d816546382427077-1024-1024.jpg",
})

/*  console.log(plushies.getById(3)) */

/* console.log(plushies.getAll()); */

/*  plushies.deleteById(2); */

/* plushies.deleteAll(); */