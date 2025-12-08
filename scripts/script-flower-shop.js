document.addEventListener('DOMContentLoaded', () => {
    // КОНСТАНТЫ
    const PROMO_CODE = 'GARDENPRO50';

    // Данные для акционных растений
    const discountPlantsData = [
        { id: 101, type: 'plant', name: "Хлорофитум", price: 1000, tags: ['for-self', 'pet-safe'], image: "../fotos/chlorophytum.png", symbol: '⭐', symbolText: '<strong>Символ: Очищение воздуха.</strong><br>Очень неприхотливое и быстрорастущее растение. Идеально для начинающих.' },
        { id: 102, type: 'plant', name: "Сансевиерия", price: 1500, tags: ['for-self'], image: "../fotos/sansevieria.png", symbol: '⭐', symbolText: '<strong>Символ: Стойкость.</strong><br>Народное название "Тещин язык". Выживает в любых условиях освещения.' },
        { id: 103, type: 'plant', name: "Аглаонема", price: 2200, tags: ['gift'], image: "../fotos/aglaonema.jpg", symbol: '⭐', symbolText: '<strong>Символ: Удача.</strong><br>Эффектное растение с яркими листьями. Любит рассеянный свет.' },
        { id: 104, type: 'plant', name: "Фикус Лирата", price: 3500, tags: ['for-self'], image: "../fotos/ficuslyrata.jpg", symbol: '⭐', symbolText: '<strong>Символ: Изобилие.</strong><br>Модное дерево с крупными листьями, требует яркого света.' },
        { id: 105, type: 'plant', name: "Орхидея Фаленопсис", price: 3000, tags: ['gift'], image: "../fotos/Phalaenopsis.jpeg", symbol: '⭐', symbolText: '<strong>Символ: Элегантность.</strong><br>Самая популярная орхидея. Нуждается в поливе погружением.' },
        { id: 106, type: 'plant', name: "Калатея", price: 2800, tags: ['for-self'], image: "../fotos/Calathea.jpeg", symbol: '⭐', symbolText: '<strong>Символ: Медитация.</strong><br>Закрывает листья ночью. Требует высокой влажности.' },
        { id: 107, type: 'plant', name: "Венерина Мухоловка", price: 4000, tags: ['for-self'], image: "../fotos/Myholovka.jpg", symbol: '⭐', symbolText: '<strong>Символ: Уникальность.</strong><br>Хищное растение, требует дистиллированной воды и прямого солнца.' },
    ];
    
    // Данные для основного каталога (для заполнения, чтобы не было пустых карточек)
    const plantProducts = [
        { id: 1, type: 'plant', name: 'Монстера Делициоза "Харизма"', price: 2500, tags: ['for-self'], image: '../fotos/monstera-deliciosa.png', symbol: '💡', symbolText: '<strong>Символ: Интеллект и рост.</strong><br>Тропический гигант, идеален для тех, кто стремится к новым знаниям и карьерному росту. Требует умеренного полива.' },
        { id: 2, type: 'plant', name: 'Фикус Бенджамина "Уют"', price: 1800, tags: ['gift', 'for-self'], image: '../fotos/ficus-benjamina.jpg', symbol: '🏡', symbolText: '<strong>Символ: Семейный очаг и покой.</strong><br>Создает атмосферу стабильности и гармонии. Отлично подходит для гостиной. Не любит сквозняков.' },
        { id: 3, type: 'plant', name: 'Эхеверия "Стойкость"', price: 750, tags: ['pet-safe'], image: '../fotos/echeveria-succulent.jpeg', symbol: '🛡️', symbolText: '<strong>Символ: Выносливость и защита.</strong><br>Идеальный подарок для занятых людей. Почти не требует полива и прощает ошибки. Очень безопасен для животных.' },
        { id: 4, type: 'plant', name: 'Алоэ Вера "Исцеление"', price: 900, tags: ['for-self'], image: '../fotos/aloe-vera.png', symbol: '⚕️', symbolText: '<strong>Символ: Здоровье и восстановление.</strong><br>Легендарное растение-аптечка. Требует яркого света и редкого полива. Может быть горьким на вкус.' },
        { id: 5, type: 'plant', name: 'Фаленопсис "Элегантность"', price: 3200, tags: ['gift'], image: '../fotos/phalaenopsis-orchid.jpg', symbol: '👑', symbolText: '<strong>Символ: Роскошь и совершенство.</strong><br>Подарок, говорящий о глубоком уважении. Нуждается в специализированном субстрате и высокой влажности.' },
        { id: 6, type: 'plant', name: 'Замиокулькас Замиелистный "Богатство"', price: 1950, tags: ['for-self'], image: '../fotos/zamioculcas-zamiifolia.jpg', symbol: '💰', symbolText: '<strong>Символ: Финансовое благополучие.</strong><br>Неприхотливый "долларовое дерево". Прекрасно себя чувствует в тени, любит, когда его забывают поливать.' },
        { id: 7, type: 'plant', name: 'Нефролепис "Спокойствие"', price: 1200, tags: ['for-self', 'pet-safe'], image: '../fotos/nephrolepis-fern.jpg', symbol: '🍃', symbolText: '<strong>Символ: Умиротворение и защита.</strong><br>Очищает воздух и приносит ощущение леса. Любит рассеянный свет и частые опрыскивания.' },
        { id: 8, type: 'plant', name: 'Сансевиерия Трехполосная "Несокрушимость"', price: 1100, tags: ['for-self'], image: '../fotos/sansevieria.png', symbol: '💪', symbolText: '<strong>Символ: Сила духа и долголетие.</strong><br>Почти неразрушима, выживает в любых условиях. Идеальна для офисов или темных углов.' },
        { id: 9, type: 'plant', name: 'Калатея Оппенгейма "Медитация"', price: 2700, tags: ['gift'], image: '../fotos/calathea-oppenheimiana.jpg', symbol: '🧘', symbolText: '<strong>Символ: Молитва и новые начинания.</strong><br>Вечером складывает листья. Очень чувствительна к влажности воздуха и качеству воды.' },
        { id: 10, type: 'plant', name: 'Спатифиллум Уоллиса "Женское счастье"', price: 1400, tags: ['gift'], image: '../fotos/spathiphyllum-wallisii.jpg', symbol: '💖', symbolText: '<strong>Символ: Любовь и чистота.</strong><br>Популярный подарок для женщин. Цветет белыми "парусами". Требует регулярного полива.' },
        { id: 11, type: 'plant', name: 'Пеперомия Арбузная "Дружба"', price: 850, tags: ['pet-safe'], image: '../fotos/peperomia-watermelon.jpg', symbol: '🤝', symbolText: '<strong>Символ: Взаимопонимание и согласие.</strong><br>Безопасна для питомцев, имеет милые мясистые листья. Легко размножается и растет.' },
        { id: 12, type: 'plant', name: 'Цитрус Каламондин "Жизнерадостность"', price: 4500, tags: ['for-self'], image: '../fotos/citrus-calamondin.jpg', symbol: '🌞', symbolText: '<strong>Символ: Счастье и изобилие.</strong><br>Приносит в дом аромат юга. Требует яркого солнечного света и внимательного ухода.' },
        { id: 13, type: 'plant', name: 'Хамедорея Элеганс "Аристократ"', price: 2100, tags: ['pet-safe'], image: '../fotos/chamaedorea-elegans.jpg', symbol: '🎩', symbolText: '<strong>Символ: Благородство и очищение.</strong><br>Одна из самых безопасных пальм для питомцев. Улучшает качество воздуха.' },
        { id: 14, type: 'plant', name: 'Эпипремнум Золотистый "Энергия"', price: 950, tags: ['for-self'], image: '../fotos/epipremnum-aureum.jpg', symbol: '⚡', symbolText: '<strong>Символ: Гибкость и адаптивность.</strong><br>Быстрорастущая лиана, легко заплетает пространство. Может жить даже при низком освещении.' },
        { id: 15, type: 'plant', name: 'Драцена Маргината "Надежда"', price: 1600, tags: ['gift'], image: '../fotos/dracaena-marginata.jpg', symbol: '🕊️', symbolText: '<strong>Символ: Мир и обновление.</strong><br>Отлично подходит для подарка на новоселье. Умеренный полив, любит яркий, но не прямой свет.' },
    ];

    // Фиктивные данные для горшков (Горшки: 3 шт)
    const potProducts = [
        { id: 201, type: 'pot', name: 'Горшок "Скандинавия"', price: 1200, image: '../fotos/pot-scandi.jpg', symbol: '⚪', symbolText: '<strong>Стиль: Минимализм.</strong><br>Глиняный горшок с интересным узором.' },
        { id: 202, type: 'pot', name: 'Горшок "Терракота"', price: 700, image: '../fotos/pot-terra.jpg', symbol: '🧱', symbolText: '<strong>Стиль: Классика.</strong><br>Глиняный горшок с дренажным отверстием.' },
        { id: 203, type: 'pot', name: 'Кашпо "Лофт"', price: 2100, image: '../fotos/pot-loft.jpg', symbol: '⚫', symbolText: '<strong>Стиль: Индустриальный.</strong><br>Металлическое подвесное кашпо.' },
    ];

    const allProducts = [...discountPlantsData, ...plantProducts, ...potProducts];

    // DOM элементы
    const discountGrid = document.getElementById('discountGrid'); // НОВАЯ СЕТКА
    const plantGrid = document.getElementById('plantGrid');
    const potGrid = document.getElementById('potGrid');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const cartIcon = document.getElementById('cartIcon');
    const cartCount = document.getElementById('cartCount');
    const cartModal = document.getElementById('cartModal');
    const cartItemsContainer = document.getElementById('cartItems');
    const cartTotalElement = document.getElementById('cartTotal');
    const checkoutBtn = document.getElementById('checkoutBtn');
    const checkoutModal = document.getElementById('checkoutModal');
    const checkoutForm = document.getElementById('checkoutForm');
    const receiptModal = document.getElementById('receiptModal');
    // Модалка промокода
    const promoModal = document.getElementById('promoModal');
    const promoForm = document.getElementById('promoForm');
    const promoCodeInput = document.getElementById('promoCodeInput');
    const promoMessage = document.getElementById('promoMessage');
    const closeBtns = document.querySelectorAll('.modal .close-btn');

    // Состояние корзины и скидки
    let cart = JSON.parse(localStorage.getItem('plantCart')) || [];
    let discountApplied = localStorage.getItem('discountApplied') === 'true';

    /** Рендерит карточку товара */
    function renderProductCard(product, container) {
        const card = document.createElement('div');
        card.className = 'product-card';
        const tags = product.tags ? product.tags.join(' ') : product.type;
        card.setAttribute('data-tags', tags);
        
        // Добавляем класс для акционных товаров
        const isDiscounted = discountPlantsData.some(dp => dp.id === product.id);
        if (isDiscounted) {
             card.classList.add('discount-item');
        }

        card.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="symbol-icon" title="">
                ${product.symbol}
                <span class="symbol-tooltip">${product.symbolText}</span>
            </div>
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <p class="product-price">${product.price.toLocaleString()} руб.</p>
                ${isDiscounted ? '<p style="color: red; font-weight: bold;">-50% по промокоду!</p>' : ''}
                <button class="add-to-cart-btn" data-id="${product.id}">Добавить в корзину</button>
            </div>
        `;
        container.appendChild(card);
    }
    
    /** Рендерит акционные растения */
    function renderDiscountPlants() {
        discountGrid.innerHTML = '';
        discountPlantsData.forEach(product => renderProductCard(product, discountGrid));
    }


    /** Рендерит растения с фильтрацией */
    function renderPlants(filterTag = 'all-plants') {
        plantGrid.innerHTML = '';
        const filteredProducts = plantProducts.filter(product => 
            filterTag === 'all-plants' || product.tags.includes(filterTag)
        );
        filteredProducts.forEach(product => renderProductCard(product, plantGrid));
    }
    
    /** Рендерит горшки */
    function renderPots() {
        potGrid.innerHTML = '';
        potProducts.forEach(product => renderProductCard(product, potGrid));
    }

    /** Обновляет счетчик, корзину и localStorage */
    function updateCart() {
        cartCount.textContent = cart.length;
        
        let total = 0;
        let discountItemCount = 0;
        
        // Пересчет итоговой суммы с учетом скидки на ОДНО акционное растение
        cart.forEach(item => {
            let itemPrice = item.originalPrice || item.price; // Используем оригинальную цену
            
            if (discountApplied && discountPlantsData.some(p => p.id === item.productId) && discountItemCount === 0) {
                // Применяем скидку 50% только к первому акционному растению
                itemPrice = itemPrice * 0.5;
                discountItemCount++;
            }
            total += itemPrice;
        });

        cartTotalElement.textContent = Math.round(total).toLocaleString(); // Округляем для отображения

        checkoutBtn.disabled = cart.length === 0;

        localStorage.setItem('plantCart', JSON.stringify(cart));
        localStorage.setItem('discountApplied', discountApplied);
        renderCartItems();
    }
    
    /** Рендерит товары в модальном окне корзины */
    function renderCartItems() {
        cartItemsContainer.innerHTML = '';
        
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p class="empty-cart-message">Корзина пуста.</p>';
            return;
        }
        
        let discountItemCount = 0;
        const hasDiscountedPlant = cart.some(item => discountPlantsData.some(p => p.id === item.productId));

        // Добавляем кнопку промокода, если есть акционные товары и скидка не применена
        if (hasDiscountedPlant && !discountApplied) {
             const promoButtonHtml = `
                <div style="text-align: center; padding: 10px; border: 1px dashed #FF9800; margin-bottom: 10px;">
                    <button id="openPromoModal" style="background: #FF9800; color: white; padding: 8px 15px; border: none; border-radius: 5px; cursor: pointer;">
                        Ввести промокод
                    </button>
                </div>
            `;
            cartItemsContainer.insertAdjacentHTML('afterbegin', promoButtonHtml);
        } else if (discountApplied) {
             const messageHtml = `
                <p style="text-align: center; color: #4CAF50; font-weight: bold; margin-bottom: 10px;">
                    ✅ Промокод ${PROMO_CODE} применен!
                </p>
            `;
            cartItemsContainer.insertAdjacentHTML('afterbegin', messageHtml);
        }

        cart.forEach(item => {
            let itemPrice = item.originalPrice || item.price;
            let displayPrice = itemPrice;
            let discountTag = '';
            
            // Проверка и применение скидки для отображения
            const isDiscountPlant = discountPlantsData.some(p => p.id === item.productId);
            if (discountApplied && isDiscountPlant && discountItemCount === 0) {
                displayPrice = itemPrice * 0.5;
                discountTag = '<span style="color: red; margin-left: 5px;"> (Скидка 50%)</span>';
                discountItemCount++;
            }

            const itemElement = document.createElement('div');
            itemElement.className = 'cart-item';
            itemElement.innerHTML = `
                <span class="cart-item-name">${item.name}</span>
                <span class="cart-item-price">${Math.round(displayPrice).toLocaleString()} руб. ${discountTag}</span>
                <i class="fas fa-times remove-item-btn" data-id="${item.id}"></i>
            `;
            cartItemsContainer.appendChild(itemElement);
        });
    }

    /** Добавляет товар в корзину */
    function addToCart(productId) {
        const product = allProducts.find(p => p.id === productId); 
        if (product) {
            const itemToAdd = { 
                id: Date.now(), // Уникальный ID для элемента в корзине
                productId: product.id,
                name: product.name, 
                price: product.price,
                originalPrice: product.price // Сохраняем оригинальную цену
            };
            cart.push(itemToAdd);
            updateCart();
        }
    }

    /** Удаляет товар из корзины */
    function removeFromCart(itemId) {
        cart = cart.filter(item => item.id !== itemId);
        // Если удалили товар со скидкой, нужно перепроверить, остались ли акционные товары
        if (discountApplied) {
            const hasDiscountedPlant = cart.some(item => discountPlantsData.some(p => p.id === item.productId));
            if (!hasDiscountedPlant) {
                discountApplied = false; // Отменяем скидку, если акционных товаров больше нет
            }
        }
        updateCart();
    }
    
    // Логика промокода 
    
    promoForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const inputCode = promoCodeInput.value.toUpperCase().trim();
        promoMessage.style.color = 'red';
        
        const hasDiscountedPlant = cart.some(item => discountPlantsData.some(p => p.id === item.productId));

        if (!hasDiscountedPlant) {
            promoMessage.textContent = '❌ В корзине нет акционных растений.';
            return;
        }
        
        if (inputCode === PROMO_CODE) {
            discountApplied = true;
            localStorage.setItem('discountApplied', 'true');
            promoMessage.style.color = '#4CAF50';
            promoMessage.textContent = `✅ Промокод "${PROMO_CODE}" успешно применен! Скидка 50% на одно растение.`;
            updateCart();
            // Закрываем модалку через 1.5 секунды
            setTimeout(() => promoModal.style.display = 'none', 1500); 
        } else {
            promoMessage.textContent = '❌ Неверный промокод. Попробуйте снова.';
        }
    });

    // Обработчики событий

    // Фильтрация
    filterBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            filterBtns.forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            const filterTag = e.target.getAttribute('data-filter');
            renderPlants(filterTag); 
        });
    });

    // Добавление в корзину (работает для всех сеток)
    document.querySelector('main').addEventListener('click', (e) => {
        if (e.target.classList.contains('add-to-cart-btn')) {
            const productId = parseInt(e.target.getAttribute('data-id'));
            addToCart(productId);
        }
    });

    // Открытие корзины
    cartIcon.addEventListener('click', () => {
        cartModal.style.display = 'block';
    });
    
    // Открытие модалки промокода из корзины
    cartItemsContainer.addEventListener('click', (e) => {
        if (e.target.id === 'openPromoModal') {
            cartModal.style.display = 'none';
            promoModal.style.display = 'block';
            promoMessage.textContent = ''; // Сброс сообщения
        }
    });

    // Удаление из корзины
    cartItemsContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('remove-item-btn')) {
            const itemId = parseInt(e.target.getAttribute('data-id'));
            removeFromCart(itemId);
        }
    });

    // Кнопка "Купить" (открытие модалки оформления)
    checkoutBtn.addEventListener('click', () => {
        cartModal.style.display = 'none';
        checkoutModal.style.display = 'block';
    });

    // Отправка формы (имитация покупки)
    checkoutForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // 1. Сбор данных для чека
        const address = document.getElementById('address').value;
        
        let total = 0;
        let discountItemCount = 0;
        
        // Финальный пересчет для чека
        cart.forEach(item => {
            let itemPrice = item.originalPrice || item.price; 
            if (discountApplied && discountPlantsData.some(p => p.id === item.productId) && discountItemCount === 0) {
                itemPrice = itemPrice * 0.5;
                discountItemCount++;
            }
            total += itemPrice;
        });


        // Очистка корзины и localStorage
        cart = [];
        discountApplied = false;
        updateCart(); // Обновление счетчика и очистка
        localStorage.removeItem('discountApplied');

        // Отображение чека
        receiptAddress.textContent = address;
        receiptTotal.textContent = Math.round(total).toLocaleString();

        checkoutModal.style.display = 'none';
        receiptModal.style.display = 'block';

        // Очистка формы
        checkoutForm.reset();
    });

    // Закрытие модальных окон
    closeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            btn.closest('.modal').style.display = 'none';
        });
    });

    // Закрытие модальных окон по клику вне их области
    window.onclick = (event) => {
        if (event.target.classList.contains('modal')) {
            event.target.style.display = 'none';
        }
    }

    // Инициализация при загрузке: рендерим все секции
    renderDiscountPlants();
    renderPlants('all-plants');
    renderPots();
    updateCart(); 
});