import test from 'node:test';
import assert from 'node:assert/strict';
import {dateKey,hour,money,searchableText,topEntries} from '../src/utils.js';

test('dateKey prefers normalized date and falls back to dateTime',()=>{
  assert.equal(dateKey({date:'2024-01-02',dateTime:'2024-02-03T10:00:00'}),'2024-01-02');
  assert.equal(dateKey({dateTime:'2024-02-03T10:00:00'}),'2024-02-03');
});

test('hour safely normalizes invalid values',()=>{
  assert.equal(hour({time:'18:45:00'}),18);
  assert.equal(hour({dateTime:'2024-02-03T07:20:00'}),7);
  assert.equal(hour({time:'99:00:00'}),0);
});

test('searchableText creates a deterministic lowercase index',()=>{
  assert.equal(searchableText({title:'Hello World',artist:'Artist'}),'hello world artist');
  assert.equal(searchableText({searchText:'prebuilt index',title:'ignored'}),'prebuilt index');
});

test('money formats valid amounts and rejects invalid values',()=>{
  assert.match(money(1234),/₹/);
  assert.equal(money('not-a-number'),'—');
});

test('topEntries returns descending entries with a stable limit',()=>{
  assert.deepEqual(topEntries({a:2,b:9,c:4},2),[['b',9],['c',4]]);
});
