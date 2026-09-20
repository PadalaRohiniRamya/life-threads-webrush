import test from 'node:test';
import assert from 'node:assert/strict';
import {computeStats,buildThreads,buildInsights} from '../src/analytics.js';

const data={
  spotify:[
    {id:'s1',date:'2024-01-01',dateTime:'2024-01-01T10:00:00',time:'10:00:00',title:'Track A',artist:'Artist A',shuffle:false,skipped:false},
    {id:'s2',date:'2024-01-01',dateTime:'2024-01-01T11:00:00',time:'11:00:00',title:'Track A',artist:'Artist A',shuffle:true,skipped:true}
  ],
  household:[{id:'h1',date:'2024-01-01',dateTime:'2024-01-01T12:00:00',time:'12:00:00',category:'Food',amount:100,flow:'Expense'}],
  india:[{id:'i1',date:'2024-01-01',dateTime:'2024-01-01T13:00:00',time:'13:00:00',category:'Food',amount:200,flow:'Expense',city:'Hyderabad'}]
};

test('computeStats counts sources, totals, categories and hours',()=>{
  const stats=computeStats(data);
  assert.equal(stats.total,4);
  assert.equal(stats.spotify,2);
  assert.equal(stats.transactions,2);
  assert.equal(stats.totalSpend,300);
  assert.equal(stats.skipped,1);
  assert.equal(stats.hours[10],1);
  assert.equal(stats.categories.Food,2);
});

test('buildThreads creates an explicit same-day relationship',()=>{
  const threads=buildThreads(data);
  assert.ok(threads.some(t=>t.music.length&&t.purchases.length&&t.reason.includes('share the same date')));
});

test('buildInsights returns transparent derived observations',()=>{
  const stats=computeStats(data);const threads=buildThreads(data);const insights=buildInsights(stats,threads);
  assert.ok(insights.length>=2);
  assert.ok(insights.every(x=>x.title&&x.text));
});
