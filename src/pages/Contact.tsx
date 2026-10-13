import { useState } from "react";
import emailjs from "@emailjs/browser";
import { ArrowRight, CheckCircle2, Clock3, Code2, Clapperboard, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import GlassCard from "@/components/GlassCard";
import { useSEO } from "@/lib/seo";

const divisions = ["General Inquiry", "Technology", "Production"];

const EMAILJS_SERVICE_ID = "service_m13bhe8";
const EMAILJS_TEMPLATE_ID = "template_05z9k9j";
const EMAILJS_PUBLIC_KEY = "XBptcS6UOOvHJxX-F";

const fieldClass =
  "w-full rounded-[16px] border border-foreground/10 bg-foreground/[0.04] px-4 py-3.5 text-[16px] text-foreground placeholder:text-muted-foreground/60 outline-none transition-all duration-300 focus:border-[hsl(var(--brand-blue)/0.6)] focus:bg-foreground/[0.06] focus:ring-4 focus:ring-[hsl(var(--brand-blue)/0.15)]";

const Contact = () => {
  useSEO({ path: "/contact" });

  const [form, setForm] = useState({ name: "", email: "", division: "General Inquiry", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setError("");

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          from_email: form.email,
          division: form.division,
          message: form.message,
        },
        EMAILJS_PUBLIC_KEY
      );
      setSubmitted(true);
    } catch (err) {
      console.error("EmailJS error:", err);
      setError("Something went wrong sending your message. Please try again or email us directly.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="container mx-auto px-5 py-12 md:px-6 md:py-20">
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
        {/* Left: intro */}
        <div className="lg:col-span-5">
          <p className="eyebrow mb-4 opacity-0 animate-fade-in">Contact us</p>
          <h1 className="display-lg text-gradient opacity-0 animate-fade-in" style={{ animationDelay: "0.08s" }}>
            Let's build something.
          </h1>
          <p className="lead mt-5 max-w-md opacity-0 animate-fade-in" style={{ animationDelay: "0.16s" }}>
            Tell us about your project — software, web, data, branding, content or marketing — and we'll get back to you
            shortly.
          </p>

          <ul className="mt-10 space-y-3">
            {[
              { icon: Code2, title: "Capvtal Technology", text: "Software, websites, apps, data & hosting", hue: "var(--brand-blue)" },
              { icon: Clapperboard, title: "Capvtal Production", text: "Logos, branding, content & marketing", hue: "var(--brand-purple)" },
              { icon: Clock3, title: "Quick replies", text: "A real person reads every message", hue: "150 70% 45%" },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <li key={item.title} data-reveal data-reveal-delay={(0.1 + i * 0.06).toFixed(2)} className="flex items-center gap-4">
                  <span
                    className="grid h-11 w-11 shrink-0 place-items-center rounded-[14px]"
                    style={{ background: `hsl(${item.hue} / 0.12)`, color: `hsl(${item.hue})` }}
                  >
                    <Icon className="h-5 w-5" strokeWidth={1.75} />
                  </span>
                  <span>
                    <span className="block text-[15px] font-semibold text-foreground">{item.title}</span>
                    <span className="block text-sm text-muted-foreground">{item.text}</span>
                  </span>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Right: form */}
        <div className="lg:col-span-7">
          {submitted ? (
            <GlassCard interactive={false} className="animate-pop-in !p-10 text-center">
              <CheckCircle2 className="mx-auto mb-4 h-12 w-12 text-emerald-400" strokeWidth={1.5} />
              <h2 className="text-2xl font-semibold tracking-tight text-foreground">Thank you!</h2>
              <p className="mt-2 text-muted-foreground">We'll get back to you shortly.</p>
              <Link to="/" className="btn-primary mt-8">
                Back home <ArrowRight size={18} />
              </Link>
            </GlassCard>
          ) : (
            <GlassCard interactive={false} className="!p-6 opacity-0 animate-fade-in md:!p-9" >
              <form onSubmit={handleSubmit} className="space-y-6" style={{ animationDelay: "0.2s" }}>
                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="c-name" className="mb-2 block text-sm font-medium text-foreground/80">
                      Name
                    </label>
                    <input
                      id="c-name"
                      required
                      autoComplete="name"
                      placeholder="Your name"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className={fieldClass}
                    />
                  </div>
                  <div>
                    <label htmlFor="c-email" className="mb-2 block text-sm font-medium text-foreground/80">
                      Email
                    </label>
                    <input
                      id="c-email"
                      type="email"
                      required
                      autoComplete="email"
                      inputMode="email"
                      placeholder="you@company.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className={fieldClass}
                    />
                  </div>
                </div>

                {/* Apple-style segmented control */}
                <fieldset>
                  <legend className="mb-2 block text-sm font-medium text-foreground/80">What's it about?</legend>
                  <div className="grid grid-cols-3 gap-1 rounded-[16px] bg-foreground/[0.05] p-1">
                    {divisions.map((d) => {
                      const active = form.division === d;
                      return (
                        <label
                          key={d}
                          className={`relative flex h-10 cursor-pointer items-center justify-center rounded-[12px] px-2 text-center text-[13px] font-medium transition-all duration-300 ease-spring sm:text-sm ${
                            active ? "bg-white text-black shadow-[0_2px_10px_rgba(0,0,0,0.12)] dark:bg-white/[0.16] dark:text-foreground" : "text-muted-foreground hover:text-foreground"
                          }`}
                        >
                          <input
                            type="radio"
                            name="division"
                            value={d}
                            checked={active}
                            onChange={() => setForm({ ...form, division: d })}
                            className="sr-only"
                          />
                          {d === "General Inquiry" ? "General" : d}
                        </label>
                      );
                    })}
                  </div>
                </fieldset>

                <div>
                  <label htmlFor="c-message" className="mb-2 block text-sm font-medium text-foreground/80">
                    Message
                  </label>
                  <textarea
                    id="c-message"
                    required
                    rows={5}
                    placeholder="Tell us a bit about what you need…"
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className={`${fieldClass} resize-none`}
                  />
                </div>

                {error && (
                  <p className="rounded-[14px] bg-red-500/10 px-4 py-3 text-sm text-red-400" role="alert">
                    {error}
                  </p>
                )}

                <button type="submit" disabled={sending} className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-50">
                  {sending ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-background/30 border-t-background" /> Sending…
                    </>
                  ) : (
                    <>
                      Send message <MessageCircle size={18} />
                    </>
                  )}
                </button>
              </form>
            </GlassCard>
          )}
        </div>
      </div>
    </div>
  );
};

export default Contact;
