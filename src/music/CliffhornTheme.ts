

import {Compiler, Configurator} from 'music/out/index.js';


const cliffhornTheme = new Configurator()
  .setIntroduction({
    end: 0.1,
  })
  .setMainLoop({
    end: 166.9,
  })
  .setFinish({
    end: 166.95,
  });

await new Compiler('cliffhorn_theme.mp3', './src/musicOut/').compile(cliffhornTheme);