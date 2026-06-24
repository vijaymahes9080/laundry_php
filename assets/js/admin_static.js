// Seed initial data if localStorage is empty
const defaultTypes = [
    { laun_type_id: 1, laun_type_desc: "Blanket", laun_type_price: 20 },
    { laun_type_id: 2, laun_type_desc: "Clothes", laun_type_price: 30 }
];

const defaultLaundries = [
    { laun_id: 7, customer_name: "Reyvelyn Ybanez Viovicente", laun_priority: 7, laun_weight: 3, laun_date_received: "2026-06-24 15:30:00", laun_claimed: 1, laun_type_id: 1 },
    { laun_id: 9, customer_name: "Winnie Alterado Damayo", laun_priority: 3, laun_weight: 2, laun_date_received: "2026-06-24 15:31:00", laun_claimed: 1, laun_type_id: 1 },
    { laun_id: 10, customer_name: "Jane Dougah Hah", laun_priority: 1, laun_weight: 2, laun_date_received: "2026-06-24 15:32:00", laun_claimed: 1, laun_type_id: 2 },
    { laun_id: 11, customer_name: "Johnny Deep", laun_priority: 7, laun_weight: 3, laun_date_received: "2026-06-24 15:33:00", laun_claimed: 1, laun_type_id: 1 },
    { laun_id: 12, customer_name: "Winnie Alterado Damayo", laun_priority: 2, laun_weight: 2, laun_date_received: "2026-06-24 15:34:00", laun_claimed: 1, laun_type_id: 2 },
    { laun_id: 13, customer_name: "Winnie Alterado Damayo", laun_priority: 4, laun_weight: 10, laun_date_received: "2026-06-24 15:35:00", laun_claimed: 1, laun_type_id: 1 },
    { laun_id: 14, customer_name: "Winnie Damayo", laun_priority: 2, laun_weight: 2, laun_date_received: "2026-06-24 15:36:00", laun_claimed: 0, laun_type_id: 1 }
];

const defaultSales = [
    { sale_id: 1, sale_customer_name: "Reyvelyn Ybanez Viovicente", sale_type_desc: "Blanket", sale_date_paid: "2026-06-24 15:30:00", sale_laundry_received: "2026-06-24 15:20:00", sale_amount: 60 },
    { sale_id: 2, sale_customer_name: "Jane Dougah Hah", sale_type_desc: "Clothes", sale_date_paid: "2026-06-24 15:32:00", sale_laundry_received: "2026-06-24 15:22:00", sale_amount: 60 },
    { sale_id: 3, sale_customer_name: "Winnie Alterado Damayo", sale_type_desc: "Blanket", sale_date_paid: "2026-06-24 15:31:00", sale_laundry_received: "2026-06-24 15:21:00", sale_amount: 40 },
    { sale_id: 4, sale_customer_name: "Johnny Deep", sale_type_desc: "Blanket", sale_date_paid: "2026-06-24 15:33:00", sale_laundry_received: "2026-06-24 15:23:00", sale_amount: 60 },
    { sale_id: 5, sale_customer_name: "Winnie Alterado Damayo", sale_type_desc: "Clothes", sale_date_paid: "2026-06-24 15:34:00", sale_laundry_received: "2026-06-24 15:24:00", sale_amount: 60 },
    { sale_id: 6, sale_customer_name: "Winnie Alterado Damayo", sale_type_desc: "Blanket", sale_date_paid: "2026-06-24 15:35:00", sale_laundry_received: "2026-06-24 15:25:00", sale_amount: 200 }
];

if (!localStorage.getItem('laundry_types')) {
    localStorage.setItem('laundry_types', JSON.stringify(defaultTypes));
}
if (!localStorage.getItem('laundries')) {
    localStorage.setItem('laundries', JSON.stringify(defaultLaundries));
}
if (!localStorage.getItem('sales')) {
    localStorage.setItem('sales', JSON.stringify(defaultSales));
}

// Redirect if session is not set
if (localStorage.getItem('session_user') !== 'admin' && !window.location.pathname.endsWith('index.html')) {
    window.location.href = 'index.html';
}

function getTypes() {
    return JSON.parse(localStorage.getItem('laundry_types'));
}

function getLaundries() {
    return JSON.parse(localStorage.getItem('laundries'));
}

function getSales() {
    return JSON.parse(localStorage.getItem('sales'));
}

function saveTypes(types) {
    localStorage.setItem('laundry_types', JSON.stringify(types));
}

