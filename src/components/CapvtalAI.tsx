import { useEffect, useRef, useState } from "react";
import { X, Send, Gamepad2, RotateCcw, MessageCircle } from "lucide-react";
import hustleWhite from "@/assets/hustle-white.png";
import hustleBlack from "@/assets/hustle-black.png";

type Msg = { role: "user" | "ai"; text: string };
type Cell = "X" | "O" | null;

// ─── Local fallback knowledge base ────────────────────────────────────────
const knowledge: { match: RegExp; reply: string }[] = [
  { match: /(hello|hi|hey|sup|yo)/i, reply: "Heyyy 👋 what's good? Wanna learn about Capvtal or get bodied at tic-tac-toe?" },
  { match: /(who|what).*(capvtal|company|you guys)/i, reply: "Capvtal Innovations is the parent company — we run 2 dope divisions: Capvtal Technology, and Capvtal Productions. Basically, if it's creative or technical, we cook it up" },
  { match: /(ceo|founder|boss|leader|owner|mr\.?\s*gundo|gundo makhuvha)/i, reply: "Capvtal was founded by Mr. Gundo Makhuvha — the visionary behind everything we build, create, and drop." },
  { match: /(division|divisions|tech|technology|software|web|dev|coding|hosting|data)/i, reply: "Capvtal Technology is where we build — software development, web development, data analysis, and hosting & support. Clean code, solid infra." },
  { match: /(production|design|logo|marketing|content|branding|presentation)/i, reply: "Capvtal Production is the creative crew — logo design, content creation, digital marketing, and presentations that actually slap." },
  { match: /(records|music|video|photo|mastering|film|editing|distribution)/i, reply: "Capvtal Records is the studio side — music distribution, photography & videography, mastering & engineering, and film editing. Cinematic vibes." },
  { match: /(service|services|what do you|what does capvtal|offer|what can|provide)/i, reply: "We offer 12 services across 2 divisions: Software Dev, Web Dev, Data Analysis, Hosting, Logo Design, Content Creation, Digital Marketing. A lot of fire under one roof." },
  { match: /(hustle|hustle app|next gen)/i, reply: "Hustle is Capvtal's in-house app — next gen innovation, built from the ground up. That's the one." },
  { match: /(contact|email|reach|hire|work with)/i, reply: "Easy — hit the Contact page and we'll get back to you fast. We actually reply, promise." },
  { match: /(price|cost|how much|quote|pricing)/i, reply: "Pricing depends on scope — shoot us a message on the Contact page and we'll hook you up with a quote." },
  { match: /(game|play|tic|tac|toe|x and o|noughts)/i, reply: "Say less. Hit the XO tab — I'll go easy on you. Maybe." },
  { match: /(thank|thanks|thx|appreciate)/i, reply: "Anytime fam 🙏" },
  { match: /(bye|cya|later)/i, reply: "Peace ✌️ come back if you need anything." },
];

const fallbacks = [
  "Eish, that's a curveball — try asking me about our founder Mr. Gundo Makhuvha, our 12 services, three divisions, or wanna play tic-tac-toe?",
  "Not 100% sure on that one, but I know everything Capvtal — founder, divisions, services, the Hustle app. Ask away.",
  "Rephrase that? I'm sharp on Capvtal stuff and games — that's my lane.",
];

const localReply = (text: string): string => {
  for (const k of knowledge) if (k.match.test(text)) return k.reply;
  return fallbacks[Math.floor(Math.random() * fallbacks.length)];
};

const SYSTEM_PROMPT = `You are Capvtal AI, the official assistant for Capvtal Innovations — a South African company founded by Mr. Gundo Makhuvha. Keep replies short (2-4 sentences max), conversational, and confident. Use casual, youthful language — like talking to a friend, not a corporate bot. Never use em-dashes. Avoid bullet lists; speak in natural prose.

Capvtal Innovations has three divisions:
1. Capvtal Technology: software development, web development, data analysis, hosting & support.
2. Capvtal Production: logo design, content creation, digital marketing, presentations.
3. Capvtal Records: music distribution, photography & videography, audio mastering & engineering, film & video editing.

The Hustle app is Capvtal's in-house product — described as "next gen innovation."
For contact or pricing: direct people to the Contact page.
If asked to play a game, tell them to hit the XO tab.
Never make up services or details not listed above. Keep it real.`;

