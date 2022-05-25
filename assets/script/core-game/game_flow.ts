import * as _G from '../system/all_modules';
const { _, $ } = _G;

export const gameFlow = {

   init() {
      _G.user.addInitCallback((data) => {
         const puzzle_id = _G.user.entryPointData.puzzle_id;
         // const puzzle_id = 'NATURE_frame01';
         if (puzzle_id) {
            const [categoryName, frameName] = puzzle_id.split('_');
            _.log(` gameFlow >> init >> puzzle_id >> categoryName = ${categoryName} // frameName=${frameName} `);
            _G.gameMechanic.previewGame(categoryName, frameName, 1, 1, true); // render special puzzle
            _G.resources.loadSingleFrame(categoryName, frameName);
         }
      });
   },


}