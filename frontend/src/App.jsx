import { useState } from "react";

export default function App() {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!input.trim()) return;
    setLoading(true);
    setResponse("");

    try {
      const res = await fetch("http://localhost:5000/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: input }),
      });

      if (!res.ok) throw new Error("Failed to fetch from backend");

      const data = await res.json();
      setResponse(data.text || "No response from Dobby 😅");
    } catch (error) {
      console.error(error);
      setResponse("⚠️ Error: Unable to reach backend.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#2b0047] via-[#4b0082] to-[#ff007f] flex flex-col items-center p-6 font-sans text-white">
      {/* Header */}
      <header className="text-center mb-10">
        <div className="flex flex-col items-center justify-center">
          <div className="flex items-center gap-2 mb-2">
            <img
              src="/sentient-logo.png"
              alt="Sentient Logo"
              className="w-12 h-12"
            />
            <h1 className="text-3xl font-extrabold text-white drop-shadow-lg">
              Dobby Persona Builder
            </h1>
          </div>
          <p className="text-sm text-pink-200 tracking-wide">
            Powered by <span className="font-medium text-white">Dobby 8B Model</span>
          </p>
        </div>
      </header>

      {/* Main Card */}
      <div className="w-full max-w-2xl bg-gradient-to-br from-[#3a004f] via-[#5a007a] to-[#a300a3] bg-opacity-90 shadow-2xl rounded-3xl p-8 border border-white/10 backdrop-blur-md">
        <h2 className="text-xl font-semibold mb-4 text-white/90">
          Create Your Persona
        </h2>

        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Describe your persona or ask Dobby anything..."
          className="w-full p-4 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all"
          rows={5}
        />

        <button
          onClick={handleGenerate}
          disabled={loading}
          className="mt-5 w-full bg-pink-600 hover:bg-pink-700 text-white font-semibold py-2.5 px-4 rounded-lg transition-all shadow-md hover:shadow-lg"
        >
          {loading ? "Building Persona..." : "Generate Persona"}
        </button>

        <div className="mt-6 p-5 bg-black/20 rounded-xl min-h-[100px] border border-white/10 text-white">
          {loading ? (
            <p className="animate-pulse text-gray-300">Dobby is thinking...</p>
          ) : (
            <p>{response}</p>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-12 flex flex-col items-center text-gray-200 text-sm">
        <img src="/x-logo.png" alt="X logo" className="w-5 h-5 mb-1 opacity-80" />
        <p>
          made by <span className="font-medium text-white">@prith_boy</span>
        </p>
      </footer>
    </div>
  );
}

