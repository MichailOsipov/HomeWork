// const data = {
//     independentEnums: [
//         {
//             name: 'trafficJams',
//             values: ['have', 'none']
//         },
//         {
//             name: 'driverExperience',
//             values: ['beginner', 'average', 'advanced']
//         },
//         {
//             name: 'carState',
//             values: ['broken', 'good']
//         }
//     ],
//     dependentEnums: [
//         {
//             name: 'comeInTime',
//             values: ['yes', 'no']
//         }
//     ],
//     rows: [
//         {
//             trafficJams: 'have',
//             driverExperience: 'beginner',
//             carState: 'broken',
//             comeInTime: 'no'
//         },
//         {
//             trafficJams: 'none',
//             driverExperience: 'average',
//             carState: 'broken',
//             comeInTime: 'yes'
//         },
//         {
//             trafficJams: 'have',
//             driverExperience: 'beginner',
//             carState: 'good',
//             comeInTime: 'no'
//         },
//         {
//             trafficJams: 'have',
//             driverExperience: 'average',
//             carState: 'good',
//             comeInTime: 'no'
//         },
//         {
//             trafficJams: 'none',
//             driverExperience: 'advanced',
//             carState: 'broken',
//             comeInTime: 'yes'
//         },
//         {
//             trafficJams: 'none',
//             driverExperience: 'beginner',
//             carState: 'good',
//             comeInTime: 'yes'
//         },
//         {
//             trafficJams: 'have',
//             driverExperience: 'advanced',
//             carState: 'good',
//             comeInTime: 'yes'
//         }
//     ]
// };

const data = {
    independentEnums: [
        {
            name: 'Наблюдение',
            values: ['Солнце', 'Облачность', 'Дождь']
        },
        {
            name: 'Температура',
            values: ['Жарко', 'Норма', 'Холодно']
        },
        {
            name: 'Влажность',
            values: ['Высокая', 'Нормальная']
        },
        {
            name: 'Ветер',
            values: ['Есть', 'Нет']
        }
    ],
    dependentEnums: [
        {
            name: 'Игра',
            values: ['Состоится', 'Не состоится']
        }
    ],
    rows: [
        {
            Наблюдение: 'Солнце',
            Температура: 'Жарко',
            Влажность: 'Высокая',
            Ветер: 'Нет',
            Игра: 'Не состоится'
        },
        {
            Наблюдение: 'Солнце',
            Температура: 'Жарко',
            Влажность: 'Высокая',
            Ветер: 'Есть',
            Игра: 'Не состоится'
        },
        {
            Наблюдение: 'Облачность',
            Температура: 'Жарко',
            Влажность: 'Высокая',
            Ветер: 'Нет',
            Игра: 'Состоится'
        },
        {
            Наблюдение: 'Дождь',
            Температура: 'Норма',
            Влажность: 'Высокая',
            Ветер: 'Нет',
            Игра: 'Состоится'
        },
        {
            Наблюдение: 'Дождь',
            Температура: 'Холодно',
            Влажность: 'Нормальная',
            Ветер: 'Нет',
            Игра: 'Состоится'
        },
        {
            Наблюдение: 'Дождь',
            Температура: 'Холодно',
            Влажность: 'Нормальная',
            Ветер: 'Есть',
            Игра: 'Не состоится'
        },
        {
            Наблюдение: 'Облачность',
            Температура: 'Холодно',
            Влажность: 'Нормальная',
            Ветер: 'Есть',
            Игра: 'Состоится'
        },
        {
            Наблюдение: 'Солнце',
            Температура: 'Норма',
            Влажность: 'Высокая',
            Ветер: 'Нет',
            Игра: 'Не состоится'
        },
        {
            Наблюдение: 'Солнце',
            Температура: 'Холодно',
            Влажность: 'Нормальная',
            Ветер: 'Нет',
            Игра: 'Состоится'
        },
        {
            Наблюдение: 'Дождь',
            Температура: 'Норма',
            Влажность: 'Нормальная',
            Ветер: 'Нет',
            Игра: 'Состоится'
        },
        {
            Наблюдение: 'Солнце',
            Температура: 'Норма',
            Влажность: 'Нормальная',
            Ветер: 'Есть',
            Игра: 'Состоится'
        },
        {
            Наблюдение: 'Облачность',
            Температура: 'Норма',
            Влажность: 'Высокая',
            Ветер: 'Есть',
            Игра: 'Состоится'
        },
        {
            Наблюдение: 'Облачность',
            Температура: 'Жарко',
            Влажность: 'Нормальная',
            Ветер: 'Нет',
            Игра: 'Состоится'
        },
        {
            Наблюдение: 'Дождь',
            Температура: 'Норма',
            Влажность: 'Высокая',
            Ветер: 'Есть',
            Игра: 'Не состоится'
        },
    ]
};

