import OpenAIApi from 'openai';
import 'dotenv/config';
import { z } from 'zod';

const kapcsolódj_az_openapihoz = () => {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error('Nincs OPENAI_API_KEY');
  }
  return new OpenAIApi({
    apiKey: process.env.OPENAI_API_KEY,
  });
};

const válasz_minta = z.object({
  choices: z.array(
    z.object({
      message: z.object({
        content: z.string(),
      }),
    }),
  ),
});

export const open_api = async (item: { szöveg: string }) => {
  console.log('open_api:', item.szöveg);
  let result
  try{
    result = await kapcsolódj_az_openapihoz()
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
    .then((válasz) => {
      try {
        return válasz_minta.parse(válasz).choices[0].message.content;
      } catch (error) {
        return 'open_api nem adott vissza megfelelő választ';
      }
    });
    } catch (error) {
      console.error('open_api hiba:', error);
      return 'open_api'
   }
   console.log('open_api result: END', result);
 return result
}

// export const processMultipleFiles = async (filePath: string) => {
//   const files = await fs.promises.readdir(filePath);
//   const promises = files.map(async (file) => {
//     const message = await open_api(path.join(filePath, file));
//     return message;
//   });
//   return Promise.all(promises);
// };
