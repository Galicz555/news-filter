'use client';

import Image from 'next/image';
import { Card, CardContent, CardFooter } from '@/components/ui/cards/base/Card';
import { usePathname } from 'next/navigation';

export interface ImageCardProps {
  id: string;
  image?: string;
  title?: string;
  content?: string;
  href?: string;
  priority?: boolean;
  previousArticles?: string[];
  scores?: Map<string, string>;
  type?: string;
  isAlive?: boolean;
}

export default function ImageCard({
  image,
  title,
  priority,
  href,
  scores,
  type,
  isAlive = true,
}: ImageCardProps) {
  const darkMode = localStorage.getItem('darkMode') === 'true';

  const getBackgroundImage = (path: string | null) => {
    switch (path) {
      case '/home':
        return '';
      case '/news':
        return darkMode ? '/images/background/black-paper.jpg' : '/images/background/paper.jpg';
      case '/characters':
        return '';
      case '/items':
        return '';
      default:
        return '';
    }
  };

  const backgroundImage = getBackgroundImage(usePathname());

  return (
    <Card
      className={`flex-grow w-full overflow-hidden shadow-lg max-h-full bg-transparent relative`}
      href={href}
      style={{
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <CardContent className="p-0">
        {image && (
          <div className="relative h-[200px] w-full">
            <Image
              src={image}
              alt="Card image"
              fill
              priority={priority}
              style={{ objectFit: type == 'characters' ? 'contain' : 'cover' }}
              sizes="(min-width: 640px) 300px, 100vw"
              className={`${!isAlive ? 'grayscale' : ''}`}
            />
          </div>
        )}
      </CardContent>
      <CardFooter className="p-4 flex-col">
        <h3 className="text-md font-semibold line-clamp-3 text-center character-name dark:text-[hsl(var(--antique-gold))]">
          {title}
        </h3>
        <div className="grid grid-cols-6 gap-4">
          {scores &&
            Array.from(scores.entries()).map(([key, value]) => (
              <div key={key} className="flex flex-col items-center">
                <strong>{key}</strong> {value}
              </div>
            ))}
        </div>
      </CardFooter>
    </Card>
  );
}
