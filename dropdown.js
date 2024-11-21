document.addEventListener('DOMContentLoaded', () => {
    const dropdownBtn = document.getElementById('selectedRegions');
    const dropdownContent = document.getElementById('regionSelection');
    const checkboxes = dropdownContent.querySelectorAll('input[type="checkbox"]');

    function updateDropdownText() {
        const selectedRegions = Array.from(checkboxes)
            .filter(checkbox => checkbox.checked)
            .map(checkbox => checkbox.nextSibling.textContent.trim());

        if (selectedRegions.length === 0) {
            dropdownBtn.textContent = 'Select Regions';
        } else if (selectedRegions.length === 1) {
            dropdownBtn.textContent = selectedRegions[0];
        } else {
            dropdownBtn.textContent = `${selectedRegions.length} Regions Selected`;
        }
    }

    dropdownBtn.addEventListener('click', (event) => {
        event.stopPropagation();
        dropdownBtn.classList.toggle('active');
        dropdownContent.classList.toggle('show');
    });

    document.addEventListener('click', () => {
        dropdownBtn.classList.remove('active');
        dropdownContent.classList.remove('show');
    });

    dropdownContent.addEventListener('click', (event) => {
        event.stopPropagation();
    });

    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', updateDropdownText);
    });

    updateDropdownText();
});

    document.getElementById('checkAllBtn').addEventListener('click', function() {
        const checkboxes = document.querySelectorAll('#regionSelection input[type="checkbox"]');
        
        checkboxes.forEach(checkbox => {
            checkbox.checked = true;
        });
    });