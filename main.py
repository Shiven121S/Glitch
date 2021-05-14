counter = 0

@namespace
class SpriteKind:
    Actor = SpriteKind.create()

def on_on_created(sprite):
    sprites.set_data_boolean(sprite, "Alive?", True)
    sprite.set_velocity(75, 0)
    
    # def on_throttle():
        #     sprite.set_velocity(sprite.vx * -1, 0)
    # timer.throttle("action", 50, on_throttle)
    
    def on_background():
        
        def on_after():
            global counter
            counter = counter + 1
            speed = 75
            if counter > 20:
                counter = 0
            elif counter > 10:
                speed = -75
            mySprite.set_velocity(speed, 0)
        
        timer.after(3000, on_after)
        
    # timer.background(on_background)
    on_background()

    tiles.place_on_random_tile(sprite, assets.tile("""
    myTile
    """))
    sprite.ay = 300
    sprites.set_data_number(sprite, "Gravity", 300)
    sprites.set_data_number(sprite, "VX", 75)
    sprites.set_data_number(sprite, "VY", 75)
sprites.on_created(SpriteKind.enemy, on_on_created)

def on_up_pressed():
    global Jumps
    if Game_Started:
        if Jumps >= 1:
            mySprite.vy = -161
            Jumps += -1
controller.up.on_event(ControllerButtonEvent.PRESSED, on_up_pressed)

def on_on_overlap(sprite, otherSprite):
    tiles.place_on_random_tile(otherSprite, assets.tile("""
    myTile
    """))
sprites.on_overlap(SpriteKind.enemy, SpriteKind.enemy, on_on_overlap)

def Set_Colors():
    color.set_color(1, color.rgb(15, 42, 63))
    color.set_color(2, color.rgb(32, 57, 79))
    color.set_color(3, color.rgb(246, 214, 189))
    color.set_color(4, color.rgb(195, 163, 138))
    color.set_color(5, color.rgb(153, 117, 119))
    color.set_color(6, color.rgb(129, 98, 113))
    color.set_color(7, color.rgb(78, 73, 95))

def on_on_destroyed(sprite):
    sprites.set_data_boolean(sprite, "Alive?", False)
sprites.on_destroyed(SpriteKind.player, on_on_destroyed)

def on_menu_option_selected(option, index):
    if option == "How To Play":
        game.set_dialog_frame(img("""
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
        """))
        game.show_long_text("Move with WASD or the ARROW KEYS. Shoot with SPACE or Z. Glitch and un-glitch time with X or ENTER. Reach the flag to progress. Destroy enemies to collect XP. This can be used to automatically level up, and strengthen you.",
            DialogLayout.CENTER)
    elif option == "Play":
        color.fade_to_black.start_screen_effect(500)
        
        def on_after():
            global mySprite, Jumps, Game_Started
            blockMenu.set_controls_enabled(False)
            blockMenu.close_menu()
            tiles.set_small_tilemap(tilemap("""
            level1
            """))
            mySprite = sprites.create(img("""
                    6 6 6 6 5 5 5 5 
                                    6 2 2 2 2 2 2 5 
                                    6 2 5 2 2 5 2 5 
                                    6 2 6 2 2 6 2 5 
                                    7 2 7 2 2 7 2 6 
                                    7 2 7 2 2 7 2 6 
                                    7 2 2 2 2 2 2 6 
                                    7 7 7 7 6 6 6 6
                """),
                SpriteKind.Actor)
            sprites.set_data_string(mySprite, "Type", "Player")
            tiles.place_on_random_tile(mySprite, assets.tile("""
            myTile0
            """))
            controller.move_sprite(mySprite, 65, 0)
            for index2 in range(4):
                
                def on_after2():
                    global mySprite2
                    mySprite2 = sprites.create(img("""
                            7 7 6 6 6 6 6 6 
                                                    7 7 6 1 1 1 1 6 
                                                    f f 7 6 1 1 1 6 
                                                    f 1 f 7 6 1 1 6 
                                                    f 1 1 f 7 6 1 6 
                                                    f 1 1 1 f 7 6 6 
                                                    f 1 1 1 1 f 7 7 
                                                    f f f f f f 7 7
                        """),
                        SpriteKind.enemy)
                timer.after(500, on_after2)
                
            mySprite.ay = 500
            textSprite.destroy()
            Jumps = 3
            color.clear_fade_effect()
            Set_Colors()
            Game_Started = True
        timer.after(1000, on_after)
        
blockMenu.on_menu_option_selected(on_menu_option_selected)

mySprite2: Sprite = None
Jumps = 0
textSprite: TextSprite = None
Game_Started = False
mySprite: Sprite = None
counter = 0
Game_Started = False
Set_Colors()
blockMenu.show_menu(["Play", "How To Play"],
    MenuStyle.LIST,
    MenuLocation.BOTTOM_HALF)
scene.set_background_color(2)
blockMenu.set_colors(2, 3)
textSprite = textsprite.create("GLITCH", 0, 3)
textSprite.set_position(55, 18)
textSprite.set_max_font_height(10)

def on_on_update():
    global Jumps
    if Game_Started:
        if mySprite.is_hitting_tile(CollisionDirection.BOTTOM):
            Jumps = 3
game.on_update(on_on_update)

def on_on_update2():
    if Game_Started:
        if controller.B.is_pressed():
            mySprite.set_image(img("""
                6 6 6 6 5 5 5 5 
                                6 2 2 2 2 2 2 5 
                                6 2 2 2 2 2 2 5 
                                6 2 2 5 2 2 2 5 
                                7 2 2 2 6 2 2 6 
                                7 2 2 7 2 2 2 6 
                                7 2 2 2 2 2 2 6 
                                7 7 7 7 6 6 6 6
            """))
            controller.move_sprite(mySprite, 20, 0)
            for value in sprites.all_of_kind(SpriteKind.Actor):
                if sprites.read_data_string(value, "Type") != "Player":
                    value.set_velocity(0, 0)
                    value.ay = 0
        else:
            mySprite.set_image(img("""
                4 4 4 3 3 3 3 3 
                                4 2 2 2 2 2 2 3 
                                4 2 4 2 2 4 2 3 
                                5 2 5 2 2 5 2 3 
                                5 2 5 2 2 5 2 3 
                                5 2 6 2 2 6 2 4 
                                5 2 2 2 2 2 2 4 
                                5 5 5 5 5 4 4 4
            """))
            controller.move_sprite(mySprite, 65, 0)
            for value2 in sprites.all_of_kind(SpriteKind.Actor):
                if sprites.read_data_string(value2, "Type") != "Player":
                    value2.set_velocity(sprites.read_data_number(value2, "VX"),
                    sprites.read_data_number(value2, "VY"))
                    value2.ay = sprites.read_data_number(value2, "Gravity")
game.on_update(on_on_update2)

