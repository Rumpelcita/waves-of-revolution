frequency = 110;
level = 0;
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
RenJS.varsManager.vars.spy_okay = 0;
RenJS.varsManager.vars.infiltration_okay = 0;
RenJS.varsManager.vars.explosives_okay = 0;
RenJS.varsManager.vars.spy = false;
RenJS.varsManager.vars.infiltration = true;
RenJS.varsManager.vars.explosives = false;


levels = {
  0 : [
    {"text": "Send to infiltration.", "team": 0, "used": false},
    {"text": "Nothing is up.", "team": 0, "used": false},
    {"text": "Nothing is up.", "team": 0, "used": false},
    {"text": "Nothing is up.", "team": 0, "used": false},
    {"text": "Nothing is up.", "team": 0, "used": false},
    {"text": "Nothing is up.", "team": 0, "used": false},
    {"text": "Nothing is up.", "team": 0, "used": false},
    {"text": "Send to infiltration.", "team": 0, "used": false},
    {"text": "Nothing is up.", "team": 0, "used": false},
    {"text": "Nothing is up.", "team": 0, "used": false},
    {"text": "Nothing is up.", "team": 0, "used": false},
    {"text": "Nothing is up.", "team": 0, "used": false},
    {"text": "Nothing is up.", "team": 0, "used": false}
  ],
  1 : [
    {"text": "Guard, please move two rooms north!", "team": 2, "used": false},
    {"text": "I'm getting sleepy.", "team": 2, "used": false},
    {"text": "I sure love pizza.", "team": 1, "used": false},
    {"text": "Do humans dream of electric sheep?", "team": 0, "used": false},
    {"text": "Guard, please move one room south!", "team": 2, "used": false},
    {"text": "I'm gonna make some Bacoooon Paaaancakes!", "team": 0, "used": false},
    {"text": "I'm taking a bathroom break.", "team": 2, "used": false},
    {"text": "I miss my spiders from Mars.", "team": 0, "used": false},
    {"text": "I hope I can skip the company's dinner", "team": 0, "used": false},
    {"text": "Ten more minutes until I'm done with my shift", "team": 2, "used": false},
    {"text": "Guard, please move two rooms west!", "team": 2, "used": false},
    {"text": "It sure is cloudy.", "team": 0, "used": false},
    {"text": "I hope we can harvest this planet soon.", "team": 0, "used": false}
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
        font: "16px Arial",
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
    if (!used){
      levels[level][frequency_index]["used"] = true;
      frequency_text.setText("");
    }
}

function check_points_spy(){
  frequency_item = frequencies[frequency_index];
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
  if (!used && team == 2){
    RenJS.varsManager.vars.infiltration_okay ++;
    frequency_text.setText("=)");
  } else {
    frequency_text.setText("=(");
  }
  if (!used){
    levels[level][frequency_index]["used"] = true;
  }
}

function check_points_explosives(){
  frequency_item = frequencies[frequency_index];
  used = levels[level][frequency_index]["used"];
  team = levels[level][frequency_index]["team"];
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
