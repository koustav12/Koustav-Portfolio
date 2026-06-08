/** Prepend the Vite base URL to any public-folder asset path. */
export const asset = (path: string) =>
  `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`
