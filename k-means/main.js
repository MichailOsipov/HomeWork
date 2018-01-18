let pointsSVG = [];
let text = '';

function parcePoints() {
    const nodesText = textareaNodes.value;
    const nodesXY = nodesText.split('\n');
    text = '';
    pointsSVG = [];
    pointsInSVG.innerHTML = "";
    nodesXY.forEach(nodeXY => {
        const [xStr,yStr] = nodeXY.split(' ');
        if (!xStr || !yStr) {
            return;
        }
        const x = Number(xStr);
        const y = Number(yStr);
        addCircle({x,y, label: pointsSVG.length});
        pointsSVG.push({x,y});
        addNodeToTextArea({x,y});
    });
}

function createCircle({x, y}) {
    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle.setAttribute('cx', x);
    circle.setAttribute('cy', y);
    circle.setAttribute('stroke', "black");
    circle.setAttribute('stroke-width', 2);
    circle.setAttribute('fill', "white");
    circle.setAttribute('r', 15);
    return circle;
}

function createText({x, y, label}) {
    const offset = 2;
    const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    text.setAttribute('x', x - offset);
    text.setAttribute('y', y + offset);
    text.setAttribute('fill', "black");
    text.innerHTML = label;
    return text;
}

function createLine({x:x1,y:y1},{x:x2,y:y2}) {
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('x1', x1);
    line.setAttribute('y1', y1);
    line.setAttribute('x2', x2);
    line.setAttribute('y2', y2);
    line.setAttribute('stroke', "black");
    line.setAttribute('stroke-width', 2);
    return line;
}

function addCircle({x,y, label}) {
    const circle = createCircle({x,y});
    const text = createText({x,y,label});
    pointsInSVG.appendChild(circle);
    pointsInSVG.appendChild(text);
}

function addNodeToTextArea({x, y}) {
    text += `${x} ${y}\n`;
    textareaNodes.value = text;
}

function drawCircle(event) {
    const x = event.offsetX;
    const y = event.offsetY;
    addCircle({x,y, label: pointsSVG.length});
    pointsSVG.push({x,y});
    addNodeToTextArea({x,y});
}

function calculateDistance({x: x1,y:y1}, {x: x2,y: y2}) {
    return Math.sqrt((x1 - x2)**2 + (y1 - y2)**2);
}

function calculatePointCluster(point, clusters) {
    let clusterNumber = 0;
    let distance = Infinity;
    clusters.forEach((cluster, i) => {
        const currDistance = calculateDistance(point, cluster);
        if (currDistance < distance) {
            clusterNumber = i;
            distance = currDistance;
        }
    });
    return clusterNumber;
}

function calculatePointsClusters(points, clusters) {
    return points.map(point => ({
        ...point,
        cluster: calculatePointCluster(point, clusters)
    }));
}

function calculateClusters(points) {
    let clusters = [];
    points.forEach(({x, y, cluster}) => {
        if (!clusters[cluster]) {
            clusters[cluster] = {x: 0,y:0,count:0};
        }
        clusters[cluster].x += x;
        clusters[cluster].y += y;
        clusters[cluster].count += 1;
    });
    return clusters.map(({x, y, count}) => ({
        x: x / count,
        y: y / count
    }));
}

function drawClusters(clusters, points) {
    clustersInSVG.innerHTML = "";
    linesInSVG.innerHTML = "";
    clusters.forEach(({x, y}) => {
        const circle = createCircle({x,y});
        circle.setAttribute('stroke-dasharray', '5');
        circle.setAttribute('fill', 'red');
        clustersInSVG.appendChild(circle);
    });
    points.forEach(({x,y,cluster}) => {
        const line = createLine({x,y}, clusters[cluster]);
        linesInSVG.appendChild(line);
    });
}

function isClustersDifferent(oldClusters, currClusters) {
    const delta = 1;
    if (oldClusters.length != currClusters.length) {
        return false;
    }

    for (let i = 0; i < oldClusters.length; i++) {
        const {x: x1, y: y1} = oldClusters[i];
        const {x: x2, y: y2} = currClusters[i];
        if (Math.abs(x1 - x2) > delta || Math.abs(y1 - y2) > delta) {
            return true;
        }
    }
    return false;
}

function startSimulation() {
    const clustersCount = Number(clustersCountInput.value);
    if (isNaN(clustersCount) || clustersCount > pointsSVG.length) {
        return;
    }
    let clusters = [];
    for (let i = 0; i < clustersCount; i++) {
        clusters.push(pointsSVG[i]);
    }
    let timerId = setInterval(() => {
        pointsSVG = calculatePointsClusters(pointsSVG, clusters);
        const oldClusters = clusters;
        clusters = calculateClusters(pointsSVG);
        drawClusters(clusters, pointsSVG);
        if (!isClustersDifferent(clusters, oldClusters)) {
            clearInterval(timerId);
        }
    }, 100);
}

function randomize() {
    let nodes = '';
    for (let i = 0; i < 10000; i++) {
        const x = Math.floor(Math.random() * 7000) + 1;
        const y = Math.floor(Math.random() * 3000) + 1;
        nodes += `${x} ${y}\n`;
    }
    textareaNodes.value = nodes;
    parcePoints();
}
randomButton.addEventListener('click', randomize);
textareaNodes.addEventListener('change', parcePoints);
drawField.addEventListener('click', drawCircle);
startSimulationButton.addEventListener('click', startSimulation);
