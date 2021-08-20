/**
 * 実際にゲームを実装するための初期化を行います。
 */

 // パッケージ
 let my = {};

 /**
  * ゲーム固有のレイヤーの初期化
  */
 my.lyr = {};
 my.lyr.wd = 0;       // ワールド
 my.lyr.cr = 1        // キャラクター
 my.lyr.bg = 2;       // 背景
 my.lyr.pl = 3;       // プレイヤー
 my.lyr.ef = 4;       // エフェクト
 my.lyr.ui = 5;       // UI
 my.lyr.bd = 6;       // ボード
 my.lyr.sz = 7;       // レイヤー数

 /**
  * 初期化処理
  */
  my.init = function() {
    my.R.init();          // リソースの初期化
    my.L.init();          // 言語データの初期化

    let $UP = rpg.$SP;
    $UP.datId = "rpg";    // データ入出力用ユニークID
  };

  // リソース管理
  my.R = {};

  // リソース初期化
  my.R.init = function() {
    let R = rpg.R;
    R.resDlArr();
    R.resR();

    R.setBsUrl = "../img";
    R.add("img", "chr_hnd_dash_0", "chr_hnd_dash_0.png");
    R.add("img", "chr_hnd_dash_1", "chr_hnd_dash_1.png");
    R.add("img", "chr_hnd_dash_2", "chr_hnd_dash_2.png");
  };

  // 言語管理
  my.L = {};

  // 言語管理初期化
  my.L.init = function() {

  };
