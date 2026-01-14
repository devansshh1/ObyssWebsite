var tl = gsap.timeline();
var locoScroll; // Defined Globally

function locomotiveAnimation() {
  gsap.registerPlugin(ScrollTrigger);

  // Assigned to the global variable (no 'const' or 'let')
  locoScroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true,
  });
  
  locoScroll.on("scroll", ScrollTrigger.update);

  ScrollTrigger.scrollerProxy("#main", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    },
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    pinType: document.querySelector("#main").style.transform
      ? "transform"
      : "fixed",
  });

  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
  ScrollTrigger.refresh();
}
// ... rest of your code

function animation() {
    // Animation for "Your Web Experiences is Loading Right now"
    tl.from(".line h1", {
        y: 100,
        stagger: 0.1
    });

    // Counter Logic
    tl.from('.line1h1 ', {
        opacity: 0,
        onStart: function() {
            var h = document.querySelector(".line1h1 h5");
            var cnt = 0;
            var interval = setInterval(function() { // Save the interval ID
                if (cnt < 100) { // Check less than 100
                    h.innerHTML = cnt < 10 ? '0' + cnt++ : cnt++; // Add leading zero for single digits
                } else {
                    h.innerHTML = 100;
                    clearInterval(interval); // Stop the interval when 100 is reached
                }
            }, 35);
        }
    });

    // Loader fade out
    tl.to("#loader", {
        opacity: 0,
        duration: 2.5,
        delay: 2.8
    });

    // Page 1 slide up animation
    tl.from('#page1', {
        y: 1700,
        duration: 1,
        delay: 0.01,
        ease: "power4.out",
        // CRITICAL: Force Locomotive Scroll to re-measure after page1 is in place
        onComplete: function() {
            locoScroll.update(); // <-- ADD THIS LINE
            ScrollTrigger.refresh(true); // Re-evaluate ScrollTrigger properties
        }
    });

    // Step 5: Remove loader from DOM
    tl.to('#loader', {
        display: "none"
    });
    
    tl.from(".nav",{
    opacity:0  
    })



    tl.from("#designl h1,#uniquel h1,#webl h1,#experiencel h1",{
      y:500,
      stagger:0.2
    })
    
  }

function cursoranimation(){
  Shery.mouseFollower({
  //Parameters are optional.
  skew: true,
  ease: "cubic-bezier(0.23, 1, 0.320, 1)",
  duration: 1,
});
document.addEventListener("mousemove", function(dets) {
    gsap.to(".curs", {
        left: dets.x,
        top: dets.y
    })
})

// Shery.js Magnet Effect
Shery.makeMagnet(".navp3 h2", {
    // Parameters are optional.
    ease: "cubic-bezier(0.23, 1, 0.320, 1)", // Added a standard ease for smoother effect
    duration: 1,
});
var vid=document.querySelector("#page2 video");
 var orig=document.querySelector("#page2");
  var cu=document.querySelector("#videocursor");
  var flag = 0
  orig.addEventListener("click", function () {
    if (flag == 0) {
      vid.play()
      vid.style.opacity = 1
      document.querySelector("#videocursor").innerHTML = `<i class="ri-pause-mini-fill"></i>`
      gsap.to("#videocursor", {
        scale: 0.5
      })
      flag = 1
    } else {
      vid.pause()
      vid.style.opacity = 0
      document.querySelector("#videocursor").innerHTML = `<i class="ri-play-mini-fill"></i>`
      gsap.to("#videocursor", {
        scale: 1
      })
      flag = 0
    }
  })
var videoc=document.querySelector("#videocontainer");
videoc.addEventListener("mouseenter",function(){
  videoc.addEventListener("mousemove",function(dets){
gsap.to("#videocursor",{
left:dets.x-100,y:dets.y+20
})
gsap.to(".mousefollower", {
        opacity: 0
      });
})
})
videoc.addEventListener("mouseleave",function(){
gsap.to(".mousefollower", {
        opacity: 1,y:100,x:50
      });
gsap.to("#videocursor", {
        top:"45%",
        left:"50%"
      });

})
}
function sheryanimation(){
    Shery.imageEffect("#imagegr1", {
        style: 5,
        debug: true,
    });
    
    Shery.imageEffect("#imagegr2", {
        style: 5,
        debug: true,
    });
    
    Shery.imageEffect("#imagegr3", {
        style: 5,
        debug: true,
    });
}
function flagAnimation() {
  const flag = document.querySelector(".nav2 img");
  
  // 1. Mouse Move Listener (Keeps the flag tracking)
  document.addEventListener("mousemove", function (dets) {
    gsap.to(flag, {
      x: dets.x,
      y: dets.y,
      // Optional: Add centering to align cursor to middle of flag
      xPercent: -50, 
      yPercent: -50 
    })
  })
  
  // 2. Mouse Enter Listener (Forces Alignment + Opacity)
  document.querySelector("#webl").addEventListener("mouseenter", function (e) {
    // Force the flag's position to the current cursor location (e.x, e.y)
    // BEFORE setting opacity to 1. Use 'set' for an instant jump.
    gsap.set(flag, {
        x: e.x,
        y: e.y,
        xPercent: -50, // Keep consistent with mousemove logic
        yPercent: -50 
    });

    // Now, fade it in at the correct location
    gsap.to(flag, {
      opacity: 1,
      duration: 0.3
    });
  })

  // 3. Mouse Leave Listener
  document.querySelector("#webl").addEventListener("mouseleave", function () {
    gsap.to(flag, {
      opacity: 0
    })
  })
}
function ab(){
  $(function () {
    $("#footer-text h1").textillate({ 
      in: { 
        effect: 'rollIn' 
      } 
    });
  });
}
animation();
cursoranimation();
flagAnimation();
locomotiveAnimation();
sheryanimation();

