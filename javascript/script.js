// NAV SCROLL
const nav = document.querySelector("nav");
if (nav) {
    window.addEventListener("scroll", function() {
        if (window.scrollY > 50) {
            nav.classList.add("scrolled");
        } else {
            nav.classList.remove("scrolled");
        }
    });
}

// TYPING EFFECT
const textElement = document.querySelector(".typing-text");
if (textElement) {
    const words = ["Video Editor", "Web Developer", "Graphic Designer", "Pet-lover"];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 150;

    function type() {
        const currentWord = words[wordIndex];
        if (isDeleting) {
            textElement.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 100;
        } else {
            textElement.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 150;
        }
        if (!isDeleting && charIndex === currentWord.length) {
            isDeleting = true;
            typeSpeed = 2000;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typeSpeed = 500;
        }
        setTimeout(type, typeSpeed);
    }
    type();
}

// CONTACT ME SLIDE UP
const contactMe = document.querySelector(".contact-me");
if (contactMe) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.querySelector("p").classList.add("appear");
            }
        });
    }, { threshold: 0.5 });
    observer.observe(contactMe);
}

// MOUSE PARALLAX & CURSOR GLOW
const hero = document.querySelector('.hero-background');
const glow = document.querySelector('.cursor-glow');
const heroImg = document.querySelector('.hero-image');

if (hero && glow) {
    let targetX = 0, targetY = 0, currentX = 0, currentY = 0;
    const ease = 0.05;

    window.addEventListener('mousemove', (e) => {
        targetX = (e.clientX - window.innerWidth / 2) / 60;
        targetY = (e.clientY - window.innerHeight / 2) / 40;
        const rect = hero.getBoundingClientRect();
        glow.style.left = `${e.clientX - rect.left}px`;
        glow.style.top = `${e.clientY - rect.top}px`;
    });

    function updateParallax() {
        currentX += (targetX - currentX) * ease;
        currentY += (targetY - currentY) * ease;
        if (heroImg) {
            heroImg.style.transform = `scale(1.2) translate(${currentX}px, ${currentY}px)`;
        }
        requestAnimationFrame(updateParallax);
    }
    updateParallax();

    const targets = hero.querySelectorAll('a, button, input, h1');
    targets.forEach(target => {
        target.addEventListener('mouseenter', () => glow.classList.add('large'));
        target.addEventListener('mouseleave', () => glow.classList.remove('large'));
    });
}

// CONTACT FORM
const form = document.getElementById("my-form");
const btn = document.getElementById("submit-btn");

if (form && btn) {
    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        btn.value = "Sending...";
        btn.style.opacity = "0.7";
        const data = new FormData(form);
        try {
            const response = await fetch(form.action, {
                method: form.method,
                body: data,
                headers: { 'Accept': 'application/json' }
            });
            if (response.ok) {
                btn.value = "Sent!";
                btn.style.backgroundColor = "#28a745";
                btn.style.opacity = "1";
                form.reset();
            } else {
                btn.value = "Error!";
            }
        } catch (error) {
            btn.value = "Try Again";
        }
    });
}

// PARTICLE GRID (index.html only)
const container = document.getElementById('particle-container');

// Only initialize if container exists, THREE is loaded, AND screen is desktop width
if (container && typeof THREE !== 'undefined' && window.innerWidth > 850) {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000);
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    const particlesGeometry = new THREE.BufferGeometry();
    const count = 3000;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i += 3) {
        positions[i] = (Math.random() - 0.5) * 2000;
        positions[i+1] = -500 + (Math.random() - 0.5) * 150;
        positions[i+2] = (Math.random() - 0.5) * 2000;
    }
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const particlesMaterial = new THREE.PointsMaterial({
        color: 0xf9004d,
        size: 2,
        transparent: true,
        opacity: 0.6
    });

    const particleSystem = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particleSystem);
    camera.position.z = 1200;
    camera.position.y = 400;

    let mouseX = 0, mouseY = 0;
    window.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX - window.innerWidth / 2) * 0.05;
        mouseY = (e.clientY - window.innerHeight / 2) * 0.05;
    });

    function animate() {
        // Stop the animation loop if the window is resized to mobile width later
        if (window.innerWidth <= 850) {
            container.style.display = 'none';
            return; 
        }

        requestAnimationFrame(animate);
        camera.position.x += (mouseX - camera.position.x) * 0.05;
        camera.position.y += (-mouseY + 400 - camera.position.y) * 0.05;
        camera.lookAt(new THREE.Vector3(0, -200, 0));
        renderer.render(scene, camera);
    }
    animate();

    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
} else if (container) {
    // Hide the container explicitly if we are on mobile from the start
    container.style.display = 'none';
}





