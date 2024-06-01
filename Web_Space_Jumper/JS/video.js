document.addEventListener('DOMContentLoaded', function() {
    const video = document.getElementById('gameplay-video');
    const muteToggleButton = document.getElementById('mute-toggle-button');

    video.play().catch(function() {
        video.muted = true;
        video.play();
    });

    muteToggleButton.addEventListener('click', function() {
        if (video.muted) {
            video.muted = false;
            muteToggleButton.textContent = 'Désactiver le son';
        } else {
            video.muted = true;
            muteToggleButton.textContent = 'Activer le son';
        }
        video.play();
    });
});