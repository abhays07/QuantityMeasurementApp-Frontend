// src/js/dashboard.js

// 1. Data Definitions with Base Units
// Length Base: Metres | Temp Base: Celsius | Volume Base: Litres | Weight Base: Kilograms
const unitData = {
    length: {
        units: ["Metres", "Centimetres", "Inches", "Feet"],
        rates: { "Metres": 1, "Centimetres": 0.01, "Inches": 0.0254, "Feet": 0.3048 }
    },
    temperature: {
        units: ["Celsius", "Fahrenheit", "Kelvin"]
        // Temperature uses formulas, not simple rates
    },
    volume: {
        units: ["Litres", "Millilitres", "Gallons"],
        rates: { "Litres": 1, "Millilitres": 0.001, "Gallons": 3.78541 }
    },
    weight: {
        units: ["Kilograms", "Grams", "Pounds", "Ounces"],
        rates: { "Kilograms": 1, "Grams": 0.001, "Pounds": 0.453592, "Ounces": 0.0283495 }
    }
};

let currentCategory = 'length';

// 2. Initialize Page
document.addEventListener('DOMContentLoaded', () => {
    // FIX: Pull the 'currentUser' who actually logged in
    const user = JSON.parse(localStorage.getItem('currentUser')); 
    
    if (!localStorage.getItem('isLoggedIn') || !user) {
        window.location.href = "login.html";
        return;
    }
    
    // Display the correct name
    document.getElementById('user-display').innerText = `Hi, ${user.name}`;
    
    updateUnitDropdowns('length');
    setupEventListeners();
});

// 3. Event Listeners
function setupEventListeners() {
    const fromInput = document.getElementById('from-value');
    const fromUnit = document.getElementById('from-unit');
    const toUnit = document.getElementById('to-unit');

    // Calculate whenever input or units change
    [fromInput, fromUnit, toUnit].forEach(el => {
        el.addEventListener('input', performConversion);
    });

    // Handle Category Card Clicks
    const cards = document.querySelectorAll('.type-card');
    cards.forEach(card => {
        card.addEventListener('click', () => {
            cards.forEach(c => c.classList.remove('active'));
            card.classList.add('active');
            
            currentCategory = card.getAttribute('data-type');
            updateUnitDropdowns(currentCategory);
            performConversion();
        });
    });
}

// 4. The Conversion Engine
function performConversion() {
    const val = parseFloat(document.getElementById('from-value').value);
    const from = document.getElementById('from-unit').value;
    const to = document.getElementById('to-unit').value;
    const resultField = document.getElementById('to-value');

    if (isNaN(val)) {
        resultField.value = "";
        return;
    }

    let result;

    if (currentCategory === 'temperature') {
        result = convertTemperature(val, from, to);
    } else {
        // Linear conversion: (Value * FromRate) / ToRate
        const category = unitData[currentCategory];
        const baseValue = val * category.rates[from];
        result = baseValue / category.rates[to];
    }

    resultField.value = result.toFixed(2);
}

// 5. Special Temperature Logic (Mirroring your Backend logic)
function convertTemperature(value, from, to) {
    if (from === to) return value;
    
    let celsius;
    // Convert to Base (Celsius)
    if (from === "Celsius") celsius = value;
    else if (from === "Fahrenheit") celsius = (value - 32) * 5 / 9;
    else if (from === "Kelvin") celsius = value - 273.15;

    // Convert from Base to Target
    if (to === "Celsius") return celsius;
    else if (to === "Fahrenheit") return (celsius * 9 / 5) + 32;
    else if (to === "Kelvin") return celsius + 273.15;
}

function updateUnitDropdowns(type) {
    const fromSelect = document.getElementById('from-unit');
    const toSelect = document.getElementById('to-unit');
    const units = unitData[type].units;

    fromSelect.innerHTML = units.map(u => `<option value="${u}">${u}</option>`).join('');
    toSelect.innerHTML = units.map(u => `<option value="${u}">${u}</option>`).join('');
}

function logout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('currentUser'); // Clean up
    window.location.href = "login.html";
}