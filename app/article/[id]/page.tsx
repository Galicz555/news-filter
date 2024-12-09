import Image from 'next/image';
import AnimatedContainer from '@/components/ui/animation/AnimatedContainer';
import { fetchArticle } from '@/lib/api/fetchImageCards';

interface ArticlePageProps {
  params: {
    id: string;
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const article = await fetchArticle(Number(params.id));

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
              {/* <h1 className="text-4xl font-bold mb-4 text-white">{article?.title}</h1> */}
              <p className="text-lg text-gray-100 leading-relaxed">{article?.title}</p>
            </div>
          </article>
        </div>
      </div>
    </AnimatedContainer>
  );
}
