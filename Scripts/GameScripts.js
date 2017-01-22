frequency = 110;
frequencies = {
  110: 0,
  120: 1,
  130: 2,
  140: 3,
  150: 4,
  160: 5,
  170: 6,
  180: 7,
  190: 8,
  200: 9,
  210: 10
};
frequency_index = 0;
RenJS.varsManager.vars.level = 1;
RenJS.varsManager.vars.spy_okay = 0;
RenJS.varsManager.vars.infiltration_okay = 0;
RenJS.varsManager.vars.explosives_okay = 0;
RenJS.varsManager.vars.spy = true;
RenJS.varsManager.vars.infiltration = false;
RenJS.varsManager.vars.explosives = false;


levels = {
  1 : [
    {"text": "pip 1", "team": 1, "used": false},
    {"text": "pip 2", "team": 0, "used": false},
    {"text": "pip 3", "team": 1, "used": false},
    {"text": "pip 4", "team": 1, "used": false},
    {"text": "pip 5", "team": 0, "used": false},
    {"text": "pip 6", "team": 0, "used": false},
    {"text": "pip 7", "team": 1, "used": false},
    {"text": "pip 8", "team": 0, "used": false},
    {"text": "pip 9", "team": 1, "used": false},
    {"text": "pip 10", "team": 1, "used": false},
    {"text": "pip 11", "team": 0, "used": false},
    {"text": "pip 12", "team": 0, "used": false},
    {"text": "pip 13", "team": 0, "used": false}
  ]
}

function create_radio(){
    radio = game.add.sprite(674, 297, 'radio');
    frequency_display = game.add.text(190, 208, frequency, {
        font: "32px Arial",
        fill: "#c3ff00",
        align: "center"
    });
    frequency_text = game.add.text(54, 262, "", {
        font: "32px Arial",
        fill: "#c3ff00",
        align: "center"
    });
    btn_up = game.add.button(292, 198, 'btn_up', dial_up, this, 0, 0, 0);
    btn_down = game.add.button(100, 198, 'btn_down', dial_down, this, 0, 0, 0);
    btn_remove = game.add.button(538, 254, 'delete_btn', check_points_del, this, 0, 0, 0);
    radio.addChild(frequency_display);
    radio.addChild(frequency_text);
    radio.addChild(btn_up);
    radio.addChild(btn_down);
    radio.addChild(btn_remove);
    if (RenJS.varsManager.vars.spy){
        btn_spy = game.add.button(30, 30, 'spy_btn', check_points_spy, this, 0, 0, 0);
        radio.addChild(btn_spy);
    }
    if (RenJS.varsManager.vars.infiltration){
        btn_inf = game.add.button(164, 30, 'infiltration_btn', check_points_infiltration, this, 0, 0, 0);
        radio.addChild(btn_inf);
    }
    if (RenJS.varsManager.vars.explosives){
        btn_explosives = game.add.button(294, 30, 'explosives_btn', check_points_explosives, this, 0, 0, 0);
        radio.addChild(btn_explosives);
    }
}

function dial_up(){
    if (frequency < 210){
        frequency+= 10;
        frequency_display.setText(frequency);
        frequency_index = frequencies[frequency];
        var level = RenJS.varsManager.vars.level;
        if (!levels[level][frequency_index]["used"]){
          frequency_text.setText(levels[level][frequency_index]["text"]);
        } else {
          frequency_text.setText("");
        }
    }
}

function dial_down(){
    if (frequency > 110){
        frequency -= 10;
        frequency_index = frequencies[frequency];
        var level = RenJS.varsManager.vars.level;
        frequency_display.setText(frequency);
        if (!levels[level][frequency_index]["used"]){
          frequency_text.setText(levels[level][frequency_index]["text"]);
        } else {
          frequency_text.setText("");
        }
    }
}

function check_points_del(){
    frequency_item = frequencies[frequency_index];
    used = levels[level][frequency_index]["used"];
    var level = RenJS.varsManager.vars.level;
    if (!used){
      levels[level][frequency_index]["used"] = true;
      frequency_text.setText("");
    }
}

function check_points_spy(){
  frequency_item = frequencies[frequency_index];
  var level = RenJS.varsManager.vars.level;
  used = levels[level][frequency_index]["used"];
  team = levels[level][frequency_index]["team"];
  if (!used && team == 1){
    RenJS.varsManager.vars.spy_okay ++;
  }
  if (!used){
    levels[level][frequency_index]["used"] = true;
    frequency_text.setText("");
  }
}

function check_points_infiltration(){
  frequency_item = frequencies[frequency_index];
  used = levels[level][frequency_index]["used"];
  team = levels[level][frequency_index]["team"];
  var level = RenJS.varsManager.vars.level;
  if (!used && team == 2){
    RenJS.varsManager.vars.infiltration_okay ++;
  }
  if (!used){
    levels[level][frequency_index]["used"] = true;
    frequency_text.setText("");
  }
}

function check_points_explosives(){
  frequency_item = frequencies[frequency_index];
  used = levels[level][frequency_index]["used"];
  team = levels[level][frequency_index]["team"];
  var level = RenJS.varsManager.vars.level;
  if (!used && team == 3){
    RenJS.varsManager.vars.explosives_okay ++;
  }
  if (!used){
    levels[level][frequency_index]["used"] = true;
    frequency_text.setText("");
  }
}

function destroy_radio(){
    radio.destroy();
}

function add_spy(){
    spy = true;
}

function add_infiltration(){
    infiltration = true;
}

function add_explosives(){
    explosives = true;
}
