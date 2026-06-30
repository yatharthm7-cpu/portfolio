import { BlockBurstButton } from './BlockBurstButton';

export function LiveProjectButton() {
  return (
    <BlockBurstButton className="rounded-full border-2 border-foreground text-foreground font-medium uppercase tracking-widest px-8 py-3 sm:px-10 sm:py-3.5 text-sm sm:text-base hover:bg-foreground/10 transition-colors">
      View Server
    </BlockBurstButton>
  );
}
