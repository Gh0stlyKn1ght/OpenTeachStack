export default function VideoEmptyState() {
  return (
    <div className="border border-dashed border-border bg-surface/60 p-8 text-center">
      <p className="m-0 font-heading text-xl font-bold text-foreground">
        No approved videos have been added yet.
      </p>
      <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-slate">
        Add YouTube links to the approved video file, rebuild the index, and
        the library will appear here.
      </p>
    </div>
  );
}
