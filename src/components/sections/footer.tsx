"use client";

export function Footer() {
  return (
    <footer className="py-12 relative z-10 w-full max-w-2xl mx-auto px-6">
      <div className="flex items-center justify-start">
        <p 
          className="text-sm text-[#9a9a9a]"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          2026 © Kevin Xia
        </p>
      </div>
    </footer>
  );
}

export default Footer;