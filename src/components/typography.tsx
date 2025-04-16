import React from 'react';

// Define types for component props
interface ChildrenProps {
  children: React.ReactNode;
}

interface CTAProps extends ChildrenProps {
  href: string;
}

export const H1: React.FC<ChildrenProps> = ({ children }) => (
  <h1 className="text-4xl md:text-5xl font-bold mb-6">{children}</h1>
);

export const H2: React.FC<ChildrenProps> = ({ children }) => (
  <h2 className="text-2xl md:text-3xl font-semibold mt-10 mb-4">{children}</h2>
);

export const H3: React.FC<ChildrenProps> = ({ children }) => (
  <h3 className="text-xl md:text-2xl font-semibold mt-8 mb-3">{children}</h3>
);

export const P: React.FC<ChildrenProps> = ({ children }) => (
  <p className="text-lg leading-relaxed mb-4">{children}</p>
);

export const UL: React.FC<ChildrenProps> = ({ children }) => (
  <ul className="list-disc list-outside pl-6 mb-4 space-y-2 text-lg leading-relaxed">
    {children}
  </ul>
);

export const LI: React.FC<ChildrenProps> = ({ children }) => (
  <li>{children}</li>
);

export const Blockquote: React.FC<ChildrenProps> = ({ children }) => (
  <blockquote className="border-l-4 border-primary pl-4 italic text-primary/80 my-6">
    {children}
  </blockquote>
);

export const CTA: React.FC<CTAProps> = ({ href, children }) => (
  <a
    href={href}
    className="inline-block bg-primary hover:bg-primary/90 text-darkBg font-semibold py-3 px-6 rounded-xl mt-8 transition-colors"
  >
    {children}
  </a>
); 