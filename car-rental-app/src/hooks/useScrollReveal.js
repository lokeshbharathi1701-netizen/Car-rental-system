import { useEffect } from "react";

/**
 * Hook to apply scroll reveal animations to elements
 * Uses IntersectionObserver for high performance
 */
const useScrollReveal = () => {
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.15, // Trigger when 15% of element is visible
    };

    const handleIntersect = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("reveal--visible");
          // Optional: unobserve after reveal if you only want it once
          // observer.unobserve(entry.target);
        } else {
          // Optional: remove class when out of view for "in and out" effect
          entry.target.classList.remove("reveal--visible");
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);
    
    // Find all elements with 'reveal' or 'stagger-reveal' classes
    const revealElements = document.querySelectorAll(".reveal, .stagger-reveal, .reveal--zoom");
    revealElements.forEach((el) => observer.observe(el));

    return () => {
      revealElements.forEach((el) => observer.unobserve(el));
    };
  }, []);
};

export default useScrollReveal;
