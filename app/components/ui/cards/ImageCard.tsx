import Image from 'next/image';
import {
  Card,
  CardContent,
  CardFooter,
} from '@/app/components/ui/cards/base/Card';

export default function ImageCard() {
  return (
    <Card className="flex-grow w-full sm:w-[300px] overflow-hidden">
      <CardContent className="p-0">
        <div className="relative h-[200px] w-full">
          <Image
            src="/placeholder.jpeg?height=200&width=300"
            alt="Card image"
            layout="fill"
            objectFit="cover"
          />
        </div>
      </CardContent>
      <CardFooter className="p-4">
        <h3 className="text-lg font-semibold">Beautiful Landscape</h3>
      </CardFooter>
    </Card>
  );
}
