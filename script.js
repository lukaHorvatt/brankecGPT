// Initialize jsPlumb instance
var instance = jsPlumb.getInstance();

// Define correct connections
var correctConnections = {
    "word1": "image3",
    "word2": "image1",
    "word3": "image2"
};

// Define correct connections for second page
var correctConnectionsSecond = {
    "athlete1": "sport1",
    "athlete2": "sport2",
    "athlete3": "sport3"
};

// Store the last clicked div
var lastClicked;

// Store the current page
var currentPage = window.location.pathname.includes('second.html') ? 'second' : 'first';

// Connect divs
function connect(id) {
    var clickedElement = document.getElementById(id);
    if (lastClicked) {
        var lastClickedElement = document.getElementById(lastClicked);
        if ((lastClickedElement.classList.contains('word') && clickedElement.classList.contains('image')) ||
            (lastClickedElement.classList.contains('image') && clickedElement.classList.contains('word'))) {
            var connection = instance.connect({
                source:lastClicked, 
                target:id,
                anchors: ['Right', 'Left']
            });
            if (currentPage === 'first') {
                checkConnections(connection, lastClicked, id);
            } else if (currentPage === 'second') {
                checkConnectionsSecond(connection, lastClicked, id);
            }
            lastClickedElement.style.border = '';
            lastClicked = null;
        } else {
            alert("You can only connect words to images!");
            lastClickedElement.style.border = '';
            lastClicked = null;
        }
    } else {
        lastClicked = id;
        clickedElement.style.border = '1px solid red';
    }
}

// Check connections
function checkConnections(connection, sourceId, targetId) {
    if (correctConnections[sourceId] !== targetId) {
        alert("Incorrect connection between " + sourceId + " and " + targetId);
        instance.deleteConnection(connection);
    } else {
        var connections = instance.getAllConnections();
        var correctCount = 0;
        for (var i = 0; i < connections.length; i++) {
            if (correctConnections[connections[i].sourceId] === connections[i].targetId) {
                correctCount++;
            }
        }
        if (correctCount === Object.keys(correctConnections).length) {
            var modal = document.createElement('div');
            modal.innerHTML = '<div id="modal"><p>Congratulations!</p><button onclick="location.href=\'second.html\'">Go Next</button></div>';
            document.body.appendChild(modal);
        }
    }
}

// Check connections for second page
function checkConnectionsSecond(connection, sourceId, targetId) {
    if (correctConnectionsSecond[sourceId] !== targetId) {
        alert("Incorrect connection between " + sourceId + " and " + targetId);
        instance.deleteConnection(connection);
    } else {
        var connections = instance.getAllConnections();
        var correctCount = 0;
        for (var i = 0; i < connections.length; i++) {
            if (correctConnectionsSecond[connections[i].sourceId] === connections[i].targetId) {
                correctCount++;
            }
        }
        if (correctCount === Object.keys(correctConnectionsSecond).length) {
            var modal = document.createElement('div');
            modal.innerHTML = '<div id="modal"><p>Congratulations!</p><button onclick="location.href=\'third.html\'">Go Next</button></div>';
            document.body.appendChild(modal);
        }
    }
}