// Set this in your .env as VITE_ANTHROPIC_API_KEY
// For production, proxy through your own backend instead of calling Anthropic directly
const API_KEY = import.meta.env.VITE_ANTHROPIC_API_KEY as string | undefined;

const SUGGESTION_CHIPS = [
  { label: "Founder", prompt: "Who founded Capvtal?" },
  { label: "Services", prompt: "What services do you offer?" },
  { label: "Divisions", prompt: "Tell me about the divisions" },
  { label: "Contact", prompt: "How do I contact Capvtal?" },
];

const DROPDOWN_TOPICS: { group: string; items: { label: string; prompt: string }[] }[] = [
  {
    group: "About Capvtal",
    items: [
      { label: "What is Capvtal Innovations?", prompt: "What is Capvtal Innovations?" },
      { label: "Who is Mr. Gundo Makhuvha?", prompt: "Who is Mr. Gundo Makhuvha?" },
      { label: "The three divisions", prompt: "What are the three divisions of Capvtal?" },
    ],
  },
  {
    group: "Technology",
    items: [
      { label: "Capvtal Technology", prompt: "Tell me about Capvtal Technology division" },
      { label: "Software development", prompt: "What software development services do you offer?" },
      { label: "Web development", prompt: "Do you offer web development?" },
      { label: "Hosting & support", prompt: "Tell me about your hosting and support services" },
    ],
  },
  {
    group: "Production",
    items: [
      { label: "Capvtal Production", prompt: "Tell me about Capvtal Production division" },
      { label: "Logo & branding", prompt: "Do you do logo and branding design?" },
      { label: "Digital marketing", prompt: "Tell me about your digital marketing services" },
      { label: "Content creation", prompt: "Can you create content for social media?" },
    ],
  },
  
  {
    group: "Other",
    items: [
      { label: "The Hustle app", prompt: "Tell me about the Hustle app" },
      { label: "Get a quote", prompt: "How do I get a quote from Capvtal?" },
      { label: "Play a game", prompt: "Play tic-tac-toe with me" },
    ],
  },
];

// ─── Tic-Tac-Toe helpers ───────────────────────────────────────────────────
const WINS = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6],
];

const checkWinner = (b: Cell[]): Cell | "draw" | null => {
  for (const [a, b1, c] of WINS) {
    if (b[a] && b[a] === b[b1] && b[a] === b[c]) return b[a];
  }
  return b.every(Boolean) ? "draw" : null;
};

const minimax = (b: Cell[], isMax: boolean): number => {
  const w = checkWinner(b);
  if (w === "O") return 1;
  if (w === "X") return -1;
  if (w === "draw") return 0;
  let best = isMax ? -Infinity : Infinity;
  for (let i = 0; i < 9; i++) {
    if (!b[i]) {
      b[i] = isMax ? "O" : "X";
      const score = minimax(b, !isMax);
      b[i] = null;
      best = isMax ? Math.max(best, score) : Math.min(best, score);
    }
  }
  return best;
};

const bestMove = (b: Cell[]): number => {
  const empties = b.map((v, i) => (v ? -1 : i)).filter((i) => i >= 0);
  if (Math.random() < 0.15) return empties[Math.floor(Math.random() * empties.length)];
  let best = -Infinity;
  let move = empties[0];
  for (const i of empties) {
    b[i] = "O";
    const score = minimax(b, false);
    b[i] = null;
    if (score > best) { best = score; move = i; }
  }
  return move;
};

