
"use strict";

// ========================================
// ESTRELAS DE FUNDO
// ========================================
(function () {
  var c = document.getElementById("stars");
  if (!c) return;

  var x = c.getContext("2d");
  var s = [];

  function size() {
    c.width = window.innerWidth;
    c.height = window.innerHeight;
    s = [];

    for (var i = 0; i < 110; i++) {
      s.push({
        x: Math.random() * c.width,
        y: Math.random() * c.height,
        r: Math.random() * 1.4 + 0.3,
        a: Math.random() * 0.6 + 0.2
      });
    }
  }

  function draw() {
    x.clearRect(0, 0, c.width, c.height);

    var col = getComputedStyle(document.documentElement)
      .getPropertyValue("--star")
      .trim();

    x.fillStyle = col || "#8da8ff";

    s.forEach(function (t) {
      x.globalAlpha = t.a;
      x.beginPath();
      x.arc(t.x, t.y, t.r, 0, Math.PI * 2);
      x.fill();
    });

    x.globalAlpha = 1;
  }

  window.addEventListener("resize", function () {
    size();
    draw();
  });

  size();
  draw();

  new MutationObserver(draw).observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"]
  });

  if (window.matchMedia) {
    var media = window.matchMedia("(prefers-color-scheme: light)");

    if (media.addEventListener) {
      media.addEventListener("change", draw);
    } else if (media.addListener) {
      media.addListener(draw);
    }
  }
})();

// ========================================
// TEMA CLARO / ESCURO
// ========================================
(function () {
  var root = document.documentElement;
  var btn = document.getElementById("tema");

  if (!btn) return;

  function atual() {
    return root.getAttribute("data-theme") ||
      (window.matchMedia("(prefers-color-scheme: light)").matches
        ? "light"
        : "dark");
  }

  function icone() {
    btn.textContent = atual() === "dark" ? "☀" : "☾";
  }

  btn.addEventListener("click", function () {
    var novo = atual() === "dark" ? "light" : "dark";

    function troca() {
      root.setAttribute("data-theme", novo);
      icone();
    }

    if (document.startViewTransition) {
      document.startViewTransition(troca);
    } else {
      troca();
    }
  });

  icone();
})();

// ========================================
// LINHA DO TEMPO ANIMADA
// ========================================
(function () {
  var tl = document.querySelector(".tl");
  if (!tl) return;

  var items = tl.querySelectorAll("article");

  function atualizar() {
    var rect = tl.getBoundingClientRect();
    var y = window.innerHeight * 0.6;
    var p = Math.max(0, Math.min(rect.height, y - rect.top));

    tl.style.setProperty("--p", p + "px");

    items.forEach(function (article) {
      article.classList.toggle(
        "on",
        article.getBoundingClientRect().top < y
      );
    });
  }

  window.addEventListener("scroll", atualizar, { passive: true });
  window.addEventListener("resize", atualizar);
  atualizar();
})();

