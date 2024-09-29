import Image from 'next/image';
import {
  Card,
  CardContent,
  CardFooter,
} from '@/app/components/ui/cards/base/Card';

interface ImageCardProps {
  image: string;
  title: string;
  href?: string;
  priority?: boolean;
}

export default function ImageCard({
  image,
  title,
  priority,
  href,
}: ImageCardProps) {
  return (
    <Card className="flex-grow w-full sm:w-[300px] overflow-hidden" href={href}>
      <CardContent className="p-0">
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
      </CardContent>
      <CardFooter className="p-4">
        <h3 className="text-lg font-semibold">{title}</h3>
      </CardFooter>
    </Card>
  );
}
