import React, { useEffect, useState } from 'react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Globe } from 'lucide-react';

declare global {
  interface Window {
    google: any;
    googleTranslateElementInit: () => void;
  }
}

const GoogleTranslateDropdown = () => {
  const [currentLanguage, setCurrentLanguage] = useState('English');

  useEffect(() => {
    // Hide the default Google Translate widget
    const style = document.createElement('style');
    style.innerHTML = `
      #google_translate_element { display: none !important; }
      .goog-te-banner-frame { display: none !important; }
      .goog-te-menu-value { display: none !important; }
      body { top: 0 !important; }
      .goog-te-gadget { display: none !important; }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const translateToLanguage = (langCode: string, langName: string) => {
    if (window.google && window.google.translate) {
      const selectElement = document.querySelector('.goog-te-combo') as HTMLSelectElement;
      if (selectElement) {
        selectElement.value = langCode;
        selectElement.dispatchEvent(new Event('change'));
        setCurrentLanguage(langName);
      }
    }
  };

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'hi', name: 'हिंदी' }
  ];

  return (
    <div className="fixed top-4 right-4 z-50">
      {/* Hidden Google Translate Element */}
      <div id="google_translate_element" style={{ display: 'none' }}></div>
      
      {/* Custom Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="outline" 
            size="sm"
            className="bg-white/90 backdrop-blur-sm border-gray-300 shadow-md hover:bg-white/95"
          >
            <Globe className="h-4 w-4 mr-2" />
            {currentLanguage}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent 
          align="end" 
          className="bg-white shadow-lg border border-gray-200"
        >
          {languages.map((lang) => (
            <DropdownMenuItem
              key={lang.code}
              onClick={() => translateToLanguage(lang.code, lang.name)}
              className={`cursor-pointer hover:bg-gray-100 ${
                currentLanguage === lang.name ? 'bg-blue-50 text-blue-700' : ''
              }`}
            >
              {lang.name}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default GoogleTranslateDropdown;