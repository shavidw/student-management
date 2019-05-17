$(document).ready(function () {
    $("#OrdId").val("O"+ ++orderdata[orderdata.length-1].oid);
    $("#CusIdBtn").focus();
    $("#OrdId").prop("readonly", true);
    $("#Date").prop("readonly", true);
    $("#CusName").prop("readonly", true);
    $("#Description").prop("readonly", true);
    $("#QtyOnHand").prop("readonly", true);
    $("#UnitPrice").prop("readonly", true);
    // $("table tbody tr td:last-child").click(function() {
    //         $(this).parent().remove();
    //     });

    $("#Quantity").on('keydown',function (e) {
if(e.keyCode==13){
    validateQuantity();
}
    });
});
var d = new Date();
$("#Date").val(d.toLocaleDateString());
function customerId(event) {
    var custName=event.keyCode;
    if(custName==13){
        $("#ItemCodeBtn").focus();
    }
}
// function customerName(event) {
//     var itemCode=event.keyCode;
//     if(itemCode==13){
//         $("#ItemCode").focus();
//     }
// }
function itemCode(event) {
    var description=event.keyCode;
    if(description==13){
        $("#Quantity").focus();
    }
}
// function description(event) {
//     var quantity=event.keyCode;
//     if(quantity==13){
//         $("#Quantity").focus();
//     }
// }
// function quantity(event) {
//     var unitPrice=event.keyCode;
//     if(unitPrice==13){
//         $("#BtnSave").focus();
//     }
// }
// function unitPrice(event) {
//     var BtnSave=event.keyCode;
//     if(BtnSave==13){
//         $("#BtnSave").focus();
//     }
// }
var clickCount=0;
var s0;
for(var i=0;i<customer.length;i++){
    var html='<a class="dropdown-item" href="#">'+customer[i].id+'</a>';
    $("#CustomerId .dropdown-menu").append(html);
}
$("#CustomerId button").text($("#CustomerId .dropdown-menu .dropdown-item:first-child").text());
var firstCustomer=$("#CustomerId .dropdown-menu .dropdown-item:first-child").text();
$("#CustomerId .dropdown-menu .dropdown-item").click(function () {
   $("#CustomerId button").text($(this).text());
        for (var j = 0; j <customer.length ; j++) {
            if($(this).text()==(customer[j].id)){
                $("#CusName").val(customer[j].name);
            }
        }
    });

for(var i=0;i<items.length;i++){
    var html='<a class="dropdown-item" href="#">'+items[i].id+'</a>';
    $("#itemCode .dropdown-menu").append(html);
}
$("#itemCode button").text($("#itemCode .dropdown-menu .dropdown-item:first-child").text());
var firstItem=$("#itemCode .dropdown-menu .dropdown-item:first-child").text();
$("#itemCode .dropdown-menu .dropdown-item").click(function () {
    $("#itemCode button").text($(this).text());
    for (var j = 0; j <items.length ; j++) {
        if($(this).text()==(items[j].id)){
            $("#Description").val(items[j].description);
            //$("#Quantity").val(items[j].quantity);
            $("#QtyOnHand").val(items[j].quantity);
            $("#UnitPrice").val(items[j].unitprice);
        }
    }
});
var isplaceorder=false;
function validateQuantity(){
    if(parseInt($("#QtyOnHand").val())>=parseInt($("#Quantity").val())){
        $("#BtnSave").focus();

    }else{
        alert("Please Enter A Valid Quantity...! ");
        $("#Quantity").focus(function () {
            $("#Quantity").select();
        });

    }
}

