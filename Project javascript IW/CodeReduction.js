var player1;
var player2;
var totalSeconds;
var timer;

function declaration()
{
    clearInterval(timer);
    player1 = {
        "playboard": [
            ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
            ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
            ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
            ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
            ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
            ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
            ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
            ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
            ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
            ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0"]
        ],
        "NonContent": ["table1"],
        "HTML": ["fullyhitPlayer", "", "<th class='hitPlayer'>X</th>", "<th class = 'fullyhitPlayer'>X</th>", "<th class='playerBoat'></th>"],
        "boats": {
            "1": [["3"]],   //this list contain index 0: the x position. 
            "2": [["3"]],   //index 1: the y position. 
            "3": [["3"]],   //index 2: 0 or 1 if 0 then boat is horizontal
            "4": [["3"]],   //         if 1 then boat is vertical. 
            "5": [["4"]],
            "6": [["4"]],
            "7": [["4"]],
            "8": [["5"]],
            "9": [["5"]],
            "10": [["7"]]
        },
        "FullHits": []
    };

    player2 = {
        "playboard": [
            ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
            ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
            ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
            ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
            ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
            ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
            ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
            ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
            ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
            ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0"]
        ],
        "NonContent": ["table2"],
        "HTML": ["fullyhitCPU", "onclick = 'cell_click_Handler(this)'", "<th class='hitCPU'>hit</th>", "<th class = 'fullyhitCPU'></th>", "<th onclick = 'cell_click_Handler(this)'></th>"],
        "boats": {
            "1": [["3"]],   //this list contain index 0: the x position. 
            "2": [["3"]],   //index 1: the y position. 
            "3": [["3"]],   //index 2: 0 or 1 if 0 then boat is horizontal
            "4": [["3"]],   //         if 1 then boat is vertical. 
            "5": [["4"]],
            "6": [["4"]],
            "7": [["4"]],
            "8": [["5"]],
            "9": [["5"]],
            "10": [["7"]]
        },
        "FullHits": []
    };


}

window.onload = function ()
{
    declaration();
    document.getElementById("button").innerHTML = `<p><span class="button" onclick="buttonClick()">Start Game</span></p>`;
    draw_playboards(player1, player2);
}

function buttonClick()
{
    declaration();
    totalSeconds = 0;
    timer = setInterval(tick, 1000);
    player1["playboard"] = place_randomBoats();
    player2["playboard"] = place_randomBoats();
    draw_playboards(player1, player2);
}

function tick()
{
    ++totalSeconds;
    document.getElementById("seconds").innerHTML = checkdoubleDigit(totalSeconds % 60);
    document.getElementById("minutes").innerHTML = checkdoubleDigit(parseInt(totalSeconds / 60));
}

function checkdoubleDigit(value)
{
    var String = "";
    String += value;
    if (String.length < 2)
    {
        return "0" + String;
    }
    return String;
}

function draw_playboards(player1, player2)
{
    let playboard1 = generate_playboard_HTML(player1);
    let playboard2 = generate_playboard_HTML(player2);
    document.getElementById("table_container1").innerHTML = playboard1;
    document.getElementById("table_container2").innerHTML = playboard2;

}

function generate_playboard_HTML(usedDict)
{
    let playboard_HTML = "";
    let row1_HTML = "<tr><th>/</th>";
    for (i = 1; i < 11; i++)
    {
        row1_HTML += "<th>" + i + "</th>";
    }
    row1_HTML += "</tr>";
    playboard_HTML += row1_HTML;
    for (i = 0; i < 10; i++)
    {
        let row_HTML = "<tr>";
        row_HTML += "<th>" + getAlfa(i) + "</th>";
        for (j = 0; j < 10; j++)
        {
            row_HTML += getBlockValue(usedDict["playboard"][i][j], usedDict);
        }
        row_HTML += "</tr>"
        playboard_HTML += row_HTML;
    }
    return `<table class = ${usedDict["NonContent"][0]} > ${playboard_HTML}</table>`

}

