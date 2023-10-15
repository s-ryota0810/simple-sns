const router = require("express").Router()
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
      include: {
        author: true
      }
		});
		return res.status(201).json(newPost)
	} catch (err) {
		console.log(err)
		return res.status(500).json({ message: "サーバーエラーです"})
	}
})

// 最新投稿用API
router.get("/get_latest_post", async (req, res) => {
	
	try {
		const latestPosts = await prisma.post.findMany(
      {
        take: 10,
        orderBy: { createAt: "desc"},
        include: {
          author: true,
        }
      });
		
		return res.status(200).json(latestPosts);
	} catch (err) {
		console.log(err);
		res.status(500).json({ message: "サーバーエラーです" });
	}
})

module.exports = router;

