import Image from 'next/image';
import AnimatedContainer from '@/components/ui/animation/AnimatedContainer';
import { fetchArticle } from '@/lib/api/fetchImageCards';
import Link from 'next/link';

interface ArticlePageProps {
  params: {
    id: string;
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const article = await fetchArticle(params.id.replace('.json', ''));

  return (
    <AnimatedContainer>
      <div style={{ position: 'relative' }}>
        {article.image && (
          <Image
            src={article?.image}
            alt={article?.title || 'Article image'}
            fill
            quality={100}
            priority={true}
            style={{ objectFit: 'cover' }}
          />
        )}
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
          <article className="max-w-2xl w-full bg-black bg-opacity-20 backdrop-blur-lg rounded-xl shadow-lg overflow-hidden">
            <div className="p-8 flex flex-col gap-4" id={article?.id}>
              <h1 className="text-2xl font-bold mb-4 text-white text-center">{article?.title}</h1>
              <p className="text-lg text-gray-100 leading-relaxed ">{article?.content}</p>
              {article.relatedArticles && article.relatedArticles.length > 0 && (
                <div>
                  <h2 className="text-xl font-semibold">Előző cikkek:</h2>
                  <ul className="list-disc list-inside lowercase">
                    {article.relatedArticles.map((item, index) => (
                      <li key={index}>
                        <Link href={item.url}>{item.title}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </article>
        </div>
      </div>
    </AnimatedContainer>
  );
}
