var player1 = {
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
    "boats": {
        "B1": [["2"]],   //this list contain index 0: the x position. 
        "B2": [["2"]],   //index 1: the y position. 
        "B3": [["2"]],   //index 2: 0 or 1 if 0 then boat is horizontal
        "B4": [["2"]],   //         if 1 then boat is vertical. 
        "B5": [["3"]],
        "B6": [["3"]],
        "B7": [["3"]],
        "B8": [["4"]],
        "B9": [["4"]],
        "B10": [["6"]]
    },
    "FullHits": []
};

var player2 = {
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
    "boats": {
        "B1": [["2"]],   //this list contain index 0: the x position. 
        "B2": [["2"]],   //index 1: the y position. 
        "B3": [["2"]],   //index 2: 0 or 1 if 0 then boat is horizontal
        "B4": [["2"]],   //         if 1 then boat is vertical. 
        "B5": [["3"]],
        "B6": [["3"]],
        "B7": [["3"]],
        "B8": [["4"]],
        "B9": [["4"]],
        "B10": [["6"]]
    },
    "FullHits": []
};

window.onload = function ()
{
    draw_playboards(player1, player2);
}
function buttonClick()
{
    player1["playboard"] = place_randomBoats();
    console.log(player1["playboard"]);
    player2["playboard"] = place_randomBoats();
    console.log(player2["playboard"]);
    draw_playboards(player1, player2);
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
    if (usedDict["NonContent"][0] == "table1")
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
                row_HTML += getBlockValueP1(usedDict["playboard"][i][j]);
            }
            row_HTML += "</tr>"
            playboard_HTML += row_HTML;
        }
        return `<table class = "table1"> ${playboard_HTML}</table>`
    }
    if (usedDict["NonContent"][0] == "table2")
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
                row_HTML += getBlockValueCPU(usedDict["playboard"][i][j]);
            }
            row_HTML += "</tr>"
            playboard_HTML += row_HTML;
        }
        return `<table class = "table2"> ${playboard_HTML}</table>`
    }
}

function getBlockValueP1(value)
{
    if (player1["FullHits"].length == 10)
    {
        if (value == "0" || value == "OC")
        {
            return "<th></th>";
        }
        else
        {
            if (value !== "No hit")
            {
                if (value == "B10h")
                {
                    return "<th class = 'fullyhitPlayer'></th>";
                }
                return "<th class = 'fullyhitPlayer'></th>";
            }
            return "<th>X</th>";
        }
    }
    else 
    {

        if (value == "0" || value == "OC")
        {
            return "<th></th>";
        }
        else
        {
            if (value == "hit")
            {
                return "<th class='hitPlayer'>X</th>";
            }
            else if (value == "B1h" ||
                value == "B2h" ||
                value == "B3h" ||
                value == "B4h" ||
                value == "B5h" ||
                value == "B6h" ||
                value == "B7h" ||
                value == "B8h" ||
                value == "B9h" ||
                value == "B10h")
            {
                if (value == "B10h")
                {
                    return "<th class = 'fullyhitPlayer'>X</th>";
                }
                return "<th class = 'fullyhitPlayer'>X</th>";
            }
            else if (value == "No hit")
            {
                return "<th>X</th>";
            }
            return "<th class='playerBoat'></th>";
        }
    }
}

function getBlockValueCPU(value)
{
    //I can reduce this. 

    if (player2["FullHits"].length == 10)
    {
        if (value == "0" || value == "OC")
        {
            return "<th></th>";
        }
        else
        {
            if (value !== "No hit")
            {
                if (value == "B10h")
                {
                    return "<th class = 'fullyhitCPU'></th>";
                }
                return "<th class = 'fullyhitCPU'></th>";
            }
            return "<th></th>";
        }
    }
    else 
    {

        if (value == "0" || value == "OC")
        {
            return "<th onclick = 'cell_click_Handler(this)'></th>";
        }
        else
        {
            if (value == "hit")
            {
                return "<th class='hitCPU'>hit</th>";
            }
            else if (value == "B1h" ||
                value == "B2h" ||
                value == "B3h" ||
                value == "B4h" ||
                value == "B5h" ||
                value == "B6h" ||
                value == "B7h" ||
                value == "B8h" ||
                value == "B9h" ||
                value == "B10h")
            {
                if (value == "B10h")
                {
                    return "<th class = 'fullyhitCPU'></th>";
                }
                return "<th class = 'fullyhitCPU'></th>";
            }
            else if (value == "No hit")
            {
                return "<th>X</th>";
            }
            return "<th onclick = 'cell_click_Handler(this)'></th>";
        }
    }
}

