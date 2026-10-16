// Estrelas
(function(){
  var c=document.getElementById('stars'),x=c.getContext('2d'),s=[];
  function size(){c.width=innerWidth;c.height=innerHeight;s=[];for(var i=0;i<110;i++)s.push({x:Math.random()*c.width,y:Math.random()*c.height,r:Math.random()*1.4+.3,a:Math.random()*.6+.2})}
  function draw(){x.clearRect(0,0,c.width,c.height);var col=getComputedStyle(document.documentElement).getPropertyValue('--star').trim();x.fillStyle=col;s.forEach(function(t){x.globalAlpha=t.a;x.beginPath();x.arc(t.x,t.y,t.r,0,6.3);x.fill()})}
  addEventListener('resize',function(){size();draw()});size();draw();
  new MutationObserver(draw).observe(document.documentElement,{attributes:true,attributeFilter:['data-theme']});
  matchMedia('(prefers-color-scheme:light)').addEventListener('change',draw);
})();
// Tema
(function(){
  var r=document.documentElement,b=document.getElementById('tema');
  function atual(){return r.getAttribute('data-theme')||(matchMedia('(prefers-color-scheme:light)').matches?'light':'dark')}
  function icone(){b.textContent=atual()==='dark'?'☀':'☾'}
  b.addEventListener('click',function(){
    var novo=atual()==='dark'?'light':'dark';
    function troca(){r.setAttribute('data-theme',novo);icone()}
    if(document.startViewTransition)document.startViewTransition(troca);else troca();
  });
  icone();
})();
// Linha do tempo acende ao rolar
(function(){
  var tl=document.querySelector('.tl'),items=tl.querySelectorAll('article');
  function f(){var r=tl.getBoundingClientRect(),y=innerHeight*.6,p=Math.max(0,Math.min(r.height,y-r.top));tl.style.setProperty('--p',p+'px');items.forEach(function(a){a.classList.toggle('on',a.getBoundingClientRect().top<y)})}
  addEventListener('scroll',f,{passive:true});addEventListener('resize',f);f();
})();
// Idioma PT / EN
(function(){
  var M={"Sobre":"About","Sobre mim":"About me","Experiência":"Experience","Projetos":"Projects","Contato":"Contact","Sistemas que projetei e desenvolvi, do front-end ao deploy.":"Systems I designed and built, from front-end to deployment.","Destaque · Projeto real":"Featured · Real project","Loja virtual completa de lingerie, pronta para vender: do cadastro de produtos ao pagamento e à entrega.":"Complete lingerie online store, ready to sell: from product registration to payment and delivery.","Painel administrativo com controle de estoque":"Admin panel with stock control","Login e autenticação de usuários":"User login and authentication","Pagamento integrado via Mercado Pago":"Integrated payments via Mercado Pago","Rastreamento de pedidos e cálculo de frete por CEP":"Order tracking and shipping calculation by ZIP code","Ver ao vivo ↗":"View live ↗","Ver código ↗":"View code ↗","Dados e IA":"Data and AI","Produtividade":"Productivity","Mobile":"Mobile","Recomenda livros de forma personalizada, cruzando dados das APIs Google Books e Open Library com Machine Learning e NLP.":"Recommends books in a personalized way, combining data from the Google Books and Open Library APIs with Machine Learning and NLP.","Folha de ponto para registrar entrada, saída e pausas, com histórico e cálculo automático das horas trabalhadas.":"Timesheet to record clock-in, clock-out, and breaks, with history and automatic calculation of worked hours.","Aplicativo para a comunidade de uma igreja, com login, perfil, troca de senha e chat entre usuários.":"App for a church community, with login, profile, password change, and user chat.","Contate-me":"Contact me","Vamos conversar sobre uma oportunidade ou projeto? Fico à disposição!":"Shall we talk about an opportunity or a project? I'm available!","Aberto a oportunidades":"Open to work","Desenvolvedor Full Stack":"Full Stack Developer",
  "Sou desenvolvedor full stack graduado em Análise e Desenvolvimento de Sistemas pela Estácio. Faço sites e sistemas para negócios locais desde 2024, cuidando de tudo: da arquitetura à entrega final.":"I'm a full stack developer with a degree in Systems Analysis and Development from Estácio. Since 2024 I've built websites and systems for local businesses, covering everything from architecture to final delivery.",
  "Trabalho com suporte técnico na área de saúde, o que me dá o olhar de quem usa o sistema no dia a dia. Uso o Claude Code todos os dias para desenhar a arquitetura e acelerar as entregas. Estou aprofundando Java com Spring Boot, arquitetura de sistemas e nuvem, e busco minha primeira posição como desenvolvedor.":"I work in technical support in healthcare, which gives me the view of someone who uses the system every day. I use Claude Code daily to design architecture and speed up delivery. I'm deepening my Java with Spring Boot, system architecture, and cloud skills, and I'm looking for my first developer position.",
  "jul. de 2026 – atual":"Jul 2026 – present","Técnico de suporte":"Support technician","Suporte de campo e ao usuário em ambiente corporativo de saúde, resolvendo problemas de software e infraestrutura.":"Field and user support in a corporate healthcare environment, solving software and infrastructure problems.",
  "fev. de 2024 – atual":"Feb 2024 – present","Desenvolvedor web freelancer":"Freelance web developer","Projetos independentes · Remoto":"Independent projects · Remote","Desenvolvimento full stack de sites e sistemas para negócios locais, com APIs, banco de dados, autenticação e painéis administrativos.":"Full stack development of websites and systems for local businesses, including APIs, databases, authentication, and admin panels.",
  "Concluído":"Completed","Análise e Desenvolvimento de Sistemas":"Systems Analysis and Development","Graduação tecnológica com foco em desenvolvimento de sistemas, banco de dados, lógica de programação e arquitetura de software.":"Technology degree focused on systems development, databases, programming logic, and software architecture.",
  "Destaque":"Featured","Loja virtual completa com painel administrativo, controle de estoque, autenticação, pagamento via Mercado Pago, rastreamento de pedidos e cálculo de frete por CEP.":"Complete online store with an admin panel, stock control, authentication, Mercado Pago payments, order tracking, and shipping calculation by ZIP code.","Ao vivo ↗":"Live ↗","Sistema de recomendação de livros em Python, com as APIs Google Books e Open Library, análise de dados, Machine Learning e NLP para gerar recomendações personalizadas.":"Book recommendation system in Python, using the Google Books and Open Library APIs, data analysis, Machine Learning, and NLP to generate personalized recommendations.","Tem uma vaga, um projeto ou só quer trocar uma ideia? Me chama.":"Have a job opening, a project, or just want to chat? Reach out.","Aplicação de folha de ponto para registrar entrada, saída e pausas, com histórico e cálculo de horas trabalhadas.":"Timesheet app to record clock-in, clock-out, and breaks, with history and worked-hours calculation.","Código ↗":"Code ↗","App para igreja":"Church app","Aplicativo com login, perfil, troca de senha e chat entre usuários, feito para uma igreja.":"App with login, profile, password change, and user chat, built for a church.","Sites para negócios locais":"Websites for local businesses","Sites e lojas virtuais com painel administrativo, pedidos e banco de dados, entregues para clientes reais.":"Websites and online stores with an admin panel, orders, and a database, delivered to real clients.",
  "Tem uma vaga ou um projeto em mente? Vamos conversar.":"Got a job opening or a project in mind? Let's talk."};
  var R={};Object.keys(M).forEach(function(k){R[M[k]]=k});
  var btn=document.getElementById('idioma');
  function aplica(en){
    window.LANG=en?'en':'pt';document.documentElement.lang=en?'en':'pt-BR';btn.textContent=en?'PT':'EN';
    var w=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT),n;
    while(n=w.nextNode()){if(n.parentNode.tagName==='SCRIPT')continue;var o=n.nodeValue.trim(),k=R[o]||o;if(!M[k])continue;n.nodeValue=n.nodeValue.replace(o,en?M[k]:k)}
    try{localStorage.setItem('lang',window.LANG)}catch(e){}
  }
  btn.addEventListener('click',function(){aplica(window.LANG!=='en')});
  var s='pt';try{s=localStorage.getItem('lang')||'pt'}catch(e){}
  window.LANG='pt';if(s==='en')aplica(true);
})();
// Cards inclinam com o cursor
document.querySelectorAll('.card').forEach(function(el){
  if(matchMedia('(prefers-reduced-motion:reduce)').matches)return;
  el.addEventListener('mousemove',function(e){var r=el.getBoundingClientRect(),px=(e.clientX-r.left)/r.width-.5,py=(e.clientY-r.top)/r.height-.5;el.style.transform='perspective(800px) rotateY('+(px*8)+'deg) rotateX('+(-py*8)+'deg)'});
  el.addEventListener('mouseleave',function(){el.style.transform=''});
});
