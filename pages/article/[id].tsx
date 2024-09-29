import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';

interface ArticleProps {
  id: string;
  title: string;
  content: string;
  image: string;
}

export const getServerSideProps: GetServerSideProps<ArticleProps> = async (
  context,
) => {
  const id = context.params?.id as string;
  // Simulating an API call
  await new Promise((resolve) => setTimeout(resolve, 1000));
  // Mock data - in a real app, you'd fetch this from an API
  const article = {
    id,
    title: `Beautiful Landscape ${id}`,
    content: `This is a detailed description of the beautiful landscape ${id}.
    It's a serene view that captures the essence of nature's beauty.
    The rolling hills, lush forests, and clear skies come together to create a breathtaking scene.
    Whether you're an avid hiker or simply someone who appreciates natural beauty,
    this landscape offers something for everyone to enjoy and admire.`,
    image: `/placeholder.jpeg?height=1080&width=1920&text=Landscape+${id}`,
  };
  return { props: article };
};

export default function ArticlePage({
  id,
  title,
  content,
  image,
}: ArticleProps) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={content.slice(0, 160)} />
      </Head>
      <AnimatePresence mode="wait">
        <motion.div
          className="relative min-h-screen"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Image
            src={image}
            alt={title}
            fill
            objectFit="cover"
            quality={100}
            priority={true}
            style={{ objectFit: 'cover' }}
          />
          <div className="absolute inset-0 bg-black bg-opacity-50" />
          <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
            <article className="max-w-2xl w-full bg-white bg-opacity-20 backdrop-blur-lg rounded-xl shadow-lg overflow-hidden">
              <div className="p-8" id={id}>
                <h1 className="text-4xl font-bold mb-4 text-white">{title}</h1>
                <p className="text-lg text-gray-100 leading-relaxed">
                  {content}
                </p>
              </div>
            </article>
          </div>
        </motion.div>
      </AnimatePresence>
    </>
  );
}
