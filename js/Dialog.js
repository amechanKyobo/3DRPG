"use starict"

/**
 * ダイアログを表示します
 */

rpg.Dialog = new function() {
  this.enbl = false;
  this.callBack = function(itmNo) {};
  this.tmWait = 300;

  // ダイアログ情報
  this.pTtl   = "";
  this.pItms  = [];
  this.pBtn   = 0;

  // ボタン情報
  this.btnSz      = 0;
  this.btnArr     = [];
  this.btnRctArr  = [];
  this.btnSel     = -1;
  this.resOffst   = 0;
  this.btnLck     = false;

  var $this = this;

  
}
