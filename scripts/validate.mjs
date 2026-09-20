import fs from 'node:fs';
import path from 'node:path';

const root=process.cwd();
const required=['index.html','package.json','vite.config.js','src/App.jsx','src/main.jsx','public/data/spotify.compact.json','public/data/household.json','public/data/india.json','vercel.json'];
for(const file of required){if(!fs.existsSync(path.join(root,file)))throw new Error(`Missing required file: ${file}`)}
const forbidden=['accountNumber','cardNumber','card_number','account_number','customerName','customerId','customer_id','address','dateOfBirth','dob','job'];
for(const file of ['public/data/household.json','public/data/india.json']){
  const rows=JSON.parse(fs.readFileSync(path.join(root,file),'utf8'));
  const keys=new Set(rows.flatMap(r=>Object.keys(r)));
  const leaked=forbidden.filter(k=>keys.has(k));
  if(leaked.length)throw new Error(`${file} contains prohibited sensitive keys: ${leaked.join(', ')}`);
}
const pkg=JSON.parse(fs.readFileSync(path.join(root,'package.json'),'utf8'));
for(const script of ['dev','build','preview','test','validate','check'])if(!pkg.scripts?.[script])throw new Error(`Missing npm script: ${script}`);
console.log(`Validation passed: ${required.length} required files, sanitized dataset keys, and required npm scripts.`);
