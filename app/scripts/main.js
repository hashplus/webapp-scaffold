// import MC from './lib/Math';

// Arrows and Lexical This
// Expression bodies
// var evens = [2, 3];
// var odds = evens.map(v => v + 1);
// var nums = evens.map((v, i) => v + i);

// var fives = [];
// Statement bodies
// nums.forEach(v => {
//   if (v % 5 === 0) {
//     fives.push(v);
//   }
// });

// Lexical this
// var bob = {
//   _name: 'Bob',
//   _friends: [],
//   printFriends() {
//     this._friends.forEach(f =>
//       console.log(`${this._name} knows ${f}`));
//   }
// };

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
// String.raw `In ES5 "\n" is a line-feed.`;

/*GET`http://foo.org/bar?a=${a}&b=${b}
Content-Type: application/json
X-Credentials: ${credentials}
{"foo": ${foo}, "bar": ${bar}}`(myOnReadyStateChangeHandler);*/

// Destructuring
// list matching
// var [a, , b] = [1, 2, 3];

// object matching
// var {op: a, lhs: {op: b}, rhs: c} = getASTNode();

// Can be used in parameter position
// function g({
//   name: x
// }) {
//   console.log(x);
// }

// g({
//   name: 5
// });

// Fail-soft destructuring
// var [a] = [];
// a === undefined;

// Fail-soft destructuring with defaults
// var [a = 1] = [];
// a === 1;

// Default Rest Spread

// function f(x, y = 12) {
//   return x + y;
// }
// f(3) == 15;

// function f(x, ...y) {
//   return x * y.length;
// }

// f(3, 'hello', true) == 6;

// function f(x, y, z) {
//   return x + y + z;
// }

// f(...[1, 2, 3]) == 6;

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
  [Symbol.iterator]: function*() {
    let pre = 0,
      cur = 1;
    for (;;) {
      let temp = pre;
      pre = cur;
      cur += temp;
      yield cur;
    }
  }
};

