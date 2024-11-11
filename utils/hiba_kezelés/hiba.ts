export function ha_hiba_jelentsd_és_állj_le(hiba: NodeJS.ErrnoException | null) {
  if (hiba) {
    console.error('Hiba:', hiba);
    process.exit(1);
  }
}
