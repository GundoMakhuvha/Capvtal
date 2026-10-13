import { useEffect, useRef } from "react";

/**
 * CloudsBackground — volumetric animated clouds rendered with raw WebGL (no three.js / Vanta needed).
 * Shader adapted from Vanta.js "CLOUDS" (MIT), itself based on Inigo Quilez's "Clouds" Shadertoy.
 *
 * - Renders at reduced resolution (clouds are soft, so it looks the same but is much cheaper)
 * - Pauses when off-screen or the tab is hidden; renders a still frame for reduced-motion users
 * - Swaps palette instantly when the light/dark theme changes
 * - Falls back to a CSS sky gradient if WebGL isn't available
 */

export type CloudsVariant = "brand" | "technology" | "production" | "records";

interface Palette {
  skyColor: number;
  cloudColor: number;
  cloudShadowColor: number;
  sunColor: number;
  sunGlareColor: number;
  sunlightColor: number;
}

const DARK: Record<CloudsVariant, Palette> = {
  // Home page: same daytime sky as light mode
  brand: {
    skyColor: 0x68b8d7,
    cloudColor: 0xadc1de,
    cloudShadowColor: 0x183550,
    sunColor: 0xff9919,
    sunGlareColor: 0xff6633,
    sunlightColor: 0xff9933,
  },
  technology: {
    skyColor: 0x03101f,
    cloudColor: 0x3f6aa8,
    cloudShadowColor: 0x010409,
    sunColor: 0x00c8ff,
    sunGlareColor: 0x0066ff,
    sunlightColor: 0x40a8ff,
  },
  production: {
    skyColor: 0x0c0620,
    cloudColor: 0x6a4aa8,
    cloudShadowColor: 0x040208,
    sunColor: 0xff4fd8,
    sunGlareColor: 0x8a2be2,
    sunlightColor: 0xd070ff,
  },
  records: {
    skyColor: 0x160505,
    cloudColor: 0x9a4a40,
    cloudShadowColor: 0x080202,
    sunColor: 0xff5a1f,
    sunGlareColor: 0xff1e1e,
    sunlightColor: 0xff7a4d,
  },
};

const LIGHT: Record<CloudsVariant, Palette> = {
  // the original Vanta daytime sky
  brand: {
    skyColor: 0x68b8d7,
    cloudColor: 0xadc1de,
    cloudShadowColor: 0x183550,
    sunColor: 0xff9919,
    sunGlareColor: 0xff6633,
    sunlightColor: 0xff9933,
  },
  technology: {
    skyColor: 0x5aaee0,
    cloudColor: 0xb4cbe8,
    cloudShadowColor: 0x15365a,
    sunColor: 0x7fd8ff,
    sunGlareColor: 0x3d8bff,
    sunlightColor: 0x9fd6ff,
  },
  production: {
    skyColor: 0x9a86d9,
    cloudColor: 0xc9b9e8,
    cloudShadowColor: 0x2b1850,
    sunColor: 0xff7ad9,
    sunGlareColor: 0xd04dff,
    sunlightColor: 0xff9be6,
  },
  records: {
    skyColor: 0xd98a68,
    cloudColor: 0xe8c3b4,
    cloudShadowColor: 0x501d18,
    sunColor: 0xff9919,
    sunGlareColor: 0xff3d33,
    sunlightColor: 0xffa066,
  },
};

const VERT = `attribute vec2 position; void main(){ gl_Position = vec4(position, 0.0, 1.0); }`;

