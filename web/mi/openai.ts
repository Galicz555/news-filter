import OpenAIApi from 'openai';
import 'dotenv/config';

const kapcsolódj_az_openapihoz = () => {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error('Nincs OPENAI_API_KEY');
  }
  return new OpenAIApi({
    apiKey: process.env.OPENAI_API_KEY,
  });
};

// export const processMultipleFiles = async (filePath: string) => {
//   const files = await fs.promises.readdir(filePath);
//   const promises = files.map(async (file) => {
//     const message = await open_api(path.join(filePath, file));
//     return message;
//   });
//   return Promise.all(promises);
// };

export const open_api = (item: { szöveg: string }) =>
  kapcsolódj_az_openapihoz()
    .chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content:
            'Készítsen elemzést a történelmi pénzügyi adatok alapján a jövőbeli piaci mozgások előrejelzéséhez, de legyen érthető egy általános iskolás számára is. Azt is szeretném ha a végére hat 0-100-as skálán értékelnéd hogy mekkora hatással van a 35 éves web fejlesztőre Magyarországon,a következő formátumban {¤jóságosság¤: , ¤filozófikusság¤: , ¤viccesség¤: , ¤meglepőség¤: , ¤alaposság¤: , ¤pénzügyi_haszon¤: }.',
        },
        { role: 'user', content: item.szöveg },
      ],
    })
    .then((válasz) =>
      válasz?.choices &&
      válasz.choices.length > 0 &&
      typeof válasz.choices[0].message.content === 'string'
        ? válasz.choices[0].message.content
        : 'Openai nem adott választ.',
    );