// ========================================
// IDIOMA PORTUGUÊS / INGLÊS
// ========================================
(function () {
  var M = {
    "Sobre": "About",
    "Sobre mim": "About me",
    "Experiência": "Experience",
    "Projetos": "Projects",
    "Contato": "Contact",
    "Contate-me": "Contact me",

    "Aberto a oportunidades": "Open to opportunities",
    "Desenvolvedor Full Stack": "Full Stack Developer",

    "Sou desenvolvedor Full Stack, formado em Análise e Desenvolvimento de Sistemas pela Estácio, com experiência prática no desenvolvimento de sites e sistemas para negócios locais desde 2024. Atuo em diferentes etapas do desenvolvimento, desde a estruturação do banco de dados e integração de APIs até a construção de interfaces, implementação de funcionalidades e publicação das aplicações.":
      "I'm a Full Stack Developer with a degree in Systems Analysis and Development from Estácio and hands-on experience building websites and systems for local businesses since 2024. I work across different stages of development, from database design and API integration to interface development, feature implementation, and application deployment.",

    "Atualmente, trabalho com suporte técnico na área da saúde, acompanhando de perto o uso de sistemas e os desafios dos usuários no dia a dia. Essa experiência fortalece minha visão sobre usabilidade, resolução de problemas e confiabilidade das aplicações. Desenvolvo projetos utilizando JavaScript, TypeScript, Java e Python, com conhecimentos em bancos de dados, autenticação e integrações de serviços. Tenho direcionado meus estudos para Java com Spring Boot, arquitetura de software e computação em nuvem, buscando contribuir com soluções eficientes e evoluir profissionalmente na área de desenvolvimento.":
      "I currently work in technical support in the healthcare sector, where I closely observe how systems are used and the challenges users face in their daily work. This experience strengthens my understanding of usability, problem-solving, and application reliability. I build projects using JavaScript, TypeScript, Java, and Python, with knowledge of databases, authentication, and service integrations. I'm currently focusing on Java with Spring Boot, software architecture, and cloud computing, aiming to contribute to effective solutions and continue growing as a software developer.",

    "Sistemas que projetei e desenvolvi, do front-end ao deploy.":
      "Systems I designed and developed, from front-end to deployment.",

    "Destaque · Projeto real": "Featured · Real-world project",
    "Destaque": "Featured",
    "Projeto real": "Real-world project",

    "Loja virtual completa de lingerie, pronta para vender: do cadastro de produtos ao pagamento e à entrega.":
      "A complete lingerie e-commerce store, covering the entire process from product management to payment and delivery.",

    "Painel administrativo com controle de estoque":
      "Admin dashboard with inventory management",

    "Login e autenticação de usuários":
      "User login and authentication",

    "Pagamento integrado via Mercado Pago":
      "Integrated payments via Mercado Pago",

    "Rastreamento de pedidos e cálculo de frete por CEP":
      "Order tracking and shipping calculation by ZIP code",

    "Ver ao vivo ↗": "View live ↗",
    "Ver código ↗": "View source code ↗",
    "Ao vivo ↗": "View live ↗",
    "Código ↗": "Source code ↗",

    "Dados e IA": "Data and AI",
    "Produtividade": "Productivity",
    "Mobile": "Mobile",

    "Recomenda livros de forma personalizada, cruzando dados das APIs Google Books e Open Library com Machine Learning e NLP.":
      "A personalized book recommendation system combining data from the Google Books and Open Library APIs with Machine Learning and NLP.",

    "Folha de ponto para registrar entrada, saída e pausas, com histórico e cálculo automático das horas trabalhadas.":
      "A timesheet application for recording clock-in, clock-out, and breaks, with history and automatic calculation of working hours.",

    "Aplicativo para a comunidade de uma igreja, com login, perfil, troca de senha e chat entre usuários.":
      "An app for a church community, featuring login, user profiles, password changes, and chat.",

    "Técnico de suporte": "Technical Support Technician",

    "Suporte de campo e ao usuário em ambiente corporativo de saúde, resolvendo problemas de software e infraestrutura.":
      "On-site and user support in a healthcare business environment, troubleshooting software and infrastructure issues.",

    "Desenvolvedor web freelancer": "Freelance Web Developer",
    "Projetos independentes · Remoto": "Independent Projects · Remote",

    "Desenvolvimento full stack de sites e sistemas para negócios locais, com APIs, banco de dados, autenticação e painéis administrativos.":
      "Full-stack development of websites and systems for local businesses, including APIs, databases, authentication, and administrative dashboards.",

    "Concluído": "Completed",
    "Análise e Desenvolvimento de Sistemas":
      "Systems Analysis and Development",

    "Graduação tecnológica com foco em desenvolvimento de sistemas, banco de dados, lógica de programação e arquitetura de software.":
      "Technology degree focused on systems development, databases, programming logic, and software architecture.",

    "Vamos conversar sobre uma oportunidade ou projeto? Fico à disposição!":
      "Let's talk about a job opportunity or a project. I'd be happy to connect!",

    "Tem uma vaga, um projeto ou só quer trocar uma ideia? Me chama.":
      "Have a job opening, a project, or just want to chat? Get in touch.",

    "Tem uma vaga ou um projeto em mente? Vamos conversar.":
      "Have a job opportunity or a project in mind? Let's talk.",

    "Sites para negócios locais": "Websites for local businesses",

    "Sites e lojas virtuais com painel administrativo, pedidos e banco de dados, entregues para clientes reais.":
      "Websites and online stores with administrative dashboards, order management, and databases, built for real clients.",

    "Sistema de recomendação de livros em Python, com as APIs Google Books e Open Library, análise de dados, Machine Learning e NLP para gerar recomendações personalizadas.":
      "A Python-based book recommendation system using the Google Books and Open Library APIs, data analysis, Machine Learning, and NLP to generate personalized recommendations.",

    "Aplicação de folha de ponto para registrar entrada, saída e pausas, com histórico e cálculo de horas trabalhadas.":
      "A timesheet application for recording clock-in, clock-out, and breaks, with history and working-hours calculations.",

    "App para igreja": "Church App",

    "Aplicativo com login, perfil, troca de senha e chat entre usuários, feito para uma igreja.":
      "An app built for a church, featuring login, profiles, password changes, and user chat.",

    "jul. de 2026 – atual": "Jul 2026 – Present",
    "fev. de 2024 – atual": "Feb 2024 – Present",

    "JavaScript": "JavaScript",
    "TypeScript": "TypeScript",
    "Node.js": "Node.js",
    "Java": "Java",
    "Spring Boot": "Spring Boot",
    "Python": "Python",
    "SQL / MySQL": "SQL / MySQL",
    "Supabase": "Supabase",
    "Git e GitHub": "Git and GitHub",

    "Ver ao vivo": "View live",
    "Ver código": "View code"
  };

  // Dicionário inverso para voltar ao português.
  var R = Object.create(null);

  Object.keys(M).forEach(function (pt) {
    var en = M[pt];

    // Em caso de tradução repetida, preserva a primeira correspondência.
    if (!Object.prototype.hasOwnProperty.call(R, en)) {
      R[en] = pt;
    }
  });

  var btn = document.getElementById("idioma");
  if (!btn) return;

  // Guarda os textos originais. Assim, trocar de idioma repetidamente
  // não depende do texto atualmente visível.
  var textNodes = [];

  function recolherTextos() {
    var walker = document.createTreeWalker(
      document.body,
      NodeFilter.SHOW_TEXT
    );

    var node;

    while ((node = walker.nextNode())) {
      var parent = node.parentElement;

      if (!parent) continue;

      if (
        parent.closest("script, style, noscript, textarea, input, code, pre")
      ) {
        continue;
      }

      if (!node.nodeValue.trim()) continue;

      textNodes.push({
        node: node,
        original: node.nodeValue,
        trimmed: node.nodeValue.trim()
      });
    }
  }

  function traduzirTexto(original, idioma) {
    var texto = original.trim();

    if (idioma === "en") {
      if (Object.prototype.hasOwnProperty.call(M, texto)) {
        return original.replace(texto, M[texto]);
      }
    } else {
      if (Object.prototype.hasOwnProperty.call(R, texto)) {
        return original.replace(texto, R[texto]);
      }
    }

    return original;
  }

  function aplica(en) {
    var idioma = en ? "en" : "pt";

    window.LANG = idioma;
    document.documentElement.lang = en ? "en" : "pt-BR";
    btn.textContent = en ? "PT" : "EN";

    textNodes.forEach(function (item) {
      if (!item.node.isConnected) return;

      item.node.nodeValue = traduzirTexto(item.original, idioma);
    });

    // Atualiza textos alternativos e acessibilidade.
    var elementos = document.querySelectorAll("[data-pt][data-en]");

    elementos.forEach(function (el) {
      el.textContent = en ? el.dataset.en : el.dataset.pt;
    });

    try {
      localStorage.setItem("lang", idioma);
    } catch (e) {
      // O site continua funcionando se o armazenamento estiver indisponível.
    }
  }

  recolherTextos();

  btn.addEventListener("click", function () {
    aplica(window.LANG !== "en");
  });

  var idiomaSalvo = "pt";

  try {
    idiomaSalvo = localStorage.getItem("lang") || "pt";
  } catch (e) {
    // Usa português como idioma padrão.
  }

  window.LANG = "pt";
  aplica(idiomaSalvo === "en");
})();

// ========================================
// EFEITO DE INCLINAÇÃO DOS CARDS
// ========================================
(function () {
  if (
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  ) {
    return;
  }

  document.querySelectorAll(".card").forEach(function (el) {
    el.addEventListener("mousemove", function (e) {
      var r = el.getBoundingClientRect();

      var px = (e.clientX - r.left) / r.width - 0.5;
      var py = (e.clientY - r.top) / r.height - 0.5;

      el.style.transform =
        "perspective(800px) rotateY(" +
        px * 8 +
        "deg) rotateX(" +
        -py * 8 +
        "deg)";
    });

    el.addEventListener("mouseleave", function () {
      el.style.transform = "";
    });
  });
})();
