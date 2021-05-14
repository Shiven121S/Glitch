namespace SpriteKind {
    export const Actor = SpriteKind.create()
    export const PlayerBullet = SpriteKind.create()
}
sprites.onCreated(SpriteKind.Enemy, function (sprite) {
    sprites.setDataBoolean(sprite, "Alive?", true)
    sprites.setDataNumber(sprite, "Health", 2)
})
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    if (Game_Started) {
        if (Jumps >= 1) {
            mySprite.vy = -161
            Jumps += -1
        }
    }
})
sprites.onOverlap(SpriteKind.PlayerBullet, SpriteKind.Enemy, function (sprite, otherSprite) {
    sprite.destroy(effects.disintegrate, 750)
    sprites.changeDataNumberBy(otherSprite, "Health", -1)
    otherSprite.startEffect(effects.disintegrate, 500)
    if (sprites.readDataNumber(otherSprite, "Health") == 0) {
        otherSprite.destroy(effects.disintegrate, 750)
    }
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (Game_Started) {
        if (Bulllets > 0) {
            Bulllets += -1
            if (Direction == "L") {
                projectile = sprites.createProjectileFromSprite(img`
                    6 5 5 
                    7 . 5 
                    7 7 6 
                    `, mySprite, -80, 0)
                projectile.setKind(SpriteKind.PlayerBullet)
            } else if (Direction == "R") {
                projectile = sprites.createProjectileFromSprite(img`
                    6 5 5 
                    7 . 5 
                    7 7 6 
                    `, mySprite, 80, 0)
                projectile.setKind(SpriteKind.PlayerBullet)
            }
        }
    }
})
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    if (Game_Started) {
        Direction = "L"
    }
})
controller.player2.onButtonEvent(ControllerButton.Up, ControllerButtonEvent.Pressed, function () {
    if (Game_Started) {
        for (let value of tiles.getTilesByType(assets.tile`myTile25`)) {
            tiles.setWallAt(value, false)
        }
        for (let value of tiles.getTilesByType(assets.tile`myTile25`)) {
            tiles.setTileAt(value, assets.tile`myTile`)
        }
        tiles.setSmallTilemap(tilemap`level13`)
        for (let value of tiles.getTilesByType(assets.tile`myTile`)) {
            if (Math.percentChance(7)) {
                tiles.setTileAt(value, assets.tile`myTile25`)
            }
        }
        for (let value of tiles.getTilesByType(assets.tile`myTile25`)) {
            tiles.setWallAt(value, true)
        }
        tiles.placeOnRandomTile(mySprite, assets.tile`myTile0`)
    }
})
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    if (Game_Started) {
        Direction = "R"
    }
})
sprites.onOverlap(SpriteKind.Actor, SpriteKind.Projectile, function (sprite, otherSprite) {
    otherSprite.destroy(effects.disintegrate, 500)
    info.changeLifeBy(-1)
})
function Set_Colors () {
    color.setColor(1, color.rgb(15, 42, 63))
    color.setColor(2, color.rgb(32, 57, 79))
    color.setColor(3, color.rgb(246, 214, 189))
    color.setColor(4, color.rgb(195, 163, 138))
    color.setColor(5, color.rgb(153, 117, 119))
    color.setColor(6, color.rgb(129, 98, 113))
    color.setColor(7, color.rgb(78, 73, 95))
}
info.onLifeZero(function () {
    game.over(false, color.RotatePalette)
})
scene.onHitWall(SpriteKind.Projectile, function (sprite, location) {
    tiles.setTileAt(location, assets.tile`myTile`)
    tiles.setWallAt(location, false)
})
sprites.onDestroyed(SpriteKind.Enemy, function (sprite) {
    sprites.setDataBoolean(sprite, "Alive?", false)
})
sprites.onDestroyed(SpriteKind.Player, function (sprite) {
    sprites.setDataBoolean(sprite, "Alive?", false)
})
blockMenu.onMenuOptionSelected(function (option, index) {
    if (option == "How To Play") {
        game.setDialogFrame(img`
            6666666666666666666666
            6222222222222222222226
            6122222222222222222216
            6112222222222222222116
            6113333333333333333116
            6113333333333333333116
            6113333333333333333116
            6113333333333333333116
            6113333333333333333116
            6113333333333333333116
            6113333333333333333116
            6113333333333333333116
            6113333333333333333116
            6113333333333333333116
            6113333333333333333116
            6113333333333333333116
            6113333333333333333116
            6113333333333333333116
            611ffffffffffffffff116
            61ffffffffffffffffff16
            6ffffffffffffffffffff6
            6666666666666666666666
            `)
        game.showLongText("Move with WASD or the ARROW KEYS. Shoot the canons with A. It takes two shots to disable a canon. You can also shoot and destroy the terrain.Slow down time with B. Reach the darker flag to move onto the next level. Regenerate the terrain with I. Move as fast as you can. Each level, you evolve. Such as, your speed, or jump height can increase. Overall, you can slow down TIME and you evolve over TIME.", DialogLayout.Center)
    } else if (option == "Play") {
        color.FadeToBlack.startScreenEffect(500)
        timer.after(1000, function () {
            blockMenu.setControlsEnabled(false)
            blockMenu.closeMenu()
            tiles.setSmallTilemap(tilemap`level1`)
            mySprite = sprites.create(img`
                6 6 6 6 5 5 5 5 
                6 2 2 2 2 2 2 5 
                6 2 5 2 2 5 2 5 
                6 2 6 2 2 6 2 5 
                7 2 7 2 2 7 2 6 
                7 2 7 2 2 7 2 6 
                7 2 2 2 2 2 2 6 
                7 7 7 7 6 6 6 6 
                `, SpriteKind.Actor)
            info.setLife(5)
            for (let value of tiles.getTilesByType(assets.tile`myTile`)) {
                if (Math.percentChance(7)) {
                    tiles.setTileAt(value, assets.tile`myTile25`)
                }
            }
            for (let value of tiles.getTilesByType(assets.tile`myTile25`)) {
                tiles.setWallAt(value, true)
            }
            sprites.setDataString(mySprite, "Type", "Player")
            tiles.placeOnRandomTile(mySprite, assets.tile`myTile0`)
            Bulllets = 10
            controller.moveSprite(mySprite, 65, 0)
            mySprite.ay = 500
            textSprite2 = textsprite.create(convertToText(Bulllets), 0, 4)
            mySprite2 = sprites.create(img`
                1 1 1 1 1 1 1 1 
                1 1 1 1 1 1 1 1 
                1 1 1 7 7 1 1 1 
                1 1 1 7 7 1 1 1 
                1 1 4 7 7 4 1 1 
                7 4 4 7 7 4 4 7 
                7 4 3 7 7 3 4 7 
                7 3 3 7 7 3 3 7 
                `, SpriteKind.Enemy)
            tiles.placeOnRandomTile(mySprite2, assets.tile`myTile6`)
            textSprite2.setPosition(45, 4)
            textSprite2.setIcon(img`
                6 5 5 
                7 . 5 
                7 7 6 
                `)
            textSprite.destroy()
            Jumps = 3
            color.clearFadeEffect()
            Set_Colors()
            info.startCountup(true)
            Game_Started = true
        })
    }
})
let projectile2: Sprite = null
let mySprite2: Sprite = null
let textSprite2: TextSprite = null
let projectile: Sprite = null
let Direction = ""
let Bulllets = 0
let mySprite: Sprite = null
let Jumps = 0
let textSprite: TextSprite = null
let Game_Started = false
let counter = 0
Game_Started = false
Set_Colors()
blockMenu.showMenu(["Play", "How To Play"], MenuStyle.List, MenuLocation.BottomHalf)
scene.setBackgroundColor(2)
blockMenu.setColors(2, 3)
textSprite = textsprite.create("GLITCH", 0, 3)
textSprite.setPosition(55, 18)
textSprite.setMaxFontHeight(10)
game.onUpdate(function () {
    if (Game_Started) {
        if (mySprite.isHittingTile(CollisionDirection.Bottom)) {
            Jumps = 3
        }
    }
})
game.onUpdate(function () {
    if (Game_Started) {
        textSprite2.setText("")
        textSprite2.setText(convertToText(Bulllets))
    }
})
game.onUpdate(function () {
    if (Game_Started) {
        if (controller.B.isPressed()) {
            mySprite.setImage(img`
                6 6 6 6 5 5 5 5 
                6 2 2 2 2 2 2 5 
                6 2 2 2 2 2 2 5 
                6 2 2 5 2 2 2 5 
                7 2 2 2 6 2 2 6 
                7 2 2 7 2 2 2 6 
                7 2 2 2 2 2 2 6 
                7 7 7 7 6 6 6 6 
                `)
            controller.moveSprite(mySprite, 20, 0)
            for (let value of sprites.allOfKind(SpriteKind.Actor)) {
                if (sprites.readDataString(value, "Type") != "Player") {
                    value.setVelocity(0, 0)
                    value.ay = 0
                }
            }
        } else {
            mySprite.setImage(img`
                4 4 4 3 3 3 3 3 
                4 2 2 2 2 2 2 3 
                4 2 4 2 2 4 2 3 
                5 2 5 2 2 5 2 3 
                5 2 5 2 2 5 2 3 
                5 2 6 2 2 6 2 4 
                5 2 2 2 2 2 2 4 
                5 5 5 5 5 4 4 4 
                `)
            controller.moveSprite(mySprite, 65, 0)
            for (let value2 of sprites.allOfKind(SpriteKind.Actor)) {
                if (sprites.readDataString(value2, "Type") != "Player") {
                    value2.setVelocity(sprites.readDataNumber(value2, "VX"), sprites.readDataNumber(value2, "VY"))
                    value2.ay = sprites.readDataNumber(value2, "Gravity")
                }
            }
        }
    }
})
game.onUpdateInterval(800, function () {
    if (Game_Started) {
        if (sprites.readDataBoolean(mySprite2, "Alive?") == true) {
            projectile2 = sprites.createProjectileFromSprite(img`
                7 7 7 
                5 5 5 
                7 7 7 
                `, mySprite2, 0, -100)
        }
    }
})
