let toggleFilter = true;
const mainContainer = document.querySelector('.main-container');
const articlesContainer = document.querySelector('#articles-container');
const sideContainer = document.querySelector('#side-container');
const sideMenu = document.querySelector('#side-menu');
const navToggle = document.querySelector('#check-filter');
const titleCatalog = document.querySelector('#title-catalog');
const loader = document.querySelector('#loader');

const cat = [
  {
    title: 'Cojin - cama para gatos',
    price: '$ 74.990',
    type: 'cat'
  },
  {
    title: 'Arnés para gatos con moño + traílla ergonómico - M',
    price: '$ 5.490',
    type: 'cat'
  },
  {
    title: 'Hamaca cama colgante para gato mascotas',
    price: '$ 13.990',
    type: 'cat'
  },
  {
    title: 'Leeby Cama Cueva Estampado de Erizos para gatos',
    price: '$ 25.990',
    type: 'cat'
  },
  {
    title: 'Cama De Lujo Para Gatos Instachew',
    price: '$ 5.490',
    type: 'cat'
  },
  {
    title: 'Crusec Rascador Torre Gato Arbol Trepador Terciopelo',
    price: '$ 44.490',
    type: 'cat'
  },
  {
    title: 'Rascador Con Hamaca Para Gatos # Cat001 (color: Gris)',
    price: '$ 31.490',
    type: 'cat'
  },
  {
    title:
      'Arnés Y Correa Para Gatos- Curuva, - única, , COLOR Curuva, SIZE única',
    price: '$ 7.490',
    type: 'cat'
  }
];

const dog = [
  {
    title: 'Cama Ortopédica Perros Mascotas, 70 Cm, M',
    price: '$ 5.490',
    type: 'dog'
  },
  {
    title: 'Chaqueta impermeable para mascota',
    price: '$ 74.990',
    type: 'dog'
  },
  {
    title: 'Cama Perro Antiestrés The Dogs, Funda Desmontable, Premium',
    price: '$ 13.990',
    type: 'dog'
  },
  {
    title: 'Paws Botas para Perros XS Naranjo Naranjo',
    price: '$ 25.990',
    type: 'dog'
  },
  {
    title: 'Bowl mascotas Musgo',
    price: '$ 5.490',
    type: 'dog'
  },
  {
    title: 'Puerta Exterior Grande Xxl Para Perro Mascota',
    price: '$ 44.490',
    type: 'dog'
  },
  {
    title: 'Arne con mochila táctica para perro',
    price: '$ 31.490',
    type: 'dog'
  },
  {
    title: 'Chaqueta impermeable para mascota',
    price: '$ 7.490',
    type: 'dog'
  }
];

const rabbit = [
  {
    title: 'Ropa Única para Conejos a la Última Tendencia 7 / S 1.2-2.5kg',
    price: '$ 5.490',
    type: 'rabbit'
  },
  {
    title: 'Conejos 400 GR Little One',
    price: '$ 74.990',
    type: 'rabbit'
  },
  {
    title: 'Cama Frutilla Iglú Para Mascotas Erizo Conejo Cuy 31x31 Cm',
    price: '$ 13.990',
    type: 'rabbit'
  },
  {
    title: 'Niteangel Arnés suave ajustable con correa elástica para conejos',
    price: '$ 25.990',
    type: 'rabbit'
  },
  {
    title: 'Caja De Arena Para Conejos Linifar Extra Grande',
    price: '$ 5.490',
    type: 'rabbit'
  },
  {
    title:
      'Juego de arnés y correa para conejos, accesorios para mascotas, chaleco, correas',
    price: '$ 44.490',
    type: 'rabbit'
  },
  {
    title: 'Escalera Conejo Voltrega',
    price: '$ 7.490',
    type: 'rabbit'
  },
  {
    title: 'Jaula Conejera Pequeña Para Mascotas Conejos Roedores Cuys',
    price: '$ 31.490',
    type: 'rabbit'
  }
];

