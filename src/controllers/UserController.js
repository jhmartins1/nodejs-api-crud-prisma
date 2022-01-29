import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default {
  // Create a user
  async createUser(req, res) {
    try {
      const { name, email } = req.body;
      let user = await prisma.user.findUnique({ where: { email } });

      if (user) {
        return res.json({ error: "There is already a user with this email" });
      }
      user = await prisma.user.create({
        data: {
          name,
          email,
        },
      });
      return res.json(user);
    } catch (err) {
      return res.json({ err });
    }
  },

  // Find All Users
  async findAllUsers(req, res) {
    try {
      const users = await prisma.user.findMany();
      return res.json(users);
    } catch (err) {
      return res.json({ err });
    }
  },

  // Find One User
  async findOneUser(req, res) {
    try {
      const { id } = req.params;
      const user = await prisma.user.findUnique({ where: { id: Number(id) } });

      if (!user) return res.json({ error: "User not found" });

      return res.json(user);
    } catch (err) {
      return res.json({ err });
    }
  },

  // Update a user
  async updateUser(req, res) {
    try {
      const { id } = req.params;
      const { name, email } = req.body;
      let user = await prisma.user.findUnique({ where: { id: Number(id) } });

      if (!user) return res.json({ error: "User not found" });
      user = await prisma.user.update({
        where: { id: Number(id) },
        data: { name, email },
      });
      return res.json(user);
    } catch (err) {
      return res.json({ err });
    }
  },

  // Delete a user
  async deleteUser(req, res) {
    try {
      const { id } = req.params;
      const user = await prisma.user.findUnique({ where: { id: Number(id) } });

      if (!user) {
        return res.json({ error: "User not found" });
      }

      await prisma.user.delete({ where: { id: Number(id) } });
      return res.json({ error: "User deleted" });
    } catch (err) {
      return res.json({ err });
    }
  },
};
