const AuroraGridBackground = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
    <style>{`
      .aurora {
        position: absolute;
        border-radius: 9999px;
        filter: blur(90px);
        mix-blend-mode: screen;
        will-change: transform;
      }
      .aurora-blue {
        width: 55vw; height: 55vw; max-width: 720px; max-height: 720px;
        top: -15%; left: -8%;
        background: radial-gradient(circle, rgba(0,170,255,0.55), transparent 65%);
        animation: aurora-drift-a 18s ease-in-out infinite alternate;
      }
      .aurora-purple {
        width: 50vw; height: 50vw; max-width: 680px; max-height: 680px;
        bottom: -20%; right: -8%;
        background: radial-gradient(circle, rgba(170,0,255,0.5), transparent 65%);
        animation: aurora-drift-b 22s ease-in-out infinite alternate;
      }
      .aurora-white {
        width: 35vw; height: 35vw; max-width: 480px; max-height: 480px;
        top: 25%; left: 40%;
        background: radial-gradient(circle, rgba(255,255,255,0.12), transparent 65%);
        animation: aurora-drift-c 26s ease-in-out infinite alternate;
      }
      .grid-floor {
        position: absolute;
        left: -50%; right: -50%; bottom: 0;
        height: 55%;
        perspective: 400px;
        -webkit-mask-image: linear-gradient(to top, black 10%, transparent 95%);
        mask-image: linear-gradient(to top, black 10%, transparent 95%);
      }
      .grid-lines {
        position: absolute;
        inset: 0;
        transform: rotateX(65deg);
        transform-origin: center bottom;
        background-image:
          linear-gradient(rgba(0,170,255,0.35) 1px, transparent 1px),
          linear-gradient(90deg, rgba(170,0,255,0.35) 1px, transparent 1px);
        background-size: 60px 60px;
        animation: grid-move 3s linear infinite;
      }
      @keyframes grid-move {
        from { background-position: 0 0; }
        to { background-position: 0 60px; }
      }
      @keyframes aurora-drift-a {
        from { transform: translate(0, 0) scale(1); }
        to { transform: translate(15vw, 10vh) scale(1.2); }
      }
      @keyframes aurora-drift-b {
        from { transform: translate(0, 0) scale(1.1); }
        to { transform: translate(-14vw, -12vh) scale(0.9); }
      }
      @keyframes aurora-drift-c {
        from { transform: translate(-8vw, 0) scale(0.9); }
        to { transform: translate(8vw, -8vh) scale(1.15); }
      }
      @media (prefers-reduced-motion: reduce) {
        .aurora, .grid-lines { animation: none; }
      }
    `}</style>

    <div className="aurora aurora-blue" />
    <div className="aurora aurora-purple" />
    <div className="aurora aurora-white" />
    <div className="grid-floor">
      <div className="grid-lines" />
    </div>
    <div
      className="absolute inset-0"
      style={{ background: "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.55) 100%)" }}
    />
  </div>
);

export default AuroraGridBackground;