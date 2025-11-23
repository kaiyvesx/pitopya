import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/Petopia.png";
import knobPaw from "../../assets/Load.png";
import dog from "../../assets/Dog.png";
import cat from "../../assets/Cat.png";
import rodent from "../../assets/Rodent.png";
import ferret from "../../assets/Ferret.png";
import rabbit from "../../assets/Rabbit.png";
import bird from "../../assets/Bird.png";
import snake from "../../assets/Snake.png";
import fish from "../../assets/Fish.png";
import lizard from "../../assets/Lizard.png";
import insect from "../../assets/Insect.png";
import turtle from "../../assets/Turtle.png";
import "./PetRegistration.css";

const PETS = [
  { key: "dog", img: dog },
  { key: "cat", img: cat },
  { key: "rodent", img: rodent },
  { key: "ferret", img: ferret },
  { key: "rabbit", img: rabbit },
  { key: "bird", img: bird },
  { key: "snake", img: snake },
  { key: "fish", img: fish },
  { key: "lizard", img: lizard },
  { key: "insect", img: insect },
  { key: "turtle", img: turtle }
];

export default function PetRegistration() {
  const navigate = useNavigate();
  const scrollRef = useRef(null);
  const railRef = useRef(null);
  const knobRef = useRef(null);
  const stickRef = useRef(null);

  useEffect(() => {
    const scroller = scrollRef.current;
    const rail = railRef.current;
    const knob = knobRef.current;
    const stick = stickRef.current;
    if (!scroller || !rail || !knob || !stick) return;

    const update = () => {
      const { scrollTop, scrollHeight, clientHeight } = scroller;
      const maxScroll = Math.max(1, scrollHeight - clientHeight);
      const ratio = scrollTop / maxScroll;
      const railMove = rail.clientHeight - knob.clientHeight;
      const y = railMove * ratio;
      knob.style.transform = `translate(-50%, ${y}px)`;
      const minStick = 36;
      const visibleRatio = Math.min(1, clientHeight / scrollHeight);
      const stickHeight = Math.max(minStick, rail.clientHeight * visibleRatio);
      const maxStickMove = rail.clientHeight - stickHeight;
      const stickTop = maxStickMove * ratio;
      stick.style.height = `${stickHeight}px`;
      stick.style.transform = `translateY(${stickTop}px)`;
    };

    update();
    scroller.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      scroller.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  useEffect(() => {
    const scroller = scrollRef.current;
    const rail = railRef.current;
    const knob = knobRef.current;
    const stick = stickRef.current;
    if (!scroller || !rail || !knob || !stick) return;

    const setScrollFromClientY = (clientY, centerOn = 0) => {
      const railRect = rail.getBoundingClientRect();
      const usable = rail.clientHeight - centerOn;
      let offset = clientY - railRect.top - centerOn / 2;
      offset = Math.max(0, Math.min(usable, offset));
      const ratio = usable > 0 ? offset / usable : 0;
      const { scrollHeight, clientHeight } = scroller;
      const maxScroll = Math.max(1, scrollHeight - clientHeight);
      scroller.scrollTop = ratio * maxScroll;
    };

    const startDrag = (centerOnPx) => (e) => {
      const move = (ev) => {
        const y = ev.touches ? ev.touches[0].clientY : ev.clientY;
        setScrollFromClientY(y, centerOnPx);
      };
      const end = () => {
        window.removeEventListener("mousemove", move);
        window.removeEventListener("mouseup", end);
        window.removeEventListener("touchmove", move);
        window.removeEventListener("touchend", end);
      };
      window.addEventListener("mousemove", move, { passive: false });
      window.addEventListener("mouseup", end, { passive: true });
      window.addEventListener("touchmove", move, { passive: false });
      window.addEventListener("touchend", end, { passive: true });
      e.preventDefault();
    };

    const onKnobDown = startDrag(knob.clientHeight);
    knob.addEventListener("mousedown", onKnobDown);
    knob.addEventListener("touchstart", onKnobDown, { passive: false });

    const onStickDown = (e) => startDrag(stick.clientHeight)(e);
    stick.addEventListener("mousedown", onStickDown);
    stick.addEventListener("touchstart", onStickDown, { passive: false });

    const onRailJump = (e) => {
      const y = e.touches ? e.touches[0].clientY : e.clientY;
      setScrollFromClientY(y, 0);
    };
    rail.addEventListener("mousedown", onRailJump);
    rail.addEventListener("touchstart", onRailJump, { passive: false });

    return () => {
      knob.removeEventListener("mousedown", onKnobDown);
      knob.removeEventListener("touchstart", onKnobDown);
      stick.removeEventListener("mousedown", onStickDown);
      stick.removeEventListener("touchstart", onStickDown);
      rail.removeEventListener("mousedown", onRailJump);
      rail.removeEventListener("touchstart", onRailJump);
    };
  }, []);

  const goToPet = (key) => {
    alert(`Selected: ${key}`);
  };

  return (
    <div className="pet-page">
      <header className="pet-header">
        <img src={logo} alt="Petopia" className="petopia-pill" />
      </header>

      <h1 className="pet-title">Choose your pet</h1>

      <div className="pet-scroll" ref={scrollRef}>
        <div className="pet-grid">
          {PETS.map((p) => (
            <button
              key={p.key}
              type="button"
              className="pet-img-btn"
              aria-label={p.key}
              onClick={() => goToPet(p.key)}
            >
              <img src={p.img} alt="" className="pet-img-only" />
            </button>
          ))}
        </div>
      </div>

      <div className="custom-rail">
        <div className="rail-track" ref={railRef} aria-hidden="true">
          <div className="rail-stick" ref={stickRef} aria-hidden="true" />
        </div>
        <div
          className="rail-knob"
          ref={knobRef}
          aria-hidden="true"
          style={{
            backgroundImage: `url(${knobPaw})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "contain"
          }}
        />
      </div>
    </div>
  );
}
