document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('add-car-form');
    const imageInput = document.getElementById('image');
    const imagePreview = document.getElementById('image-preview');

    // 图片预览功能
    imageInput.addEventListener('change', function (e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (event) {
                imagePreview.src = event.target.result;
                imagePreview.style.display = 'block';
            };
            reader.readAsDataURL(file);
        } else {
            imagePreview.style.display = 'none';
        }
    });

    // 表单提交处理（模拟发布逻辑）
    form.addEventListener('submit', function (e) {
        e.preventDefault();

        // 获取表单数据
        const colour = document.getElementById('colour').value;
        const model = document.getElementById('model').value;
        const year = document.getElementById('year').value;
        const location = document.getElementById('location').value;
        const price = document.getElementById('price').value;
        const imageFile = imageInput.files[0];

        // 模拟发布成功（实际项目中需发送到后端API）
     alert(`Car publi   shed successfully!\nDetails:\nColor: ${colour}\nModel: ${model}\nYear: ${year}\nLocation: ${location}\nPrice: £${price}`);

        // 可选：重置表单
        form.reset();
        imagePreview.style.display = 'none';
    });
});

