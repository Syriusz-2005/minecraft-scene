


export const getClearLastFight = (tags: string[]) => `
  gamerule doMobLoot false
  ${tags.reduce((acc, tag) => acc + `\nkill @e[tag=${tag}]`, '')}
  gamerule doMobLoot true
`