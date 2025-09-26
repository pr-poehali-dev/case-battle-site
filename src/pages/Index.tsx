import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';

interface CaseItem {
  id: string;
  name: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  image: string;
  price: number;
}

interface GameCase {
  id: string;
  name: string;
  price: number;
  image: string;
  items: CaseItem[];
}

interface User {
  id: string;
  username: string;
  avatar: string;
  steamId: string;
}

const Index: React.FC = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isOpening, setIsOpening] = useState(false);
  const [openedItem, setOpenedItem] = useState<CaseItem | null>(null);
  const [balance, setBalance] = useState(5000);
  const [inventory, setInventory] = useState<CaseItem[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isTopUpModalOpen, setIsTopUpModalOpen] = useState(false);
  const [selectedTopUpAmount, setSelectedTopUpAmount] = useState<number | null>(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>('');

  const gameCases: GameCase[] = [
    {
      id: '1',
      name: 'Neon Strike Case',
      price: 250,
      image: 'img/3b9255d2-65a1-4c05-b0b5-517016187c4c.jpg',
      items: [
        { id: '1', name: 'Cyber Blade', rarity: 'legendary', image: 'img/7fae179e-7d4b-49e5-aeed-aa6335fd5a38.jpg', price: 2500 },
        { id: '2', name: 'Plasma Rifle', rarity: 'epic', image: 'img/cb439648-65c8-4a61-bbc0-f6733a0abe3b.jpg', price: 800 },
        { id: '3', name: 'Neon Glove', rarity: 'rare', image: 'img/3b9255d2-65a1-4c05-b0b5-517016187c4c.jpg', price: 150 },
        { id: '4', name: 'Basic Skin', rarity: 'common', image: 'img/cb439648-65c8-4a61-bbc0-f6733a0abe3b.jpg', price: 50 }
      ]
    },
    {
      id: '2', 
      name: 'Cyber Legends Case',
      price: 500,
      image: 'img/3b9255d2-65a1-4c05-b0b5-517016187c4c.jpg',
      items: [
        { id: '5', name: 'Dragon Lore', rarity: 'legendary', image: 'img/7fae179e-7d4b-49e5-aeed-aa6335fd5a38.jpg', price: 5000 },
        { id: '6', name: 'Lightning Strike', rarity: 'epic', image: 'img/cb439648-65c8-4a61-bbc0-f6733a0abe3b.jpg', price: 1200 }
      ]
    }
  ];

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'legendary': return 'from-neon-yellow to-neon-pink';
      case 'epic': return 'from-neon-purple to-neon-cyan';
      case 'rare': return 'from-neon-cyan to-blue-500';
      case 'common': return 'from-gray-400 to-gray-600';
      default: return 'from-gray-400 to-gray-600';
    }
  };

  const openCase = (gameCase: GameCase) => {
    if (balance < gameCase.price) return;
    
    setIsOpening(true);
    setBalance(prev => prev - gameCase.price);
    
    setTimeout(() => {
      const randomItem = gameCase.items[Math.floor(Math.random() * gameCase.items.length)];
      setOpenedItem(randomItem);
      setInventory(prev => [...prev, randomItem]);
      setIsOpening(false);
    }, 2000);
  };

  const closeModal = () => {
    setOpenedItem(null);
  };

  const handleSteamLogin = () => {
    // Имитация входа через Steam
    const mockUser: User = {
      id: '76561198123456789',
      username: 'GamerPro2024',
      avatar: 'img/3b9255d2-65a1-4c05-b0b5-517016187c4c.jpg',
      steamId: '76561198123456789'
    };
    setUser(mockUser);
    setIsLoginModalOpen(false);
    setBalance(10000); // Бонус за регистрацию
  };

  const handleLogout = () => {
    setUser(null);
    setBalance(0);
    setInventory([]);
  };

  const openLoginModal = () => {
    setIsLoginModalOpen(true);
  };

  const closeLoginModal = () => {
    setIsLoginModalOpen(false);
  };

  const openTopUpModal = () => {
    setIsTopUpModalOpen(true);
    setSelectedTopUpAmount(null);
    setSelectedPaymentMethod('');
  };

  const closeTopUpModal = () => {
    setIsTopUpModalOpen(false);
    setSelectedTopUpAmount(null);
    setSelectedPaymentMethod('');
  };

  const handleTopUp = () => {
    if (selectedTopUpAmount && selectedPaymentMethod) {
      setBalance(prev => prev + selectedTopUpAmount);
      closeTopUpModal();
      // Здесь можно добавить уведомление об успешном пополнении
    }
  };

  const topUpAmounts = [
    { amount: 500, bonus: 0, popular: false },
    { amount: 1000, bonus: 50, popular: false },
    { amount: 2500, bonus: 150, popular: true },
    { amount: 5000, bonus: 400, popular: false },
    { amount: 10000, bonus: 1000, popular: false },
    { amount: 25000, bonus: 3000, popular: false },
  ];

  const paymentMethods = [
    { id: 'card', name: 'Банковская карта', icon: 'CreditCard', color: 'from-blue-500 to-blue-600' },
    { id: 'qiwi', name: 'QIWI Кошелек', icon: 'Wallet', color: 'from-orange-500 to-orange-600' },
    { id: 'yandex', name: 'ЮMoney', icon: 'Coins', color: 'from-yellow-500 to-yellow-600' },
    { id: 'crypto', name: 'Криптовалюта', icon: 'Bitcoin', color: 'from-purple-500 to-purple-600' },
  ];

  const renderHome = () => (
    <div className="min-h-screen bg-gaming-dark text-white">
      {/* Header */}
      <header className="border-b border-gaming-accent bg-gaming-darker/50 backdrop-blur-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="text-3xl font-bold bg-gaming-gradient bg-clip-text text-transparent font-['Orbitron']">
                CASE BATTLE
              </h1>
            </div>
            <nav className="hidden md:flex items-center gap-6">
              {['Главная', 'Кейсы', 'Инвентарь', 'Битва', 'Профиль'].map((item, index) => (
                <button
                  key={item}
                  onClick={() => setActiveSection(item.toLowerCase())}
                  className={`px-4 py-2 rounded-lg transition-all ${
                    activeSection === item.toLowerCase() 
                      ? 'bg-neon-pink text-white shadow-lg' 
                      : 'text-gray-300 hover:text-white hover:bg-gaming-accent'
                  }`}
                >
                  {item}
                </button>
              ))}
            </nav>
            <div className="flex items-center gap-4">
              {user ? (
                <>
                  <div className="flex items-center gap-2 bg-gaming-accent px-4 py-2 rounded-lg">
                    <Icon name="Coins" className="text-neon-yellow" size={20} />
                    <span className="font-semibold text-neon-yellow">{balance.toLocaleString()}</span>
                    <Button
                      onClick={openTopUpModal}
                      size="sm"
                      className="ml-2 bg-neon-green hover:bg-green-500 text-black font-semibold px-3 py-1 text-xs"
                    >
                      <Icon name="Plus" size={14} className="mr-1" />
                      +
                    </Button>
                  </div>
                  <div className="flex items-center gap-3 bg-gaming-accent px-4 py-2 rounded-lg">
                    <img 
                      src={user.avatar} 
                      alt={user.username}
                      className="w-8 h-8 rounded-full border-2 border-neon-cyan"
                    />
                    <span className="text-white font-medium">{user.username}</span>
                  </div>
                  <Button 
                    variant="outline" 
                    onClick={handleLogout}
                    className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                  >
                    <Icon name="LogOut" size={16} className="mr-2" />
                    Выйти
                  </Button>
                </>
              ) : (
                <Button 
                  onClick={openLoginModal}
                  className="bg-gaming-gradient hover:opacity-90 text-white font-semibold"
                >
                  <Icon name="User" size={16} className="mr-2" />
                  Войти через Steam
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gaming-gradient opacity-10"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-6xl font-bold mb-6 text-glow font-['Orbitron']">
            ОТКРОЙТЕ КЕЙСЫ
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Испытайте удачу в самых эпических кейсах! Получите легендарные скины и редкие предметы.
          </p>
          {user ? (
            <Button 
              size="lg" 
              className="bg-gaming-gradient hover:opacity-90 text-white font-semibold px-8 py-4 text-lg animate-glow-pulse"
            >
              <Icon name="Play" size={24} className="mr-3" />
              НАЧАТЬ ИГРУ
            </Button>
          ) : (
            <Button 
              size="lg" 
              onClick={openLoginModal}
              className="bg-gaming-gradient hover:opacity-90 text-white font-semibold px-8 py-4 text-lg animate-glow-pulse"
            >
              <Icon name="LogIn" size={24} className="mr-3" />
              ВОЙТИ ЧЕРЕЗ STEAM
            </Button>
          )}
        </div>
      </section>

      {/* Cases Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h3 className="text-4xl font-bold text-center mb-12 text-glow">Доступные Кейсы</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {gameCases.map((gameCase) => (
              <Card key={gameCase.id} className="bg-gaming-accent border-gaming-purple overflow-hidden group hover:border-neon-pink transition-all duration-300 animate-float">
                <div className="relative">
                  <img 
                    src={gameCase.image} 
                    alt={gameCase.name}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gaming-accent to-transparent"></div>
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-neon-pink text-white">
                      {gameCase.price} ₽
                    </Badge>
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="text-white text-xl">{gameCase.name}</CardTitle>
                  <CardDescription className="text-gray-400">
                    {gameCase.items.length} уникальных предметов
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {gameCase.items.slice(0, 3).map((item) => (
                      <Badge 
                        key={item.id}
                        className={`bg-gradient-to-r ${getRarityColor(item.rarity)} text-white text-xs`}
                      >
                        {item.rarity}
                      </Badge>
                    ))}
                  </div>
                  <Button 
                    onClick={() => user ? openCase(gameCase) : openLoginModal()}
                    disabled={user && balance < gameCase.price}
                    className="w-full bg-neon-cyan text-black hover:bg-cyan-400 font-semibold disabled:opacity-50"
                  >
                    <Icon name="Package" size={16} className="mr-2" />
                    {user ? 'Открыть кейс' : 'Войти для игры'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Items */}
      <section className="py-16 bg-gaming-darker/30">
        <div className="container mx-auto px-4">
          <h3 className="text-4xl font-bold text-center mb-12 text-glow">Топ предметы</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: 'Cyber Blade', price: 2500, rarity: 'legendary', image: 'img/7fae179e-7d4b-49e5-aeed-aa6335fd5a38.jpg' },
              { name: 'Plasma Rifle', price: 800, rarity: 'epic', image: 'img/cb439648-65c8-4a61-bbc0-f6733a0abe3b.jpg' },
              { name: 'Dragon Lore', price: 5000, rarity: 'legendary', image: 'img/7fae179e-7d4b-49e5-aeed-aa6335fd5a38.jpg' }
            ].map((item, index) => (
              <Card key={index} className="bg-gaming-accent border-gaming-purple group hover:border-neon-yellow transition-all duration-300">
                <CardContent className="p-6">
                  <div className="relative mb-4">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-full h-32 object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t ${getRarityColor(item.rarity)} opacity-20 rounded-lg`}></div>
                  </div>
                  <h4 className="text-white font-semibold mb-2">{item.name}</h4>
                  <div className="flex justify-between items-center">
                    <Badge className={`bg-gradient-to-r ${getRarityColor(item.rarity)} text-white`}>
                      {item.rarity}
                    </Badge>
                    <span className="text-neon-yellow font-bold">{item.price} ₽</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );

  const renderInventory = () => (
    <div className="min-h-screen bg-gaming-dark text-white pt-20">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-8 text-glow">Мой инвентарь</h2>
        {inventory.length === 0 ? (
          <div className="text-center py-16">
            <Icon name="Package" size={64} className="mx-auto mb-4 text-gray-500" />
            <p className="text-xl text-gray-400">Ваш инвентарь пуст</p>
            <p className="text-gray-500">Откройте кейсы, чтобы получить предметы!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {inventory.map((item, index) => (
              <Card key={index} className="bg-gaming-accent border-gaming-purple">
                <CardContent className="p-4">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-full h-24 object-cover rounded mb-3"
                  />
                  <h4 className="text-white font-semibold mb-2">{item.name}</h4>
                  <Badge className={`bg-gradient-to-r ${getRarityColor(item.rarity)} text-white mb-2`}>
                    {item.rarity}
                  </Badge>
                  <p className="text-neon-yellow font-bold">{item.price} ₽</p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gaming-dark">
      {activeSection === 'home' || activeSection === 'главная' ? renderHome() : null}
      {activeSection === 'инвентарь' ? renderInventory() : null}
      {(activeSection === 'кейсы' || activeSection === 'битва' || activeSection === 'профиль') && renderHome()}

      {/* Case Opening Modal */}
      {(isOpening || openedItem) && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="bg-gaming-accent p-8 rounded-2xl text-center max-w-md w-full mx-4 border border-neon-pink">
            {isOpening ? (
              <>
                <div className="animate-spin-case mb-6">
                  <Icon name="Package" size={80} className="text-neon-cyan mx-auto" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Открываем кейс...</h3>
                <Progress value={75} className="w-full" />
              </>
            ) : openedItem ? (
              <>
                <div className="mb-6">
                  <img 
                    src={openedItem.image} 
                    alt={openedItem.name}
                    className="w-32 h-32 object-cover rounded-lg mx-auto mb-4 animate-glow-pulse"
                  />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Поздравляем!</h3>
                <p className="text-lg text-gray-300 mb-4">Вы получили:</p>
                <h4 className="text-xl font-semibold text-white mb-2">{openedItem.name}</h4>
                <Badge className={`bg-gradient-to-r ${getRarityColor(openedItem.rarity)} text-white mb-4`}>
                  {openedItem.rarity}
                </Badge>
                <p className="text-neon-yellow font-bold text-lg mb-6">{openedItem.price} ₽</p>
                <Button onClick={closeModal} className="bg-neon-pink hover:bg-pink-600 text-white">
                  Отлично!
                </Button>
              </>
            ) : null}
          </div>
        </div>
      )}

      {/* Steam Login Modal */}
      {isLoginModalOpen && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="bg-gaming-accent p-8 rounded-2xl text-center max-w-md w-full mx-4 border border-neon-cyan">
            <div className="mb-6">
              <Icon name="Gamepad2" size={64} className="text-neon-cyan mx-auto mb-4" />
              <h3 className="text-3xl font-bold text-white mb-2">Добро пожаловать!</h3>
              <p className="text-gray-300">Войдите через Steam, чтобы начать играть</p>
            </div>
            
            <div className="space-y-4 mb-6">
              <div className="bg-gaming-darker p-4 rounded-lg">
                <div className="flex items-center gap-3 mb-2">
                  <Icon name="Gift" className="text-neon-yellow" size={20} />
                  <span className="text-white font-semibold">Бонус за регистрацию</span>
                </div>
                <p className="text-neon-yellow font-bold">10,000 монет</p>
              </div>
              
              <div className="bg-gaming-darker p-4 rounded-lg">
                <div className="flex items-center gap-3 mb-2">
                  <Icon name="Shield" className="text-neon-green" size={20} />
                  <span className="text-white font-semibold">Безопасность</span>
                </div>
                <p className="text-gray-400 text-sm">Быстрая и защищенная авторизация</p>
              </div>
            </div>

            <div className="space-y-3">
              <Button 
                onClick={handleSteamLogin}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-semibold py-3 text-lg"
              >
                <Icon name="Gamepad2" size={20} className="mr-3" />
                Войти через Steam
              </Button>
              
              <Button 
                onClick={closeLoginModal}
                variant="outline"
                className="w-full border-gray-500 text-gray-300 hover:bg-gray-700"
              >
                Отмена
              </Button>
            </div>
            
            <p className="text-xs text-gray-500 mt-4">
              Нажимая "Войти через Steam", вы соглашаетесь с правилами сервиса
            </p>
          </div>
        </div>
      )}

      {/* Top Up Modal */}
      {isTopUpModalOpen && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="bg-gaming-accent p-8 rounded-2xl text-center max-w-2xl w-full mx-4 border border-neon-yellow max-h-[90vh] overflow-y-auto">
            <div className="mb-6">
              <Icon name="Coins" size={64} className="text-neon-yellow mx-auto mb-4" />
              <h3 className="text-3xl font-bold text-white mb-2">Пополнить баланс</h3>
              <p className="text-gray-300">Выберите сумму и способ оплаты</p>
            </div>
            
            {/* Amount Selection */}
            <div className="mb-8">
              <h4 className="text-xl font-semibold text-white mb-4">Сумма пополнения</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {topUpAmounts.map((item) => (
                  <div
                    key={item.amount}
                    onClick={() => setSelectedTopUpAmount(item.amount)}
                    className={`relative p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      selectedTopUpAmount === item.amount 
                        ? 'border-neon-yellow bg-neon-yellow/10' 
                        : 'border-gaming-purple hover:border-neon-cyan'
                    } ${item.popular ? 'ring-2 ring-neon-pink' : ''}`}
                  >
                    {item.popular && (
                      <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                        <Badge className="bg-neon-pink text-white text-xs">
                          ПОПУЛЯРНОЕ
                        </Badge>
                      </div>
                    )}
                    <div className="text-white font-bold text-lg mb-1">
                      {item.amount.toLocaleString()} ₽
                    </div>
                    {item.bonus > 0 && (
                      <div className="text-neon-green text-sm font-semibold">
                        +{item.bonus} бонус
                      </div>
                    )}
                    <div className="text-gray-400 text-xs mt-1">
                      = {(item.amount + item.bonus).toLocaleString()} монет
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Payment Methods */}
            {selectedTopUpAmount && (
              <div className="mb-8">
                <h4 className="text-xl font-semibold text-white mb-4">Способ оплаты</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {paymentMethods.map((method) => (
                    <div
                      key={method.id}
                      onClick={() => setSelectedPaymentMethod(method.id)}
                      className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                        selectedPaymentMethod === method.id 
                          ? 'border-neon-cyan bg-neon-cyan/10' 
                          : 'border-gaming-purple hover:border-neon-cyan'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg bg-gradient-to-r ${method.color}`}>
                          <Icon name={method.icon as any} className="text-white" size={20} />
                        </div>
                        <span className="text-white font-semibold">{method.name}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Summary */}
            {selectedTopUpAmount && selectedPaymentMethod && (
              <div className="bg-gaming-darker p-4 rounded-lg mb-6">
                <h5 className="text-white font-semibold mb-2">Итого к оплате:</h5>
                <div className="flex justify-between items-center text-lg">
                  <span className="text-gray-300">К доплате:</span>
                  <span className="text-white font-bold">{selectedTopUpAmount.toLocaleString()} ₽</span>
                </div>
                <div className="flex justify-between items-center text-lg">
                  <span className="text-gray-300">Получите:</span>
                  <span className="text-neon-yellow font-bold">
                    {(selectedTopUpAmount + (topUpAmounts.find(a => a.amount === selectedTopUpAmount)?.bonus || 0)).toLocaleString()} монет
                  </span>
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="space-y-3">
              <Button 
                onClick={handleTopUp}
                disabled={!selectedTopUpAmount || !selectedPaymentMethod}
                className="w-full bg-neon-yellow text-black hover:bg-yellow-400 font-semibold py-3 text-lg disabled:opacity-50"
              >
                <Icon name="CreditCard" size={20} className="mr-3" />
                Пополнить баланс
              </Button>
              
              <Button 
                onClick={closeTopUpModal}
                variant="outline"
                className="w-full border-gray-500 text-gray-300 hover:bg-gray-700"
              >
                Отмена
              </Button>
            </div>
            
            <p className="text-xs text-gray-500 mt-4">
              Средства поступят на баланс моментально после оплаты
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;