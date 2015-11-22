$(document).ready(function () {
    // Models
    function Assignment(id, title, customer, grade, address, city, postalcode, mail, phone, description, tags) {
        this.id = id;
        this.title = title;
        this.customer = customer;
        this.grade = grade;
        this.address = address;
        this.city = city;
        this.postalcode = postalcode;
        this.mail = mail;
        this.phone = phone;
        this.description = description;
        this.tags = tags;
    }

    function Tag(id, name) {
        this.id = id;
        this.name = name;
    }

    var CvModule = (function () {
        // Service - internal, no storage
        var InternalCvServiceFactory = function () {
            function CvService() {
                this.assignments = [];
                this.ctr = 1;
            }
            CvService.prototype.createAssignment = function (assigment) {
                var promise = $.Deferred();

                this.assignments.push(assigment);
                assigment.id = this.ctr++;

                promise.resolve();
                return promise;
            }
            CvService.prototype.readAssignment = function (id) {
                var promise = $.Deferred();

                for (var el = 0; el < this.assignments.length; el++) {
                    if (this.assignments[el].id === id) {
                        promise.resolve(this.assignments[el]);
                        return promise;
                    }
                }

                promise.reject();
                return promise;
            }
            CvService.prototype.updateAssignment = function (assigment) {
                var promise = $.Deferred();

                this.readAssignment(assigment.id).then(function (stored) {
                    if (stored) {
                        stored.title = assigment.title;
                        stored.customer = assigment.customer;
                        stored.grade = assigment.grade;
                        stored.address = assigment.address;
                        stored.city = assigment.city;
                        stored.postalcode = assigment.postalcode;
                        stored.mail = assigment.mail;
                        stored.phone = assigment.phone;
                        stored.description = assigment.description;
                        stored.tags = assigment.tags;
                    }

					promise.resolve();
                });
                return promise;
            }
            CvService.prototype.deleteAssignment = function (id) {
                var promise = $.Deferred();

                for (var el = 0; el < this.assignments.length; el++) {
                    if (this.assignments[el].id === id) {
                        this.assignments.splice(el, 1);
                    }
                }

                promise.resolve();
                return promise;
            }
            CvService.prototype.listAssignments = function () {
                var promise = $.Deferred();

                promise.resolve(this.assignments);
                return promise;
            }

            return new CvService();
        };

        // Service - local storage
        var LocalCvServiceFactory = function (key) {
            function CvService(key) {
                if (!this.testLocalStorage()) {
                    throw new Error("No local storage available");
                }
                this.key = key;
            }
            CvService.prototype.createAssignment = function (assigment) {
                var promise = $.Deferred();

                var _assigment = assigment;
                this.listAssignments().then(function (assignments) {
                    assignments.push(_assigment);
                    var ctr = 1;
                    assignments.forEach(function (item) {
                        if (ctr <= item.id) ctr = item.id + 1;
                    });

                    _assigment.id = ctr++;

                    localStorage.setItem(key, JSON.stringify(assignments));

                    promise.resolve();
                });

                return promise;
            }
            CvService.prototype.readAssignment = function (id) {
                var promise = $.Deferred();

                this.listAssignments().then(function (assignments) {
                    for (var el = 0; el < assignments.length; el++) {
                        if (assignments[el].id === id) {
                            promise.resolve(assignments[el]);
                            return;
                        }
                    }
                    promise.reject();
                });

                return promise;
            }
            CvService.prototype.updateAssignment = function (assigment) {
                var promise = $.Deferred();

                var _assigment = assigment;
                this.listAssignments().then(function (assignments) {
                    var stored = null;
                    for (var el = 0; el < assignments.length; el++) {
                        if (assignments[el].id === _assigment.id)
                            stored = assignments[el];
                    }

                    if (stored) {
                        stored.title = _assigment.title;
                        stored.customer = _assigment.customer;
                        stored.grade = _assigment.grade;
                        stored.address = _assigment.address;
                        stored.city = _assigment.city;
                        stored.postalcode = _assigment.postalcode;
                        stored.mail = _assigment.mail;
                        stored.phone = _assigment.phone;
                        stored.description = _assigment.description;
                        stored.tags = _assigment.tags;
                    }

                    localStorage.setItem(key, JSON.stringify(assignments));

                    promise.resolve();
                });

                return promise;
            }
            CvService.prototype.deleteAssignment = function (id) {
                var promise = $.Deferred();

                this.listAssignments().then(function (assignments) {
                    for (var el = 0; el < assignments.length; el++) {
                        if (assignments[el].id === id) {
                            assignments.splice(el, 1);
                        }
                    }

                    localStorage.setItem(key, JSON.stringify(assignments));

                    promise.resolve();
                });

                return promise;
            }
            CvService.prototype.listAssignments = function () {
                var promise = $.Deferred();

                var assignments = localStorage.getItem(key);
                if (!assignments) assignments = [];
                if (typeof (assignments) === 'string')
                    assignments = JSON.parse(assignments);

                promise.resolve(assignments);
                return promise;
            }

            CvService.prototype.testLocalStorage = function () {
				var test = 'test';
				try {
					localStorage.setItem(test, test);
					localStorage.removeItem(test);
					return true;
				} catch(e) {
					return false;
				}
			}

            return new CvService(key);
        };

        // Service - REST storage
        var RestCvServiceFactory = function (endpoint) {
            function CvService(endpoint) {
                this.endpoint = endpoint;
            }
            CvService.prototype.createAssignment = function (assigment) {
                var promise = $.Deferred();

                $.ajax({
                    method: 'POST',
                    url: endpoint + 'opdrachten',
                    contentType: 'application/json',
                    data: JSON.stringify( this.convertFrom(assigment)),
                    processData: false,
                    success: function (data) {
                        promise.resolve(data);
                    }
                });

                return promise;
            }
            CvService.prototype.readAssignment = function (id) {
                var promise = $.Deferred();

                var con = this;
                $.ajax({
                    method: 'GET',
                    url: endpoint + 'opdrachten/' + id,
                    success: function (data) {
                        promise.resolve(con.convertTo(data));
                    }
                });

                return promise;
            }
            CvService.prototype.updateAssignment = function (assigment) {
                var promise = $.Deferred();

                $.ajax({
                    method: 'POST',
                    url: endpoint + 'opdrachten/' + assigment.id,
                    contentType: 'application/json',
                    data: this.convertFrom(assigment),
                    processData: false,
                    success: function (data) {
                        promise.resolve(data);
                    }
                });

                return promise;
            }
            CvService.prototype.deleteAssignment = function (id) {
                var promise = $.Deferred();

                $.ajax({
                    method: 'DELETE',
                    url: endpoint + 'opdrachten/' + id,
                    success: function () {
                        promise.resolve();
                    }
                });

                return promise;
            }
            CvService.prototype.listAssignments = function () {
                var promise = $.Deferred();

                var con = this;
                $.ajax({
                    method: 'GET',
                    url: endpoint + 'opdrachten',
                    success: function (data) {
                        var result = [];
                        data.forEach(function (el) { result.push(con.convertTo(el)); });
                        promise.resolve(result);
                    },
					error: function(){
						promise.reject();
					}
                });

                return promise;
            }

            // Conversion functions to / from endpoint
            CvService.prototype.convertFrom = function(assignment){
                var result = {
                    Id: assignment.id,
                    GebruikerId: 1,
                    Indexnr: assignment.id,
                    KlantNaam: assignment.customer,
                    Mail: assignment.mail,
                    Adres: assignment.address,
                    Cijfer: assignment.grade,
                    Titel: assignment.title,
                    Omschrijving: assignment.description
                };

                return result;
            }
            CvService.prototype.convertTo = function(data){
                var result = new Assignment(
                    data.Id,
                    data.Titel,
                    data.KlantNaam,
                    data.Cijfer,
                    data.Adres,
                    "",
                    "",
                    data.Mail,
                    "",
                    data.Omschrijving,
                    []);

                return result;
            }

            return new CvService(endpoint);
        };

        // Controller
        var CvControllerFactory = function (service) {
            function Controller(service) {
                this.service = service;
                this.temp = new Assignment();
            }

            // Reusable functions
            Controller.prototype.refreshAssignments = function () {
                $("#assignments").addClass("loading");
                $("#assignments .assignment").remove();
                $("#assignments .error").remove();

                var controller = this;
                var assignments = service.listAssignments().then(function (assignments) {
                    for (var ctr = 0; ctr < assignments.length; ctr++) {
                        var temp = $("#templates .assignment").clone();
                        temp.insertBefore("#addassignment");
                        temp.find(".title").html(assignments[ctr].title);
                        temp.find(".customer").html(assignments[ctr].customer);
                        temp.find(".grade").html(assignments[ctr].grade);
                        temp.attr("data-id", assignments[ctr].id);
                    }

                    $("#assignments .assignment").click(function () { controller.openAssignment(parseInt($(this).attr("data-id"))); });

                    $("#assignments").removeClass("loading");
                }).fail(function(){
					$("#assignments").append('<div class="error">Something went wrong</div>');
				});
            };
            Controller.prototype.closeModals = function () {
                $(".modal").hide();
            };
            Controller.prototype.clearEditForm = function () {
                $("#edittitle").val('');
                $("#editcustomer").val('');
                $("#editgrade").val('');
                $("#editaddress").val('');
                $("#editpostalcode").val('');
                $("#editcity").val('');
                $("#editmail").val('');
                $("#editphone").val('');
                $("#editdescription").text('');
                $("#edittags").val('');

                $("assignmentedit .tags .tag").remove();
            };

            // Button actions
            Controller.prototype.openAssignment = function (id) {
                this.closeModals();

                this.service.readAssignment(id).then(function (assignment) {
                    $("#assignmentdetails").attr("data-id", assignment.id);
                    $("#assignmentdetails .title").html(assignment.title);
                    $("#assignmentdetails .customer").html(assignment.customer);
                    $("#assignmentdetails .grade").html(assignment.grade);
                    $("#assignmentdetails .address").html(assignment.address);
                    $("#assignmentdetails .postalcode").html(assignment.postalcode);
                    $("#assignmentdetails .city").html(assignment.city);
                    $("#assignmentdetails .mail").html(assignment.mail);
                    $("#assignmentdetails .phone").html(assignment.phone);
                    $("#assignmentdetails .description").html(assignment.description.replace('\n', '<br>'));
                    $("#assignmentdetails .tags .tag").remove();
                    for (var tag = 0; tag < assignment.tags.length; tag++) {
                        var newtag = $("#templates .tag").clone();
                        newtag.find("span").text(assignment.tags[tag].name);
                        newtag.attr("data-id", assignment.tags[tag].id);
                        newtag.appendTo("#assignmentdetails .tags");
                    }

                    $("#assignmentdetails").show();
                });
            };
            Controller.prototype.addAssignment = function () {
                this.closeModals();

                $("#assignmentedit").attr("data-id", -1);
                $("#edittitle").val('');
                $("#editcustomer").val('');
                $("#editgrade").val('');
                $("#editaddress").val('');
                $("#editpostalcode").val('');
                $("#editcity").val('');
                $("#editmail").val('');
                $("#editphone").val('');
                $("#editdescription").val('');
                $("#edittags").val('');

                $("#assignmentedit .tags .tag").remove();

                this.temp = new Assignment();
                $("#assignmentedit").show();
            };
            Controller.prototype.editAssignment = function (id) {
                this.closeModals();

                this.service.readAssignment(id).then(function (assignment) {
                    $("#assignmentedit").attr("data-id", assignment.id);
                    $("#edittitle").val(assignment.title);
                    $("#editcustomer").val(assignment.customer);
                    $("#editgrade").val(assignment.grade);
                    $("#editaddress").val(assignment.address);
                    $("#editpostalcode").val(assignment.postalcode);
                    $("#editcity").val(assignment.city);
                    $("#editmail").val(assignment.mail);
                    $("#editphone").val(assignment.phone);
                    $("#editdescription").val(assignment.description);
                    $("#edittags").val('');

                    $("#assignmentedit .tags .tag").remove();
                    for (var tag = 0; tag < assignment.tags.length; tag++) {
                        var newtag = $("#templates .tag").clone();
                        newtag.find("span").text(assignment.tags[tag].name);
                        newtag.attr("data-id", assignment.tags[tag].id);
                        newtag.appendTo("#assignmentedit .tags");
                    }
                    $("#assignmentedit").show();
                });
            };
            Controller.prototype.deleteAssignment = function (id) {
                this.closeModals();

                var con = this;
                this.service.deleteAssignment(id).then(function () {
                    con.refreshAssignments();
                });
            };
            Controller.prototype.saveAssignment = function () {
                this.closeModals();

                var temp = new Assignment(
                    parseInt($("#assignmentedit").attr("data-id")),
                    $("#edittitle").val(),
                    $("#editcustomer").val(),
                    $("#editgrade").val(),
                    $("#editaddress").val(),
                    $("#editcity").val(),
                    $("#editpostalcode").val(),
                    $("#editmail").val(),
                    $("#editphone").val(),
                    $("#editdescription").val(),
                    []);

                $("#assignmentedit .tags .tag").each(function () {
                    temp.tags.push(new Tag($(this).attr("data-id"), $(this).find("span").text()));
                });

                var con = this;
                if (temp.id > 0) {
                    this.service.updateAssignment(temp).then(function (data) {
                        con.refreshAssignments();
                    });
                }
                else {
                    this.service.createAssignment(temp).then(function (data) {
                        con.refreshAssignments();
                    });
                }
            };

            Controller.prototype.addTag = function (tagname) {
                var newtag = $("#templates .tag").clone();
                newtag.find("span").text(tagname);
                $("#assignmentedit .tags").append(newtag);
            };

            // return
            return new Controller(service);
        };

        return {
            service: {
                createInternal: function () {
                    return InternalCvServiceFactory();
                },
                createLocal: function (key) {
                    return LocalCvServiceFactory(key);
                },
                createRest: function (endpoint) {
                    return RestCvServiceFactory(endpoint);
                }
            },
            controller: {
                create: function (service) {
                    return CvControllerFactory(service);
                }
            }
        };
    })();

    // Create the controller
    var controller = CvModule.controller.create(CvModule.service.createInternal());
    $(".button.memory").addClass("disabled");

    // Wire up the page actions
    $("#addassignment").click(function () { controller.addAssignment(); });
    $(".assignment").click(function () { controller.openAssignment(parseInt($(this).attr("data-id"))); });
    $(".button.close").click(function () { controller.closeModals(); });
    $(".button.save").click(function () { controller.saveAssignment(); });
    $(".button.edit").click(function () { controller.editAssignment(parseInt($("#assignmentdetails").attr("data-id"))); });
    $(".button.delete").click(function () { controller.deleteAssignment(parseInt($("#assignmentdetails").attr("data-id"))); });
    $("#edittags").keypress(function (e) {
        if (e.which == 13) {
            controller.addTag($(this).val());
            $(this).val('');
        }
    });
    $("#assignmentedit .tags").on("click", ".tag .delete", function () { $(this).parent().remove(); });

    $(".button.memory").click(function () {
        controller = CvModule.controller.create(CvModule.service.createInternal());
        controller.closeModals();
        controller.refreshAssignments();

        $(this).parent().find(".button").removeClass("disabled");
        $(this).addClass("disabled");
    });
    $(".button.local").click(function () {
        // local storage is not always supported, only proceed when it exists
        try {
            var temp = CvModule.controller.create(CvModule.service.createLocal('floatingcv'));

            controller = temp;
            controller.closeModals();
            controller.refreshAssignments();

            $(this).parent().find(".button").removeClass("disabled");
            $(this).addClass("disabled");
        }
        catch (e) {
            alert('local storage could not be initialized, try something else');
            $(".button.local").remove();
        }
    });
    $(".button.rest").click(function () {
        controller = CvModule.controller.create(CvModule.service.createRest('http://url.domain.com/api/gebruiker/1/'));
        controller.closeModals();
        controller.refreshAssignments();

        $(this).parent().find(".button").removeClass("disabled");
        $(this).addClass("disabled");
    });
});
