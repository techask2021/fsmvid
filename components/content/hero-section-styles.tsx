"use client";

export default function HeroSectionStyles() {
  return (
    <style jsx>{`
      @keyframes fade-in {
        from { opacity: 0; }
        to { opacity: 1; }
      }
      
      @keyframes fade-in-up {
        from { 
          opacity: 0; 
          transform: translateY(30px); 
        }
        to { 
          opacity: 1; 
          transform: translateY(0); 
        }
      }
      
      @keyframes spin-slow {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }
      
      .animate-fade-in {
        animation: fade-in 1s ease-out forwards;
      }
      
      .animate-fade-in-up {
        animation: fade-in-up 1s ease-out forwards;
      }
      
      .animate-spin-slow {
        animation: spin-slow 3s linear infinite;
      }
      
      .delay-200 { animation-delay: 200ms; }
      .delay-400 { animation-delay: 400ms; }
      .delay-600 { animation-delay: 600ms; }
      .delay-800 { animation-delay: 800ms; }
      .delay-1000 { animation-delay: 1000ms; }
      .delay-1200 { animation-delay: 1200ms; }
    `}</style>
  );
}
