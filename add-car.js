document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('add-car-form');
    const imageInput = document.getElementById('image');
    const imagePreview = document.getElementById('image-preview');
    const imageUploadArea = document.querySelector('.image-upload-area');

    // 图片上传区域交互
    imageUploadArea.addEventListener('click', () => imageInput.click());
    
    // 拖放功能
    imageUploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        imageUploadArea.style.borderColor = '#3498db';
        imageUploadArea.style.backgroundColor = '#e3f2fd';
    });
    
    imageUploadArea.addEventListener('dragleave', () => {
        imageUploadArea.style.borderColor = '#bdc3c7';
        imageUploadArea.style.backgroundColor = '#f9fbfd';
    });
    
    imageUploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        imageUploadArea.style.borderColor = '#bdc3c7';
        imageUploadArea.style.backgroundColor = '#f9fbfd';
        if (e.dataTransfer.files.length) {
            imageInput.files = e.dataTransfer.files;
            handleImagePreview(e.dataTransfer.files[0]);
        }
    });

    // 图片预览功能
    imageInput.addEventListener('change', function(e) {
        if (this.files && this.files[0]) {
            handleImagePreview(this.files[0]);
        } else {
            imagePreview.style.display = 'none';
        }
    });

    function handleImagePreview(file) {
        // 文件验证
        const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
        const maxSize = 5 * 1024 * 1024; // 5MB

        if (!validTypes.includes(file.type)) {
            alert('Please upload a valid image file (JPG, PNG, WebP).');
            imageInput.value = '';
            return;
        }
        
        if (file.size > maxSize) {
            alert('File size must be less than 5MB.');
            imageInput.value = '';
            return;
        }

        const reader = new FileReader();
        reader.onload = function(event) {
            imagePreview.src = event.target.result;
            imagePreview.style.display = 'block';
        };
        reader.readAsDataURL(file);
    }

    // 表单提交处理
    form.addEventListener('submit', function(e) {
        e.preventDefault();

        // 获取表单数据
        const colour = document.getElementById('colour').value;
        const model = document.getElementById('model').value;
        const year = document.getElementById('year').value;
        const location = document.getElementById('location').value;
        const price = document.getElementById('price').value;
        const imageFile = imageInput.files[0];

        // 验证表单数据
        if (!validateForm()) {
            return;
        }

        // 模拟发布成功
        alert(`Car published successfully!\n\nDetails:\n• Colour: ${colour}\n• Model: ${model}\n• Year: ${year}\n• Location: ${location}\n• Price: ¥${price}`);
        
        // 重置表单
        form.reset();
        imagePreview.style.display = 'none';
    });

    // 表单验证函数
    function validateForm() {
        const year = parseInt(document.getElementById('year').value);
        const price = parseFloat(document.getElementById('price').value);
        const imageFile = imageInput.files[0];
        
        // 验证年份
        if (year < 1990 || year > 2026) {
            alert('Please enter a valid year between 1990 and 2026.');
            return false;
        }
        
        // 验证价格
        if (price <= 0) {
            alert('Please enter a valid price greater than 0.');
            return false;
        }
        
        // 验证图片
        if (!imageFile) {
            alert('Please upload an image of the car.');
            return false;
        }
        
        return true;
    }
});
