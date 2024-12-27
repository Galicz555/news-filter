'use server';

import { v4 as uuidv4 } from 'uuid';
import {
  readFiles,
  readFolder,
  readSpecificFiles,
  readSpecificFilesPlain,
} from '@/utils/rendszer/fájl';
import { marked } from 'marked';

const CHARACTERFOLDER = './bitd/characters';

export interface Item {
  id: string;
  title?: string;
  looks?: string;
  backstory?: string;
  motivations?: string;
  personality?: string;
  influence?: string;
  followers?: string;
  enemies?: string;
  content?: string | TrustedHTML;
  href: string;
  image?: string;
  isAlive?: boolean;
  relatedArticles?: {
    url: string;
    title: string;
  }[];
}

export async function fetchCharacterCards(type: string): Promise<Item[]> {
  const folder = type === 'characters' ? CHARACTERFOLDER : '';
  const fileContents = readFiles(folder)(JSON.parse);

  const items = fileContents.map((fileContent) => {
    return {
      id: fileContent?.id ?? uuidv4(),
      title: fileContent?.title ?? 'Anonymus',
      looks: fileContent?.looks ?? '',
      backstory: fileContent?.backstory ?? '',
      motivations: fileContent?.motivations ?? '',
      personality: fileContent?.personality ?? '',
      influence: fileContent?.influence ?? '',
      followers: fileContent?.followers ?? '',
      enemies: fileContent?.enemies ?? '',
      content: fileContent?.content ?? 'I am groot',
      href: fileContent?.href ?? '#',
      image: fileContent?.image ?? '',
      isAlive: fileContent?.isAlive ?? true,
    };
  });

  return items;
}

export async function fetchCharacter(title: string): Promise<Item> {
  const file = await readFolder(CHARACTERFOLDER).then((files) =>
    files.filter((file) => file.endsWith('.json')).find((file) => file.includes(title)),
  );

  if (!file)
    return {
      id: uuidv4(),
      title: 'Anonymus',
      looks: '',
      backstory: '',
      motivations: '',
      personality: '',
      influence: '',
      followers: '',
      enemies: '',
      content: 'I am groot',
      href: '#',
      image: '',
    };

  const fileContent = readSpecificFiles(CHARACTERFOLDER, [file])[0];

  const characterContents = (await readFolder(CHARACTERFOLDER))
    .filter((file) => file.startsWith(title))
    .filter((file) => file.endsWith('.txt'));

  if (characterContents.length !== 0) {
    const rawContent = readSpecificFilesPlain(CHARACTERFOLDER, characterContents)[0];
    fileContent.content = marked(rawContent);
  }

  return {
    id: fileContent?.id ?? uuidv4(),
    title: fileContent?.title ?? 'Anonymus',
    looks: fileContent?.looks ?? '',
    backstory: fileContent?.backstory ?? '',
    motivations: fileContent?.motivations ?? '',
    personality: fileContent?.personality ?? '',
    influence: fileContent?.influence ?? '',
    followers: fileContent?.followers ?? '',
    enemies: fileContent?.enemies ?? '',
    content: fileContent?.content ?? 'I am groot',
    href: fileContent?.href ?? '#',
    image: fileContent?.image ?? '',
  };
}
