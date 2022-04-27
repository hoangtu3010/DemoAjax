document.addEventListener("DOMContentLoaded", function () {
    var xhr = new XMLHttpRequest();

    // Xử lí kết quả trả về
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            let tableTag = document.querySelector("#data_table");
            let data = JSON.parse(xhr.responseText);

            for (let i = 0; i < data.length; i++) {
                let element = data[i];
                const created_at = new Date(element.created_at).toLocaleDateString(
                    "en",
                    {hour: "numeric", minute: "numeric"}
                );
                const updated_at = new Date(element.updated_at).toLocaleDateString(
                    "en",
                    {hour: "numeric", minute: "numeric"}
                );
                tableTag.innerHTML += `<tr>
                          <th scope="row">${element.id}</th>
                          <td><img src="${element.image}" width="80" /></td>
                          <td>${element.title}</td>
                          <td>${element.description}</td>
                          <td>${element.content}</td>
                          <td>${element.category}</td>
                          <td>${created_at}</td>
                          <td>${updated_at}</td>
                          <td>${element.status}</td>
                          <td width="20%"> <i class="bi bi-trash3" onclick="deleteProduct(${element.id})" style="cursor: pointer"></i> <i class="bi bi-pencil-square"  onclick="editProduct(${element.id})" style="cursor: pointer"></i> </td>
                      </tr>`;
            }
        }
    };

    // Xác định gửi đi đâu, theo cách nào
    xhr.open("GET", "http://localhost:8080/api/v1/articles", false);

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
                alert("Delete Successfully!!!");
                window.location.href = "/view/article/index.html";
            }
        };

        // Xác định gửi đi đâu, theo cách nào
        xhr.open("DELETE", "http://localhost:8080/api/v1/articles/" + id, false);

        // Gửi đi
        xhr.send();
    }
}

function editProduct(id) {
    window.location.href = `/view/article/form.html?id=${id}`;
}
