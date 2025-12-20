// Load data
let currentIndex = 0;
let userReactions = {};

// DOM Elements
const smellImage = document.getElementById('smell-image');
const smellName = document.getElementById('smell-name');
const nextBtn = document.getElementById('next-btn');
const reactionButtons = document.querySelectorAll('.reaction-btn');

// Initialize
function init() {
    loadSmell(currentIndex);
    setupEventListeners();
}

// Load smell card
function loadSmell(index) {
    const smell = smells[index];
    
    // Fade out
    smellImage.style.opacity = '0';
    smellName.style.opacity = '0';
    
    setTimeout(() => {
        smellImage.src = smell.image;
        smellImage.alt = smell.name;
        smellName.textContent = smell.name;
        
        // Fade in
        smellImage.style.opacity = '1';
        smellName.style.opacity = '1';
        
        // Reset reactions
        resetReactions();
    }, 200);
}

// Next smell
function nextSmell() {
    currentIndex = (currentIndex + 1) % smells.length;
    loadSmell(currentIndex);
}

// Handle reaction
function handleReaction(e) {
    const reactionType = e.target.dataset.reaction;
    
    // Remove active from all
    reactionButtons.forEach(btn => btn.classList.remove('active'));
    
    // Add active to clicked
    e.target.classList.add('active');
    
    // Save reaction
    userReactions[smells[currentIndex].id] = reactionType;
    
    // Optional: animate
    e.target.style.transform = 'scale(1.1)';
    setTimeout(() => {
        e.target.style.transform = 'scale(1)';
    }, 150);
}

// Reset reactions
function resetReactions() {
    reactionButtons.forEach(btn => {
        btn.classList.remove('active');
        btn.style.transform = 'scale(1)';
    });
}

// Setup event listeners
function setupEventListeners() {
    // Next button
    nextBtn.addEventListener('click', nextSmell);
    
    // Reaction buttons
    reactionButtons.forEach(btn => {
        btn.addEventListener('click', handleReaction);
    });
    
    // Swipe detection
    let touchStartX = 0;
    let touchEndX = 0;
    
    document.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    document.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
    
    function handleSwipe() {
        if (touchStartX - touchEndX > 50) {
            // Swipe left
            nextSmell();
        }
    }
    
    // Keyboard navigation
    document.addEventListener('keydown', e => {
        if (e.key === 'ArrowRight' || e.key === ' ') {
            e.preventDefault();
            nextSmell();
        }
    });
}

// Smooth transitions
smellImage.style.transition = 'opacity 0.3s ease';
smellName.style.transition = 'opacity 0.3s ease';

// Start app
init();