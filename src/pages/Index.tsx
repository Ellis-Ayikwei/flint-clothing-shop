import React from 'react';
import Hero from '../components/Layouts/Hero';
import Products from '../components/Layouts/Products';
import FeaturedCollections from '../components/Layouts/FeaturedCollections';
import TrendingProducts from '../components/Layouts/TrendingProducts';
import NewsletterSignup from '../components/NewsletterSignup';
import ScrollToTop from '../components/ScrollToTop';

const Index = () => {
    return (
        <div className="bg-white">
            <Hero />
            <div className="space-y-0">
                <TrendingProducts />
                <FeaturedCollections />
                <Products />
                <NewsletterSignup />
            </div>
            <ScrollToTop />
            {/* 
            <ExploreMyStory />
            <ExperienceTimeline />
            <Portfolio /> */}
        </div>
    );
};

export default Index;
