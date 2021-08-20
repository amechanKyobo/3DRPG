"use starict"

/**
 * ゲームを表示するStateです
 */

 my.StateMainGame = class extends rpg.StateBase {
   constructor(opt) {
     super({
        name: "StateMainGame"
      });
   }

   enter() {
     super.enter();

     let $SP = rpg.$SP;

     // ワールド描画アイテム
     this.itms.push(new my.ItemWorld({trgt: $SP.lyrs[my.lyr.wd].gl}));

     // ハンド描画アイテム
     // this.itms.push(new my.ItemChrHnd({
     //      trgt: $SP.lyrs[my.lyr.cr].cntxt,
     //      // ハンドアニメーションイベント登録
     //      hndAnms: [{
     //         name: "hand_dash"
     //        ,typ: "key"
     //        ,key: "h"
     //        ,act: 0
     //        ,imgLst: ["test_01", "test_02", "test_03", "test_04"],
     //      }]
     //    }));
  }

  updateEnter() {
    return true;
  }
}
