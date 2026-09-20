import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const read=p=>fs.readFileSync(new URL(`../${p}`,import.meta.url),'utf8');

test('critical interactive components include accessibility contracts',()=>{
  const header=read('src/components/Header.jsx');
  const filters=read('src/components/SearchFilters.jsx');
  const modal=read('src/components/Modal.jsx');
  assert.match(header,/aria-label="Primary navigation"/);
  assert.match(header,/aria-current/);
  assert.match(filters,/aria-label="Filter by source"/);
  assert.match(filters,/aria-label="Filter by type"/);
  assert.match(filters,/aria-label="Sort receipts"/);
  assert.match(modal,/role="dialog"/);
  assert.match(modal,/aria-modal="true"/);
});

test('dangerous raw HTML injection is not used in UI source',()=>{
  const files=['src/App.jsx','src/components/Modal.jsx','src/components/ReceiptCard.jsx','src/pages/Explore.jsx','src/pages/Stories.jsx'];
  for(const file of files)assert.equal(read(file).includes('dangerouslySetInnerHTML'),false,`${file} must not inject raw HTML`);
});
