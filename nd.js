document.addEventListener('DOMContentLoaded', () => {
    // Select all sections and convert NodeList to an array
    const sections = Array.from(document.querySelectorAll('section'));
    // Get the navigation list element
    const navList = document.getElementById('navbar');
    // Get the "scroll to top" button element
    const scrollToTopButton = document.getElementById('scrollToTop');

    // Create navigation items for each section
    sections.forEach(section => {
        const navItem = document.createElement('li'); // Create a list item
        const navLink = document.createElement('a'); // Create a link
        navLink.textContent = section.getAttribute('data-nav');  // Set the link text to the section's data-nav attribute
        navLink.href = `#${section.id}`;  // Set the link href to the section's id
        navLink.classList.add('menu__link'); // Add a class to the link for styling
        navItem.appendChild(navLink); // Append the link to the list item
        navList.appendChild(navItem); // Append the list item to the navigation list
    });

    // Smooth scrolling to section on navigation item click
    navList.addEventListener('click', (event) => {
        event.preventDefault(); // Prevent default link behavior
        if (event.target.nodeName === 'A') { // Check if the clicked element is a link
            const targetSection = document.querySelector(event.target.getAttribute('href')); // Get the target section
            targetSection.scrollIntoView({ behavior: 'smooth' }); // Scroll to the target section smoothly
        }
    });

    // Highlight the active section and corresponding navigation item on scroll
    window.addEventListener('scroll', () => {
        let currentSection = null; // Initialize variable to hold the current section
        sections.forEach(section => {
            const rect = section.getBoundingClientRect(); // Get the section's position relative to the viewport
            if (rect.top >= 0 && rect.top < window.innerHeight / 2) { // Check if the section is in the viewport
                currentSection = section; // Set the current section
            }
        });

        // Remove active class from all sections
        sections.forEach(section => {
            section.classList.remove('your-active-class');
        });

        // Add active class to the current section
        if (currentSection) {
            currentSection.classList.add('your-active-class');
        }

        // Highlight the corresponding navigation link
        document.querySelectorAll('.menu__link').forEach(link => {
            link.classList.remove('active'); // Remove active class from all links
            if (link.getAttribute('href') === `#${currentSection?.id}`) { // Check if the link corresponds to the current section
                link.classList.add('active'); // Add active class to the corresponding link
            }
        });
    });

    // Show or hide the "scroll to top" button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.scrollY > 200) { // If the scroll position is greater than 200px
            scrollToTopButton.style.display = 'block'; // Show the button
        } else {
            scrollToTopButton.style.display = 'none'; // Hide the button
        }
    });

    // Scroll to the top of the page on "scroll to top" button click
    scrollToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth' // Scroll to the top smoothly
        });
    });
});
