
'use strict';

const matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
const indexForX = []; // storing the coordinates of all X 
const indexForO = []; // storing the coordinates of all O
const visitedSquares = []; // to save the numbers of squares that already busy

function getSizeMatrix(matrix) 
{
    let size = matrix.length;
    return size;
}

function printMatrix(matrix)
{
    for (let i = 0; i < matrix.length; i++)
    {
        let row = "| ";  
        for (let j = 0; j < matrix[i].length; j++)
        {
            row += String(matrix[i][j]) + ' | ';  
        }
        console.log(row);  
    }
}

const pushToArray = function pushToArray(place, counter)
{
    let result = val(counter);
    switch (result)
    {
        case 'X': indexForX.push(place); break;
        case 'O': indexForO.push(place); break;
        default: 'try again';
    }
}

const val = function getValueByCounter(counter)
{
    if (counter % 2 == 0)
    {
        return 'X'
    };
    return 'O';
}

function writeTheLetter(coordinate, index)
{    
    for (let i = 0; i < matrix.length; i++)
    {
        for (let j = 0; j < matrix.length; j++)
        {
            if (coordinate == matrix[i][j])
            {
                matrix[i][j] = val(index);
            }
        }
    }
}

const indexesOfValue = function getIndexByValue(index) 
{
    const indexes = [];
    let size = getSizeMatrix(matrix);
    let i = Math.trunc((index - 1) / size);
    indexes.push(i);
    let j = (index - 1) % size;
    indexes.push(j);
    return indexes;
}

const checkSquare = function checkSquare(array = [], square)
{
    if (array == null) return false;
    for (let i = 0; i < array.length; i++)
    {
        if (array[i] == square)
        {
            return true;
        }
    }
    return false;
}

printMatrix(matrix);

for (let i = 0; i < matrix.length * matrix[0].length; i++) // main loop
{
    let step = prompt(`move for ${val(i)}: `);
    while (checkSquare(visitedSquares, step))
    {
        step = prompt(`try again, square has already used! move for ${val(i)}: `);
    }
    visitedSquares.push(step); // adding the number to visitedSquares
    pushToArray(step, i); // to store the indexes of Xs and Os
    
    console.log(`move for ${val(i)}: ${step}`);
    writeTheLetter(step, i);
    printMatrix(matrix);
    
    if (i > 3)
    {
        let isWinner = false;
        for (let i = 0; i < matrix.length; i++)
        {
            if (matrix[i][0] == val(i) && matrix[i][1] == val(i) && matrix[i][2] == val(i))
            {
                console.log(`${val(i)} the winner!`);
                isWinner  = true;
                break;
            }
                if (matrix[0][i] == val(i) && matrix[1][i] == val(i) && matrix[2][i] == val(i))
            {
                console.log(`${val(i)} the winner!`);
                isWinner  = true;
                break;
            }
        }
        if ((matrix[0][0] == val(i) && matrix[1][1] == val(i) && matrix[2][2] == val(i)) ||
            (matrix[0][2] == val(i) && matrix[1][1] == val(i) && matrix[2][0] == val(i)))
        {
            console.log(`${val(i)} the winner!`);
            isWinner = true;
        }
        if (isWinner) break;
    }
    if (i == 8)
    {
        console.log('THE DRAW');
    }
}