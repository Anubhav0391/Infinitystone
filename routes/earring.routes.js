const express = require("express");
const EarringModel = require("../models/earring.model");
const earringRouter = express.Router();

earringRouter.get("/", async (req, res) => {
  let sort,page,limit,earrings;
  
  if(req.query.sort==="asc"){
    sort=1;
  }else if(req.query.sort==="desc"){
    sort=-1;
  }

  let sortType=req.query.type
  let sortObj={};
  sortObj[sortType]=sort;

  page= +req.query.page;
  limit= +req.query.limit;

  delete req.query.sort;
  
  delete req.query.type;
  delete req.query.page;
  delete req.query.limit;

  try {
    if(sort&&type){
      earrings=await EarringModel.find(req.query).sort(sortObj);
    }else{
      earrings=await EarringModel.find(req.query);
    }

    if(page>0 && limit>0){
      earrings=earrings.slice((page-1) * limit, page * limit)
    }else if(page<0 || limit<0){
      earrings=[];
    }

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
    res.status(200).send({ "msg": "Product deleted successfully" });
  } catch (err) {
    res.status(400).send({ "msg": err.message });
  }
});

module.exports = earringRouter;