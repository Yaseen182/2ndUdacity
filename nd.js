document.addEventListener('DOMContentLoaded', () => {
    const sections = Array.from(document.querySelectorAll('section'));
    const navList = document.getElementById('navbar');
    const scrollToTopButton = document.getElementById('scrollToTop');

    sections.forEach(section => {
        const navItem = document.createElement('li');
        const navLink = document.createElement('a');
        navLink.textContent = section.getAttribute('data-nav');  
        navLink.href = `#${section.id}`;  
        navLink.classList.add('menu__link');
        navItem.appendChild(navLink);
        navList.appendChild(navItem);
    });

    
    navList.addEventListener('click', (event) => {
        event.preventDefault();
        if (event.target.nodeName === 'A') {
            const targetSection = document.querySelector(event.target.getAttribute('href'));
            targetSection.scrollIntoView({ behavior: 'smooth' });
        }
    });

    
    window.addEventListener('scroll', () => {
        let currentSection = null;
        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            if (rect.top >= 0 && rect.top < window.innerHeight / 2) {
                currentSection = section;
            }
        });

       
        sections.forEach(section => {
            section.classList.remove('your-active-class');
        });

       
        if (currentSection) {
            currentSection.classList.add('your-active-class');
        }

     
        document.querySelectorAll('.menu__link').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection?.id}`) {
                link.classList.add('active');
            }
        });
    });

  
    window.addEventListener('scroll', () => {
        if (window.scrollY > 200) {
            scrollToTopButton.style.display = 'block';
        } else {
            scrollToTopButton.style.display = 'none';
        }
    });


    scrollToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});
