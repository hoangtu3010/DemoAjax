document.addEventListener("DOMContentLoaded", function () {
    var xhr = new XMLHttpRequest();

    // Xử lí kết quả trả về
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            let tableTag = document.querySelector("#data_table");
            let data = JSON.parse(xhr.responseText);
            for (let i = 0; i < data.length; i++) {
                let element = data[i];
                tableTag.innerHTML += `<tr>
                        <th scope="row">${element.id}</th>
                        <td>${element.name}</td>
                        <td>${element.description}</td>
                        <td>${element.price}</td>
                        <td>${element.status}</td>
                        <td width="20%"> <i class="bi bi-trash3" onclick="deleteProduct(${element.id})" style="cursor: pointer"></i> <i class="bi bi-pencil-square"  onclick="editProduct(${element.id})" style="cursor: pointer"></i> </td>
                    </tr>`;
            }
        }
    };

    // Xác định gửi đi đâu, theo cách nào
    xhr.open("GET", "http://localhost:8080/api/v1/products", false);

    // Gửi đi
    xhr.send();
});

function deleteProduct(id) {
    if (id == undefined || id == null) {
        return;
    }

    if (confirm("Are you sure?")) {
        var xhr = new XMLHttpRequest();

        // Xử lí kết quả trả về
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                alert("Delete Successfully!!!")
                window.location.href = '/view/product/index.html'
            }
        };

        // Xác định gửi đi đâu, theo cách nào
        xhr.open("DELETE", "http://localhost:8080/api/v1/products/" + id, false);

        // Gửi đi
        xhr.send();
    }
}

function editProduct(id) {
    window.location.href = `/view/product/form.html?id=${id}`
}
