import kaboom from "kaboom"

const k = kaboom()

k.loadSprite("bean", "sprites/bean.png")

k.add([
	k.pos(120, 80),
	k.sprite("bean"),
])
k.add([
	k.pos(400, 40),
	k.text("mao mao"),
])


k.onClick(() => k.addKaboom(k.mousePos()))