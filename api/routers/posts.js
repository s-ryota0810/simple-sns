const router = require("express").Router()
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient()

// つぶやき登録API
router.post("/post", async (req, res) => {
  const { content } = req.body;

	if(!content) {
		return res.status(400).json({ message: "投稿がありません"})
	}
	
	try {
		const newPost = await prisma.post.create({
			data: {
				content,
				authorId: 1,
			},
		});
		return res.status(201).json(newPost)
	} catch (err) {
		console.log(err)
		return res.status(500).json({ message: "サーバーエラーです"})
	}
	
})

module.exports = router;

