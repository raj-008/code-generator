export function snakeToCamelCase(string) {
  return string.toLowerCase().replace(/[-_][a-z]/g, (group) => group.toUpperCase().replace("-", "").replace("_", ""));
}
