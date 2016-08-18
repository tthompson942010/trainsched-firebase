$(document).ready(function(){
  
	// Initialize Firebase
	var config = {
	apiKey: "AIzaSyCzneVJUuvbJsYwexIVvjEFijrMZJpvD_M",
	authDomain: "train-schedule-e104f.firebaseapp.com",
	databaseURL: "https://train-schedule-e104f.firebaseio.com",
	storageBucket: "train-schedule-e104f.appspot.com",
	};
	firebase.initializeApp(config);
	var database = firebase.database();

	var name;
	var destination;
	var frequency;
	var firstrun;
	var nextarrival;
	var minutesaway;

	$('#submitMe').on('click', function(){

		name = $("#trainName").val().trim();
		destination = $("#destination").val().trim();
		frequency = $("#frequency").val().trim();
		firstrun = $("#firstTrain").val().trim();
		database.ref().push({
			name : name,
			firstrun : firstrun,
			destination : destination,
			frequency : frequency,
			dateAdded: firebase.database.ServerValue.TIMESTAMP
		});
		console.log(name, destination, firstrun, frequency);

		$("#trainName").val(" ");
		$("#destination").val(" ");
		$("#frequency").val(" ");
		$("#firstTrain").val(" ");

		return false;	
	});
	
	database.ref().on('child_added', function(snapshot){
	console.log(snapshot.val().empName)
	var tabrow = $("<tr>");
	var namedat = $("<td>");
	var destdat = $("<td>");
	var freqdat = $("<td>");
	var nextdat = $("<td>");
	var minsdat = $("<td>");
	var snap = snapshot.val();
	var firstrun = moment(snap.firstrun, 'HH:mm');
	var frequency = snap.frequency;
	console.log(firstrun)
	console.log(frequency)
	var sincefirst = moment().diff(firstrun, 'minutes');
	console.log(sincefirst)
	var sincelast = sincefirst % frequency;
	console.log(sincelast);
	var minutesaway = frequency - sincelast;
	console.log(minutesaway);
	nextarrival = moment().add(minutesaway, 'minutes');
	console.log(nextarrival);
	namedat.text(snap.name)
	destdat.text(snap.destination)
	freqdat.text(snap.frequency)
	nextdat.text(moment(nextarrival).format("HH:mm"));
	minsdat.text(minutesaway)
	namedat.appendTo(tabrow)
	destdat.appendTo(tabrow)
	freqdat.appendTo(tabrow)
	nextdat.appendTo(tabrow)
	minsdat.appendTo(tabrow)
	tabrow.appendTo($("#trainData"))

	}, function(error){
		console.log(error.code);
		console.log(error.message);
	});
});