// CERTIFICATE CAROUSEL
const certificates = [
    {
        image: "images/CodeSignal_Cert.png",
        title: "CodeSignal General Coding",
        text: "Achieved a high score in algorithmic problem solving and data structures.",
        link: "https://codesignal.com/learn/profile/cmkqy6p360004k304m5n9ylts"
    },
    {
        image: "images/Packet_Tracer_Cert.png",
        title: "Networking Essentials & Topology Design",
        text: "Certified in configuring complex network topologies using Cisco Packet Tracer, including VLAN implementation and router configuration.",
        link: "https://www.credly.com/badges/9bbe28de-691f-4a62-980e-a7e7d68b1083"
    },
    {
        image: "images/Premiere_Pro_Cert.png",
        title: "Video Editing Expert",
        text: "Certified in Adobe Premiere Pro for advanced cinematic storytelling.",
        link: "https://www.facebook.com/GraphicsmediatrainingPH"
    }
];

let currentCert = 0;

function initCarousel() {
    const img = document.getElementById('active-cert');
    const title = document.getElementById('cert-title');
    const text = document.getElementById('cert-text');
    if (!img || !title || !text) return;
    img.src = certificates[0].image;
    title.textContent = certificates[0].title;
    text.textContent = certificates[0].text;
}

function changeCert(direction) {
    const img = document.getElementById('active-cert');
    const title = document.getElementById('cert-title');
    const textElem = document.getElementById('cert-text');
    const btnElem = document.getElementById('cert-button');

    if (!img || !title || !textElem || !btnElem) return;

    img.style.opacity = 0;
    title.style.opacity = 0;
    textElem.style.opacity = 0;
    btnElem.style.opacity = 0;

    setTimeout(() => {
        currentCert = (currentCert + direction + certificates.length) % certificates.length;

        img.src = certificates[currentCert].image;
        title.textContent = certificates[currentCert].title;
        textElem.textContent = certificates[currentCert].text;
        btnElem.href = certificates[currentCert].link; // Update the button link

        img.style.opacity = 1;
        title.style.opacity = 1;
        textElem.style.opacity = 1;
        btnElem.style.opacity = 1;
    }, 300);
}


// 2. MODAL ZOOM LOGIC
const modal = document.getElementById('image-modal');
const activeCert = document.getElementById('active-cert');
const modalImg = document.getElementById('img-zoom');

if (activeCert && modal) {
    // Open Modal
    activeCert.addEventListener('click', () => {
        modal.style.display = "block";
        modalImg.src = activeCert.src;
        // Trigger the zoom animation after a tiny delay
        setTimeout(() => modal.classList.add('active'), 10);
    });

    // Close Modal when clicking background or X
    modal.addEventListener('click', () => {
        modal.classList.remove('active');
        setTimeout(() => modal.style.display = "none", 400); // Wait for animation
    });
}

// SCROLL ANIMATION
window.addEventListener('scroll', () => {
    const demoSection = document.querySelector('.demo-reel-section');
    const demoText = document.querySelector('.scrolling-text');
    const demoTextReverse = document.querySelector('.scrolling-text-reverse');

    if (demoSection && demoText) {
        const rect = demoSection.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        if (rect.top < windowHeight && rect.bottom > 0) {
            const scrollPercentage = (windowHeight - rect.top) / (windowHeight + rect.height);
            demoText.style.transform = `translateX(${100 - scrollPercentage * 200}%)`;
            if (demoTextReverse) {
                demoTextReverse.style.transform = `translateX(${-100 + scrollPercentage * 200}%)`;
            }
        }
    }
});

// INIT
document.addEventListener('DOMContentLoaded', () => {
    initCarousel();
});


// MEDIA QUERY RESPONSIVE INDEX.HTML
const navLinks = document.querySelectorAll('nav ul li a');
const checkbox = document.getElementById('check');

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        checkbox.checked = false;
    });
});