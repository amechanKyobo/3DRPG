"use starict"

/**
 * 著者シーン
 * 作成者情報表示、リソースの読み込みを行います
 */

 my.StateAuthor = class extends rpg.StateBase {
   constructor(opt) {
     super(cmb(true, {
        name: "StateAuthor"
       ,needRender: false
       ,dlEnd: false
       ,dlNow: 0
       ,dlSz: 0
       ,dlFnm: ""
     }, opt));
   }

   enter() {
     this.dlSz = rpg.R.dlSz;
     let $this = this;

     rpg.R.strtDl({
        prgrs: function(dlNow, dlSz, fnm) {
          $this.dlNow = dlNow;
          $this.dlSz = dlSz;
          $this.dlfnm = fnm;
        }

       ,end: function(dlNow, dlSz) {
         $this.needRender = true;
         $this.dlNow = dlNow;
         $this.dlFnm = "";
         $this.dlEnd = true;
       }
     });
   }

   renderExec
 }