for (let n of fibonacci) {
  if (n > 10){
    break;
  }
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
var wm = new WeakMap();
wm.set(s, {
  extra: 42
});
console.log(wm.size);

// Weak Sets
var ws = new WeakSet();
ws.add({
  data: 42
});
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
// let timeout = function(duration = 0) {
//   return new Promise((resolve) => {
//     setTimeout(resolve, duration);
//   });
// };

// let p = timeout(1000).then(() => {
//   return timeout(2000);
// }).then(() => {
//   throw new Error('hmm');
// }).catch(err => {
//   return Promise.all([timeout(100), timeout(200)]);
// });

// // Reflect API
// var o = {
//   a: 1
// };
// Object.defineProperty(o, 'b', {
//   value: 2
// });
// o[Symbol('c')] = 3;

// console.log(Reflect.ownKeys(o));

// function C(a, b) {
//   this.c = a + b;
// }

// var instance = Reflect.construct(C, [20, 22]);
// console.log(instance.c);

// function factorial(n, acc = 1) {
//   "use strict";
//   if (n <= 1) return acc;
//   return factorial(n - 1, n * acc);
// }

// Stack overflow in most implementations today,
// but safe on arbitrary inputs in ES2015
// console.log(factorial(100000));
/**
 * ES7 async functions
 * Stage2
 */
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

/*let httpPromise = (method, delay = 50) => {
  return new Promise((resolve, reject) => {
    let ajax = new XMLHttpRequest;
    ajax.open(method, `//httpbin.org/${method}`, true);
    ajax.responseType = 'json';
    ajax.onload = (e) => {
      setTimeout(() => {
        resolve(e.target.response);
      }, delay);
    };
    ajax.send();
  });
};

let asyncchronousOperation = () => {
  let getPromise = httpPromise('get', 150);
  let postPromise = httpPromise('post');

  return [postPromise, getPromise];
};

async function doAsyncOp() {
  try {
    let val = await * asyncchronousOperation();
    console.log(val);
    return val;
  } catch (err) {
    //console.error(err);
  }
}

// doAsyncOp().then(val => {
//   console.log(val);
// });


//  `await` can be only used directly within an `async` function.

async function getAllResult(...methods) {
  return await * methods.map(async function(method) {
    return await new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(httpPromise(method));
      }, 2000);
    });
  });
}

getAllResult('get', 'post').then(console.log.bind(console));*/


let get = (url) => {
  return new Promise((resolve, reject) => {
    let req = new XMLHttpRequest();
    req.open('get', url);
    req.send();
    req.responseType = 'json';
    req.onload = () => {
      if (req.status === 200) {
        resolve(req.response);
      } else {
        reject(Error(req.statusText));
      }
    };

    req.onerror = () => {
      reject(Error('Nextwork error'));
    };
  });
};

// http://it-ebooks-api.info/v1/search/{query}
// http://it-ebooks-api.info/v1/book/{id}

/*
An async function returns a Promise, and await accepts a promise. There is no requirement that all async functions be called via await. If you want to use an async function inside a standard JS function, you would directly use the result promise. In your case, calling a function with .call will still return a promise like any other function, so you'd they pass that promise to await:

async function doThing(){
  let service = new Service();

  var stream = await service.getOrders.call(this, arg1, arg2, arg3)
  stream.pipe(res);
}
 */

async function books(url) {
  return await* (await get(url)).Books.map((book) => {
    return get(`http://it-ebooks-api.info/v1/book/${book.ID}`);
  });

  // return await* [for (book of [1,2,3]) get(`http://it-ebooks-api.info/v1/book/${book.ID}`)];
}

let booksPromise = books('http://it-ebooks-api.info/v1/search/mysql');
booksPromise.then(console.log.bind(console));

/**
 * ES7 class properties
 * Stage 0
 * ES Class Fields & Static Properties
 */

// Part1: Class Instance Fields

class MyClass {
  static name = 'class';
  // default value
  myProp = 24;

  constructor() {
    console.log(this.myProp);
  }
}

// new MyClass;
console.log(MyClass.name);

/**
 * ES7 comprehensions
 * Stage 0
 */

// Array comprehensions
// [for (x of [0, 1, 2]) ()=>x][1]()
// [for (i of numbers) i * 2]


// Generator comprehensions

// let gen = (for (i of [ 1, 2, 3 ]) i * i );

// let numbers = [1, 2, 3];

// (function*() {
//   for(let i of numbers){
//     yield i * i;
//   }
// })();

// gen = (for (i of numbers) i * i);


/**
 * ES7 decorators
 * Stage 1
 * ES6 classes only support literal functions as values.
 * A decorator is:
 *   + an expression
 *   + that evaluates to a function
 *   + that takes the target, name, and property descriptor as arguments
 *   + and optionally returns a property descriptor to install on the target object
 */

// A decorator precedes the syntax that defines a property:
/*function readonly(target, key, descriptor) {
  descriptor.writable = false;
  return descriptor;
}

class Person {
  first = 'Aiden';
  last = 'Cao';

  @readonly
  name() {return `${this.first} ${this.last}`}
}*/

/*
before engine install descriptor onto `Person.prototype` the engine first invokes the
decorator:

let descriptor = {
  value: specifiedFunction,
  enumerable: false,
  configurable: true,
  writable: true
};

descriptor = readonly(Person.prototype, 'name', descriptor) || descriptor;
Object.defineProperty(Person.prototype, 'name', descriptor);

*/

// import {autobind} from 'core-decorators';

/**
 * @autobind
 * @type {Decorator}
 * Forces invocations of this function to always have this refer to the class instance, even if the function is passed around * or would otherwise lose its this context. e.g. var fn = context.method;
 */

/*class Person {
  @autobind
  getPerson() {
    return this;
  }
}

let person = new Person;

let getPerson = person.getPerson;
console.log(getPerson() === person);*/

/**
 * @readonly
 * @type {Decorator}
 * Marks a property or method as not being writable.
 */
// import {readonly} from 'core-decorators';

// class Meal{
//   @readonly
//   entree = 'steak';
// }

/**
 * @readonly
 * @type {Decorator}
 * Checks that the marked method indeed overrides a function with the same signature somewhere on the prototype chain.
 *
 * Works with methods and getters/setters. Will ensure name, parameter count, as well as descriptor type (accessor/data).
 * Provides a suggestion if it finds a method with a similar signature, including slight misspellings.
 */

// import {override} from 'core-decorators';

// class Parent {
//   speak(first, second) {}
// }

// class Child extends Parent {
//   @override
//   speak(first, second){}
// }


/**
 * @deprecate (alias: @deprecated)
 * @type {Decorator}
 * Calls console.warn() with a deprecation message. Provide a custom message to override the default one. You can also provide * an options hash with a url, for further reading.
 */

import {deprecate, suppressWarnings} from 'core-decorators';

class Person {
  @deprecate
  facepalm() {}

  @deprecate('We stopped facepalming')
  facepalmHard() {}

  @deprecate('We stopped facepalming', {url: 'http://knowyourname.com/memes/facepalm'})
  facepalmHarder() {}

  @suppressWarnings
  facepalmWithWarnings() {
    this.facepalm();
  }
}

let person = new Person();

person.facepalm();
person.facepalmHard();
person.facepalmHarder();

/**
 * @debounce
 * @type {Decorator}
 * Creates a new debounced function which will be invoked after wait milliseconds since the time it was invoked. Default
 * timeout is 300 ms.
 *
 * Optional boolean second argument allows to trigger function on the leading instead of the trailing edge of the wait
 * interval. Implementation is insired by similar method from UnderscoreJS.
 */

// import {debounce} from 'core-decorators';

// class Editor {
//   content = '';

//   @debounce(500)
//   updateContent(content) {
//     this.content = content;
//   }
// }

/**
 * @suppressWarnings
 * @type {Decorator}
 * Suppresses any JavaScript console.warn() call while the decorated function is called. (i.e. on the stack)
 * Will not suppress warnings triggered in any async code within.S.
 */

/**
 * @nonenumerable
 * @nonconfigurable
 * @type {Decorator}
 * Marks a property or method as not being enumerable.
 */

// import {decorate} from 'core-decorators';
// import {memoize} from 'lodash';

// let count = 0;

// class Task {
//   @decorate(memoize)
//   doSomethingExpensive(data) {
//     count++;
//     // something expensive;
//     return data;
//   }
// }

// let task = new Task();
// let arr = [1, 2, 3];

// task.doSomethingExpensive(arr);
// task.doSomethingExpensive(arr);

// console.log(count === 1);

/**
 * @mixin (alias: @mixins)
 * @type {Decorator}
 * Mixes in all property descriptors from the provided Plain Old JavaScript Objects (aka POJOs) as arguments. Mixins are
 * applied in the order they are passed, but do not override descriptors already on the class, including those inherited
 * traditionally.
 */

import {mixin} from 'core-decorators';

const SingerMixin = {
  sing(sound) {
    console.log(sound);
  }
};

const FlyMixin = {
  get speed() {},
  fly() {},
  land() {}
};

@mixin(SingerMixin, FlyMixin)
class Bird {
  singMatingCall() {
    console.log('singMatingCall');
    this.sing('single boy, single boy');
  }
}

let bird = new Bird();
bird.singMatingCall();