function cell_click_Handler(event)
{
    let col = event.cellIndex - 1; //registers wich cell has been touched
    let row = event.parentNode.rowIndex - 1; // Nvalue = Numeric value  Avalue = alpha value
    let boat = player2["playboard"][row][col];


    //player's move
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

        if (boat == "B1" || boat == "B2" || boat == "B3" || boat == "B4")
        {
            if (lengthBoat == 3)
            {
                for (i = 1; i < lengthBoat; i++)
                {
                    let row = player["boats"][boat][i][0];
                    let col = player["boats"][boat][i][1];
                    player["playboard"][row][col] = boat + "h";
                }
                player["FullHits"].push("1")
            }
        }
        if (boat == "B5" || boat == "B6" || boat == "B7")
        {
            if (lengthBoat == 4)
            {
                for (i = 1; i < lengthBoat; i++)
                {
                    let row = player["boats"][boat][i][0];
                    let col = player["boats"][boat][i][1];
                    player["playboard"][row][col] = boat + "h";
                }
                player["FullHits"].push("1")
            }
        }
        if (boat == "B8" || boat == "B9")
        {
            if (lengthBoat == 5)
            {
                for (i = 1; i < lengthBoat; i++)
                {
                    let row = player["boats"][boat][i][0];
                    let col = player["boats"][boat][i][1];
                    player["playboard"][row][col] = boat + "h";
                }
                player["FullHits"].push("1")
            }
        }
        if (boat == "B10")
        {
            if (lengthBoat == 7)
            {
                for (i = 1; i < lengthBoat; i++)
                {
                    let row = player["boats"][boat][i][0];
                    let col = player["boats"][boat][i][1];
                    player["playboard"][row][col] = boat + "h";
                }
                player["FullHits"].push("1")
            }
        }
    }
    else 
    {
        player["playboard"][row][col] = "No hit";
    }

    if (player["FullHits"].length == 10)
    {
        window.alert("You've won, well played :)");
    }
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
    //Two cells with the same b number will be on the same boat. 


    playboard = placeBoat(6, playboard, "B10");
    playboard = placeBoat(4, playboard, "B9");
    playboard = placeBoat(4, playboard, "B8");
    playboard = placeBoat(3, playboard, "B7");
    playboard = placeBoat(3, playboard, "B6");
    playboard = placeBoat(3, playboard, "B5");
    playboard = placeBoat(2, playboard, "B4");
    playboard = placeBoat(2, playboard, "B3");
    playboard = placeBoat(2, playboard, "B2");
    playboard = placeBoat(2, playboard, "B1");


    correct = checkplayboard(playboard);
    if (correct)
    {
        console.log(playboard);
        return playboard;
    }
    else
    {
        return place_randomBoats();
    }




}

function checkplayboard(playboard)
{
    let boats = {
        "B1": 0,
        "B2": 0,
        "B3": 0,
        "B4": 0,
        "B5": 0,
        "B6": 0,
        "B7": 0,
        "B8": 0,
        "B9": 0,
        "B10": 0
    };

    for (row = 0; row < 10; row++)
    {
        for (col = 0; col < 10; col++)
        {
            let boat = playboard[row][col];

            if (boat !== "0" && boat !== "OC")
            {
                boats[boat] += 1;
            }
        }
    }
    console.log(boats);
    if (boats["B1"] == 2 &&
        boats["B2"] == 2 &&
        boats["B3"] == 2 &&
        boats["B4"] == 2 &&
        boats["B5"] == 3 &&
        boats["B6"] == 3 &&
        boats["B7"] == 3 &&
        boats["B8"] == 4 &&
        boats["B9"] == 4 &&
        boats["B10"] == 6
    )
    {

        return true;
    }
    return false;

}

function placeBoat(boatSize, playboard, nameBoat)
{
    let horizontal = randomBoolean();
    let row = randomInteger();
    let col = randomInteger();
    let bool = true;
    let errorCounter = 0;

    if (horizontal)
    {
        /* this checks if the boat begin position is valid
            and that the boat will not stretch out the playboard */

        bool = (playboard[row][col] == "0"); //if !== "0" then bool = false. 
        if (bool) 
        {
            bool = ((col + boatSize) < 10); // if col+ boatSize >= 10 then bool = false. 
        }
    }
    else
    {
        bool = (playboard[row][col] == "0"); //if !== "0" then bool = false. 
        if (bool) 
        {
            bool = ((row + boatSize) < 10); // if col + boatSize >= 10 then bool = false. 
        }
    }

    while (bool == false)
    {

        /* If the random position is not valid then there will be 
            new random posistions generated untill there is a valid one */
        row = randomInteger();
        col = randomInteger();
        horizontal = randomBoolean();
        if (horizontal)
        {
            bool = check_areaAroundHorizontal(playboard, row, col, boatSize);
        }
        else
        {
            bool = check_areaAroundVertical(playboard, row, col, boatSize);
        }
        errorCounter++;
        if (errorCounter > 100)
        {
            bool = true;
            boatSize = 1;

        }


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

function check_areaAroundVertical(playboard, row, column, boatSize)
{
    //I can Reduce this
    bool = (playboard[row][column] == "0") && ((row + boatSize) < 10);; //if !== "0" then bool = false. 
    if (bool)
    {
        for (i = row; i < row + boatSize; i++)
        {
            bool = (playboard[i][column] == "0");
            if (bool == false)
            {
                return false;
            }
        }
        return true;
    }
    else { return false; }
}

function check_areaAroundHorizontal(playboard, row, column, boatSize)
{
    //I Can reduce this
    bool = (playboard[row][column] == "0") && ((column + boatSize) < 10);; //if !== "0" then bool = false. 
    if (bool)
    {
        for (i = column; i < column + boatSize; i++)
        {
            bool = (playboard[row][i] == "0");
            if (bool == false)
            {
                return false;
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