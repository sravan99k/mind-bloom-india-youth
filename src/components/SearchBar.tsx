import React, { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Search, Mic, MicOff } from "lucide-react";
import { searchIndex } from "@/searchIndex";

// SpeechRecognition interface
interface ISpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start: () => void;
  stop: () => void;
  onresult: (event: any) => void;
  onerror: (event: any) => void;
  onend: () => void;
}

declare global {
  interface Window {
    SpeechRecognition: {
      new (): ISpeechRecognition;
      prototype: ISpeechRecognition;
    };
    webkitSpeechRecognition: {
      new (): ISpeechRecognition;
      prototype: ISpeechRecognition;
    };
  }
}

// Add more keywords and routes as needed for navigation
const searchRoutes = [
  { keyword: "dashboard", path: "/wellness-dashboard" },
  { keyword: "wellness", path: "/wellness-dashboard" },
  { keyword: "wellness goals", path: "/wellness-dashboard" },
  { keyword: "assessment", path: "/assessment" },
  { keyword: "resources", path: "/resources" },
  { keyword: "goals", path: "/wellness-dashboard" },
  { keyword: "journal", path: "/wellness-dashboard" },
  { keyword: "forum", path: "/wellness-dashboard" },
  { keyword: "profile", path: "/profile-settings" },
  { keyword: "school", path: "/school-dashboard" },
  { keyword: "student", path: "/student-dashboard" },
];

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [show, setShow] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [results, setResults] = useState<{ text: string; route: string }[]>([]);
  const [isListening, setIsListening] = useState(false);
  const [isMicAvailable, setIsMicAvailable] = useState(false);
  const recognitionRef = useRef<ISpeechRecognition | null>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Close search when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShow(false);
      }
    }

    // Add event listener when search is shown
    if (show) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    // Clean up event listener
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [show]);

  // Check if browser supports speech recognition
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (SpeechRecognition) {
      try {
        setIsMicAvailable(true);
        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = 'en-US';

        recognition.onresult = (event: any) => {
          let interimTranscript = '';
          let finalTranscript = '';

          for (let i = event.resultIndex; i < event.results.length; i++) {
            const transcript = event.results[i][0].transcript;
            if (event.results[i].isFinal) {
              finalTranscript += transcript;
            } else {
              interimTranscript += transcript;
            }
          }

          // Update the query with the latest transcript
          if (finalTranscript) {
            setQuery(prev => prev + finalTranscript);
          } else if (interimTranscript) {
            setQuery(interimTranscript);
          }
        };

        recognition.onerror = (event: any) => {
          console.error('Speech recognition error', event.error);
          if (event.error === 'no-speech') {
            setQuery('');
          }
          setIsListening(false);
        };

        recognition.onend = () => {
          if (isListening) {
            // Restart recognition if still in listening mode
            recognition.start();
          }
        };

        recognitionRef.current = recognition;
      } catch (error) {
        console.error('Error initializing speech recognition:', error);
        setIsMicAvailable(false);
      }
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [isListening]);

  const toggleVoiceSearch = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering the search button click
    
    if (!isMicAvailable) {
      console.warn('Microphone access is not available');
      return;
    }
    
    if (isListening) {
      // Stop listening and keep the current text
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      setIsListening(false);
    } else {
      try {
        if (recognitionRef.current) {
          // Clear the search when starting new voice input
          setQuery('');
          recognitionRef.current.start();
          setIsListening(true);
        }
      } catch (error) {
        console.error('Error starting voice recognition:', error);
        setIsListening(false);
        setQuery('');
      }
    }
  };

  // Simple fuzzy match: substring or Levenshtein distance <= 2
  function levenshtein(a: string, b: string) {
    const matrix = Array.from({ length: b.length + 1 }, (_, i) => [i]);
    for (let j = 0; j <= a.length; j++) matrix[0][j] = j;
    for (let i = 1; i <= b.length; i++) {
      for (let j = 1; j <= a.length; j++) {
        if (b[i - 1] === a[j - 1]) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1, // substitution
            matrix[i][j - 1] + 1,     // insertion
            matrix[i - 1][j] + 1      // deletion
          );
        }
      }
    }
    return matrix[b.length][a.length];
  }

  // Highlight query in text
  function highlight(text: string, query: string) {
    if (!query) return text;
    const re = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "ig");
    return text.split(re).map((part, i) =>
      re.test(part) ? <mark key={i} className="bg-yellow-200 px-0.5 rounded">{part}</mark> : part
    );
  }

  // Search static content index
  function searchContent(q: string) {
    if (!q) return [];
    const lower = q.toLowerCase();
    // Substring match first, then fuzzy
    let matches = searchIndex.filter(entry => entry.text.toLowerCase().includes(lower));
    if (matches.length < 5) {
      const fuzzy = searchIndex.filter(entry =>
        !matches.includes(entry) && levenshtein(lower, entry.text.toLowerCase()) <= 2
      );
      matches = matches.concat(fuzzy);
    }
    return matches.slice(0, 5);
  }

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setNotFound(false);
    const q = query.toLowerCase().trim();
    const contentResults = searchContent(q);
    setResults(contentResults);
    if (contentResults.length > 0) {
      setShow(true);
      setNotFound(false);
      // Optionally, navigate to first result on enter:
      // navigate(contentResults[0].route);
    } else {
      // Fallback to route search
      let match = searchRoutes.find((r) => r.keyword && q.includes(r.keyword));
      if (!match) {
        match = searchRoutes.find((r) =>
          r.keyword && levenshtein(q, r.keyword) <= 2
        );
      }
      if (match) {
        navigate(match.path);
        setShow(false);
        setQuery("");
      } else {
        setNotFound(true);
      }
    }
  };

  // Live update results as user types
  React.useEffect(() => {
    if (show && query) {
      setResults(searchContent(query));
    } else {
      setResults([]);
    }
  }, [query, show]);

  return (
    <div className="relative" ref={searchRef}>
      <div className="flex items-center">
        <button
          className="p-2 rounded-full hover:bg-gray-100 focus:outline-none"
          aria-label="Search"
          onClick={() => setShow((s) => !s)}
        >
          <Search className="h-4 w-4 text-muted-foreground" />
        </button>
      </div>
      {show && (
        <div className="absolute right-0 top-full mt-1 bg-transparent">
          <form 
            onSubmit={(e) => { e.preventDefault(); handleSearch(); }}
            className="w-48"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center bg-white rounded-md border border-gray-300 shadow-sm">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search..."
                className="w-full px-2 py-1 pr-7 text-xs border-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-700 focus:border-gray-700 rounded-md"
                autoFocus
                onKeyDown={(e) => e.stopPropagation()}
              />
              <div className="absolute right-0.5 flex items-center space-x-0.5">
                {isMicAvailable && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleVoiceSearch(e);
                    }}
                    className={`p-0.5 rounded ${
                      isListening 
                        ? 'text-red-500' 
                        : 'text-gray-400 hover:text-gray-600'
                    }`}
                    title={isListening ? 'Stop listening' : 'Search with your voice'}
                    aria-label={isListening ? 'Stop voice search' : 'Start voice search'}
                  >
                    {isListening ? <MicOff className="h-3 w-3" /> : <Mic className="h-3 w-3" />}
                  </button>
                )}
                <button
                  type="submit"
                  className="p-0.5 text-blue-500 hover:text-blue-600"
                  title="Search"
                  aria-label="Search"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Search className="h-3 w-3" />
                </button>
              </div>
            </div>
          </form>
          {results.length > 0 && (
            <div className="max-h-56 overflow-y-auto divide-y">
              {results.map((r, i) => (
                <Link
                  to={r.route}
                  key={i}
                  className="block px-2 py-1 text-sm text-gray-800 hover:bg-teal-50 rounded"
                  onClick={() => setShow(false)}
                >
                  {highlight(r.text, query)}
                  <span className="block text-xs text-gray-400">{r.route}</span>
                </Link>
              ))}
            </div>
          )}
          {notFound && results.length === 0 && (
            <div className="text-red-500 text-xs rounded shadow p-2 mt-2">No matching content found.</div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