function calculateTotal(enumName, enumValue, rows) {
    let amount = 0;
    rows.forEach(row => {
        if (row[enumName] === enumValue) {
            amount += 1;
        }
    });
    return amount;
}

function calculateLocal(enumName, enumValue, {name: dependentEnum, values: dependentEnumValues}, total, rows) {
    let res = {};
    let max = 0;
    dependentEnumValues.forEach(dependentEnumValue => {
        let amount = 0;
        rows.forEach(row => {
            if(row[enumName] === enumValue && row[dependentEnum] === dependentEnumValue) {
                amount += 1;
            }
        });
        if (amount > max) {
            max = amount;
            res = {
                name: dependentEnumValue,
                errorAmout: total - amount
            };
        }
    });
    return res;
}

function generateMessage(rules) {
    const dependentEnumName = data.dependentEnums[0].name;
    let str = '';
    rules.forEach(dataElem => {
        const independentEnum = dataElem.name;
        dataElem.subResult.forEach(rule => {
            const ruleStr = `If (${independentEnum} = ${rule.name}) then (${dependentEnumName} = ${rule.local.name})`;
            const errorStr = `${rule.local.errorAmout} / ${rule.total}`;
            str += `${ruleStr} ${errorStr}\n`;
        });
    });
    return str;
}

function generateTableHeader(data) {
    const tableHeader = document.createElement('tr');
    const tableHeaderNumCell = document.createElement('th');
    tableHeaderNumCell.innerHTML = "№";
    tableHeader.appendChild(tableHeaderNumCell);
    data.independentEnums.forEach(independentEnum => {
        const tableHeaderCell = document.createElement('th');
        tableHeaderCell.innerHTML = independentEnum.name;
        tableHeader.appendChild(tableHeaderCell);
    });
    const tableHeaderResCell = document.createElement('th');
    tableHeaderResCell.innerHTML = data.dependentEnums[0].name;
    tableHeader.appendChild(tableHeaderResCell);
    return tableHeader;
}

function generateTableByData(data) {
    let i = 1;

    dataTable.appendChild(generateTableHeader(data));
    data.rows.forEach(row => {
        const tableRow = document.createElement('tr');
        const tableIndex = document.createElement('td');
        tableIndex.innerHTML = i;
        tableRow.appendChild(tableIndex);
        for (let item in row) {
            const tableCell = document.createElement('td');
            tableCell.innerHTML = row[item];
            tableRow.appendChild(tableCell);
        }
        dataTable.appendChild(tableRow);
        i++;
    });
}

function calculateBestErrorAmount(data) {
    let min = Infinity;
    let bestVariable = '';

    data.forEach(({name, subResult}) => {
        let errorAmoutSum = 0;
        subResult.forEach(({errorAmout}) => {
            errorAmoutSum += errorAmoutSum;
        });
        if (errorAmoutSum < min) {
            min = errorAmoutSum;
            bestVariable = name;
        }
    });
    textareaNodes.value += `"${bestVariable}" - Переменная, правила которой имеют наименьшую ошибку`;
}

const {rows} = data;
const dependentEnum = data.dependentEnums[0];
const result = [];

for (let i = 0; i < data.independentEnums.length; i++) {
    const currEnum = data.independentEnums[i];
    const currEnumName = currEnum.name;

    const subResult = [];
    for (let j = 0; j < currEnum.values.length; j++) {
        const currValue = currEnum.values[j];
        const total = calculateTotal(currEnumName, currValue, rows);
        const local = calculateLocal(currEnumName, currValue, dependentEnum, total, rows);
        subResult.push({
            name: currValue,
            total,
            local
        });
    }
    result.push({
        name: currEnum.name,
        subResult
    });
}

const message = generateMessage(result);
console.log(result);
console.log(message);
textareaNodes.value = message;
generateTableByData(data);
calculateBestErrorAmount(result);
console.log(JSON.stringify(data));
