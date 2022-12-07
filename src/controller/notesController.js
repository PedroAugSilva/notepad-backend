const Note = require("../models/Note");

module.exports = {
  async createNote(req, res) {
    try {
      const { title, content, fk_user_id } = req.body;
      const note = new Note({ title, content, fk_user_id });
      await note.save();
      res.status(200).json({ message: "note created" });
    } catch (error) {
      res.status(400).json({ error });
    }
  },
  async listNote(req, res) {
    try {
      const { fk_user_id } = req.params;
      const notes = await Note.find({fk_user_id});
      return res.status(200).json({ notes });
    } catch (error) {
      res.status(400).json({ error });
    }
  },
  async listOneNote(req, res) {
    try {
      const { id } = req.params;
      const notes = await Note.findById(id);
      return res.status(200).json({ notes });
    } catch (error) {
      res.status(400).json({ error });
    }
  },
  async editNote(req, res) {
    try {
      const { id } = req.params;
      const { title, content, fk_user_id } = req.body;
      const user = await Note.findByIdAndUpdate(id,{
        id: id,
        title: title,
        content: content,
        fk_user_id: fk_user_id,
      } );
      if (!user) {
        return res.status(404).json({ message: "Notes not found" });
      }
      return res.status(200).json({ message: "note updated" });
    } catch (err) {
      if (err.kind === "ObjectId") {
        return res.status(404).json({ message: "Notes not found" });
      }
      return res.status(400).json({ message: "Note not updating" });
    }
  },
  async deleteNote(req, res) {
    try {
      const { id } = req.params;
      const note = await Note.findByIdAndRemove( id );
      if (!note) {
        res.status(404).json({ message: "note not found" });
      }
      return res.status(200).json({ message: "note deleted" });
    } catch (error) {
      res.status(400).json({ error });
    }
  },
};
