
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Header from '../components/Header';
import CategoryCard from '../components/CategoryCard';
import ProductCard from '../components/ProductCard';
import BottomNavigation from '../components/BottomNavigation';
import { categories, products } from '../data/mockData';
import { useLanguage } from '../contexts/LanguageContext';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel';

const HomePage: React.FC = () => {
  const { t } = useLanguage();
  
  // Featured products (with discount)
  const featuredProducts = products.filter(product => product.discount);
  
  // New arrivals (just take some products)
  const newArrivals = products.slice(0, 3);
  
  return (
    <div className="pb-20">
      <Header />
      
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white p-6 sm:p-10">
        <div className="max-w-md mx-auto">
          <h1 className="text-3xl font-bold mb-2">{t('home.summerSale')}</h1>
          <p className="mb-4">{t('home.salePromo')}</p>
          <Link 
            to="/categories" 
            className="inline-block px-6 py-3 bg-white text-cyan-500 font-semibold rounded-full hover:bg-gray-100 transition-colors"
          >
            {t('action.shopNow')}
          </Link>
        </div>
      </div>
      
      {/* Categories - Horizontal Scrolling */}
      <section className="px-4 py-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">{t('nav.categories')}</h2>
          <Link to="/categories" className="text-cyan-500 flex items-center">
            <span className="mr-1">{t('action.viewAll')}</span>
            <ArrowRight size={16} />
          </Link>
        </div>
        <ScrollArea className="w-full whitespace-nowrap pb-4">
          <div className="flex gap-4 w-max">
            {categories.slice(0, 8).map(category => (
              <div key={category.id} className="w-36 flex-shrink-0">
                <CategoryCard
                  id={category.id}
                  name={category.name}
                  image={category.image}
                  productCount={category.productCount}
                />
              </div>
            ))}
          </div>
        </ScrollArea>
      </section>
      
      {/* Featured Products - Carousel */}
      <section className="px-4 py-6 bg-gray-50">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">{t('home.featuredProducts')}</h2>
          <Link to="/products" className="text-cyan-500 flex items-center">
            <span className="mr-1">{t('action.viewAll')}</span>
            <ArrowRight size={16} />
          </Link>
        </div>
        <Carousel className="w-full">
          <CarouselContent>
            {featuredProducts.map(product => (
              <CarouselItem key={product.id} className="md:basis-1/2 lg:basis-1/3">
                <div className="p-1">
                  <ProductCard
                    id={product.id}
                    name={product.name}
                    price={product.price}
                    image={product.images[0]}
                    discount={product.discount}
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="mt-2 flex justify-center gap-2">
            <CarouselPrevious className="static translate-y-0 mx-1" />
            <CarouselNext className="static translate-y-0 mx-1" />
          </div>
        </Carousel>
      </section>
      
      {/* New Arrivals - Carousel */}
      <section className="px-4 py-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">{t('home.newArrivals')}</h2>
          <Link to="/products" className="text-cyan-500 flex items-center">
            <span className="mr-1">{t('action.viewAll')}</span>
            <ArrowRight size={16} />
          </Link>
        </div>
        <Carousel className="w-full">
          <CarouselContent>
            {newArrivals.map(product => (
              <CarouselItem key={product.id} className="md:basis-1/2 lg:basis-1/3">
                <div className="p-1">
                  <ProductCard
                    id={product.id}
                    name={product.name}
                    price={product.price}
                    image={product.images[0]}
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="mt-2 flex justify-center gap-2">
            <CarouselPrevious className="static translate-y-0 mx-1" />
            <CarouselNext className="static translate-y-0 mx-1" />
          </div>
        </Carousel>
      </section>
      
      <BottomNavigation />
    </div>
  );
};

export default HomePage;
