"use starict"

/**
 * 描画に関するユーティリティーファイルです
 */
rpg.utl = {
  /**
   * 角が凹んでいる短形パス作成
   * @param {object} cntxt - 対象のコンテキスト
   * @param {number} x - x座標
   * @param {number} y - y座標
   * @param {number} w - w座標
   * @param {number} h - h座標
   * @param {number} c - 凹の幅
   */
    dntRct: function(cntxt, x, y, w, h, c, opt) {
      cntxt.beginPath();
      cntxt.moveTo(x + c, y);
      cntxt.lineTo(x + c, y + c);
      cntxt.lineTo(x, y + c);

      cntxt.lineTo(x, y + h - c);
      cntxt.lineTo(x + c, y + h - c);
      cntxt.lineTo(x + c, y + h);

      cntxt.lineTo(x + w - c, y + h);
      cntxt.lineTo(x + w - c, y + h - c);
      cntxt.lineTo(x + w, y + h - c);

      cntxt.lineTo(x + w, y + c);
      cntxt.lineTo(x + w - c, y + c);
      cntxt.lineTo(x + w - c, y);
      cntxt.closePath();
    }

    // ボタン描画設定
   ,vw_btnBdyCol: [   // 本体グラデーション
      [[0, "#ffffff"], [0.5, "#ffffff"], [1, "#ffffff"]]   // stat: 0 待機
     ,[[0, "#ffffff"], [0.5, "#ffffff"], [1, "#ffffff"]]   // stat: 1 クリック
     ,[[0, "#ffffff"], [0.5, "#ffffff"], [1, "#ffffff"]]   // stat: 2 無効
   ]
   ,vw_btnFlmCol: ["#ffffff", "#ffffff", "#ffffff"]   // 枠
   ,vw_btnTxtCol: ["#ffffff", "#ffffff", "#ffffff"]   // テキスト

   // ボード描画設定
   ,vw_brdBdyCol:     "#242424"       // 本体
   ,vw_brdBblShdw:    "#696969"       // ベベルシャドウ
   ,vw_brdBblHghLght: "WHITE"         // ベベルハイライト
   ,vw_brdFrmCol:     "#f5f5f5"       // フレーム

   ,vw_brdBtnbdyCol:      ["#f5f5f5", "#666666", "#666666"]
   ,vw_brdBtnBblHghLght:  ["WHITE",   "#b3b3b3", "#b3b3b3"]
   ,vw_brdBtnBblShdw:     ["#696969", "#4d4d4d", "#4d4d4d"]

   ,vw_brdScrBsCol:       "#330000"
   ,vw_brdScrBarBdyCol:   "#f5f5f5"
   ,vw_brdScrBarBblShdw:  "#696969"

   // 共通描画設定
   ,vw_contourCol: "BLACK"    // 輪郭

   /**
   * ボードのフレーム描画します
   *
   * cntxt  コンテキスト
   * x      x座標
   * y      y座標
   * w      横幅
   * h      縦幅
   * d      凹の幅
   * c      輪郭の幅
   * b      ベベルの幅
   */
   ,drwBrdFrm: function(cntxt, x, y, w, h, d, c, b) {
     // 描画の設定の保存
     cntxt.save();

     // 枠の描画
     cntxt.globalCompositeOperation = "destination-over";
     cntxt.fillStyle = this.vw_brdFrmCol;
     this.dntRct(cntxt, x, y, w, h, d);
     cntxt.fill();

     // ハイライト
     cntxt.globalCompositeOperation = "source-over";
     cntxt.fillStyle = this.vw_brdBblHghLght;
     cntxt.fillRect(x + d, y, w - d * 2, b);
     cntxt.fillRect(x, y + d, b, h - d * 2);

     // シャドウ
     cntxt.fillStyle = this.vw_brdBblShdw;
     cntxt.fillRect(x + d, y + h - b, w - d * 2, b);
     cntxt.fillRect(x + w - d, y + d, b, h - d * 2);

     // 輪郭
     cntxt.globalCompositeOperation = "destination-over";
     cntxt.fillStyle = this.vw_contourCol;
     this.dntRct(cntxt, x - c, y - c, w + c * 2, h + c * 2, c);
     cntxt.fill();

     // 描画の設定の復帰
     cntxt.restore();
   }

   /**
    * ボードのベースを描画します
    */
   ,drwBrdBs: function(cntxt, x, y, w, h) {
     cntxt.save();

     cntxt.fillStyle = this.vw_brdBdyCol;
     cntxt.fillRect(x, y, w, h);
     cntxt.restore();
   }

   /**
    * ボードで使用するボタンを描画します
    * @param {object} prm - フレームを描画の設定
    * prm.img     表示する画像ID
    * prm.stat    ボタンのステイト
    */
    ,drwBrdBtn: function(prm) {
      let cntxt = prm.cntxt;
      cntxt.save();

      let x = prm.x;
      let y = prm.y;
      let w = prm.w;
      let h = prm.h;
      let d = prm.d;
      let b = prm.b;
      let stat = prm.stat || 0;

      // 本体
      cntxt.globalCompositeOperation = "source-atop";
      cntxt.fillStyle = this.vw_brdBtnbdyCol[stat];
      this.dntRct(cntxt, x, y, w, h, d);
      cntxt.fill();

      // ハイライト
      cntxt.fillStyle = this.vw_brdBtnBblHghLght[stat];
      cntxt.fillRect(x + d, y, w - d * 2, b);
      cntxt.fillRect(x, y + d, b, h - d * 2);

      // シャドウ
      cntxt.fillStyle = this.vw_brdBtnBblShdw[stat];
      cntxt.fillRect(x + d, y + h - b, w - d * 2, b);
      cntxt.fillRect(x + w - b, y + d, b, h - d * 2);


      // 描画の設定の復帰
      cntxt.restore();
    }

    /**
     * ボードで使用するボタンの連結部分を描画します
     */
    ,drwBrdBtnBrc: function(cntxt, x, y, w, h, b) {
      cntxt.save();

      cntxt.globalCompositeOperation = "source-atop";
      cntxt.fillStyle = this.vw_brdBtnbdyCol[0];
      cntxt.fillRect(x, y, w, h);

      cntxt.fillStyle = this.vw_brdBtnBblShdw[0];
      cntxt.fillRect(x + w - b, y, b, h);

      cntxt.restore();
    }

    /**
     * スクロールバーの描画
     *
     * cntxt    対象のコンテキスト
     * x        ベース X座標
     * y        ベース Y座標
     * w        ベース 横幅
     * h        ベース 縦幅
     * sx       スクロールバー X座標
     * sy       スクロールバー Y
     * sw       スクロールバー 横幅
     * sh       スクロールバー 縦幅
     */
    ,drwScrBar: function(cntxt, x, y, w, h, sx, sy, sw, sh, b) {
      cntxt.save();

      // ベース
      cntxt.fillStyle = this.vw_brdScrBsCol;
      cntxt.fillRect(x, y, w, h);

      // スクロールバー
      cntxt.fillStyle = this.vw_brdScrBarBdyCol;
      cntxt.fillRect(sx, sy, sw, sh);

      // シャドウ
      cntxt.fillStyle = this.vw_brdScrBarBblShdw;
      cntxt.fillRect(sx + sw - b, sy , b, sh);
      cntxt.fillRect(sx, sy + sh - b, sw, b);
      cntxt.restore();
    }

    /**
     * 描画のクリア
     * @param {object} cntxt - 対象レイヤー
     * @param`{object} opt - クリア設定
     */
    ,clrCntxt: function(cntxt, opt) {
      let $SP = rpg.$SP;
      opt = cmb(true, {x: 0, y: 0, w: $SP.cnvsW, h: $SP.cnvsH}, opt);

      // レイヤー番号を指定している場合
      if (typeof cntxt == "number") cntxt = $SP.lyrs[cntxt].cntxt;

      cntxt.clearRect(opt.x, opt.y, opt.w, opt.h);
    }
};
