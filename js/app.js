var box = {};
var title = document.querySelector('input[name="title"]');
var desc = document.querySelector('textarea[name="info"]');
var log = document.getElementById('updateStatus'); 

var send = document.getElementById('send');

send.onclick = function(e) {
	box.title = title.value;
	box.desc = desc.value;
	box.id = new Date();
	storeMessage(box);
	return false;
}
function isOnline() {
	return navigator.onLine;
}

function reportOnlineStatus(){
	if(isOnline()) {
		
	}else{
		var offLine = document.getElementById ('detector');
		offLine.setAttribute("background","red");
	}
}
function storeMessage (box) {

	if (isOnline()) {
		storeMessageRemote(box);
	} else {
		storeMessageLocal(box);
	}
}
function storeMessageLocal(data) {

	addItem(data.id, data);
	clearUI();
	logEvent('Message saved locally: "' + data.title + '"');
}
function storeMessageRemote (data) {
	clearUI();
	sendMessageToServer(data);
}
function sendMessageToServer (data) {
	clearUI();
	logEvent('Message sent to server: "' + data.title + '"');
}
function sendAllMessagesToServer() {
	var messages = [];
	getAllItems(function (result) {
		messages = result;
	});
	
		for (var i = 0; i < messages.length; i++) {
		logEvent('Message sent to server: "' + messages[i].title + '"');
		deleteItem(messages[i].id);
	}
}
	
function clearUI() {
	title.value = "";
	desc.value = "";
}

function logEvent(msg) {
	var myElement = document.getElementById('updateStatus');
	var liElement = document.createElement('li');
	liElement.innerHTML = (msg);
	myElement.appendChild(liElement);
}
	
(function() {
	if(window.applicationCache) {

		window.addEventListener('online', function(e){
			reportOnlineStatus();
			sendAllMessagesToServer();
		}, true);

		window.addEventListener('offline', function(e){
			reportOnlineStatus();
		}, true);

		reportOnlineStatus();
	}
})();