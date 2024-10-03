import Image from 'next/image';
import AnimatedContainer from '@/components/ui/animation/AnimatedContainer';

interface ArticleProps {
  id: string;
  title: string;
  content: string;
  image: string;
}

interface ArticlePageProps {
  params: {
    id: string;
  };
}

async function fetchArticle(id: string): Promise<ArticleProps> {
  // Mock data - in a real app, you'd fetch this from an API
  return {
    id,
    title: `Beautiful Landscape ${id}`,
    content: `This is a detailed description of the beautiful landscape ${id}.
      It's a serene view that captures the essence of nature's beauty.
      The rolling hills, lush forests, and clear skies come together to create a breathtaking scene.
      Whether you're an avid hiker or simply someone who appreciates natural beauty,
      this landscape offers something for everyone to enjoy and admire.`,
    image: `/placeholder.jpeg?height=1080&width=1920&text=Landscape+${id}`,
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const article = await fetchArticle(params.id);

  return (
    <AnimatedContainer>
      <div style={{ position: 'relative' }}>
        <Image
          src={article?.image}
          alt={article?.title}
          fill
          quality={100}
          priority={true}
          style={{ objectFit: 'cover' }}
        />
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
          <article className="max-w-2xl w-full bg-white bg-opacity-20 backdrop-blur-lg rounded-xl shadow-lg overflow-hidden">
            <div className="p-8" id={article?.id}>
              <h1 className="text-4xl font-bold mb-4 text-white">
                {article?.title}
              </h1>
              <p className="text-lg text-gray-100 leading-relaxed">
                {article?.content}
              </p>
            </div>
          </article>
        </div>
      </div>
    </AnimatedContainer>
  );
}
