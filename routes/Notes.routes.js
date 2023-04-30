const express = require("express");
const noteRouter = express.Router();
const NoteModel = require("../backend/model/Notes.model");
noteRouter.post("/create", async (req, res) => {
  try {
    const note = NoteModel(req.body);
    await note.save();
    res.status(200).send("already post  ");
  } catch (err) {}
});
noteRouter.get("/", async (req, res) => {
  try {
    const note = await NoteModel.find({ authorID: req.body.authorID });
    res.status(200).send({ notes: note });
  } catch (err) {
    res.status(400).send({ msg: err });
  }
});
noteRouter.update("/update/:id", async (req, res) => {
  const { noteID } = req.params;
  const note = await NoteModel.find({ _id: noteID });
  try {
    if (req.body.authorID !== note.authorID) {
      res.status("u are not that person");
    } else {
      const data = await NoteModel.findByIdAndUpdate({ _id: noteID }, req.body);
      res.send("data has been updated");
    }
  } catch (err) {
    res.status(400).send({ err: err.message });
  }
});
noteRouter.delete("/delete/:id", async (req, res) => {
  const { notID } = req.params;
  try {
    const data = await NoteModel.findByIdAndDelete({ _id: notID });
    res.send("data has been updated");
  } catch (err) {
    res.status(400).send({ err: err.message });
  }
});

module.exports = { noteRouter };
//RElationship will be form on ID
