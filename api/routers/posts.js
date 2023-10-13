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
	} catch (err) {
		console.log(err)
		res.status(500).json({ message: "サーバーエラーです"})
	}
	
	res.status(201).json(newPost)
})

// ユーザーログインAPI
// router.post("/login", async (req, res) => {
//   const { email, password } = req.body;
  
//   const user = await prisma.user.findUnique({ where: { email } });

//   if (!user) {
//     return res
//       .status(401)
//       .json({ error: "メールアドレスかパスワードが間違っています。" });
//   }

//   const isPasswordValid = await bcrypt.compare(password, user.password);

//   if (!isPasswordValid) {
//     return res
//       .status(401)
//       .json({ error: "メールアドレスかパスワードが間違っています。" });
//   }

//   const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, {
//     expiresIn: "1d",
//   });

//   return res.json({ token })
// })

module.exports = router;