function saveLaundries(laundries) {
    localStorage.setItem('laundries', JSON.stringify(laundries));
}

function saveSales(sales) {
    localStorage.setItem('sales', JSON.stringify(sales));
}

function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

// Populate laundry type dropdown in New/Edit Laundry Modal
function populateTypeDropdown() {
    const types = getTypes();
    let options = '';
    types.forEach(t => {
        options += `<option value="${t.laun_type_id}">${t.laun_type_desc}</option>`;
    });
    $('#newlaun-type').html(options);
}

// Display Type Table
function all_type() {
    const types = getTypes();
    let rows = '';
    types.forEach(t => {
        rows += `
        <tr align="center">
            <td align="left">${t.laun_type_desc}</td>
            <td>₱ ${parseFloat(t.laun_type_price).toFixed(2)}</td>
            <td>
                <button onclick="editType('${t.laun_type_id}');" type="button" class="btn btn-warning btn-xs">Edit
                    <span class="glyphicon glyphicon-edit" aria-hidden="true"></span>
                </button>
            </td>
        </tr>`;
    });

    const tableHTML = `
    <br />
    <div class="table-responsive">
        <table id="myTable-type" class="table table-bordered table-hover table-striped">
            <thead>
                <tr>
                    <th>Laundry Type Description</th>
                    <th><center>Price / Kg</center></th>
                    <th><center>Action</center></th>
                </tr>
            </thead>
            <tbody>
                ${rows}
            </tbody>
        </table>
    </div>`;
    $('#table-type').html(tableHTML);
    $('#myTable-type').DataTable();
}

// Edit Type
function editType(type_id) {
    const types = getTypes();
    const type = types.find(t => t.laun_type_id == type_id);
    if (type) {
        $('#type-type').val('edit');
        $('#type-id').val(type.laun_type_id);
        $('#type').val(type.laun_type_desc);
        $('#price').val(type.laun_type_price);
        $('#modal-lau-type').find('.modal-title').text('Edit Laundry Type');
        $('#modal-lau-type').modal('show');
    }
}

// Show insert type modal
$('#newType').click(function(event) {
    $('#type-type').val('insert');
    $('#type').val('');
    $('#price').val('');
    $('#modal-lau-type').find('.modal-title').text('New Laundry Type');
    $('#modal-lau-type').modal('show');
});

// Insert/Edit type submission
$(document).on('submit', '#form-type', function(event) {
    event.preventDefault();
    const type_id = $('#type-id').val();
    const desc = $('#type').val();
    const price = parseFloat($('#price').val());
    const type_type = $('#type-type').val();

    let types = getTypes();
    if (type_type === 'insert') {
        const nextId = types.length > 0 ? Math.max(...types.map(t => t.laun_type_id)) + 1 : 1;
        types.push({ laun_type_id: nextId, laun_type_desc: desc, laun_type_price: price });
        saveTypes(types);
        $('#modal-lau-type').modal('hide');
        all_type();
        $('#modal-msg').find('#msg-body').text('Type Added Successfully!');
        $('#modal-msg').modal('show');
    } else if (type_type === 'edit') {
        const index = types.findIndex(t => t.laun_type_id == type_id);
        if (index !== -1) {
            types[index].laun_type_desc = desc;
            types[index].laun_type_price = price;
            saveTypes(types);
            $('#modal-lau-type').modal('hide');
            all_type();
            $('#modal-msg').find('#msg-body').text('Type Updated Successfully!');
            $('#modal-msg').modal('show');
        }
    }
});

// Display Laundry Table
function all_laundry() {
    const laundries = getLaundries().filter(l => l.laun_claimed == 0);
    const types = getTypes();
    let rows = '';

    laundries.forEach(l => {
        const type = types.find(t => t.laun_type_id == l.laun_type_id) || { laun_type_desc: 'Unknown', laun_type_price: 0 };
        const amount = l.laun_weight * type.laun_type_price;
        rows += `
        <tr align="center">
            <td><input type="checkbox" name="imSlepy" value="${l.laun_id}"></td>
            <td align="left">${l.customer_name}</td>
            <td>${l.laun_priority}</td>
            <td>${l.laun_weight}</td>
            <td>${type.laun_type_desc}</td>
            <td>${l.laun_date_received}</td>
            <td>₱ ${amount.toFixed(2)}</td>
            <td>
                <button onclick="editLaundry('${l.laun_id}')" type="button" class="btn btn-warning btn-xs">
                    Edit <span class="glyphicon glyphicon-edit" aria-hidden="true"></span>
                </button>
            </td>
        </tr>`;
    });

    const tableHTML = `
    <br />
    <div class="table-responsive">
        <table id="myTable-laundry" class="table table-bordered table-hover table-striped">
            <thead>
                <tr>
                    <th></th>
                    <th>Customer Name</th>
                    <th><center>Priority #</center></th>
                    <th><center>Weight</center></th>
                    <th><center>Type</center></th>
                    <th><center>Date Received</center></th>
                    <th><center>Amount</center></th>
                    <th><center>Action</center></th>
                </tr>
            </thead>
            <tbody>
                ${rows}
            </tbody>
        </table>
    </div>`;
    $('#table-laundry').html(tableHTML);
    $('#myTable-laundry').DataTable();
}

