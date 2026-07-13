import { useState } from "react";
import emailjs from "@emailjs/browser";
import GlassCard from "@/components/GlassCard";

const divisions = ["General Inquiry", "Technology", "Production"];

const EMAILJS_SERVICE_ID = "service_m13bhe8";
const EMAILJS_TEMPLATE_ID = "template_05z9k9j";
const EMAILJS_PUBLIC_KEY = "XBptcS6UOOvHJxX-F";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", division: "", message: "" });
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
    <div className="container mx-auto px-6 py-16 max-w-2xl">
      <h1 className="text-5xl font-bold text-gradient mb-10 opacity-0 animate-fade-in">Contact Us</h1>

      {submitted ? (
        <GlassCard interactive={false}>
          <h2 className="text-2xl font-semibold text-foreground mb-2">Thank you!</h2>
          <p className="text-muted-foreground">We'll get back to you shortly.</p>
        </GlassCard>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6 opacity-0 animate-fade-in" style={{ animationDelay: "0.1s" }}>
          <div>
            <label className="text-sm text-muted-foreground mb-2 block">Name</label>
            <input
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full glass rounded-xl px-4 py-3 text-foreground bg-transparent outline-none focus:border-foreground/20 transition-colors"
            />
          </div>
          <div>
            <label className="text-sm text-muted-foreground mb-2 block">Email</label>
            <input
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full glass rounded-xl px-4 py-3 text-foreground bg-transparent outline-none focus:border-foreground/20 transition-colors"
            />
          </div>
          <div>
            <label className="text-sm text-muted-foreground mb-2 block">Division</label>
            <select
              required
              value={form.division}
              onChange={(e) => setForm({ ...form, division: e.target.value })}
              className="w-full glass rounded-xl px-4 py-3 text-foreground bg-transparent outline-none focus:border-foreground/20 transition-colors appearance-none"
            >
              <option value="" className="bg-background">Select a division</option>
              {divisions.map((d) => (
                <option key={d} value={d} className="bg-background">{d}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-sm text-muted-foreground mb-2 block">Message</label>
            <textarea
              required
              rows={5}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="w-full glass rounded-xl px-4 py-3 text-foreground bg-transparent outline-none focus:border-foreground/20 transition-colors resize-none"
            />
          </div>

          {error && <p className="text-sm text-red-400">{error}</p>}

          <button
            type="submit"
            disabled={sending}
            className="w-full rounded-xl px-8 py-3 text-sm font-medium bg-foreground text-background hover:bg-foreground/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {sending ? "Sending..." : "Send Message"}
          </button>
        </form>
      )}
    </div>
  );
};

export default Contact;