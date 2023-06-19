// Initialize jsPlumb instance
var instance = jsPlumb.getInstance();

// Define correct connections
var correctConnections = {
    "sport1": "image1",
    "sport2": "image2",
    "sport3": "image3"
};

// Define correct connections for second page
var correctConnectionsSecond = {
    "word1": "image3",
    "word2": "image1",
    "word3": "image2"
};

// Define correct connections for third page
var correctConnectionsThird = {
    "procedure1": "meal1",
    "procedure2": "meal2",
    "procedure3": "meal3"
};

// Store the last clicked div
var lastClicked;

// Store the current page
var currentPage = window.location.pathname.includes('second.html') ? 'second' : 
                  window.location.pathname.includes('third.html') ? 'third' : 'first';

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
            } else if (currentPage === 'third') {
                checkConnectionsThird(connection, lastClicked, id);
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


// Check connections for third page
function checkConnectionsThird(connection, sourceId, targetId) {
    if (correctConnectionsThird[sourceId] !== targetId) {
        alert("Incorrect connection between " + sourceId + " and " + targetId);
        instance.deleteConnection(connection);
    } else {
        var connections = instance.getAllConnections();
        var correctCount = 0;
        for (var i = 0; i < connections.length; i++) {
            if (correctConnectionsThird[connections[i].sourceId] === connections[i].targetId) {
                correctCount++;
            }
        }
        if (correctCount === Object.keys(correctConnectionsThird).length) {
            var modal = document.createElement('div');
            modal.innerHTML = '<div id="modal"><p>Congratulations!</p><button onclick="location.href=\'fourth.html\'">Go Next</button></div>';
            document.body.appendChild(modal);
        }
    }
}