// Show new laundry modal
$('#newLaun').click(function(event) {
    populateTypeDropdown();
    $('#laun-type').val('insert');
    $('#customer').val('');
    $('#priority').val('');
    $('#weight').val('');
    $('#modal-laun').find('.modal-title').text('New Laundry');
    $('#modal-laun').modal('show');
});

// Insert/Edit laundry submission
$(document).on('submit', '#form-new-laun', function(event) {
    event.preventDefault();
    const modal_type = $('#laun-type').val();
    const laun_id = $('#laun-id').val();
    const customer = $('#customer').val();
    const priority = parseInt($('#priority').val());
    const weight = parseFloat($('#weight').val());
    const type_id = parseInt($('#newlaun-type').val());

    let laundries = getLaundries();
    if (modal_type === 'insert') {
        const nextId = laundries.length > 0 ? Math.max(...laundries.map(l => l.laun_id)) + 1 : 1;
        laundries.push({
            laun_id: nextId,
            customer_name: customer,
            laun_priority: priority,
            laun_weight: weight,
            laun_date_received: formatDate(new Date()),
            laun_claimed: 0,
            laun_type_id: type_id
        });
        saveLaundries(laundries);
        all_laundry();
        $('#modal-laun').modal('hide');
        $('#modal-msg').find('#msg-body').text('Laundry Added Successfully!');
        $('#modal-msg').modal('show');
    } else if (modal_type === 'edit') {
        const index = laundries.findIndex(l => l.laun_id == laun_id);
        if (index !== -1) {
            laundries[index].customer_name = customer;
            laundries[index].laun_priority = priority;
            laundries[index].laun_weight = weight;
            laundries[index].laun_type_id = type_id;
            saveLaundries(laundries);
            all_laundry();
            $('#modal-laun').modal('hide');
            $('#modal-msg').find('#msg-body').text('Laundry Updated Successfully!');
            $('#modal-msg').modal('show');
        }
    }
});

// Edit Laundry
function editLaundry(laun_id) {
    populateTypeDropdown();
    const laundries = getLaundries();
    const laundry = laundries.find(l => l.laun_id == laun_id);
    if (laundry) {
        $('#laun-type').val('edit');
        $('#laun-id').val(laundry.laun_id);
        $('#customer').val(laundry.customer_name);
        $('#priority').val(laundry.laun_priority);
        $('#weight').val(laundry.laun_weight);
        $('#newlaun-type').val(laundry.laun_type_id);
        $('#modal-laun').find('.modal-title').text('Edit Laundry');
        $('#modal-laun').modal('show');
    }
}

// Delete Laundry Modal Trigger
$('#delLaun').click(function(event) {
    let haveCheck = false;
    $('input[name=imSlepy]:checked').each(function() {
        haveCheck = true;
    });

    if (haveCheck == false) {
        alert('Please check the row(s) that you want to delete.');
    } else {
        $('#confirm-type').val('delete-laundry');
        $('#modal-confirm').modal('show');
    }
});

// Claim Laundry Modal Trigger
$('#claim').click(function(event) {
    let haveCheck = false;
    $('input[name=imSlepy]:checked').each(function() {
        haveCheck = true;
    });

    if (haveCheck == false) {
        alert('Please check the row(s) that you want to claim.');
    } else {
        $('#confirm-type').val('claim-laundry');
        $('#modal-confirm').modal('show');
    }
});

