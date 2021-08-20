"use starict"

/**
 * WebGLを利用してワールドを描画します
 * 角度 位置 の視点移動も行います
 */

 my.ItemWorld = class extends rpg.Item {
   constructor(opt) {
     super(cmb(true, {
        typ: "world"
       ,needRender: true
       ,needUpdate: false

       ,accptMouEvnt: true
       ,accptKeyEvnt: true

       ,isPtrLck: false
     }, opt));

     // ポインター座標
     this.lstPtr = null;
     this.agl = {x: 0, y: 0, z: 0};

     // カメラの位置
     this.camPos = {x: 0, y: 0, z: 0};

     // webGLのセットアップ
     my.utlWebGL.initGl(this.trgt);

     if (DocumentIsSuppertedPointerLock(document)) {
       // this.isPtrLck = true;
       // this.pointerLock();
     } else {
       window.alert("pointerLock is not supperted in your browser :(");
       return;
     }


   }

   render() {
     super.render();

     // webGlクリアー
     my.utlWebGL.clearGl(this.trgt);

     // 視点移動
     let aglX = this.agl.y * Math.PI / 180;
     let aglY = this.agl.x * Math.PI / 180;

     // マップを描画
     let map = my.D.map_stg_01;
     let len = 6;
     for (var x = 0; x < len; x++) {
       for (var y = 0; y < len; y++) {
         for (var z = 0; z < len; z++) {
           if (map[x][y][z] == 0) continue;
           // console.log("x : " + x + " y : " + y + " z : " + z);
            my.utlWebGL.drwSquare(this.trgt, [x - len / 2, y, z - len / 2], this.camPos, {x: aglX, y: aglY}, "sample.png");
         }
       }
     }

     // my.utlWebGL.drwSquare(this.trgt, [0, 0, 0], this.camPos, {x: aglX, y: aglY}, "sample.png");
   }

   evnt(e) {
     // マウスロックを有効に
     if (! this.isPtrLck && e.act == 0) {
       this.isPtrLck = true;
       console.log("lc");
       this.pointerLock();
     }

     if (e.typ == "mou") {
       // マウス入力イベント
       //this.mouEvnt(e);
     } else if (e.typ == "key") {
       // キーボード入力イベント
       this.keyEvnt(e);
     }
   }

   keyEvnt(e) {
     // マウスアクションがdownではない場合
     if (e.act != 0) return;
     // 移動量を加算
     if (e.key == "w") {
       let agl = -this.agl.x * (Math.PI / 180);

       this.camPos.z += Math.cos(agl);
       this.camPos.x += Math.sin(agl);
     }
     else if (e.key == "a") {
       this.camPos.x += 0.1;
     } else if (e.key == "s") {
       this.camPos.z -= 0.1;
     } else if (e.key == "d") {
       this.camPos.x -= 0.1;
     }

     this.needRender = true;;
   }

   // mouEvnt(e) {
   //   // マウスアクションが move か leave でない場合
   //   if ((e.act != 1<<2)) return;
   //
   //   // 初回実行時
   //   if (this.lstPtr == null) {
   //     this.lstPtr = {x: e.x, y: e.y};
   //     console.log("fst");
   //     return;
   //   }
   //
   //   // 描画されるまでの移動量を加算
   //   this.agl.x += ((e.x - this.lstPtr.x) * 0.2) % 360;
   //   this.agl.y += ((e.y - this.lstPtr.y) * 0.5) % 360;
   //   // this.agl.x = -45;
   //
   //   this.lstPtr = {x: e.x, y: e.y};
   //
   //   this.needRender = true;
   // }

   pointerLock() {
     console.log("lock");
     // エレメントをフルスクリーンに表示する関数
     function ElementRequestFullScreen (element) {
       let list = [
         "requestFUllScreen",
         "webkitRequestFullScreen",
         "mozRequestFullScreen",
         "msRequestFullScreen"
       ];
       let i;
       let num = list.length;
       for (i = 0; i < num; i++) {
         if (element[list[i]]) {
           element[list[i]]();
           return true;
         }
       }
       return false;
     }

     // エレメントからポインタロックを開始する関数
     function ElementRequestPointerLock (element) {
       let list = [
         "requestPointerLock",
         "webkitRequestPointerLock",
         "mozRequestPointerLock"
       ];
       let i;
       let num = list.length;
       for (i = 0; i < num; i++) {
         if (element[list[i]]) {
           element[list[i]]();
           return true;
         }
       }
       return false;
     }

     // ポインターから移動量を取得する関数
     function MouseEventGetMomentX (mouse_event) {
       return (mouse_event.movementX || mouse_event.webkitMovementX || mouse_event.mozMovementX || 0);
     }

     function MouseEventGetMomentY (mouse_event) {
       return (mouse_event.movementY || mouse_event.webkitMovementY || mouse_event.mozMovementY || 0);
     }

     let $SP = rpg.$SP;
     let element = $SP.lyrTap.cnvs;

     // マウスを移動するたびに実行されるイベント
     let $this = this;
     document.onmousemove = function(e) {
       if(! e) e = window.event;

       $this.agl.x += MouseEventGetMomentX(e);
       $this.agl.y += MouseEventGetMomentY(e);

       $this.needRender = true;
     };

     // ElementRequestFullScreen(element);
     ElementRequestPointerLock(element);
   }
 }
