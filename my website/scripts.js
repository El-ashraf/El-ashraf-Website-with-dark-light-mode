// scripts.js

document.addEventListener('DOMContentLoaded', function() {
    const toggleButton = document.getElementById('toggle-mode');
    
    // Check if the light mode is already set
    if (localStorage.getItem('theme') === 'light') {
        document.body.classList.add('light-mode');
        toggleButton.textContent = 'Switch to Dark Mode';
    }

    // Toggle between light and dark mode
    toggleButton.addEventListener('click', function() {
        if (document.body.classList.contains('light-mode')) {
            document.body.classList.remove('light-mode');
            toggleButton.textContent = 'Switch to Light Mode';
            localStorage.setItem('theme', 'dark');
        } else {
            document.body.classList.add('light-mode');
            toggleButton.textContent = 'Switch to Dark Mode';
            localStorage.setItem('theme', 'light');
        }
    });
});
