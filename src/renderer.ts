import { Prediction } from './system';

const $canvas = document.getElementById('canvas');
const ctx = $canvas.getContext('2d');

const HEIGHT = 500;
const WIDTH = 1200;

const RADIUS = 40;
const HALF_RADIUS = RADIUS / 2;

type Vec2 = { x: number; y: number }

function makeCircle(v: Vec2) {
  ctx.beginPath();
  ctx.arc(v.x + HALF_RADIUS, v.y + HALF_RADIUS, RADIUS, 0, 2 * Math.PI);
  ctx.stroke();
}

function makeText(v: Vec2, text: stirng) {
  ctx.beginPath();
  ctx.font = "16px 'Ubuntu Monospace'";
  ctx.fillText(text, v.x + 10, v.y + 24);
}

function makeArrow(o: Vec2, d: Vec2) {
  ctx.beginPath();
  ctx.moveTo(o.x, o.y);
  ctx.lineTo(d.x, d.y);
  ctx.stroke();

  if (o.y === d.y) {
    let l = 8;

    ctx.beginPath();
    ctx.moveTo(d.x, d.y);
    ctx.lineTo(d.x - l, d.y - l);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(d.x, d.y);
    ctx.lineTo(d.x - l, d.y + l);
    ctx.stroke();
  }
}

export function drawPrediction(p: Prediction) {
  ctx.clearRect(0, 0, WIDTH, HEIGHT);

  makeCircle({ x: 50, y: 50 });
  makeText({ x: 50, y: 50 }, p.sentence.rule.toString());

  makeCircle({ x: 200, y: 50 });
  makeText({ x: 200, y: 50 }, p.sentence.implication.toString());

  makeArrow({ x: 110, y: 70 }, { x: 180, y: 70 })

  let y = 150;
  let x = 150;
  for (const s of p.implications) {
    makeCircle({ x: x, y });
    makeText({ x: x, y: y }, s.rule.toString());

    makeCircle({ x: x + 150, y });
    makeText({ x: x + 150, y }, s.implication.toString());

    makeArrow({ x: x + 60, y: y + 20 }, { x: x + 130, y: y + 20 })
    makeArrow({ x: 70, y: 110 }, { x: x - 20, y: y + 20 })

    y += 100;
  }
}

