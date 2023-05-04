const express = require("express");
const EarringModel = require("../models/earring.model");
const earringRouter = express.Router();

earringRouter.get("/", async (req, res) => {
    try {
        const earrings=await EarringModel.find({name:req.query.name})
        res.status(200).send(earrings);
    } catch (err) {
        res.status(400).send({"err":err.message});
    }
});

earringRouter.get("/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const earring=await EarringModel.findOne({_id:id})
        res.status(200).send(earring);
    } catch (err) {
        res.status(400).send({"err":err.message});
    }
});

earringRouter.post("/add", async (req, res) => {
  try {
    const earring = new EarringModel(req.body);
    await earring.save();
    res.status(200).send({ "msg": "Product added successfully"});
  } catch (err) {
    res.status(400).send({ "msg": err.message });
  }
});

earringRouter.patch("/update/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await EarringModel.findByIdAndUpdate({_id:id}, req.body);
    res.status(200).send({ "msg": "Product updated successfully"});
  } catch (err) {
    res.status(400).send({ "msg": err.message });
  }
});

earringRouter.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await EarringModel.findByIdAndDelete({_id:id});
    res.status(200).send({ "msg": "Product updated successfully" });
  } catch (err) {
    res.status(400).send({ "msg": err.message });
  }
});

module.exports = earringRouter;