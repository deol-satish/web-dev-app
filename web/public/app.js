const API_URL = 'http://localhost:5000/api/'

console.log("From App.js")


$.get(`${API_URL}test`).done(function(data){
    console.log("test response:",data)
})

var AllItems;

$.get(`${API_URL}ViewAllItems`).done(function(data){
    AllItems = data;
    console.log("test response:",data);

    const $tbody = $('#body');
    $tbody.empty();
    AllItems.forEach(item =>{
        const row = `<tr>
        <td>${item.item_name || "N/A"}</td>
        <td>${item.stock_level ?? "N/A"}</td>
        <td>${item.reorderThreshold ?? "N/A"}</td>
        <td>${item.status || "Unknown"}</td>
        <td><button class="ui icon mini button">
        <i class="chart bar outline icon"></i>
        </button> 
        </td>
        </tr>`;
        $tbody.append(row);

    });



}).fail(function(error){
    console.error("Error due to retrieving all Inventory list");
})

console.log(AllItems);
