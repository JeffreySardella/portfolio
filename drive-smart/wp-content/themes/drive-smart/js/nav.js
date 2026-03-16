document.addEventListener('DOMContentLoaded', function() {
    // Mobile hamburger toggle
    var toggle = document.querySelector('.nav-toggle');
    var nav = document.querySelector('.site-nav');
    if (toggle && nav) {
        toggle.addEventListener('click', function() {
            var expanded = toggle.getAttribute('aria-expanded') === 'true';
            toggle.setAttribute('aria-expanded', !expanded);
            nav.classList.toggle('open');
        });
    }

    // Category dropdown toggle
    var dropdownBtn = document.querySelector('.nav-dropdown-toggle');
    var dropdownMenu = document.querySelector('.nav-dropdown-menu');
    if (dropdownBtn && dropdownMenu) {
        dropdownBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            var expanded = dropdownBtn.getAttribute('aria-expanded') === 'true';
            dropdownBtn.setAttribute('aria-expanded', !expanded);
            dropdownMenu.classList.toggle('open');
        });

        document.addEventListener('click', function() {
            dropdownBtn.setAttribute('aria-expanded', 'false');
            dropdownMenu.classList.remove('open');
        });
    }
});
