import Image from 'next/image';
import { Card, CardContent, CardFooter } from '@/components/ui/cards/base/Card';

export interface ImageCardProps {
  id: string;
  image?: string;
  title: string;
  href?: string;
  priority?: boolean;
  scores?: Map<string, string>;
}

export default function ImageCard({ image, title, priority, href, scores }: ImageCardProps) {
  return (
    <Card
      className="flex-grow w-full sm:w-[300px] overflow-hidden shadow-lg bg-transparent"
      href={href}
    >
      <CardContent className="p-0">
        {image && (
          <div className="relative h-[200px] w-full">
            <Image
              src={image}
              alt="Card image"
              fill
              priority={priority}
              style={{ objectFit: 'cover' }}
              sizes="(min-width: 640px) 300px, 100vw"
            />
          </div>
        )}
      </CardContent>
      <CardFooter className="p-4 flex-col">
        <h3 className="text-lg font-semibold line-clamp-3">{title}</h3>
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
