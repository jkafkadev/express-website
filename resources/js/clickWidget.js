const clickButton = document.querySelector("#clickButton")

clickButton.addEventListener("click", async () => {
  const res = await fetch("/api/click", { method: "POST" })
  const json = await res.json()
  clickButton.innerHTML = json.clickCount
})
setInterval(async () => {
  const res = await fetch("/api/click")
  const json = await res.json()
  clickButton.innerHTML = json.clickCount
}, 1000)