function getBlockValue(value, player)
{
    if (player["FullHits"].length == 10)
    {
        console.log("shit gast");
        if (value == "0" || value == "OC")
        {
            return "<th></th>";
        }
        else
        {
            if (value !== "No hit")
            {
                return `<th class = ${player["HTML"][0]}></th>`;
                //["fullyhitPlayer"]
                //["fullyhitCPU"]
            }
            return "<th>X</th>";
        }
    }
    else 
    {
        if (value == "0" || value == "OC")
        {
            return `<th ${player["HTML"][1]}></th>`;
            //[""]
            //["onclick = 'cell_click_Handler(this)'"]
        }
        else
        {
            if (value == "hit")
            {
                return player["HTML"][2];
                //["<th class='hitPlayer'>X</th>"]
                //["<th class='hitCPU'>hit</th>"]
            }
            else if (value == "1h" ||
                value == "2h" ||
                value == "3h" ||
                value == "4h" ||
                value == "5h" ||
                value == "6h" ||
                value == "7h" ||
                value == "8h" ||
                value == "9h" ||
                value == "10h")
            {
                return player["HTML"][3];
                //["<th class = 'fullyhitPlayer'>X</th>"]
                //["<th class = 'fullyhitCPU'></th>"]
            }
            else if (value == "No hit")
            {
                return "<th>X</th>";
            }
            return player["HTML"][4];
            //["<th class='playerBoat'></th>"]
            //["<th onclick = 'cell_click_Handler(this)'></th>"]
        }
    }
}

function cell_click_Handler(event)
{
    //player's move
    let col = event.cellIndex - 1; //registers what collumn has been touched
    let row = event.parentNode.rowIndex - 1; //registers what row  has been touched 
    let boat = player2["playboard"][row][col];
    place_hits(boat, player2, row, col);

    //random Selection by cpu.
    let used = { "0": [], "1": [], "2": [], "3": [], "4": [], "5": [], "6": [], "7": [], "8": [], "9": [] };
    row = randomInteger();
    col = randomInteger();
    while (used[String(row)].includes(col))
    {
        while (used[String(row)].length == 10)
        {
            row = randomInteger();
        }
        col = randomInteger();
    }
    boat = player1["playboard"][row][col];
    place_hits(boat, player1, row, col);
}

function place_hits(boat, player, row, col)
{
    if (boat !== "0" && boat !== "OC")
    {
        player["boats"][boat].push([row, col]);
        player["playboard"][row][col] = "hit";
        let lengthBoat = player["boats"][boat].length;
        let maxLength = parseInt(player["boats"][boat][0]); // player{"boats": {"1": [["3"]]}} maxLength = 3

        if (lengthBoat == maxLength)
        {
            for (i = 1; i < lengthBoat; i++)
            {
                let row = player["boats"][boat][i][0];
                let col = player["boats"][boat][i][1];
                player["playboard"][row][col] = boat + "h";
            }
            player["FullHits"].push("1");
        }
    }
    else
    { player["playboard"][row][col] = "No hit"; } //wanneer geen geraakt

    if (player["FullHits"].length == 10)
    {
        draw_playboards(player1, player2);
        setTimeout(win, 200);
    } //wanneer ze allemaal volledig zijn geraakt. 

    draw_playboards(player1, player2);

}

function place_randomBoats(player)
{
    let correct = true;
    let playboard = [
        ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
        ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
        ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
        ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
        ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
        ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
        ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
        ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
        ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
        ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0"]
    ];
    playboard = placeBoat(6, playboard, "10");
    playboard = placeBoat(4, playboard, "9");
    playboard = placeBoat(4, playboard, "8");
    playboard = placeBoat(3, playboard, "7");
    playboard = placeBoat(3, playboard, "6");
    playboard = placeBoat(3, playboard, "5");
    playboard = placeBoat(2, playboard, "4");
    playboard = placeBoat(2, playboard, "3");
    playboard = placeBoat(2, playboard, "2");
    playboard = placeBoat(2, playboard, "1");

    correct = checkplayboard(playboard);
    if (correct)
    {
        return playboard;
    }
    else
    {
        return place_randomBoats();
    }
}

