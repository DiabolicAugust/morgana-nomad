type JsonLd = Record<string, unknown> | Record<string, unknown>[];

export function JsonLd({ data }: { data: JsonLd }) {
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
