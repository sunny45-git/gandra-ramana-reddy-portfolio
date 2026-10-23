import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import AboutSection from '../components/AboutSection';
import EducationSection from '../components/EducationSection';
import PublicServiceSection from '../components/PublicServiceSection';
import MilestonesTimeline from '../components/MilestonesTimeline';
import PhotoGallery from '../components/PhotoGallery';
import NewsSection from '../components/NewsSection';
import GandraJyothiSection from '../components/GandraJyothiSection';
import SocialMediaSection from '../components/SocialMediaSection';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';
import { apiService } from '../services/api';
import { useLanguage } from '../context/LanguageContext';
import {
  defaultProfile,
  defaultActivities,
  defaultMilestones,
  defaultGallery,
  defaultNews,
} from '../data/defaultData';

const HomePage = () => {
  const { lang, t } = useLanguage();
  const [profile, setProfile] = useState(defaultProfile);
  const [activities, setActivities] = useState(defaultActivities);
  const [milestones, setMilestones] = useState(defaultMilestones);
  const [gallery, setGallery] = useState(defaultGallery);
  const [news, setNews] = useState(defaultNews);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [profRes, actRes, mileRes, galRes, newsRes] = await Promise.all([
          apiService.getProfile().catch(() => null),
          apiService.getActivities().catch(() => null),
          apiService.getMilestones().catch(() => null),
          apiService.getGallery().catch(() => null),
          apiService.getNews({ limit: 6 }).catch(() => null),
        ]);

        if (profRes?.data) setProfile(profRes.data);
        if (Array.isArray(actRes?.data) && actRes.data.length > 0) setActivities(actRes.data);
        if (Array.isArray(mileRes?.data) && mileRes.data.length > 0) setMilestones(mileRes.data);
        if (Array.isArray(galRes?.data) && galRes.data.length > 0) setGallery(galRes.data);
        if (Array.isArray(newsRes?.data) && newsRes.data.length > 0) setNews(newsRes.data);
      } catch (err) {
        console.warn('Using authentic verified default dataset:', err);
      }
    };

    fetchData();
  }, []);

  // Ensure hash targets (e.g., #gandra-jyothi) scroll into view smoothly after page data renders
  useEffect(() => {
    if (!loading && window.location.hash) {
      const targetId = window.location.hash.replace('#', '');
      const el = document.getElementById(targetId);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [loading]);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />

      <main style={{ flex: 1 }}>
        <Hero profile={profile} />
        <AboutSection profile={profile} />
        <EducationSection profile={profile} />
        <PublicServiceSection activities={activities} />
        <MilestonesTimeline milestones={milestones} />
        <PhotoGallery gallery={gallery} />
        <NewsSection news={news} />
        <GandraJyothiSection gandraJyothi={profile?.gandraJyothi} />
        <SocialMediaSection profile={profile} />
        <ContactSection contactInfo={profile?.contactInfo} />
      </main>

      <Footer profile={profile} />
    </div>
  );
};

export default HomePage;
