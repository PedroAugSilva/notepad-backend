const User = require("../models/User");

module.exports = {
  async signUp(req, res) {
    try {
      const { name, email, password } = req.body;
      const hasUser = await User.findOne({ email });
      const user = new User({ name, email, password });

      if (!hasUser) {
        await user.save();
        res.status(200).json({ message: "user created" });
      } else {
        res.json({ message: "User already exists" }).status(400);
      }
    } catch (error) {
      res.json(error.message).status(400);
    }
  },
  async listUser(req, res) {
    try {
      const users = await User.find();
      if (users) {
        res.json({ users }).status(200);
      } else {
        res.json({ message: "User not found" }).status(404);
      }
    } catch (error) {
      res.json({ error }).status(400);
    }
  },
  async updateUser(req, res) {
    try {
      const { id } = req.params;
      const { email, name, password } = req.body;
      // const hasUser = await User.findById(id);
      const hasUser = await User.findByIdAndUpdate(id, {
        id: id,
        name: name,
        email: email,
        password: password,
      });
      if (hasUser) {
        res.status(200).json({ message: "User updated" });
      } else {
        res.json({ message: "User nos found" }).status(404);
      }
    } catch (err) {
      res.status(400).json({ err });
    }
  },
  async deleteUser(req, res) {
    try {
      const { id } = req.params;
      await User.findByIdAndRemove(id);
      res.status(200).json({ message: "User deleted" });
    } catch (error) {
      res.json({ error }).status(400);
    }
  },
  async signIn(req, res) {
    try {
      const token = Math.random().toString(16).substr(2);
      const { email, password } = req.body;
      const user = await User.findOne({email, password});
      if (user) {
        res.status(200).json({ user, token: token });
      } else {
        res.status(401).json({ message: "unauthorized" });
      }
    } catch (error) {
      res.status(400).json({ error });
    }
  },
};
