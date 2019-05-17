
$(document).ready(function () {
    $("#name").focus();
    idGenerator();
    loadCustomers();
    $("tbody tr").click(function (e) {
        console.log($("tbody tr").index(this));
        $("#id").val($($(this).children()[0]).text());
        $("#name").val($($(this).children()[1]).text());
        $("#address").val($($(this).children()[2]).text());
    });
    $(document).on("click", ".delete-cust", function () {
       // var rowItemQuantity = $($(this).parent().children()[2]).text();
        var custId = $($(this).parent().children()[0]).text();
        console.log(custId);
        for (var i = 0; i <customer.length ; i++) {
            if(custId===(customer[i].id)){
                customer.splice(i,1);
            }
        }
        $(this).parent().remove();
    });
});

function CheckCustName(e) {
    var custName = $("#name").val().trim();
    var checker = /^[A-Za-z\s]*$/;
    if ((e.keyCode == 13)) {
        if (custName.match(checker) && (custName.length > 0)) {
            $("#address").focus();
            $("#name").css('border-color', '#ced4da');
        } else if (custName.length > 0) {
            $("#name").focus(function () {
                $(this).select();
                $("#name").css('border-color', 'red');
            });
        }
    }
    if (custName.length == 0) {
        $("#name").css('border-color', '#ced4da');
    }

}

function CustName(event) {
    CheckCustName(event);
}

function CheckCustAddress(e) {
    var custAddress = $("#address").val().trim();
    var checker = /^[A-Za-z0-9\s]*$/;
    if (e.keyCode == 13) {
        if (custAddress.match(checker) && (custAddress.length > 0)) {
            $("#btn-save").focus();
            $("#address").css('border-color', '#ced4da');
        } else if (custAddress.length > 0) {
            $("#address").focus(function () {
                $(this).select();
                $("#address").css('border-color', 'red');
            });
        }
    }
    if (custAddress.length == 0) {
        $("#address").css('border-color', '#ced4da');
    }
}

function CustAddress(event) {
    CheckCustAddress(event);
}

function idGenerator() {
    var idsubs = parseInt(customer[customer.length - 1].id.substr(1, 3));
    //console.log(idsubs);
    if (idsubs < 10) {
        $("#id").val("C00" + ++idsubs);
    } else if (idsubs < 100) {
        $("#id").val("C0" + ++idsubs);
    } else if (idsubs > 999) {
        $("#id").val("C" + ++idsubs);
    }
}

function newCustomer() {
    idGenerator();
    $("#name").val("");
    $("#address").val("");
}

function saveCustomer() {
    customer.push({id: $("#id").val(), name: $("#name").val(), address: $("#address").val()});
    html3 = '<tr>' +
        '<td>' + $("#id").val() + '</td>' +
        '<td>' + $("#name").val() + '</td>' +
        '<td>' + $("#address").val() + '</td>' +
        '<td class="delete-cust">' + '<button class="btn"></button>' + '</td>'
        + '</tr>'
    $("#tbl-customer").append(html3);
    $("tbody tr").click(function (e) {
        console.log($("tbody tr").index(this));
        $("#id").val($($(this).children()[0]).text());
        $("#name").val($($(this).children()[1]).text());
        $("#address").val($($(this).children()[2]).text());
    });
    newCustomer();

}
$("#NewCustomer").on('click', function () {
    newCustomer();
});
$("#btn-save").click(function () {
    var update = false;
    $("tbody tr td:first-child").each(function (index, obj) {
        if ($(this).text() === $("#id").val()) {
            rowUpdate($(this).parent());
            update = true;
        }
    });
    console.log(update);
    if (!update) {
        saveCustomer();
    }
});

function loadCustomers() {
    for (var i = 0; i < customer.length; i++) {
        html4 = '<tr>' +
            '<td>' + customer[i].id + '</td>' +
            '<td>' + customer[i].name + '</td>' +
            '<td>' + customer[i].address + '</td>' +
            '<td class="delete-cust">' + '<button class="btn"></button>' + '</td>'
            + '</tr>'
        $("#tbl-customer").append(html4);
    }
}

function rowUpdate(row) {
    row.find("td:nth-child(2)").text($("#name").val());
    row.find("td:nth-child(3)").text($("#address").val());
    for (var i = 0; i <customer.length ; i++) {
        if($("#id").val()==customer[i].id){
            customer[i].name=$("#name").val();
            customer[i].address=$("#address").val();
        }
    }

}
