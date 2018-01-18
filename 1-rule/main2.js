const data = {
    independentEnums: [
        {
            name: 'Пробки',
            values: ['есть', 'нет']
        },
        {
            name: 'Опыт водителя',
            values: ['Начинающий', 'Средний', 'Опытный']
        },
        {
            name: 'Состояние машины',
            values: ['сломана', 'исправная']
        }
    ],
    dependentEnums: [
        {
            name: 'Приедет вовремя',
            values: ['да', 'нет']
        }
    ],
    rows: [
        {
            Пробки: 'есть',
            'Опыт водителя': 'Начинающий',
            'Состояние машины': 'сломана',
            'Приедет вовремя': 'нет'
        },
        {
            Пробки: 'нет',
            'Опыт водителя': 'Средний',
            'Состояние машины': 'сломана',
            'Приедет вовремя': 'да'
        },
        {
            Пробки: 'есть',
            'Опыт водителя': 'Начинающий',
            'Состояние машины': 'исправная',
            'Приедет вовремя': 'нет'
        },
        {
            Пробки: 'есть',
            'Опыт водителя': 'Средний',
            'Состояние машины': 'исправная',
            'Приедет вовремя': 'нет'
        },
        {
            Пробки: 'нет',
            'Опыт водителя': 'Опытный',
            'Состояние машины': 'сломана',
            'Приедет вовремя': 'да'
        },
        {
            Пробки: 'нет',
            'Опыт водителя': 'Начинающий',
            'Состояние машины': 'исправная',
            'Приедет вовремя': 'да'
        },
        {
            Пробки: 'есть',
            'Опыт водителя': 'Опытный',
            'Состояние машины': 'исправная',
            'Приедет вовремя': 'да'
        }
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

console.log(JSON.stringify(data));
