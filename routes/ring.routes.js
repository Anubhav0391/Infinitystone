const express = require("express");
const RingModel = require("../models/ring.model");
const ringRouter = express.Router();

ringRouter.get("/", async (req, res) => {
    try {
        const rings=await RingModel.find({name:req.query.name})
        res.status(200).send(rings);
    } catch (err) {
        res.status(400).send({"err":err.message});
    }
});

ringRouter.get("/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const ring=await RingModel.findOne({_id:id})
        res.status(200).send(ring);
    } catch (err) {
        res.status(400).send({"err":err.message});
    }
});

ringRouter.post("/add", async (req, res) => {
  try {
    const ring = new RingModel(req.body);
    await ring.save();
    res.status(200).send({ "msg": "Product added successfully"});
  } catch (err) {
    res.status(400).send({ "msg": err.message });
  }
});

ringRouter.patch("/update/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await RingModel.findByIdAndUpdate({_id:id}, req.body);
    res.status(200).send({ "msg": "Product updated successfully"});
  } catch (err) {
    res.status(400).send({ "msg": err.message });
  }
});

ringRouter.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await RingModel.findByIdAndDelete({_id:id});
    res.status(200).send({ "msg": "Product updated successfully" });
  } catch (err) {
    res.status(400).send({ "msg": err.message });
  }
});

module.exports = ringRouter;