// Confirm modal Action
$('#confirm-yes').click(function(event) {
    const confirmType = $('#confirm-type').val();
    let laundries = getLaundries();
    let sales = getSales();
    const types = getTypes();

    if (confirmType === 'delete-laundry') {
        $('input[name=imSlepy]:checked').each(function() {
            const id = $(this).val();
            laundries = laundries.filter(l => l.laun_id != id);
        });
        saveLaundries(laundries);
        $('#modal-confirm').modal('hide');
        $('#modal-msg').find('#msg-body').text('Deleted Successfully!');
        $('#modal-msg').modal('show');
    } else if (confirmType === 'claim-laundry') {
        const currentDateStr = formatDate(new Date());
        $('input[name=imSlepy]:checked').each(function() {
            const id = $(this).val();
            const index = laundries.findIndex(l => l.laun_id == id);
            if (index !== -1) {
                laundries[index].laun_claimed = 1;
                const type = types.find(t => t.laun_type_id == laundries[index].laun_type_id) || { laun_type_desc: 'Unknown', laun_type_price: 0 };
                const amount = laundries[index].laun_weight * type.laun_type_price;
                const nextSaleId = sales.length > 0 ? Math.max(...sales.map(s => s.sale_id)) + 1 : 1;
                sales.push({
                    sale_id: nextSaleId,
                    sale_customer_name: laundries[index].customer_name,
                    sale_type_desc: type.laun_type_desc,
                    sale_date_paid: currentDateStr,
                    sale_laundry_received: laundries[index].laun_date_received,
                    sale_amount: amount
                });
            }
        });
        saveLaundries(laundries);
        saveSales(sales);
        $('#modal-confirm').modal('hide');
        $('#modal-msg').find('#msg-body').text('Claimed and Paid Successfully!');
        $('#modal-msg').modal('show');
    }
    all_laundry();
});

// Daily Sales Report date choice
$('#dailySale').change(function(event) {
    const date = $(this).val();
    if (!date) {
        $('#printBut').hide();
    } else {
        $('#printBut').show();
    }
    loadSale();
});

// Load and render sales report
function loadSale() {
    const selectedDate = $('#dailySale').val();
    if (!selectedDate) {
        $('#table-sales').html('<div class="alert alert-info">Please select a date to view sales report.</div>');
        return;
    }

    const sales = getSales();
    const filteredSales = sales.filter(s => s.sale_date_paid.startsWith(selectedDate));
    let rows = '';
    let total = 0;

    filteredSales.forEach(s => {
        total += s.sale_amount;
        rows += `
        <tr align="center">
            <td align="left">${s.sale_customer_name}</td>
            <td>${s.sale_type_desc}</td>
            <td>${s.sale_laundry_received}</td>
            <td>${s.sale_date_paid}</td>
            <td>₱ ${parseFloat(s.sale_amount).toFixed(2)}</td>
        </tr>`;
    });

    const tableHTML = `
    <br />
    <div class="table-responsive">
        <table id="myTable-report" class="table table-bordered table-hover table-striped">
            <thead>
                <tr>
                    <th>Customer Name</th>
                    <th><center>Type</center></th>
                    <th><center>Laundry Received</center></th>
                    <th><center>Date Paid</center></th>
                    <th><center>Amount</center></th>
                </tr>
            </thead>
            <tbody>
                ${rows}
            </tbody>
            <tfoot>
                <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td align="right"><strong>TOTAL:</strong></td>
                    <td align="center"><strong>₱ ${total.toFixed(2)}</strong></td>
                </tr>
            </tfoot>
        </table>
    </div>`;

    $('#table-sales').html(tableHTML);
    $('#myTable-report').DataTable();
}

// Print action
$('#print-button').click(function(event) {
    const date = $('#dailySale').val();
    // Open a mock printable window and pass date via query param
    window.open(`print.html?date=${date}`, 'Print Invoice', 'width=800,height=600');
});

// Password triggers
$('#changePass').click(function(event) {
    $('#modal-pass').find('.modal-title').text('Change Password');
    $('#pwd').val('');
    $('#pwd2').val('');
    $('#modal-pass').modal('show');
});

$(document).on('submit', '#form-change', function(event) {
    event.preventDefault();
    const pwd = $('#pwd').val();
    const pwd2 = $('#pwd2').val();
    if (pwd !== pwd2) {
        alert("Password Not Match!");
    } else {
        localStorage.setItem('admin_password', pwd);
        $('#modal-pass').modal('hide');
        $('#modal-msg').find('#msg-body').text('Password Changed Successfully!');
        $('#modal-msg').modal('show');
    }
});

// Load appropriate lists on document ready
$(document).ready(function() {
    if ($('#table-type').length > 0) {
        all_type();
    }
    if ($('#table-laundry').length > 0) {
        all_laundry();
    }
    if ($('#table-sales').length > 0) {
        loadSale();
    }
});
