export async function loadAllData(onProgress=()=>{}) {
  onProgress(10, "Loading Spotify history…");
  const [spotifyRes, householdRes, indiaRes] = await Promise.all([
    fetch("/data/spotify.compact.json"),
    fetch("/data/household.json"),
    fetch("/data/india.json")
  ]);
  if (!spotifyRes.ok || !householdRes.ok || !indiaRes.ok) throw new Error("Dataset files could not be loaded.");
  onProgress(55, "Decoding your music history…");
  const [sp, household, india] = await Promise.all([spotifyRes.json(), householdRes.json(), indiaRes.json()]);
  onProgress(75, "Building your life receipts…");
  const spotify = sp.rows.map((r,i)=>({
    id:`s${i+1}`, source:"spotify", type:"music", dateTime:r[0], date:r[0].slice(0,10), time:r[0].slice(11,19),
    title:sp.dict.track[r[1]]||"Unknown track", artist:sp.dict.artist[r[2]]||"Unknown artist", album:sp.dict.album[r[3]]||"",
    platform:sp.dict.platform[r[5]]||"", msPlayed:r[4]||0, shuffle:!!r[6], skipped:!!r[7]
  }));
  // Build a compact normalized search index once, instead of joining fields on every keystroke.
  for (const r of spotify) r.searchText = [r.title,r.artist,r.album,r.platform,r.date,r.time].filter(Boolean).join(" ").toLowerCase();
  const normalizedHousehold=household.map((r,i)=>({id:`h${i+1}`,source:"household",type:"purchase",date:r.date,time:r.time||"00:00:00",mode:r.mode||"",category:r.category||"",subcategory:r.subcategory||"",note:r.note||"",amount:Number(r.amount)||0,flow:r.flow||"",currency:r.currency||"",title:r.category||r.subcategory||r.note||"Household transaction",dateTime:`${r.date}T${r.time||"00:00:00"}`,description:r.note||r.subcategory||r.category||"Household transaction",city:"",location:""}));
  // Whitelist only non-identifying analytical fields; precise coordinates, fraud flags and unknown fields never enter the UI model.
  const normalizedIndia=india.map((r,i)=>({id:`i${i+1}`,source:"india",type:"purchase",date:r.date,time:r.time||"00:00:00",merchant:r.merchant||"",category:r.category||"",amount:Number(r.amount)||0,city:r.city||"",state:r.state||"",title:r.merchant||r.category||"Transaction",dateTime:`${r.date}T${r.time||"00:00:00"}`,description:r.category||"Transaction",location:r.city||r.state||""}));
  for (const r of [...normalizedHousehold,...normalizedIndia]) r.searchText = [r.title,r.merchant,r.category,r.subcategory,r.note,r.city,r.state,r.location,r.date,r.time].filter(Boolean).join(" ").toLowerCase();
  onProgress(100, "Story ready");
  return {spotify, household:normalizedHousehold, india:normalizedIndia};
}