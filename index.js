// Toggle filter options
document.getElementById('toggle-filters').addEventListener('click', function () {
    const filterOptions = document.getElementById('filter-options');
    filterOptions.classList.toggle('hidden');
  });
  
  // Handle AI search (example functionality)
  document.getElementById('ai-search-button').addEventListener('click', function () {
    const aiSearchInput = document.getElementById('ai-search-input').value;
    if (aiSearchInput.trim() === '') {
      alert('Please enter a query for AI search.');
    } else {
      // Example: Redirect to AI search results page
      window.location.href = `/ai-search?query=${encodeURIComponent(aiSearchInput)}`;
    }
  });
  
  // Wait for the page to fully load
window.addEventListener('load', () => {
  // Remove the 'loading' class from the body
  document.body.classList.remove('loading');

  // Hide the loader
  const loader = document.getElementById('loader');
  if (loader) {
    loader.style.display = 'none';
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const hotSection = document.querySelector('#hot');
  const specialSection = document.querySelector('#special');

  function updateFeaturedCard(section) {
    const cards = section.querySelectorAll('.card');
    const sectionRect = section.getBoundingClientRect();
    const sectionCenter = sectionRect.left + sectionRect.width / 2;

    let closestCard = null;
    let closestDistance = Infinity;

    cards.forEach((card) => {
      const cardRect = card.getBoundingClientRect();
      const cardCenter = cardRect.left + cardRect.width / 2;
      const distanceFromCenter = Math.abs(sectionCenter - cardCenter);

      // Adjust the scale and opacity based on distance from center
      const scale = Math.max(0.8, 1 - distanceFromCenter / sectionRect.width);
      const opacity = Math.max(0.5, 1 - distanceFromCenter / sectionRect.width);

      card.style.transform = `scale(${scale})`;
      card.style.opacity = opacity;

      // Find the closest card to the center
      if (distanceFromCenter < closestDistance) {
        closestDistance = distanceFromCenter;
        closestCard = card;
      }
    });

    // Scroll the closest card into view
    if (closestCard) {
      closestCard.scrollIntoView({ behavior: 'smooth', inline: 'center' });
    }
  }

  let isScrolling = false;

  function throttledUpdate(section) {
    if (!isScrolling) {
      isScrolling = true;
      setTimeout(() => {
        updateFeaturedCard(section);
        isScrolling = false;
      }, 200); // Adjust the timeout as needed
    }
  }

  if (hotSection) {
    hotSection.addEventListener('scroll', () => throttledUpdate(hotSection));
    updateFeaturedCard(hotSection); // Initialize on page load
  }

  if (specialSection) {
    specialSection.addEventListener('scroll', () => throttledUpdate(specialSection));
    updateFeaturedCard(specialSection); // Initialize on page load
  }
});