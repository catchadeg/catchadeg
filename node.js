function fetchPhotos() {
  return fetch('/photos')
    .then(response => response.json())
    .then(data => data.photos)
    .catch(error => {
      console.error('Error fetching photos:', error);
      return [];
    });
}

function uploadPhoto(photoInfo) {
  return fetch('/photos', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(photoInfo)
  })
    .then(response => response.json())
    .catch(error => {
      console.error('Error uploading photo:', error);
      throw error;
    });
}
