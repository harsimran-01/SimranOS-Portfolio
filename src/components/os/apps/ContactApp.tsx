// import { useState } from "react";
// import { Mail, Linkedin, Github, MapPin, Send } from "lucide-react";

// export function ContactApp() {
//   const [sent, setSent] = useState(false);
//   return (
//     <div className="p-6 grid gap-4">
//       <div className="grid grid-cols-2 gap-3">
//         <a className="glass rounded-xl p-3 flex items-center gap-2 text-sm hover:bg-white/15" href="mailto:harsimran@example.com">
//           <Mail className="w-4 h-4" /> harsimran68694@gmail.com.com
//         </a>
//         <a className="glass rounded-xl p-3 flex items-center gap-2 text-sm hover:bg-white/15" href="https://linkedin.com" target="_blank" rel="noreferrer">
//           <Linkedin className="w-4 h-4" /> harsimrankaur0121
//         </a>
//         <a className="glass rounded-xl p-3 flex items-center gap-2 text-sm hover:bg-white/15" href="https://github.com" target="_blank" rel="noreferrer">
//           <Github className="w-4 h-4" /> harsimran-01
//         </a>
//         <div className="glass rounded-xl p-3 flex items-center gap-2 text-sm">
//           <MapPin className="w-4 h-4" /> India
//         </div>
//       </div>
//       <form className="glass rounded-xl p-4 space-y-3" onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
//         <div className="grid grid-cols-2 gap-3">
//           <input required placeholder="Your name" className="px-3 py-2 rounded-lg bg-white/5 outline-none focus:ring-1 focus:ring-primary text-sm" />
//           <input required type="email" placeholder="Your email" className="px-3 py-2 rounded-lg bg-white/5 outline-none focus:ring-1 focus:ring-primary text-sm" />
//         </div>
//         <input placeholder="Subject" className="w-full px-3 py-2 rounded-lg bg-white/5 outline-none focus:ring-1 focus:ring-primary text-sm" />
//         <textarea required placeholder="Message" rows={5} className="w-full px-3 py-2 rounded-lg bg-white/5 outline-none focus:ring-1 focus:ring-primary text-sm resize-none" />
//         <button className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:opacity-90 text-sm">
//           <Send className="w-4 h-4" /> {sent ? "Sent!" : "Send message"}
//         </button>
//       </form>
//     </div>
//   );
// }


import { useState } from "react";
import { Mail, Linkedin, Github, MapPin, Send, Bell } from "lucide-react";

export function ContactApp() {
  const [sent, setSent] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log("Message:", form);

    // Show Sent button
    setSent(true);

    // Show notification
    setShowNotification(true);

    // Clear form
    setForm({
      name: "",
      email: "",
      subject: "",
      message: "",
    });

    // Reset button
    setTimeout(() => {
      setSent(false);
    }, 2000);

    // Hide notification
    setTimeout(() => {
      setShowNotification(false);
    }, 3000);
  };

  return (
    <div className="relative p-6 grid gap-4">

      {/* Notification */}
      {showNotification && (
        <div className="fixed top-5 right-5 z-50 animate-in slide-in-from-right duration-300">
          <div className="glass rounded-xl px-5 py-4 shadow-2xl border border-white/10 flex items-center gap-3">
            <Bell className="w-5 h-5 text-green-400" />
            <div>
              <p className="font-semibold text-sm">New Message</p>
              <p className="text-xs text-muted-foreground">
                Your message has been sent successfully.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Contact Cards */}
      <div className="grid grid-cols-2 gap-3">

        <a
          href="mailto:harsimran68694@gmail.com"
          className="glass rounded-xl p-3 flex items-center gap-2 text-sm hover:bg-white/15 transition"
        >
          <Mail className="w-4 h-4" />
          harsimran68694@gmail.com
        </a>

        <a
          href="https://www.linkedin.com/in/harsimrankaur0121"
          target="_blank"
          rel="noreferrer"
          className="glass rounded-xl p-3 flex items-center gap-2 text-sm hover:bg-white/15 transition"
        >
          <Linkedin className="w-4 h-4" />
          harsimrankaur0121
        </a>

        <a
          href="https://github.com/harsimran-01"
          target="_blank"
          rel="noreferrer"
          className="glass rounded-xl p-3 flex items-center gap-2 text-sm hover:bg-white/15 transition"
        >
          <Github className="w-4 h-4" />
          harsimran-01
        </a>

        <div className="glass rounded-xl p-3 flex items-center gap-2 text-sm">
          <MapPin className="w-4 h-4" />
          India
        </div>
      </div>

      {/* Contact Form */}
      <form
        onSubmit={handleSubmit}
        className="glass rounded-xl p-4 space-y-3"
      >
        <div className="grid grid-cols-2 gap-3">

          <input
            required
            name="name"
            placeholder="Your name"
            value={form.name}
            onChange={handleChange}
            className="px-3 py-2 rounded-lg bg-white/5 outline-none focus:ring-1 focus:ring-primary text-sm"
          />

          <input
            required
            type="email"
            name="email"
            placeholder="Your email"
            value={form.email}
            onChange={handleChange}
            className="px-3 py-2 rounded-lg bg-white/5 outline-none focus:ring-1 focus:ring-primary text-sm"
          />
        </div>

        <input
          name="subject"
          placeholder="Subject"
          value={form.subject}
          onChange={handleChange}
          className="w-full px-3 py-2 rounded-lg bg-white/5 outline-none focus:ring-1 focus:ring-primary text-sm"
        />

        <textarea
          required
          rows={5}
          name="message"
          placeholder="Message"
          value={form.message}
          onChange={handleChange}
          className="w-full px-3 py-2 rounded-lg bg-white/5 outline-none focus:ring-1 focus:ring-primary text-sm resize-none"
        />

        <button
          type="submit"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition"
        >
          <Send className="w-4 h-4" />
          {sent ? "Sent!" : "Send message"}
        </button>
      </form>
    </div>
  );
}