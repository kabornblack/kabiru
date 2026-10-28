// The package ships no types; only the lookup used by app/api/visit is declared.
declare module "iso-3166-2" {
  type Subdivision = { name?: string };

  const iso3166: {
    /** Looks up an ISO 3166-2 code such as "EE-37"; unknown codes give an empty result. */
    subdivision(code: string): Subdivision | null | undefined;
  };

  export default iso3166;
}
