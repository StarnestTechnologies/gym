document.addEventListener("DOMContentLoaded", () => {
  // Animated statistics
  const counters = document.querySelectorAll(".counter");
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = Number(el.dataset.target);
      let current = 0;
      const step = Math.max(1, Math.ceil(target / 24));
      const timer = setInterval(() => {
        current += step;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        el.textContent = current;
      }, 45);
      observer.unobserve(el);
    });
  }, {threshold: .7});
  counters.forEach(c => observer.observe(c));

  // Active navigation while scrolling
  const sections = [...document.querySelectorAll("header[id], section[id]")];
  const links = [...document.querySelectorAll(".nav-link")];
  const scrollSpy = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        links.forEach(link => link.classList.toggle(
          "active", link.getAttribute("href") === "#" + entry.target.id
        ));
      }
    });
  }, {rootMargin: "-35% 0px -55% 0px"});
  sections.forEach(section => scrollSpy.observe(section));

  // Mobile menu closes after clicking a link
  links.forEach(link => link.addEventListener("click", () => {
    const menu = document.getElementById("mainNav");
    if (menu.classList.contains("show")) {
      bootstrap.Collapse.getOrCreateInstance(menu).hide();
    }
  }));

  // CTA feedback
  const toast = document.getElementById("toastMessage");
  document.querySelectorAll(".btn-lime").forEach(button => {
    if (button.getAttribute("href")?.startsWith("mailto:")) return;
    button.addEventListener("click", () => {
      toast.classList.add("show");
      setTimeout(() => toast.classList.remove("show"), 2200);
    });
  });
});
/* =====================================================
   VEG / NON-VEG DIET SWITCH
===================================================== */

const dietTabs =
    document.querySelectorAll(".diet-tab");

const dietContents =
    document.querySelectorAll(".diet-content");


dietTabs.forEach(tab => {

    tab.addEventListener("click", () => {

        const plan =
            tab.dataset.plan;


        // Remove active from buttons
        dietTabs.forEach(item => {
            item.classList.remove("active");
        });


        // Activate clicked button
        tab.classList.add("active");


        // Hide all plans
        dietContents.forEach(content => {
            content.classList.remove("active");
        });


        // Show selected plan
        if (plan === "veg") {

            document
                .getElementById("vegDiet")
                .classList.add("active");

        }

        if (plan === "nonveg") {

            document
                .getElementById("nonVegDiet")
                .classList.add("active");

        }

    });

});

/* =====================================================
   WEEKLY WORKOUT DAY SWITCHING
   Videos are stored directly in HTML.
===================================================== */

document.addEventListener("DOMContentLoaded", function () {

    const workoutButtons =
        document.querySelectorAll(".workout-day");

    const workoutDays =
        document.querySelectorAll(".day-workout");


    workoutButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            /* Remove active from all buttons */
            workoutButtons.forEach(function (btn) {

                btn.classList.remove("active");

            });


            /* Add active to clicked button */
            this.classList.add("active");


            /* Get target HTML section */
            const targetId =
                this.getAttribute("data-target");


            /* Hide/show workout sections */
            workoutDays.forEach(function (day) {

                if (day.id === targetId) {

                    day.classList.add("active");

                } else {

                    day.classList.remove("active");

                }

            });

        });

    });

});
/* =====================================================
   DAY BUTTON CLICK
===================================================== */

document.querySelectorAll(".workout-day").forEach(function(button) {

    button.addEventListener("click", function() {

        /* Remove active from all */
        document
            .querySelectorAll(".workout-day")
            .forEach(function(btn) {
                btn.classList.remove("active");
            });


        /* Add active to clicked button */
        this.classList.add("active");


        /* Get selected day */
        const selectedDay =
            this.getAttribute("data-day");


        /* Load selected workout */
        loadWorkout(selectedDay);

    });

});

/* =====================================================
   GYM OPEN / CLOSED STATUS
===================================================== */

document.addEventListener("DOMContentLoaded", function () {

    const gymStatus = document.getElementById("gymStatus");
    const closingTime = document.getElementById("closingTime");
    const statusDot = document.querySelector(".status-dot");

    if (!gymStatus || !closingTime) {
        return;
    }

    function updateGymStatus() {

        const now = new Date();

        const currentHour = now.getHours();
        const currentMinutes = now.getMinutes();

        const currentTime =
            currentHour * 60 + currentMinutes;


        /*
         * Gym timing:
         * 05:00 AM - 11:00 PM
         */

        const openingTime = 5 * 60;
        const closingTimeValue = 23 * 60;


        if (
            currentTime >= openingTime &&
            currentTime < closingTimeValue
        ) {

            gymStatus.textContent = "OPEN NOW";
            closingTime.textContent = "CLOSES 11 PM";

            statusDot.style.background = "#18c98c";
            statusDot.style.boxShadow =
                "0 0 0 4px rgba(24,201,140,.12), 0 0 12px rgba(24,201,140,.35)";

        } else {

            gymStatus.textContent = "CLOSED";
            closingTime.textContent = "OPENS 5 AM";

            statusDot.style.background = "#777";
            statusDot.style.boxShadow = "none";

        }

    }


    updateGymStatus();

    /*
     * Update every minute
     */

    setInterval(updateGymStatus, 60000);

});
document.addEventListener("DOMContentLoaded", function () {

    const heroSlides = document.querySelectorAll(".hero-slide");
    const heroDots = document.querySelectorAll(".hero-dot");

    let currentSlide = 0;
    let slideInterval;

    function showHeroSlide(index) {

        heroSlides.forEach((slide) => {
            slide.classList.remove("active");
        });

        heroDots.forEach((dot) => {
            dot.classList.remove("active");
        });

        heroSlides[index].classList.add("active");
        heroDots[index].classList.add("active");

        currentSlide = index;
    }

    function nextHeroSlide() {

        let nextSlide = currentSlide + 1;

        if (nextSlide >= heroSlides.length) {
            nextSlide = 0;
        }

        showHeroSlide(nextSlide);
    }

    function startHeroSlider() {
        slideInterval = setInterval(nextHeroSlide, 5000);
    }

    function resetHeroSlider() {

        clearInterval(slideInterval);

        startHeroSlider();
    }

    /* Dot click */

    heroDots.forEach((dot, index) => {

        dot.addEventListener("click", function () {

            showHeroSlide(index);

            resetHeroSlider();

        });

    });

    /* Start slider */

    showHeroSlide(0);

    startHeroSlider();

});