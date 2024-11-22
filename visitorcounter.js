    const namespace = 'noviewvideolookup-site';
    
    async function updateVisitorCount() {
        try {
            const response = await fetch(`https://api.countapi.xyz/hit/${namespace}/visits`);
            const data = await response.json();
            document.getElementById('visitorCount').textContent = data.value;
        } catch (error) {
            console.error('Error updating visitor count:', error);
        }
    }

    updateVisitorCount();
