$(document).ready(function () {
    $("#description").focus();
    idGenerator();
    loadItem();
    $("tbody tr").click(function (e) {
        console.log($("tbody tr").index(this));
        $("#id").val($($(this).children()[0]).text());
        $("#description").val($($(this).children()[1]).text());
        $("#quantity").val($($(this).children()[2]).text());
        $("#unitprice").val($($(this).children()[3]).text());
    });
    $(document).on("click", ".delete-item", function () {
        // var rowItemQuantity = $($(this).parent().children()[2]).text();
        var itemId = $($(this).parent().children()[0]).text();
        console.log(itemId);
        for (var i = 0; i <items.length ; i++) {
            if(itemId===(items[i].id)){
                items.splice(i,1);
            }
        }
        $(this).parent().remove();
    });

});
function CheckDescription(e){
    var description=$("#description").val().trim();
    var checker=/^[A-Za-z\s]*$/;
    if ((e.keyCode == 13)) {
        if (description.match(checker) && (description.length > 0)) {
            $("#quantity").focus();
            $("#description").css('border-color', '#ced4da');
        } else if (description.length > 0) {
            $("#description").focus(function () {
                $(this).select();
                $("#description").css('border-color', 'red');
            });
        }
    }
    if (description.length == 0) {
        $("#description").css('border-color', '#ced4da');
    }
}
function Description(event) {
    CheckDescription(event);
}
function CheckQuantity(e){
    var quantity=$("#quantity").val().trim();
    var checker=/^[0-9]*$/;
    if ((e.keyCode == 13)) {
        if (quantity.match(checker) && (quantity.length > 0)) {
            $("#unitprice").focus();
            $("#quantity").css('border-color', '#ced4da');
        } else if (quantity.length > 0) {
            $("#quantity").focus(function () {
                $(this).select();
                $("#quantity").css('border-color', 'red');
            });
        }
    }
    if (quantity.length == 0) {
        $("#quantity").css('border-color', '#ced4da');
    }
}
function Quantity(event) {
    CheckQuantity(event);
}
function CheckUnitPrice(e){
    var unitprice=$("#unitprice").val().trim();
    var checker=/^[0-9]*$/;
    if ((e.keyCode == 13)) {
        if (unitprice.match(checker) && (unitprice.length > 0)) {
            $("#btn-save").focus();
            $("#unitprice").css('border-color', '#ced4da');
        } else if (unitprice.length > 0) {
            $("#unitprice").focus(function () {
                $(this).select();
                $("#unitprice").css('border-color', 'red');
            });
        }
    }
    if (unitprice.length == 0) {
        $("#unitprice").css('border-color', '#ced4da');
    }
}
function UnitPrice(event) {
    CheckUnitPrice(event);
}
function idGenerator() {
    var idsubs = parseInt(customer[customer.length - 1].id.substr(1, 3));
    //console.log(idsubs);
    if (idsubs < 10) {
        $("#id").val("I00" + ++idsubs);
    } else if (idsubs < 100) {
        $("#id").val("I0" + ++idsubs);
    } else if (idsubs > 999) {
        $("#id").val("I" + ++idsubs);
    }
}
function newItem() {
    idGenerator();
    $("#description").val("");
    $("#quantity").val("");
    $("#unitprice").val("");
}
function saveItem() {
    customer.push({id: $("#id").val(), description: $("#description").val(), quantity: $("#quantity").val(),unitprice:$("#unitprice").val()});
    html5 = '<tr>' +
        '<td>' + $("#id").val() + '</td>' +
        '<td>' + $("#description").val() + '</td>' +
        '<td>' + $("#quantity").val() + '</td>' +
        '<td>' + $("#unitprice").val() + '</td>' +
        '<td class="delete-item">' + '<button class="btn"></button>' + '</td>'
        + '</tr>'
    $("#tbl-item").append(html5);
    $("tbody tr").click(function (e) {
        console.log($("tbody tr").index(this));
        $("#id").val($($(this).children()[0]).text());
        $("#description").val($($(this).children()[1]).text());
        $("#quantity").val($($(this).children()[2]).text());
        $("#unitprice").val($($(this).children()[3]).text());
    });
    newItem();

}
$("#newItem").on('click', function () {
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
        saveItem();
    }
});
function loadItem() {
    for (var i = 0; i < items.length; i++) {
        html6 = '<tr>' +
            '<td>' + items[i].id + '</td>' +
            '<td>' + items[i].description + '</td>' +
            '<td>' + items[i].quantity + '</td>' +
            '<td>' + items[i].unitprice + '</td>' +
            '<td class="delete-item">' + '<button class="btn"></button>' + '</td>'
            + '</tr>'
        $("#tbl-item").append(html6);
    }
}
function rowUpdate(row) {
    row.find("td:nth-child(2)").text($("#description").val());
    row.find("td:nth-child(3)").text($("#quantity").val());
    row.find("td:nth-child(4)").text($("#unitprice").val());
    for (var i = 0; i <items.length ; i++) {
        if($("#id").val()==items[i].id){
            items[i].description=$("#description").val();
            items[i].quantity=$("#quantity").val();
            items[i].unitprice=$("#unitprice").val();
        }
    }

}

