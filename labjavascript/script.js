const productsData = [
  {name:'Aesthetic Journal', price:599},
  {name:'Washi Tape Set', price:299},
  {name:'Pastel Gel Pens', price:449},
  {name:'Cute Sticker Pack', price:199},
  {name:'Mini Notepad', price:149},
  {name:'Marker Highlighters', price:499}
];

let cart = [];
function renderProducts(){
  const p = document.getElementById('products');
  p.innerHTML = '';
  productsData.forEach(pr=>{
    const div = document.createElement('div');
    div.className='product';
    div.innerHTML = `<h4>${pr.name}</h4>
    <div class="price">Rs ${pr.price.toFixed(2)}</div>
    <button class="btn">Add to Cart</button>`;
    div.querySelector('button').addEventListener('click',()=>addToCart(pr.name,pr.price));
    p.appendChild(div);
  });
}

function addToCart(itemName,price){
  try{
    if(!itemName||isNaN(price)) throw 'invalid';
    const found = cart.find(i=>i.name===itemName);
    if(found) found.qty++;
    else cart.push({name:itemName,price,qty:1});
    renderCart();
  }catch(e){
    alert('Error adding item');
  }
}

function removeFromCart(name){
  cart = cart.filter(i=>i.name!==name);
  renderCart();
}

function renderCart(){
  const body = document.getElementById('cartBody');
  body.innerHTML='';
  let total=0;
  cart.forEach(i=>{
    const tr = document.createElement('tr');
    tr.innerHTML = `<td>${i.name}</td>
    <td>Rs ${i.price.toFixed(2)}</td>
    <td>${i.qty}</td>
    <td><button class="btn ghost small">Remove</button></td>`;
    tr.querySelector('button').addEventListener('click',()=>removeFromCart(i.name));
    body.appendChild(tr);
    total += i.price*i.qty;
  });
  document.getElementById('cartTotal').textContent = 'Rs ' + total.toFixed(2);
}

document.getElementById('clearCart').addEventListener('click',()=>{cart=[];renderCart()});

renderProducts();
renderCart();

const chatbox = document.getElementById('chatbox');
const chatInput = document.getElementById('chatInput');
document.getElementById('sendBtn').addEventListener('click',sendMsg);
chatInput.addEventListener('keydown',e=>{if(e.key==='Enter')sendMsg()});

function appendMsg(text,who){
  const d = document.createElement('div');
  d.className = 'message ' + (who==='user'?'msg-user':'msg-bot');
  d.textContent = text;
  chatbox.appendChild(d);
  chatbox.scrollTop = chatbox.scrollHeight;
}

function sendMsg(){
  const txt = chatInput.value.trim();
  try{
    if(!txt) throw 'empty';
    appendMsg(txt,'user');
    chatInput.value='';
    setTimeout(()=>{appendMsg(autoReply(txt),'bot')},700);
  }catch(e){
    alert('Please type a message');
  }
}

function autoReply(t){
  const lower = t.toLowerCase();
  if(lower.includes('hi')||lower.includes('hello')) return 'Hey there! Journaling helps calm your mind 🌿';
  if(lower.includes('tips')||lower.includes('ideas')) return 'Try using washi tapes and pastel pens to decorate your journal!';
  if(lower.includes('exam')||lower.includes('study')) return 'Make short to-do pages and reward yourself after tasks 💕';
  return 'That sounds nice! Keep creating ✨';
}

const tabs = document.querySelectorAll('.tab');
tabs.forEach(b=>b.addEventListener('click',()=>{
  tabs.forEach(x=>x.classList.remove('active'));
  b.classList.add('active');
  document.querySelectorAll('.panel').forEach(p=>p.classList.remove('active'));
  document.getElementById(b.dataset.target).classList.add('active');
}));

const fieldsWrap = document.getElementById('fields');
document.querySelectorAll('.builder-controls button').forEach(btn=>{
  btn.addEventListener('click',()=>{
    const t = btn.dataset.field;
    if(t==='text') addField('text','Text Field');
    if(t==='email') addField('email','Email Field');
    if(t==='select') addSelect();
  });
});

function addField(type,placeholder){
  const id = 'f'+Date.now();
  const div = document.createElement('div');
  div.innerHTML = `<input id="${id}" placeholder="${placeholder}" data-type="${type}" />`;
  fieldsWrap.appendChild(div);
}

function addSelect(){
  const id = 's'+Date.now();
  const div = document.createElement('div');
  div.innerHTML = `<select id="${id}" data-type="select">
  <option value="">Choose</option>
  <option>Option 1</option>
  <option>Option 2</option>
  </select>`;
  fieldsWrap.appendChild(div);
}

document.getElementById('dynamicForm').addEventListener('submit',e=>{
  e.preventDefault();
  try{
    const inputs = [...fieldsWrap.querySelectorAll('input,select')];
    if(inputs.length===0) throw 'no fields';
    inputs.forEach(inp=>{
      const t = inp.dataset.type;
      if(t==='text' && inp.value.trim()==='') throw 'text empty';
      if(t==='email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inp.value)) throw 'email invalid';
      if(t==='select' && inp.value==='') throw 'select empty';
    });
    alert('Form submitted ✓');
  }catch(err){
    alert('Please correct fields');
    return;
  }
});
document.getElementById('resetForm').addEventListener('click',()=>fieldsWrap.innerHTML='');

let expenses = [];
function renderExpenses(){
  const b = document.getElementById('expenseBody');
  b.innerHTML='';
  let total=0;
  expenses.forEach((ex,idx)=>{
    const tr = document.createElement('tr');
    tr.innerHTML = `<td>${ex.desc}</td>
    <td>${ex.cat}</td>
    <td>Rs ${ex.amt.toFixed(2)}</td>
    <td><button class="btn ghost">Delete</button></td>`;
    tr.querySelector('button').addEventListener('click',()=>{expenses.splice(idx,1);renderExpenses()});
    b.appendChild(tr);
    total += ex.amt;
  });
  document.getElementById('expenseTotal').textContent = 'Rs ' + total.toFixed(2);
}

document.getElementById('expenseForm').addEventListener('submit',e=>{
  e.preventDefault();
  try{
    const d = document.getElementById('desc').value.trim();
    const a = parseFloat(document.getElementById('amt').value);
    const c = document.getElementById('cat').value;
    if(!d||isNaN(a)||a<=0||!c) throw 'invalid';
    expenses.push({desc:d,amt:a,cat:c});
    document.getElementById('desc').value='';
    document.getElementById('amt').value='';
    document.getElementById('cat').value='';
    renderExpenses();
  }catch(e){
    alert('Please enter valid expense');
  }
});

document.getElementById('resetExpenses').addEventListener('click',()=>{expenses=[];renderExpenses()});
renderExpenses();
