export default function BookSearchInput() {
  return (
    <div className="rounded-sm border border-border bg-surface px-3 py-2">
      <label
        htmlFor="book-search"
        className="mb-1 block font-mono text-[0.65rem] uppercase tracking-widest text-foreground/40"
      >
        Search book
      </label>
      <input
        id="book-search"
        type="search"
        placeholder="Coming soon"
        disabled
        className="w-full bg-transparent text-sm text-foreground/45 outline-none placeholder:text-foreground/35"
      />
    </div>
  );
}
