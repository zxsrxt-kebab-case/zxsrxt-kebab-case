let body = JSON.parse($response.body);

let docs = body?.raw_data?.digitalProfile?.documents;
if (docs?.RF_PASSPORT?.info) {
  for (let p of docs.RF_PASSPORT.info) {
    p.series = "1234";
    p.number = "123456";
  }
}

$done({body: JSON.stringify(body)});
