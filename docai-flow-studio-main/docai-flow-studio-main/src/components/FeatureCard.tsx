import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button'; // Assuming Button can be used here

interface FeatureCardCtaProps {
  text: string;
  link: string;
  className?: string; // Optional custom styling for the button
}

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  cta?: FeatureCardCtaProps; // Optional CTA properties
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, cta }) => {
  return (
    <div className="bg-card text-card-foreground p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow flex flex-col items-center h-full">
      <div className="flex justify-center mb-4 text-primary">{icon}</div>
      <h3 className="text-xl font-semibold mb-2 text-center">{title}</h3>
      <p className="text-muted-foreground text-center text-sm flex-grow">{description}</p>
      {cta && (
        <Button asChild size="sm" className={`mt-4 ${cta.className || 'bg-primary hover:bg-primary/90 text-primary-foreground'}`}>
          <Link to={cta.link}>{cta.text}</Link>
        </Button>
      )}
    </div>
  );
};

export default FeatureCard;
