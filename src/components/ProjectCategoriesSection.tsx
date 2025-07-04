import React, { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";

const categories = [
  {
    title: "Stress & Emotional Wellbeing",
    description:
      "Learn to manage stress, build resilience, and maintain emotional balance with our student-focused tips and resources.",
    image:
      "https://images.unsplash.com/photo-1503676382389-4809596d5290?auto=format&fit=crop&w=600&q=80", // Calm student
    accent: "bg-blue-500",
    to: "/resources?cat=stress",
  },
  {
    title: "Depression & Mood",
    description:
      "Understand signs of depression, how to seek help, and ways to support friends or yourself through difficult times.",
    image:
      "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80", // Support group
    accent: "bg-purple-500",
    to: "/resources?cat=depression",
  },
  {
    title: "Eating Behaviors & Body Image",
    description:
      "Explore healthy eating habits, positive body image, and how to get support for eating-related challenges.",
    image:
      "https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?auto=format&fit=crop&w=600&q=80", // Healthy eating
    accent: "bg-green-500",
    to: "/resources?cat=eating",
  },
  {
    title: "ADHD & Focus",
    description:
      "Find practical strategies, stories, and guidance for students with ADHD and focus difficulties, including school tips.",
    image:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80", // Focused student
    accent: "bg-yellow-400",
    to: "/resources?cat=adhd",
  },
  {
    title: "School & Social Life",
    description:
      "Get advice on friendships, bullying, school stress, and building a positive environment for learning and growth.",
    image:
      "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=600&q=80", // Friends together
    accent: "bg-pink-500",
    to: "/resources?cat=social",
  },
];

export default function ProjectCategoriesSection() {
  // For fade-in animation when in view
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new window.IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 transition-opacity duration-1000 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
    >
      <div className="flex flex-col gap-12">
        {categories.map((cat, i) => (
          <div
            key={cat.title}
            className={`flex flex-col md:flex-row items-stretch md:items-center bg-white border border-gray-200 rounded-2xl shadow-lg overflow-hidden transition-all duration-300 ${i % 2 === 0 ? '' : 'md:flex-row-reverse'}`}
          >
            <Link
              to={cat.to}
              className="md:w-2/5 w-full h-56 md:h-auto block group"
              aria-label={`Go to ${cat.title} resources`}
              tabIndex={0}
            >
              <div className={`h-2 w-full ${cat.accent}`}></div>
              <img
                src={cat.image}
                alt={cat.title}
                className="w-full h-56 md:h-full object-cover"
                draggable={false}
                style={{ borderBottomLeftRadius: i % 2 === 0 ? '0.75rem' : 0, borderTopLeftRadius: i % 2 === 0 ? '0.75rem' : 0, borderBottomRightRadius: i % 2 !== 0 ? '0.75rem' : 0, borderTopRightRadius: i % 2 !== 0 ? '0.75rem' : 0 }}
              />
            </Link>
            <div className="flex-1 flex flex-col justify-center px-8 py-8">
              <h2 className="text-3xl font-semibold text-gray-900 mb-4 leading-tight">
                {cat.title}
              </h2>
              <p className="text-gray-500 text-lg max-w-2xl">
                {cat.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
