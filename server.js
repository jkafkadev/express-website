const express = require("express")
const session = require("express-session")
const db = require("./db")
const app = express()
const port = 3006

app.use(express.static("./resources"))
app.set("views", "templates")
app.set("view engine", "pug")
app.use(session({ secret: "abcdefg" }))
app.use(express.urlencoded({extended:true}));
let numClicks = 0;


app.get('/', (req, res) => {
  res.redirect('/myAboutMe')
})

app.get("/login", (req, res) => {
  if (!req.session.username) res.render("login.pug", { loginTitle: "Login" })
  else res.render("logout.pug", { username: req.session.username, loginTitle: req.session.username })
})
app.get("/logout", (req, res) => {
  req.session.username = undefined
  res.redirect("/myAboutMe")
})
app.get("/myAboutMe", (req, res) => {
  if (req.session.username) res.render("myAboutMe.pug", { loginTitle: req.session.username })
  else res.render("myAboutMe.pug", { loginTitle: "Login" })
})
app.get("/myContacts", (req, res) => {
  if (req.session.username) res.render("myContacts.pug", { loginTitle: req.session.username })
  else res.render("myContacts.pug", { loginTitle: "Login" })
})
app.get("/myWidgets", (req, res) => {
  if (req.session.username) {
    res.render("myWidgets.pug", { loginTitle: req.session.username, clickCount: numClicks })
  }
  else res.render("myWidgets.pug", { loginTitle: "Login", clickCount: numClicks })
})
app.get("/contactMe", (req, res) => {
  if (req.session.username) res.render("contactMe.pug", { loginTitle: req.session.username })
  else res.render("contactMe.pug", { loginTitle: "Login" })
})
app.get("/api/click", (req, res) => {
  res.send({ clickCount: numClicks })
})
app.get("/contactLog", async (req, res) => {
  const obj= {}
  obj.loginTitle = req.session.username || "Login"
  const rows = {}
  if (!req.query.filter || req.query.filter == 'All') obj.rows = await db.getAll()
  else obj.rows = await db.getFilter(req.query.filter)

  res.render("contactLog.pug", obj)
})

app.post("/api/click", (req, res) => {
  numClicks++
  res.send({ clickCount: numClicks })
})
app.post("/login", (req, res) => {
  if (!req.session.username) req.session.username = req.body.username
  res.redirect("/myAboutMe")
})
app.post("/contactMe", (req, res) => {
  const title = req.body.postTitle || null
  const email = req.body.email || null
  const username = req.body.username || null
  const link = req.body.link || null
  const category = req.body.category || null
  const message = req.body.message || null
  db.addRow(title, email, username, link, category, message)
    .then(() => {
      console.log("success")
      res.render("contactMe.pug", { msg: "Success!" })
    }).catch((err) => {
      console.log("error")
      res.render("contactMe.pug", { msg: err })
    })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