// ─── Main Component ────────────────────────────────────────────────────────
const CapvtalAI = () => {
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState<"chat" | "game">("chat");

  // Chat state
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: "ai",
      text: "Yo! I'm Capvtal AI — your guide to everything Capvtal Innovations. Ask me about our founder, divisions, services, or challenge me to a game of X's and O's.",
    },
  ]);
  const [history, setHistory] = useState<{ role: "user" | "assistant"; content: string }[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [inputDisabled, setInputDisabled] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Game state
  const [board, setBoard] = useState<Cell[]>(Array(9).fill(null));
  const [gameStatus, setGameStatus] = useState("Your move (X). Don't choke.");
  const [locked, setLocked] = useState(false);
  const [scores, setScores] = useState({ x: 0, o: 0, draw: 0 });

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, isTyping, open]);

  // ─── Hybrid AI: Claude API with local fallback ─────────────────────────
  const sendToAI = async (userText: string) => {
    const newHistory = [...history, { role: "user" as const, content: userText }];
    setHistory(newHistory);
    setMessages((m) => [...m, { role: "user", text: userText }]);
    setIsTyping(true);
    setInputDisabled(true);

    let reply: string | null = null;

    // Try Claude API if key is available
    if (API_KEY) {
      try {
        const res = await fetch("https://api.anthropic.com/v1/messages", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": API_KEY,
            "anthropic-version": "2023-06-01",
            "anthropic-dangerous-direct-browser-access": "true",
          },
          body: JSON.stringify({
            model: "claude-sonnet-4-6",
            max_tokens: 1000,
            system: SYSTEM_PROMPT,
            messages: newHistory,
          }),
        });
        if (res.ok) {
          const data = await res.json();
          reply = data.content?.find((b: { type: string }) => b.type === "text")?.text ?? null;
        }
      } catch {
        // silently fall through to local reply
      }
    }

    // Fall back to local regex knowledge base
    if (!reply) {
      reply = localReply(userText);
    }

    setHistory((h) => [...h, { role: "assistant", content: reply! }]);
    setMessages((m) => [...m, { role: "ai", text: reply! }]);
    setIsTyping(false);
    setInputDisabled(false);
  };

  const send = () => {
    const text = input.trim();
    if (!text || inputDisabled) return;
    setInput("");
    sendToAI(text);
  };

  const sendChip = (prompt: string) => {
    if (inputDisabled) return;
    sendToAI(prompt);
  };

  const handleDropdown = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    e.target.value = "";
    if (val && !inputDisabled) sendToAI(val);
  };

  // ─── Game logic ─────────────────────────────────────────────────────────
  const play = (i: number) => {
    if (locked || board[i]) return;
    const nb = [...board];
    nb[i] = "X";
    setBoard(nb);
    const winner = checkWinner(nb);
    if (winner) { endGame(winner, nb); return; }
    setLocked(true);
    setGameStatus("Capvtal AI thinking...");
    setTimeout(() => {
      const move = bestMove([...nb]);
      nb[move] = "O";
      setBoard([...nb]);
      const w2 = checkWinner(nb);
      if (w2) endGame(w2, nb);
      else { setGameStatus("Your move (X)."); setLocked(false); }
    }, 500);
  };

  const endGame = (w: Cell | "draw", _b: Cell[]) => {
    setLocked(true);
    if (w === "X") {
      setScores((s) => ({ ...s, x: s.x + 1 }));
      setGameStatus("Damn! You got me. GG 🔥 Run it back?");
    } else if (w === "O") {
      setScores((s) => ({ ...s, o: s.o + 1 }));
      setGameStatus("Got 'em 😎 GG — want the smoke again?");
    } else {
      setScores((s) => ({ ...s, draw: s.draw + 1 }));
      setGameStatus("Draw. Respectable. Try again?");
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setLocked(false);
    setGameStatus("Your move (X). Let's go.");
  };

  return (
    <>
      {/* Toggle button */}
      <button
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full bg-foreground text-background flex items-center justify-center shadow-lg hover:scale-110 transition-transform overflow-hidden"
        aria-label="Capvtal AI"
      >
        {open ? (
          <X className="h-5 w-5" />
        ) : (
          <>
            <img src={hustleWhite} alt="Hustle" className="h-7 w-7 object-contain block dark:hidden" />
            <img src={hustleBlack} alt="Hustle" className="h-7 w-7 object-contain hidden dark:block" />
          </>
        )}
      </button>

      {/* Panel */}
      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-[340px] max-w-[calc(100vw-2rem)] h-[520px] glass rounded-2xl flex flex-col overflow-hidden animate-scale-in">

          {/* Header */}
          <div className="px-4 py-3 border-b border-border/40 flex items-center justify-between flex-shrink-0">
            <div>
              <p className="text-sm font-semibold text-foreground flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
                Capvtal AI
              </p>

              <p className="text-[10px] text-muted-foreground">
                Version 1.0
              </p>
            </div>
            <div className="flex gap-1 text-xs">
              <button
                onClick={() => setTab("chat")}
                className={`px-2 py-1 rounded-md flex items-center gap-1 ${tab === "chat" ? "bg-foreground/10 text-foreground" : "text-muted-foreground"}`}
              >
                <MessageCircle className="h-3 w-3" /> Chat
              </button>
              <button
                onClick={() => setTab("game")}
                className={`px-2 py-1 rounded-md flex items-center gap-1 ${tab === "game" ? "bg-foreground/10 text-foreground" : "text-muted-foreground"}`}
              >
                <Gamepad2 className="h-3 w-3" /> XO
              </button>
            </div>
          </div>

          {/* ── CHAT TAB ── */}
          {tab === "chat" && (
            <>
              {/* Messages */}
              <div ref={scrollRef} className="flex-1 overflow-y-auto p-3 space-y-2">
                {messages.map((m, i) => (
                  <div
                    key={i}
                    className={`max-w-[88%] text-sm px-3 py-2 rounded-2xl ${
                      m.role === "ai"
                        ? "bg-foreground/5 text-foreground rounded-tl-sm"
                        : "ml-auto bg-foreground text-background rounded-tr-sm"
                    }`}
                  >
                    {m.text}
                  </div>
                ))}

                {/* Typing indicator */}
                {isTyping && (
                  <div className="max-w-[88%] bg-foreground/5 rounded-2xl rounded-tl-sm px-3 py-3 flex items-center gap-1">
                    {[0, 1, 2].map((i) => (
                      <span
                        key={i}
                        className="h-1.5 w-1.5 rounded-full bg-muted-foreground animate-bounce"
                        style={{ animationDelay: `${i * 0.15}s` }}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Suggestion chips */}
              <div className="px-3 pt-2 flex flex-wrap gap-1.5 flex-shrink-0">
                {SUGGESTION_CHIPS.map((chip) => (
                  <button
                    key={chip.label}
                    onClick={() => sendChip(chip.prompt)}
                    disabled={inputDisabled}
                    className="px-3 py-1 rounded-full border border-border/50 bg-foreground/5 text-muted-foreground text-[11px] hover:bg-foreground/10 hover:text-foreground transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    {chip.label}
                  </button>
                ))}
              </div>

              {/* Topic dropdown */}
              <div className="px-3 pt-2 flex-shrink-0">
                <select
                  onChange={handleDropdown}
                  disabled={inputDisabled}
                  defaultValue=""
                  className="w-full bg-foreground/5 border border-border/50 rounded-lg px-3 py-1.5 text-[12px] text-muted-foreground focus:outline-none focus:border-foreground/30 disabled:opacity-40 disabled:cursor-not-allowed appearance-none cursor-pointer"
                >
                  <option value="" disabled>Browse topics...</option>
                  {DROPDOWN_TOPICS.map((group) => (
                    <optgroup key={group.group} label={group.group}>
                      {group.items.map((item) => (
                        <option key={item.prompt} value={item.prompt}>
                          {item.label}
                        </option>
                      ))}
                    </optgroup>
                  ))}
                </select>
              </div>

              {/* Input row */}
              <div className="p-3 border-t border-border/40 flex gap-2 flex-shrink-0">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && send()}
                  disabled={inputDisabled}
                  placeholder="Ask me anything..."
                  className="flex-1 bg-transparent border border-border/50 rounded-full px-4 py-2 text-sm focus:outline-none focus:border-foreground/30 disabled:opacity-40"
                />
                <button
                  onClick={send}
                  disabled={inputDisabled || !input.trim()}
                  className="h-9 w-9 rounded-full bg-foreground text-background flex items-center justify-center hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed transition-opacity"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </>
          )}

          {/* ── GAME TAB ── */}
          {tab === "game" && (
            <div className="flex-1 flex flex-col items-center justify-center p-4 gap-4">
              {/* Score row */}
              <div className="flex gap-6 text-center">
                {[
                  { label: "You (X)", value: scores.x },
                  { label: "Draw", value: scores.draw },
                  { label: "AI (O)", value: scores.o },
                ].map((s) => (
                  <div key={s.label} className="flex flex-col items-center gap-0.5">
                    <span className="text-xl font-semibold text-foreground">{s.value}</span>
                    <span className="text-[11px] text-muted-foreground">{s.label}</span>
                  </div>
                ))}
              </div>

              <p className="text-xs text-muted-foreground text-center">{gameStatus}</p>

              {/* Board */}
              <div className="grid grid-cols-3 gap-2">
                {board.map((c, i) => (
                  <button
                    key={i}
                    onClick={() => play(i)}
                    disabled={!!c || locked}
                    className="h-20 w-20 rounded-xl glass text-2xl font-bold text-foreground hover:bg-foreground/5 transition-colors disabled:cursor-default"
                  >
                    {c}
                  </button>
                ))}
              </div>

              <button
                onClick={resetGame}
                className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                <RotateCcw className="h-3 w-3" /> New game
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default CapvtalAI;