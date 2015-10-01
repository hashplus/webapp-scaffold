import MC from './lib/Math';

// Arrows and Lexical This
// Expression bodies
var evens = [2, 3];
var odds = evens.map(v => v + 1);
var nums = evens.map((v, i) => v + i);

var fives = [];
// Statement bodies
nums.forEach(v => {
  if( v % 5 === 0 ){
    fives.push(v);
  }
});

// Lexical this
var bob = {
  _name: 'Bob',
  _friends: [],
  printFriends() {
    this._friends.forEach(f =>
      console.log(`${this._name} knows ${f}`));
  }
};

// Classes
/*class SkinnedMesh extends THREE.Mesh {
  constructor(geometry, materials) {
    super(geometry, materials);

    this.idMatrix = SkinnedMesh.defaultMatrix();
    this.bones = [];
    this.boneMatrices = [];
    // ...
  }

  update(camera) {
    // ...
    super.update();
  }

  static defaultMatrix() {
    return new THREE.Matrix4();
  }
}*/

// Enhanced Object Literals
// var obj = {
//   // __proto__
//   __proto__: theProtoObj,
//   // Does not set interal prototype
//   '__proto__': somethingElse,
//   // Shorthand for 'handler: handler'
//   handler,
//   // Methods
//   toString() {
//     // Super calls
//     return `d ${super.toString()}`;
//   },
//   // Computed (dynamic) property names
//   ['prop_' + (() => 42)()]: 42
// };

// Template Strings
// Unescaped template strings
String.raw`In ES5 "\n" is a line-feed.`;

/*GET`http://foo.org/bar?a=${a}&b=${b}
Content-Type: application/json
X-Credentials: ${credentials}
{"foo": ${foo}, "bar": ${bar}}`(myOnReadyStateChangeHandler);*/

// Destructuring
// list matching
var [a, , b] = [1, 2, 3];

// object matching
// var {op: a, lhs: {op: b}, rhs: c} = getASTNode();

// Can be used in parameter position
function g({name: x}) {
  console.log(x);
}

g({name: 5});

// Fail-soft destructuring
var [a] = [];
a === undefined;

// Fail-soft destructuring with defaults
var [a = 1] = [];
a === 1;

// Default Rest Spread

function f(x, y = 12) {
  return x + y;
}
f(3) == 15;

function f(x, ...y){
  return x * y.length;
}

f(3, 'hello', true) == 6;

function f(x, y, z){
  return x + y + z;
}

f(...[1, 2, 3]) == 6;

// Iterators for...of
// var fibonacci = {
//   [Symbol.iterator]() {
//     let pre = 0, cur = 1;
//     return {
//       next() {
//         [pre, cur] = [cur, pre + cur];
//         return {done: false, value: cur}
//       }
//     };
//   }
// };

// for(let n of fibonacci){
//   if( n > 1000)
//     break;
//   console.log(n);
// }

// Generators

let fibonacci = {
  [Symbol.iterator]: function* (){
    let pre = 0, cur = 1;
    for(;;){
      let temp = pre;
      pre = cur;
      cur += temp;
      yield cur;
    }
  }
};

for(let n of fibonacci) {
  if(n > 10)
    break;
  // console.log(n);
}

/*console.log('机'.length === 2);
console.log('机'.match(/./u)[0].length === 2);

console.log("\u{20BB7}" == "𠮷" == "\uD842\uDFB7");
console.log(1 === 1 === true);
console.log('’'.codePointAt(0));*/

// Sets
var s = new Set();
s.add('hello').add('googbye').add('hello');
console.log(s.size);

// Maps
var m = new Map();
m.set('hello', 42);
m.set(s, 34);
console.log(m.get(s));

// Weak Maps
var wm = new WeakMap;
wm.set(s, {extra: 42});
console.log(wm.size);

// Weak Sets
var ws = new WeakSet();
ws.add({data: 42});
console.log(ws);

// Proxying a normal object
// var target = {};
// var handler = {
//   get(receiver, name){
//     return  `Hello, ${name}!`;
//   }
// };

// var p = new Proxy(target, handler);
// console.log(p.world);

// Promises
let timeout = function(duration = 0) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, duration);
  });
};

let p = timeout(1000).then(() => {
  return timeout(2000);
}).then(() => {
  throw new Error('hmm');
}).catch(err => {
  return Promise.all([timeout(100), timeout(200)]);
});

// Reflect API
var o = {a: 1};
Object.defineProperty(o, 'b', {value: 2});
o[Symbol('c')] = 3;

console.log(Reflect.ownKeys(o));

function C(a, b){
  this.c = a + b;
}

var instance = Reflect.construct(C, [20, 22]);
console.log(instance.c);

function factorial(n, acc = 1) {
  "use strict";
  if (n <= 1) return acc;
  return factorial(n - 1, n * acc);
}

// Stack overflow in most implementations today,
// but safe on arbitrary inputs in ES2015
console.log(factorial(100000));

// ES7 async functions
// 1. Promise

/*function loadStory() {
  return getJSON('story.json').then(function(story){
    addHtmlToPage(story.heading);

    return story.chapterURLs.map(getJSON).reduce(function(chain, chapterPromise){
      return chain.then(function(){
        return chapterPromise;
      }).then(function(chapter){
        addHtmlToPage(chapter.html);
      });
    }, Promise.resolve());
  }).then(function(){
    addTextToPage('All done');
  }).cache(function(err){
    addTextToPage('Argh, broken: ' + err.message);
  }).then(function(){
    document.querySelector('.spinner').style.display = 'none';
  });
}*/

// 2. async functions

/*async function loadStory() {
  try{
    let story = await getJSON('story.json');
    addHtmlToPage(story.heading);
    for(let chapter of story.chapterURLs.map(getJSON)){
      addHtmlToPage((await chapter).html);
    }
    addTextToPage('All done');
  } catch(err) {
    addTextToPage('Argh, broken: ' + err.message);
  }

  document.querySelector('.spinner').style.display = 'none';
}
*/

// 3. generator
/*function loadStory(){
  return spawn(function *(){
    try {
      let story = yield getJSON('story.json');
      addHtmlToPage(story.heading);
      for(let chapter of story.chapterURLs.map(getJSON)){
        addHtmlToPage((yield chapter).html);
      }
      addTextToPage('All done');
    } catch (err) {
      addTextToPage('Argh, broken: ' + err.message);
    }
    document.querySelector('.spinner').style.display = 'none';
  });
}
*/

let asyncchronousOperation = () => {
  let httpPromise = (method, delay = 50) => {
    return new Promise((resolve, reject) => {
      let ajax = new XMLHttpRequest;
      ajax.open(method, `//httpbin.org/${method}`,true);
      ajax.responseType = 'json';
      ajax.onload = (e) => {
        setTimeout(() => {
          reject(/*e.target.response*/ new Error(method));
        }, delay);
      };
      ajax.send();
    });
  };
  let getPromise = httpPromise('get', 150);
  let postPromise = httpPromise('post');

  return [postPromise, getPromise];
};

async function doAsyncOp(){
  try{
    let val = await* asyncchronousOperation();
    console.log(val);
    return val;
  } catch (err){
    console.error(err);
  }
}

doAsyncOp().then(val => {
  console.log(val);
});
