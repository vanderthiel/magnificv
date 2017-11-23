function Tag(name){
	this.Name = name;
}

function Customer(name, location){
	this.Name = name;
	this.Location = location;
}
Customer.prototype.Print = function(){
	return this.Name + " / " + this.Location;
}

function Assignment(customer, duration, role, grade){
	this.Customer = customer;
	this.Duration = duration;
	this.Role = role;
	this.Grade = grade;
	this.Tags = [];
}
Assignment.prototype.AddTag = function(name){
	this.Tags.push(new Tag(name));
}

function Resume(){
	this.Assignments = [];
	this.Customers = [];
}
Resume.prototype.AddAssignment = function(assignment){
	this.Assignments.push(assignment);

	if(this.Customers.find(function(x){ return x.Name == assignment.Customer.Name;}) == null)
		this.Customers.push(assignment.Customer);
}

var myResume = new Resume();
myResume.AddAssignment(new Assignment(new Customer('Sogeti', 'Vianen'), 6, 'toilet cleaner', 3));
myResume.AddAssignment(new Assignment(new Customer('Sogeti', 'Vianen'), 12, 'Architect', 7));
myResume.Assignments[0].AddTag('cleaning');
myResume.Assignments[1].AddTag('design');
myResume.Assignments[1].AddTag('guidance');
console.log('done');