function checkplayboard(playboard)
{
    //Checks if current playboard is correct
    let boats = { "1": 0, "2": 0, "3": 0, "4": 0, "5": 0, "6": 0, "7": 0, "8": 0, "9": 0, "10": 0 };
    for (row = 0; row < 10; row++)
    {
        for (col = 0; col < 10; col++)
        {
            let boat = playboard[row][col];
            if (boat !== "0" && boat !== "OC")
            {
                boats[boat]++;
            }
        }
    }
    if (boats["1"] == 2 && boats["2"] == 2 && boats["3"] == 2 && boats["4"] == 2 && boats["5"] == 3 && boats["6"] == 3 && boats["7"] == 3 && boats["8"] == 4 && boats["9"] == 4 && boats["10"] == 6)
    {
        return true;
    }
    return false;

}

function placeBoat(boatSize, playboard, nameBoat)
{
    let horizontal = randomBoolean(); let row; let col;
    let errorCounter = 0;
    let bool = false;
    let error = false;

    while (bool == false)
    {
        /* If the random position is not valid then there will be 
            new random position generated until there is a valid one */
        row = randomInteger();
        col = randomInteger();
        horizontal = randomBoolean();

        if (horizontal)
        {
            bool = (playboard[row][col] == "0") && ((col + boatSize) < 10); //if !== "0" then bool = false. 
            bool = check_areaAround(playboard, row, col, boatSize, bool, horizontal);

        }
        else
        {
            bool = (playboard[row][col] == "0") && ((row + boatSize) < 10); //if !== "0" then bool = fals
            bool = check_areaAround(playboard, row, col, boatSize, bool, horizontal);
        }
        errorCounter++;
        if (errorCounter > 100)
        {
            error = true;
            bool = true;

        }
    }
    if (error)
    {
        return playboard;
    }

    if (horizontal)
    {
        changeValuesHorizontal(playboard, row, col, boatSize, nameBoat);
        if (row !== 0)
        {
            changeValuesHorizontal(playboard, (row - 1), col, boatSize, "OC");
        }
        if (row !== 9)
        {
            changeValuesHorizontal(playboard, (row + 1), col, boatSize, "OC");
        }
    }
    else
    {
        changeValuesVertical(playboard, row, col, boatSize, nameBoat);
        if (col !== 0)
        {
            changeValuesVertical(playboard, (row), col - 1, boatSize, "OC");
        }
        if (col !== 9)
        {
            changeValuesVertical(playboard, row, col + 1, boatSize, "OC");
        }
    }
    return playboard;
}

function check_areaAround(playboard, row, column, boatSize, bool, horizontal)
{
    //I can Reduce this
    if (bool)
    {
        if (horizontal)
        {
            for (i = column; i < column + boatSize; i++)
            {
                bool = (playboard[row][i] == "0");
                if (bool == false) { return false; }
            }
        }
        if (horizontal == false)
        {
            for (i = row; i < row + boatSize; i++)
            {
                bool = (playboard[i][column] == "0");
                if (bool == false) { return false; }
            }
        }
        return true;
    }
    else { return false; }
}
function changeValuesVertical(playboard, row, col, boatSize, String)
{
    for (i = row; i < (row + boatSize); i++)
    {
        playboard[i][col] = String;
    }
    if ((row + boatSize) < 10)
    {
        playboard[row + boatSize][col] = "OC";
    }
    if (row !== 0)
    {
        playboard[row - 1][col] = "OC";
    }
    return playboard;
}

function changeValuesHorizontal(playboard, row, col, boatSize, String)
{
    for (i = col; i < (col + boatSize); i++)
    {
        playboard[row][i] = String;
    }
    if ((col + boatSize) < 10)
    {
        playboard[row][col + boatSize] = "OC";
    }
    if (col !== 0)
    {
        playboard[row][col - 1] = "OC";
    }
    return playboard;
}

function randomBoolean()
{
    let rand = Math.floor(Math.random() * 2);
    return rand !== 0;
}

function randomInteger()
{
    let rand;
    rand = Math.round(Math.random() * 9);
    return rand;

}

function getAlfa(x)
{
    let begin = 65; //chr element for a is 96 so if getAlfa(0) then a will be returned 
    let alfa = String.fromCharCode(begin + x)
    return alfa;
}
function win()
{
    window.alert("You've won, well played :)");
    clearInterval(timer);
}