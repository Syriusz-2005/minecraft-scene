


export const getClearLastFight = (tags: string[]) => `
  gamerule doMobLoot false
  ${tags.reduce((acc, tag) => acc + `kill @e[tag=${tag}]`, '')}
  gamerule doMobLoot true
`