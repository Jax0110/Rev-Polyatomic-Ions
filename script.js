function generateRandomArray(length) {
    // Create an array with numbers from 0 to length-1
    let array = [];
    for (let i = 0; i < length; i++) {
        array.push(i);
    }

    // Shuffle the array using the Fisher-Yates algorithm
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1)); // Random index
        [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }

    return array;
}



document.addEventListener('DOMContentLoaded', () => {
    const formulas = ["Ammonium", "Acetate", "Cyanide", "Hydroxide", "Hypochlorite", "Chlorite", "Chlorate", "Perchlorate", "Carbonate", "Bicarbonate", "Dichromate", "Chromate", "Permanganate", "Nitrite", "Nitrate", "Phosphate", "Hydrogen Phosphate", "Dihydrogen Phosphate", "Sulfite", "Sulfate", "Bisulfite", "Bisulfate"];
    const ions = ["NH4+", "C2H3O2-", "CN-", "OH-", "ClO-", "ClO2-", "ClO3-", "ClO4-", "CO3^2-", "HCO3-", "Cr2O7^2-", "CrO4^2-", "MnO4-", "NO2-", "NO3-", "PO4^3-", "HPO4^2-", "H2PO4-", "SO3^2-", "SO4^2-", "HSO3-", "HSO4-"];

    let score = 0;
    let incorrect = "";
    let variable = "";

    function waitForClick() {
        return new Promise(resolve => {
            const button = document.getElementById('inputButton');
            button.addEventListener('click', function() {
                resolve();
            });
            document.addEventListener('keyup', function(event) {
                if (event.key === 'Enter') {
                    resolve('Enter key pressed');
                }
            });
        });
    }

    async function runQuiz(randy) {

        for (let i = 0; i < randy.length; i++) {
            variable = ions[randy[i]];
            let variableTextElement = document.getElementById("question");
            variableTextElement.innerHTML = variable + " :";

            // Wait for the button to be clicked before continuing
            await waitForClick();

            let inputElement = document.getElementById('inputText');
            let inputValue = inputElement.value;

            inputElement.readOnly = true;

            if (inputValue === formulas[randy[i]]) {
                score++;
                inputElement.style.color = 'green';
            }
            else {
                incorrect += (variable + " is " + formulas[randy[i]] + "<br>");
                inputElement.style.color = 'red';
                inputElement.value = formulas[randy[i]];
            }


            await waitForClick();

            inputElement.style.color = 'white';
            inputElement.readOnly = false;
            inputElement.value = "";

            console.log('Button clicked for:', variable);
            console.log('Inputed', inputValue);
        }

        let scoreElement = document.getElementById("description");
        let inputElement = document.getElementById('inputText');
        let variableTextElement = document.getElementById("question");

        scoreElement.innerHTML = "You got " + score + " out of " + randy.length + " correct. \n";
        variableTextElement.innerHTML = incorrect;

        let originalDisplay = inputElement.style.display;

        inputElement.style.display = 'none';

        await waitForClick();

        inputElement.style.display = originalDisplay;;

        runQuiz(generateRandomArray(ions.length));
    }

    runQuiz(generateRandomArray(ions.length));


});
