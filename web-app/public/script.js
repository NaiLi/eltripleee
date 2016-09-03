
var roomData = {
	rooms: [
	{
		roomNo: 1,
		age: 65,
		gender: "f",
		medData: {
			heartRate: 67,
			oxygenSaturation: 500
		},
		movement: 5,
		emergencyStatus: 10		
	},
	{	
		roomNo: 2,
		age: 75,
		gender: "m",
		medData: {
			heartRate: 103,
			oxygenSaturation: 500
		},
		movement: 2,
		emergencyStatus: 20
	}
]};

var feedData = {
	feed: [ {
		roomNo: 5,
		message: "Abnormal heart rate",
		emergencyStatus: 10
	}, {
		roomNo: 17,
		message: "Low activity",
		emergencyStatus: 20
	}, {
		roomNo: 17,
		message: "Long since last check",
		emergencyStatus: 30
	}]
};

var source   = $("#roomlist").html();
var template = Handlebars.compile(source);
$('body').append(template(roomData));

var source   = $("#feedlist").html();
var template = Handlebars.compile(source);
$('body').append(template(feedData));
