var table1 = {
    "A": ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
    "B": ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
    "C": ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
    "D": ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
    "E": ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
    "F": ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
    "G": ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
    "H": ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
    "I": ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
    "J": ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
    "NonContent": ["table1"]
}; //If cell has value 0 it doesn't have a boat and hasn't been hit
var table2 = {
    "A": ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
    "B": ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
    "C": ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
    "D": ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
    "E": ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
    "F": ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
    "G": ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
    "H": ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
    "I": ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
    "J": ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
    "NonContent": ["table2"]
};



window.onload = function ()
{
    table1 = place_randomBoats(table1);
    console.log(table1);
    draw_tables(table1, table2);

}

function draw_tables(tableOne, tableTwo)
{
    let table1 = generate_table_html(tableOne);
    let table2 = generate_table_html(tableTwo);
    document.getElementById("table_container1").innerHTML = table1;
    document.getElementById("table_container2").innerHTML = table2;

}

function generate_table_html(usetable)
{
    /* this is the basic idea of next code but there it's more expanded 
    let tabSle_innerHTML = "";
    for (i = 0; i < 11; i++)
    {
        let row = "<tr>";
        for (j = 0; j < 11; j++) 
        {
            row += "<th>" + j + "</th>";
        }
        row += "</tr>";
        table_innerHTML += row;
    }
    return `<table>${table_innerHTML}</table>`
    */
    if (usetable["NonContent"][0] == "table1") //Dit is de speler zijn spelbord
    {
        let table_innerHTML = "";
        let row1_HTML = "<tr><th>/</th>";
        for (i = 1; i < 11; i++)
        {
            row1_HTML += "<th>" + i + "</th>";

        }
        row1_HTML += "</tr>";
        table_innerHTML += row1_HTML;
        for (i = 1; i < 10; i++)
        {
            let row_HTML = "<tr>";
            row_HTML += "<th>" + getAlfa(i - 1) + "</th>";
            for (j = 0; j < 10; j++)
            {
                row_HTML += getBlockValue(usetable[getAlfa(i - 1)][j]);
            }
            row_HTML += "</tr>";
            table_innerHTML += row_HTML;
        }
        return `<table class="table1"${table_innerHTML}</table>`;
    }
}

function getBlockValue(value)
{
    if (value == "0")
    {
        return "<th onclick ='cell_click_Handler(this)'></th>";
    } else
    {
        return "<th>" + value + "</th>";
    }
}

function cell_click_Handler(event)
{
    let Nvalue = event.cellIndex; //registers wich cell has been touched
    let Avalue = event.parentNode.rowIndex; // Nvalue = Numeric value  Avalue = alpha value
}




function place_randomBoats(table)
{

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
    ]
    let B1, B2, B3, B4 = 2; //Two cells with the same b number will be on the same boat. 
    let B5, B6, B7 = 3;
    let B8, B9 = 4;
    let B10 = 6;

    playboard = placeBoat(B10, playboard, "B10");
    payboard = placeBoat(B9, playboard, "B9");
    playboard = placeBoat(B8, playboard, "B8");

    for (i = 0; i < 10; i++)
    {
        console.log(playboard[i]);

    }
    for (i = 1; i < 11; i++)
    {
        table[getAlfa(i - 1)] = playboard[i - 1];

    }
    return table;
}

function placeBoat(BoatSize, Playboard, nameboat)
{
    let horizontal = true;
    let bool = true;
    let row = randomInteger();
    let column = randomInteger();


    if (horizontal)
    {

        if ((column + BoatSize) > 9 && (Playboard[row][column] !== 0))
        {
            bool = false;
        }
        while (bool == false)
        {
            row = randomInteger();
            column = randomInteger();
            bool = check_AreaAroundHorizontal(Playboard, row, column, BoatSize);
        }

        for (i = column; i < column + BoatSize; i++)
        {
            Playboard[row][i] = nameboat;
        }
        return Playboard;

    }
}

function check_AreaAroundHorizontal(playboard, row, column, BoatSize)
{
    //Return false or true (if true then the boat can be placed on the giving coordinates if false then not)
    if ((column + BoatSize) > 10)
    {
        return false;
    }
    for (i = column; i < (column + BoatSize); i++)
    {
       if ((row !== 9) && (row !== 0) &&
             (playboard[row][i] !== "0" ) ||
            (playboard[row - 1][i] !== "0") ||
            (playboard[row + 1][i] !== "0") ||
            (playboard[row][i - 1] !== "0") ||
            (playboard[row][i + 1] !== "0") ||
            (playboard[row - 1][i + 1] !== "0") ||
            (playboard[row - 1][i - 1] !== "0") ||
            (playboard[row + 1][i + 1] !== "0") ||
            (playboard[row + 1][i - 1] !== "0"))
        {
            return false;
        }
        else if ((row !== 9) &&
             (playboard[row][i] !== "0" ) ||        
            (playboard[row + 1][i] !== "0") ||
            (playboard[row][i - 1] !== "0") ||
            (playboard[row][i + 1] !== "0") ||
            (playboard[row + 1][i + 1] !== "0") ||
            (playboard[row + 1][i - 1] !== "0"))
        {
            return false;
        }
        else if ((row !== 0) &&
             (playboard[row][i] !== "0" ) ||
            (playboard[row - 1][i] !== "0") ||
            (playboard[row][i - 1] !== "0") ||
            (playboard[row][i + 1] !== "0") ||
            (playboard[row - 1][i + 1] !== "0") ||
            (playboard[row - 1][i - 1] !== "0") 
            )
        {
            return false;
        }
        return true;
    }

}
function randomBoolean()
{
    let rand = Math.floor(Math.random() * 2);
    if (rand == 0)
    {
        return false;
    } else
    {
        return true;
    }
}
function randomInteger()
{
    let rand;
    rand = Math.round(Math.random() * 9);
    console.log(rand);
    return rand;

}
function getAlfa(x)
{
    let begin = 65; //chr element for a is 96 so if getAlfa(0) then a will be returned 
    let alfa = String.fromCharCode(begin + x)
    return alfa;
}