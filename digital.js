try {
  let body = JSON.parse($response.body);
  let docs = body?.raw_data?.digitalProfile?.documents;

  if (docs?.RF_PASSPORT) {
    let pp = docs.RF_PASSPORT;

    if (pp.info) {
      for (let p of pp.info) {
        p.series = "1234";
        p.number = "123456";
      }
    }

    if (typeof pp.infoRaw === "string") {
      let raw = JSON.parse(pp.infoRaw);
      if (Array.isArray(raw)) {
        for (let p of raw) {
          p.series = "1234";
          p.number = "123456";
        }
      }
      pp.infoRaw = JSON.stringify(raw);
    }
  }

  $notification.post("Digital ID", "Script OK", "Passport rewritten");
  $done({body: JSON.stringify(body)});
} catch (e) {
  $notification.post("Digital ID", "Script ERROR", e.message || String(e));
  $done({body: $response.body});
}