const FRAG = `
precision highp float;
uniform vec2 iResolution;
uniform vec2 iMouse;
uniform float iTime;
uniform float speed;
uniform vec3 skyColor;
uniform vec3 cloudColor;
uniform vec3 cloudShadowColor;
uniform vec3 sunColor;
uniform vec3 sunlightColor;
uniform vec3 sunGlareColor;

float hash(float p) {
  p = fract(p * 0.011);
  p *= (p + 7.5);
  p *= (p + p);
  return fract(p);
}

float noise(vec3 x) {
  vec3 p = floor(x);
  vec3 f = fract(x);
  f = f * f * (3.0 - 2.0 * f);
  float n = p.x + p.y * 57.0 + 113.0 * p.z;
  return mix(mix(mix(hash(n + 0.0), hash(n + 1.0), f.x),
                 mix(hash(n + 57.0), hash(n + 58.0), f.x), f.y),
             mix(mix(hash(n + 113.0), hash(n + 114.0), f.x),
                 mix(hash(n + 170.0), hash(n + 171.0), f.x), f.y), f.z);
}

const float constantTime = 1000.0;
float map5(in vec3 p) {
  vec3 speed1 = vec3(0.5, 0.01, 1.0) * 0.5 * speed;
  vec3 q = p - speed1 * (iTime + constantTime);
  float f;
  f  = 0.50000 * noise(q); q = q * 2.02;
  f += 0.25000 * noise(q); q = q * 2.03;
  f += 0.12500 * noise(q); q = q * 2.01;
  f += 0.06250 * noise(q); q = q * 2.02;
  f += 0.03125 * noise(q);
  return clamp(1.5 - p.y - 2.0 + 1.75 * f, 0.0, 1.0);
}
float map4(in vec3 p) {
  vec3 speed1 = vec3(0.5, 0.01, 1.0) * 0.5 * speed;
  vec3 q = p - speed1 * (iTime + constantTime);
  float f;
  f  = 0.50000 * noise(q); q = q * 2.02;
  f += 0.25000 * noise(q); q = q * 2.03;
  f += 0.12500 * noise(q); q = q * 2.01;
  f += 0.06250 * noise(q);
  return clamp(1.5 - p.y - 2.0 + 1.75 * f, 0.0, 1.0);
}
float map3(in vec3 p) {
  vec3 speed1 = vec3(0.5, 0.01, 1.0) * 0.5 * speed;
  vec3 q = p - speed1 * (iTime + constantTime);
  float f;
  f  = 0.50000 * noise(q); q = q * 2.02;
  f += 0.25000 * noise(q); q = q * 2.03;
  f += 0.12500 * noise(q);
  return clamp(1.5 - p.y - 2.0 + 1.75 * f, 0.0, 1.0);
}
float map2(in vec3 p) {
  vec3 speed1 = vec3(0.5, 0.01, 1.0) * 0.5 * speed;
  vec3 q = p - speed1 * (iTime + constantTime);
  float f;
  f  = 0.50000 * noise(q); q = q * 2.02;
  f += 0.25000 * noise(q);
  return clamp(1.5 - p.y - 2.0 + 1.75 * f, 0.0, 1.0);
}

// normalize(vec3(-1.0, 0.0, -1.0)) as a literal (WebGL1-safe)
const vec3 sundir = vec3(-0.70710678, 0.0, -0.70710678);

vec4 integrate(in vec4 sum, in float dif, in float den, in vec3 bgcol, in float t) {
  vec3 lin = cloudColor * 1.4 + sunlightColor * dif;
  vec4 col = vec4(mix(vec3(1.0, 0.95, 0.8), cloudShadowColor, den), den);
  col.xyz *= lin;
  col.xyz = mix(col.xyz, bgcol, 1.0 - exp(-0.003 * t * t));
  col.a *= 0.4;
  col.rgb *= col.a;
  return sum + col * (1.0 - sum.a);
}

#define MARCH(STEPS,MAPLOD) for(int i=0; i<STEPS; i++) { vec3 pos = ro + t*rd; if( pos.y<-3.0 || pos.y>2.0 || sum.a > 0.99 ) break; float den = MAPLOD( pos ); if( den>0.01 ) { float dif = clamp((den - MAPLOD(pos+0.3*sundir))/0.6, 0.0, 1.0 ); sum = integrate( sum, dif, den, bgcol, t ); } t += max(0.075,0.02*t); }

vec4 raymarch(in vec3 ro, in vec3 rd, in vec3 bgcol) {
  vec4 sum = vec4(0.0);
  float t = 0.0;
  MARCH(20, map5);
  MARCH(25, map4);
  MARCH(30, map3);
  MARCH(40, map2);
  return clamp(sum, 0.0, 1.0);
}

mat3 setCamera(in vec3 ro, in vec3 ta, float cr) {
  vec3 cw = normalize(ta - ro);
  vec3 cp = vec3(sin(cr), cos(cr), 0.0);
  vec3 cu = normalize(cross(cw, cp));
  vec3 cv = normalize(cross(cu, cw));
  return mat3(cu, cv, cw);
}

vec4 render(in vec3 ro, in vec3 rd) {
  float sun = clamp(dot(sundir, rd), 0.0, 1.0);
  vec3 col = skyColor - rd.y * 0.2 * vec3(1.0, 0.5, 1.0) + 0.15 * 0.5;
  col += 0.2 * sunColor * pow(sun, 8.0);
  vec4 res = raymarch(ro, rd, col);
  col = col * (1.0 - res.w) + res.xyz;
  col += 0.2 * sunGlareColor * pow(sun, 3.0);
  return vec4(col, 1.0);
}

void main() {
  vec2 p = (-iResolution.xy + 2.0 * gl_FragCoord.xy) / iResolution.y;
  vec2 m = iMouse.xy / iResolution.xy;
  m.y = (1.0 - m.y) * 0.33 + 0.28;
  m.x *= 0.25;
  m.x += sin(iTime * 0.1 + 3.1415) * 0.25 + 0.25;
  vec3 ro = 4.0 * normalize(vec3(sin(3.0 * m.x), 0.4 * m.y, cos(3.0 * m.x)));
  vec3 ta = vec3(0.0, -1.0, 0.0);
  mat3 ca = setCamera(ro, ta, 0.0);
  vec3 rd = ca * normalize(vec3(p.xy, 1.5));
  gl_FragColor = render(ro, rd);
}
`;

const hexToVec3 = (hex: number): [number, number, number] => [
  ((hex >> 16) & 255) / 255,
  ((hex >> 8) & 255) / 255,
  (hex & 255) / 255,
];

