// Initialize jsPlumb instance
var instance = jsPlumb.getInstance();

// Define correct connections
var correctConnections = {
    "sport1": "image2",
    "sport2": "image1",
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
    "procedure1": "meal3",
    "procedure2": "meal1",
    "procedure3": "meal2"
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
            alert("Samo lijevo na desno se spaja! :) ");
            lastClickedElement.style.border = '';
            lastClicked = null;
        }
    } else {
        lastClicked = id;
        clickedElement.style.border = '3px solid green';
    }
}

// Check connections
function checkConnections(connection, sourceId, targetId) {
    if (correctConnections[sourceId] !== targetId) {
        tempAlert("Nope, pokusaj ponovo!",1200);
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
            modal.innerHTML = '<div id="modal"><p>Bravo, idemo dalje!</p><button onclick="location.href=\'second.html\'">DALJE</button></div>';
            document.body.appendChild(modal);
        }
    }
}

// Check connections for second page
function checkConnectionsSecond(connection, sourceId, targetId) {
    if (correctConnectionsSecond[sourceId] !== targetId) {
        tempAlert("Nope, pokusaj ponovo!",1200);
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
            modal.innerHTML = '<div id="modal"><p>Bravo, idemo dalje!</p><button onclick="location.href=\'third.html\'">DALJE</button></div>';
            document.body.appendChild(modal);
        }
    }
}


// Check connections for third page
function checkConnectionsThird(connection, sourceId, targetId) {
    if (correctConnectionsThird[sourceId] !== targetId) {
        tempAlert("Nope, pokusaj ponovo!",1200);
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
            document.location.href="result.html";
            document.body.appendChild(modal);
        }
        
    }
}

function tempAlert(msg,duration)
{
 var el = document.createElement("div");
 el.setAttribute("style","position:absolute;top:40%;left:40%;background-color:white;color:red;font-size:32px;");
 el.innerHTML = msg;
 setTimeout(function(){
  el.parentNode.removeChild(el);
 },duration);
 document.body.appendChild(el);
}