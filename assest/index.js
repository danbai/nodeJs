window.onload = function() {
    document.querySelector('h1').onclick = function() {
        if (this.className === 'current') {
            this.className = '';
        } else {
            this.className = 'current';
        }
    }
}