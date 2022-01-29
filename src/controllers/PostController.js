import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default {
  // Create a post
  async createPost(req, res) {
    const { content } = req.body;
    const { id } = req.params;

    try {
      const user = await prisma.user.findUnique({ where: { id: Number(id) } });

      if (!user) {
        return res.json({ message: "User not found" });
      }

      const post = await prisma.post.create({
        data: {
          content,
          userId: user.id,
        },
        include: {
          author: true,
        },
      });

      return res.json(post);
    } catch (err) {
      res.json({ message: err.message });
    }
  },

  // Find all posts
  async findAllPosts(req, res) {
    try {
      const posts = await prisma.post.findMany();

      return res.json(posts);
    } catch (err) {
      return res.json({ message: err.message });
    }
  },

  // Update a post
  async updatePost(req, res) {
    const { id } = req.params;
    const { content } = req.body;

    try {
      const post = await prisma.post.findUnique({ where: { id: Number(id) } });

      if (!post) {
        return res.json({ message: "Post not found" });
      }

      await prisma.post.update({
        where: { id: Number(id) },
        data: { content },
      });
      return res.json({ message: "Post updated" });
    } catch (err) {
      res.json({ message: err.message });
    }
  },

  // Delete a post
  async deletePost(req, res) {
    try {
      const { id } = req.params;
      const post = await prisma.post.findUnique({ where: { id: Number(id) } });

      if (!post) {
        return res.json({ message: "Post not found" });
      }

      await prisma.post.delete({ where: { id: Number(id) } });
      return res.json({ message: "Post deleted" });
    } catch (err) {
      return res.json({ message: err.message });
    }
  },
};
