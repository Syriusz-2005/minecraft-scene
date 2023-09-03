


export const getClearLastFight = (tag: string) => `
  gamerule doMobLoot false
  kill @e[tag=${tag}]
  gamerule doMobLoot true
`