$("#BtnSave").click(function (event) {
    if (($("#CusName").val().length != 0) && ($("#Description").val() != 0) &&($("#Quantity").val().trim().length>0)) {
        var isAlreadyAvailable = false;

        $("tbody tr").each(function (index, obj) {
            if (obj.firstElementChild.textContent === $("#ItemCodeBtn").text()) {
                var value = parseInt(obj.children[2].textContent) + parseInt($("#Quantity").val());
                var unitPrice = parseInt(obj.children[3].textContent);
                var total = value * unitPrice;

                obj.children[2].textContent = value;
                obj.children[4].textContent = total;
                isAlreadyAvailable = true;
                //debugger;
                //console.log(value);
                var rowItemQuantity=$("#Quantity").val();
                var rowItemCode=obj.children[0].textContent;
                rowUpdate($(this));
                if (items[index].id==rowItemCode){
                    items[index].quantity=parseInt(items[index].quantity)-parseInt(rowItemQuantity);
                    $("#QtyOnHand").val(items[index].quantity);
                    $("#Quantity").val("");
                    }
            }
        });
        if (!isAlreadyAvailable) {
            var html2 = '<tr>' +
                '<td>' + $("#ItemCodeBtn").text() + '</td>' +
                '<td>' + $("#Description").val() + '</td>' +
                '<td>' + $("#Quantity").val() + '</td>' +
                '<td>' + $("#UnitPrice").val() + '</td>' +
                '<td>' + ($("#UnitPrice").val() * $("#Quantity").val()) + '</td>' +
                '<td class="delete">' + '<button class="btn"></button>' + '</td>'
                + '</tr>'

            $("#OrderData").append(html2);
            for (var i = 0; i <items.length ; i++) {
                if (items[i].id===$("#ItemCodeBtn").text()){
                    items[i].quantity=parseInt(items[i].quantity)-parseInt($("#Quantity").val());
                    $("#QtyOnHand").val(items[i].quantity);
                    console.log(items[i].quantity);
                    $("#Quantity").val("");
                    break;
                }
            }
        }
        // $(".delete").on("click", function () {
        //     $(this).parent().remove();
        // });
        refresh();
        $("tbody tr").click(function (e) {
console.log("hii");
            if (clickCount < 1) {
            for (var i = 0; i < items.length; i++) {
                if (items[i].id === ($($(this).children()[0]).text())) {
                    //console.log(items[i].id+" " +rowItemCode);
                    items[i].quantity = parseInt(items[i].quantity) + parseInt($($(this).children()[2]).text());
                    $("#QtyOnHand").val(items[i].quantity);
                }
            }
            $("#ItemCodeBtn").text($($(this).children()[0]).text());
            $("#Description").val($($(this).children()[1]).text());
            $("#Quantity").val($($(this).children()[2]).text());
            $("#UnitPrice").val($($(this).children()[3]).text());
        }
            clickCount++;
        });
    }
    else {
        alert("Please Select Customer And Item Data Correctly...!");
        refresh();
    }
    Grandtotal=0;
    $(document).find("tbody tr").each(function (index,obj) {
        Grandtotal+=parseInt($($(this).children()[4]).text());
    });
    console.log(Grandtotal);
    $("#Total").text(Grandtotal);
});

function refresh() {
    if (isplaceorder) {
        $("#CusIdBtn").text(firstCustomer);
        $("#CusName").val("");
    }
    $("#ItemCodeBtn").text(firstItem);
    $("#Description").val("");
    $("#QtyOnHand").val("");
    $("#Quantity").val("");
    $("#UnitPrice").val("");
}
//delete row & update stock
$(document).off("click",".delete");
$(document).on("click",".delete", function () {
    var rowItemQuantity=$($(this).parent().children()[2]).text();
    var rowItemCode=$($(this).parent().children()[0]).text();
    console.log(rowItemQuantity+" " +rowItemCode);
    for (var i = 0; i <items.length ; i++) {
        if (items[i].id===rowItemCode){
            console.log(items[i].id+" " +rowItemCode);
            items[i].quantity=parseInt(items[i].quantity)+parseInt(rowItemQuantity);
            $("#QtyOnHand").val(items[i].quantity);
        }
    }
    $(this).parent().remove();
    Grandtotal=0;
    $(document).find("tbody tr").each(function (index,obj) {
        Grandtotal+=parseInt($($(this).children()[4]).text());
    });
    console.log(Grandtotal);
    $("#Total").text(Grandtotal);
    refresh();
});
function rowUpdate(row) {
    row.find("td:nth-child(2)").text($("#Description").val());
    row.find("td:nth-child(3)").text($("#Quantity").val());
    row.find("td:nth-child(4)").text($("#UnitPrice").val());
    for (var i = 0; i <customer.length ; i++) {
        if($("#ItemCodeBtn").val()==items[i].id){
            items[i].description=$("#Description").val();
            items[i].quantity=$("#Quantity").val();
            items[i].unitprice=$("#UnitPrice").val();
            console.log(items[i].quantity);
        }
    }
}
$("#PlaceOrder").click(function () {
    console.log(localStorage.length);
    orderdata.push({oid:$("#OrdId").val().substr(1,1),custId:$("#CusIdBtn").val(),orderDate:$("#Date").val()});
    var orderStorageData={oid:$("#OrdId").val().substr(1,1),custId:$("#CusIdBtn").val(),orderDate:$("#Date").val()};
        var count=localStorage.length++;
        localStorage.setItem(count, orderStorageData);
    isplaceorder=true;
    refresh();
    isplaceorder=false;
    console.log(localStorage.length);
    //localStorage.clear();
    $(document).find("tbody tr").each(function () {
        $(this).parent().remove();
    });

});
$("#NewOrder").click(function () {
    if(clickCount<1) {
        $("#OrdId").val("O" + ++orderdata[orderdata.length - 1].oid);
    }
    clickCount++;
    });
