const isDark = document.body.classList.contains("dark");

const particleColor = isDark ? "#ffffff" : "#000000";

particlesJS("particles-js", {
  particles: {
    color: { value: particleColor },
    line_linked: { 
      color: particleColor ,
      distance: 220 ,
      width: 1 ,
    },
    number: {
      value: 80,
      density: {
        enable: true,
        value_area: 900
      }
    },
    shape: {
      type: "circle"
    },
    opacity: {
      value: 0.35,
      random: false
    },
    size: {
      value: 2,
      random: true
    },
    move: {
      enable: true,
      speed: 0.6,
      direction: "none",
      random: false,
      straight: false,
      out_mode: "out"
    }
  },
  interactivity: {
    detect_on: "canvas",
    events: {
      onhover: {
        enable: false   // important: keeps it calm
      },
      onclick: {
        enable: false
      },
      resize: true
    }
  },
  retina_detect: true
});