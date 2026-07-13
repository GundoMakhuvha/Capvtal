import GlassCard from "@/components/GlassCard";
import founderImage from "@/assets/GundoFounder.png";


const About = () => (
  <div className="container mx-auto px-6 py-16">
    {/* Our Story */}
    <section className="max-w-3xl mb-20">
      <h1 className="text-5xl font-bold text-gradient mb-6 opacity-0 animate-fade-in">Our Story</h1>
      <p className="text-muted-foreground leading-relaxed opacity-0 animate-fade-in" style={{ animationDelay: "0.1s" }}>
        Capvtal Innovations was founded on a powerful belief that technology, creativity, business, and culture have the ability to converge and create extraordinary outcomes. Established in South Africa, our vision has always extended beyond simply keeping pace with change. We exist to shape the future, pioneer new ideas, and build solutions that leave a lasting impact.

        The name **Capvtal** is intentionally spelled with a "V", a distinctive identity created to establish a unique brand presence and protect the originality of our vision in an increasingly competitive world. More than just a name, Capvtal represents ownership, innovation, and the pursuit of building something truly timeless.

        From software solutions and digital transformation to putting your start up on the map, every division within Capvtal is driven by an uncompromising commitment to excellence, innovation, and world class execution. We believe that technology should empower, creativity should inspire, and culture should connect people in meaningful ways.

        At our core, Capvtal Innovations is more than a company. It is a movement built on ambition, ingenuity, and the relentless pursuit of greatness. We are committed to creating solutions, experiences, and opportunities that not only solve today's challenges but also define tomorrow's possibilities. Our mission is simple yet bold: to build a legacy of innovation that transcends industries, inspires communities, and demonstrates that African excellence can compete and lead on the global stage.

      </p>
    </section>

    {/* Vision & Mission */}
    <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
      <GlassCard interactive={false}>
        <h2 className="text-2xl font-bold text-foreground mb-4">Vision</h2>
        <p className="text-muted-foreground">
          To become Africa's leading multi-disciplinary innovation company, setting global standards
          in technology, creative production, and artificial intellegence.
        </p>
      </GlassCard>
      <GlassCard interactive={false}>
        <h2 className="text-2xl font-bold text-foreground mb-4">Mission</h2>
        <p className="text-muted-foreground">
          To deliver world-class solutions across technology, and production, empowering
          businesses and entrepreneurs to reach their full potential through innovation and excellence.
        </p>
      </GlassCard>
    </section>

    {/* Founder */}
    <section className="mb-10">
      <h2 className="text-3xl font-bold text-foreground mb-8">Leadership</h2>
      <div className="flex flex-col md:flex-row gap-8 items-start">
        <div className="glass rounded-2xl overflow-hidden w-64 h-80 flex-shrink-0">
          <img
            src={founderImage}
            alt="Mr. Gundo Makhuvha - Founder & CEO"
            className="w-full h-full object-cover"
          />
        </div>
        <GlassCard interactive={false} className="flex-1">
          <h3 className="text-xl font-semibold text-foreground mb-1">Mr. Gundo Makhuvha</h3>
          <span className="text-sm text-muted-foreground mb-4 block">Founder & CEO</span>
          <p className="text-muted-foreground leading-relaxed">
            Gundo Makhuvha is a visionary entrepreneur and technologist who founded Capvtal Innovations with the ambition of connecting technology, creativity, and business. His entrepreneurial journey began in high school, where he started trading under the name Capvtal, driven by a passion for creating value and exploring new opportunities. Even at a young age, he believed that Capvtal represented more than just a name and envisioned it as the foundation of something much greater in the future.

            With a strong background in software development and a deep appreciation for the arts, Gundo has transformed that early vision into Capvtal Innovations, a dynamic company that delivers innovative solutions to clients across a variety of industries. By combining technical expertise with creativity and strategic thinking, he has built a brand focused on solving problems and helping businesses embrace digital transformation. His leadership philosophy is rooted in empowering people, fostering innovation, and delivering meaningful, measurable results that create lasting impact.

          </p>
        </GlassCard>
      </div>
    </section>
  </div>
);

export default About;