const toCss = (hex: number) => `#${hex.toString(16).padStart(6, "0")}`;

interface CloudsBackgroundProps {
  variant?: CloudsVariant;
  speed?: number;
  className?: string;
}

const CloudsBackground = ({ variant = "brand", speed = 1, className = "" }: CloudsBackgroundProps) => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;

    const isDark = () => !document.documentElement.classList.contains("light");
    const palette = () => (isDark() ? DARK : LIGHT)[variant];

    // CSS fallback colour (also shows for the split second before the first frame)
    const paintFallback = () => {
      const p = palette();
      wrap.style.background = `linear-gradient(180deg, ${toCss(p.skyColor)} 0%, ${toCss(p.cloudColor)} 100%)`;
    };
    paintFallback();

    const gl = canvas.getContext("webgl", { antialias: false, alpha: false, powerPreference: "low-power" });
    if (!gl) return;

    const compile = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
        console.warn("Clouds shader error:", gl.getShaderInfoLog(s));
        return null;
      }
      return s;
    };
    const vs = compile(gl.VERTEX_SHADER, VERT);
    const fs = compile(gl.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) return;
    const prog = gl.createProgram()!;
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "position");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const u = (name: string) => gl.getUniformLocation(prog, name);
    const uRes = u("iResolution");
    const uMouse = u("iMouse");
    const uTime = u("iTime");
    gl.uniform1f(u("speed"), speed);

    const applyPalette = () => {
      const p = palette();
      (Object.keys(p) as (keyof Palette)[]).forEach((k) => gl.uniform3fv(u(k), hexToVec3(p[k])));
      paintFallback();
    };
    applyPalette();

    // Lower internal resolution: like Vanta's scale (3 desktop / 12 mobile), tuned for crispness
    let w = 0;
    let h = 0;
    const resize = () => {
      const rect = wrap.getBoundingClientRect();
      const mobile = rect.width < 768;
      const divisor = mobile ? 3 : 2.25;
      w = Math.max(1, Math.round(rect.width / divisor));
      h = Math.max(1, Math.round(rect.height / divisor));
      canvas.width = w;
      canvas.height = h;
      gl.viewport(0, 0, w, h);
      gl.uniform2f(uRes, w, h);
    };
    resize();

    // Eased mouse — gently tilts the camera
    const mouse = { x: w / 2, y: h / 2, tx: w / 2, ty: h / 2 };
    const onPointer = (e: PointerEvent) => {
      const rect = wrap.getBoundingClientRect();
      mouse.tx = ((e.clientX - rect.left) / rect.width) * w;
      mouse.ty = ((e.clientY - rect.top) / rect.height) * h;
    };
    window.addEventListener("pointermove", onPointer, { passive: true });

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let visible = true;
    let raf = 0;
    let last = performance.now();
    let time = 0;

    const frame = (now: number) => {
      const dt = Math.min(0.1, (now - last) / 1000);
      last = now;
      time += dt;
      mouse.x += (mouse.tx - mouse.x) * 0.05;
      mouse.y += (mouse.ty - mouse.y) * 0.05;
      gl.uniform1f(uTime, time);
      gl.uniform2f(uMouse, mouse.x, mouse.y);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      if (!wrap.dataset.ready) {
        wrap.dataset.ready = "1";
        canvas.style.opacity = "1";
      }
      if (!reduced && visible && !document.hidden) raf = requestAnimationFrame(frame);
    };

    const start = () => {
      cancelAnimationFrame(raf);
      last = performance.now();
      raf = requestAnimationFrame(frame);
    };
    start();

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && !reduced) start();
    });
    io.observe(wrap);

    const onVisibility = () => !document.hidden && visible && !reduced && start();
    document.addEventListener("visibilitychange", onVisibility);

    const ro = new ResizeObserver(() => {
      resize();
      if (reduced || !visible) requestAnimationFrame(frame);
    });
    ro.observe(wrap);

    const mo = new MutationObserver(() => {
      applyPalette();
      if (reduced || !visible) requestAnimationFrame(frame);
    });
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      mo.disconnect();
      window.removeEventListener("pointermove", onPointer);
      document.removeEventListener("visibilitychange", onVisibility);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, [variant, speed]);

  return (
    <div
      ref={wrapRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      style={{
        WebkitMaskImage: "linear-gradient(to bottom, #000 0%, #000 62%, transparent 100%)",
        maskImage: "linear-gradient(to bottom, #000 0%, #000 62%, transparent 100%)",
      }}
    >
      <canvas
        ref={canvasRef}
        className="h-full w-full transition-opacity duration-1000 ease-apple"
        style={{ opacity: 0, imageRendering: "auto" }}
      />
      {/* soft vignette so text always reads well */}
      <div
        className="absolute inset-0"
        style={{ background: "radial-gradient(ellipse 70% 55% at 50% 50%, hsl(var(--background) / 0.28), transparent 75%)" }}
      />
    </div>
  );
};

export default CloudsBackground;
