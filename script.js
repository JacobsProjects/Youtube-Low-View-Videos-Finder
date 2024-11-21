function getRandomItem(array) {
    return array[Math.floor(Math.random() * array.length)];
}

function generateRandomString() {
    const length = Math.floor(Math.random() * 4) + 1;
    const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

async function searchVideo() {
    const apiKey = document.getElementById('apiKey').value;
    const viewThreshold = document.getElementById('viewCount').value;
    const searchTerms = document.getElementById('searchTerms').value.trim();
    const errorDiv = document.getElementById('error');
    const infoDiv = document.getElementById('info');
    const loadingDiv = document.getElementById('loading');
    const videoContainer = document.getElementById('videoContainer');
    const searchButton = document.getElementById('searchButton');

    const selectedRegions = Array.from(document.querySelectorAll('#regionSelection input:checked'))
        .map(checkbox => checkbox.value);

    const maxAttempts = parseInt(document.getElementById('searchAttempts').value) || 5;

    if (!apiKey || !viewThreshold) {
        errorDiv.textContent = 'Please enter both API key and view count';
        return;
    }

    if (selectedRegions.length === 0) {
        errorDiv.textContent = 'Please select at least one region';
        return;
    }

    errorDiv.textContent = '';
    infoDiv.textContent = '';
    videoContainer.innerHTML = '';
    loadingDiv.style.display = 'block';
    searchButton.disabled = true;

    try {
        let attempt = 0;
        let foundVideo = false;

        while (attempt < maxAttempts && !foundVideo) {
            attempt++;
            infoDiv.textContent = `Attempt ${attempt} of ${maxAttempts}...`;

            const startDate = new Date('2005-04-23').getTime();
            const endDate = new Date().getTime();
            const randomDate = new Date(startDate + Math.random() * (endDate - startDate));
            const publishedBefore = new Date(randomDate.getTime() + (30 * 24 * 60 * 60 * 1000)); // 30 days after random date
            
            const searchParams = new URLSearchParams({
                part: 'snippet',
                type: 'video',
                videoEmbeddable: 'true',
                maxResults: '50',
                key: apiKey,
                regionCode: getRandomItem(selectedRegions),
                publishedBefore: publishedBefore.toISOString(),
                publishedAfter: randomDate.toISOString(),
                safeSearch: 'moderate'
            });

            if (searchTerms) {
                searchParams.append('q', searchTerms);
            } else {
                searchParams.append('q', generateRandomString());
            }

            const searchResponse = await fetch(
                `https://www.googleapis.com/youtube/v3/search?${searchParams}`
            );

            if (!searchResponse.ok) {
                throw new Error('Failed to fetch videos. Please check your API key.');
            }

            const searchData = await searchResponse.json();
            
            if (searchData.items.length === 0) {
                continue;
            }

            const videoIds = searchData.items.map(item => item.id.videoId).join(',');
            const statsResponse = await fetch(
                `https://www.googleapis.com/youtube/v3/videos?part=statistics,snippet&id=${videoIds}&key=${apiKey}`
            );

            if (!statsResponse.ok) {
                throw new Error('Failed to fetch video statistics');
            }

            const statsData = await statsResponse.json();
            
            const lowViewVideos = statsData.items.filter(
                item => parseInt(item.statistics.viewCount) < parseInt(viewThreshold)
            );

            if (lowViewVideos.length > 0) {
                const selectedVideo = lowViewVideos[Math.floor(Math.random() * lowViewVideos.length)];
                
                videoContainer.innerHTML = `
                    <div class="video-info">
                        <h3>${selectedVideo.snippet.title}</h3>
                        <p>Views: ${selectedVideo.statistics.viewCount}</p>
                        <p>Published: ${new Date(selectedVideo.snippet.publishedAt).toLocaleDateString()}</p>
                        <p>Channel: ${selectedVideo.snippet.channelTitle}</p>
                    </div>
                    <iframe
                        src="https://www.youtube.com/embed/${selectedVideo.id}"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowfullscreen
                    ></iframe>
                `;
                foundVideo = true;
                break;
            }
        }

        if (!foundVideo) {
            errorDiv.textContent = 'No videos found under the specified view count after multiple attempts. Try increasing the view threshold or selecting more regions.';
        }

    } catch (err) {
        errorDiv.textContent = err.message;
    } finally {
        loadingDiv.style.display = 'none';
        infoDiv.textContent = '';
        searchButton.disabled = false;
    }
}

function generateRandomString() {
    const length = Math.floor(Math.random() * 4) + 1;
    const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

function getRandomItem(array) {
    return array[Math.floor(Math.random() * array.length)];
}