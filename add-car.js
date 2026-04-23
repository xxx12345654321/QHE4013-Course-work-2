document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    document.querySelectorAll('.nav-menu a').forEach(n => n.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }));
});

// ===================== 页面原有JS（未改动） =====================
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('add-car-form');
    const fileInput = document.getElementById('car-image');
    const uploadArea = document.getElementById('upload-area');
    const imagePreview = document.getElementById('imagePreview');
    
    uploadArea.addEventListener('click', function() {
        fileInput.click();
    });
    
    uploadArea.addEventListener('dragover', function(e) {
        e.preventDefault();
        this.style.borderColor = '#3498db';
        this.style.backgroundColor = '#edf5fc';
    });
    
    uploadArea.addEventListener('dragleave', function() {
        this.style.borderColor = '#bdc3c7';
        this.style.backgroundColor = '#f9fbfd';
    });
    
    uploadArea.addEventListener('drop', function(e) {
        e.preventDefault();
        this.style.borderColor = '#bdc3c7';
        this.style.backgroundColor = '#f9fbfd';
        
        if (e.dataTransfer.files.length) {
            fileInput.files = e.dataTransfer.files;
            handleImagePreview(e.dataTransfer.files[0]);
        }
    });
    
    fileInput.addEventListener('change', function() {
        if (this.files && this.files[0]) {
            handleImagePreview(this.files[0]);
        } else {
            imagePreview.style.display = 'none';
        }
    });
    
    function handleImagePreview(file) {
        const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
        const maxSize = 5 * 1024 * 1024;
        
        if (!validTypes.includes(file.type)) {
            alert('Please upload a valid image file (JPG, PNG, or WebP).');
            fileInput.value = '';
            return;
        }
        
        if (file.size > maxSize) {
            alert('File size must be less than 5MB.');
            fileInput.value = '';
            return;
        }
        
        const reader = new FileReader();
        reader.onload = function(event) {
            imagePreview.innerHTML = `<img src="${event.target.result}" alt="Car Image Preview">`;
            imagePreview.style.display = 'block';
        };
        reader.readAsDataURL(file);
    }
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const color = document.getElementById('color').value;
        const model = document.getElementById('model').value;
        const year = parseInt(document.getElementById('year').value);
        const location = document.getElementById('location').value;
        const price = parseFloat(document.getElementById('price').value);
        
        if (!validateForm(color, model, year, location, price)) {
            return;
        }
        
        const submitBtn = form.querySelector('.submit-btn');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Publishing...';
        submitBtn.disabled = true;
        
        setTimeout(function() {
            alert(`Car published successfully!\n\nDetails:\n• Color: ${color}\n• Model: ${model}\n• Year: ${year}\n• Location: ${location}\n• Price: ¥${price.toFixed(2)}`);
            form.reset();
            imagePreview.style.display = 'none';
            imagePreview.innerHTML = '';
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 1500);
    });
    
    function validateForm(color, model, year, location, price) {
        if (!color.trim()) {
            alert('Please enter car color.');
            return false;
        }
        if (!model.trim()) {
            alert('Please enter car model.');
            return false;
        }
        if (year < 1990 || year > 2026) {
            alert('Please enter a valid year between 1990 and 2026.');
            return false;
        }
        if (!location.trim()) {
            alert('Please enter location.');
            return false;
        }
        if (price <= 0) {
            alert('Please enter a valid price greater than 0.');
            return false;
        }
        if (!fileInput.files[0]) {
            alert('Please upload an image of the car.');
            return false;
        }
        return true;
    }
});