const filters = [
  { id: 'cat-filter', label: 'Gatos' },
  { id: 'dog-filter', label: 'Perros' },
  { id: 'rabbit-filter', label: 'Conejos' },
  { id: 'all-filter', label: 'Mostrar todo' },
  { id: 'contact', label: 'Contacto' }
];

const getArticles = (articles) => {
  articlesContainer.innerHTML = '';
  articles.forEach(({ title, price, type }, index) => {
    const card = `
      <div class="card">
        <div>
          <img class='card-img' src="./src/assets/img/${type}_${
      articles.length > 8 && type == 'dog'
        ? index - 8
        : articles.length > 8 && type == 'rabbit'
        ? index - 16
        : index
    }.png" alt="${type}">
        </div>
        <h4 class='card-title'>${title}</h4>
        <h5 class='price'>${price}</h5>
      </div>
    `;
    articlesContainer.insertAdjacentHTML('beforeend', card);
  });

  const query = window.matchMedia('(width >= 768px)');
  if (!query.matches) {
    navToggle.click();
  }
};

const generateFilters = () => {
  filters.forEach(({ id, label }) => {
    let imageSrc = '';
    switch (label) {
      case 'Perros':
        imageSrc = './src/assets/img/dog_avatar';
        break;
      case 'Gatos':
        imageSrc = './src/assets/img/cat_avatar';
        break;
      case 'Conejos':
        imageSrc = './src/assets/img/rabbit_avatar';
        break;
      case 'Contacto':
        imageSrc = './src/assets/img/contact';
        break;
      default:
        imageSrc = './src/assets/img/all_avatar';
    }
    const filterCard = `
    
      <a href='#${label == 'Contacto' ? 'contact' : 'main'}'>
        <div class="filter-card" onclick="applyFilters('${id}')">
          <img src="${imageSrc}.png" alt="${label}">
          <p>${label}</p>
        </div>
      </a>  
    `;
    sideMenu.insertAdjacentHTML('beforeend', filterCard);
  });
};

const applyFilters = (id) => {
  showLoader();
  setTimeout(() => {
    switch (id) {
      case 'cat-filter':
        getArticles(cat);
        titleCatalog.textContent = 'Gatos';
        break;
      case 'dog-filter':
        getArticles(dog);
        titleCatalog.textContent = 'Perros';
        break;
      case 'rabbit-filter':
        getArticles(rabbit);
        titleCatalog.textContent = 'Conejos';
        break;
      default:
        getArticles([...cat, ...dog, ...rabbit]);
        titleCatalog.textContent = 'Todos';
        break;
    }
  }, 500);
};

navToggle.addEventListener('click', () => {
  if (navToggle.checked) {
    sideContainer.classList.remove('hidden');
    sideContainer.classList.remove('slide-out-bottom');
    sideContainer.classList.add('slide-in-bottom');
    sideContainer.classList.add('side-container');
  } else {
    sideContainer.classList.remove('slide-in-bottom');
    sideContainer.classList.add('slide-out-bottom');
  }
});

const showLoader = () => {
  loader.style.display = 'grid';
  loader.classList.remove('fade-out');
  loader.classList.add('fade-in', 'loader');

  setTimeout(() => {
    loader.classList.replace('fade-in', 'fade-out');
    setTimeout(() => {
      loader.classList.remove('loader', 'fade-out');
      loader.style.display = 'none';
    }, 200);
  }, 1300);
};


const reloadPage = () => location.reload();

const init = async () => {
  showLoader();
  getArticles([...cat, ...dog, ...rabbit]);
  generateFilters('all-filter');
  navToggle.checked = true;
  titleCatalog.textContent = 'Todos';
  sideContainer.classList.remove('hidden');
  sideContainer.classList.add('side-container');
};

sideContainer.addEventListener('animationend', () => {
  const show = navToggle.checked;
  sideContainer.classList.remove('slide-in-bottom', 'slide-out-bottom');
  sideContainer.classList.toggle('side-container', show);
  sideContainer.classList.toggle('hidden', !show);
});

init();
