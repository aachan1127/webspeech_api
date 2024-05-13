const express = require("express");
const app = express();

// サーバーサイドのExpressアプリケーションにCORSミドルウェアを追加
const cors = require("cors"); // corsパッケージをインポート    #############追加
// CORSミドルウェアを追加    ###############追加
app.use(cors());

// これからJSON形式のファイルを使いますよと宣言する
app.use(express.json());


app.listen(3000, console.log("サーバーが開始されました"));

app.get("/", (req, res) => {
    res.send("プログラミングチュートリアルへようこそ");
});


// お客様情報をサーバーに置いておく。
const customers = [
    { title: "あーちゃん", id: 1, text: "自分" },
    { title: "じっさん", id: 2, text: "ユニっちゃん" },
    { title: "はってぃー", id: 3, text: "チーム画像表示させたい" },
    { title: "じんくん", id: 4, text: "リアクター" },
    { title: "げんさん", id: 5, text: "カイジ" },
    { title: "よっすぃ〜", id: 6, text: "チーム画像表示させたい" },
];

// データを取得できるようにしよう(GETメソッド or CRUD)
app.get("/api/customers", (req, res) => {
    res.send(customers);
});


// URLの後ろにid(番号)を入れることで情報が取れるようにする(エンドポイントid)
app.get("/api/customers/:id", (req, res) => {
    // カスタマーズの中の情報を取得(find関数を使って、apiの中のidとparseIntのidが等しい時にその情報を返すという処理)
    const customer = customers.find((c) => c.id === parseInt(req.params.id));
    // send↓で返す
    res.send(customer);
});

// データを送信(作成)してみよう(POSTメソッド)
app.post("/api/customers", (req, res) => {
    // 新しいメンバーを追加する
    const customer = {
        // titleのbodyにリクエストする
        title: req.body.title,
        // idを追加する処理は、idの長さ(length)に+1する
        id: customers.length + 1,
    };
    // カスタマーをカスタマーズにJSON形式でプッシュする

    customers.push(customer);
    // どのお客様がいるのかをcustomerという変数で送る
    res.send(customers);

});


// データを更新する(PUTメソッド)
app.put("/api/customers/:id", (req, res) => {

    // カスタマーズの中の情報を取得(find関数を使って、apiの中のidとparseIntのidが等しい時にその情報を返すという処理)
    const customer = customers.find((c) => c.id === parseInt(req.params.id));
    // カスタマーのtitle（titleの中のbodyを変更)
    customer.title = req.body.title;
    // send↓で返す
    res.send(customer);
});

// データを削除してみよう(DELETEメソッド)
app.delete("/api/customers/:id", (req, res) => {

    // カスタマーズの中の情報を取得(find関数を使って、apiの中のidとparseIntのidが等しい時にその情報を返すという処理)
    const customer = customers.find((c) => c.id === parseInt(req.params.id));

    // カスタマーの配列のインデックス番号を返す
    const index = customers.indexOf(customer);
    // 配列の関数を使って、splice関数で削除する(指定した関数の一つだけを削除する)
    customers.splice(index, 1);

    // send↓で返す
    res.send(customer);
});
