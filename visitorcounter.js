
function updateVisitorCount() {
    fetch('counter.php')
        .then(response => response.json())
        .then(data => {
            document.getElementById('visitorCount').textContent = data.count;
        })
        .catch(error => console.error('Error:', error));
}
function updateVisitorCount() {
    let count = localStorage.getItem('visitorCount');
    if (!count) count = 0;
    count = parseInt(count) + 1;
    localStorage.setItem('visitorCount', count);
    document.getElementById('visitorCount').textContent = count;
}
updateVisitorCount();