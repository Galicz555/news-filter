export function nevezd_el_könyv_alapján(könyv: string) {
  const találat = könyv.match(/www\.([^\.]+)\./) || könyv.match(/rss\.([^\.]+)\./);
  const fájlnév = találat ? `${találat[1]}` : 'ismeretlen';
  return fájlnév;
}
